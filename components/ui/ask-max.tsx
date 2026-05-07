"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MLCEngine } from "@mlc-ai/web-llm";
import {
  answerAskMax,
  SUGGESTED_QUESTIONS,
  type AskMaxReply,
} from "@/lib/ask-max-rules";
import { buildAskMaxContext } from "@/lib/ask-max-context";

const MODEL_ID = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
const MAX_HISTORY = 6;
const MAX_GEN_TOKENS = 220;

// Minimal WebGPU types — just what we need so we don't have to depend on
// @webgpu/types. The browser gives us real values at runtime.
type GPUAdapterInfoLite = {
  vendor?: string;
  architecture?: string;
  description?: string;
  device?: string;
};
type GPUAdapterLite = {
  limits?: { maxBufferSize?: number };
  info?: GPUAdapterInfoLite;
  requestAdapterInfo?: () => Promise<GPUAdapterInfoLite>;
};

type SystemCheck = {
  verdict: "ok" | "warn" | "block";
  reasons: string[];
  details: {
    webgpu: boolean;
    vendor?: string;
    architecture?: string;
    description?: string;
    maxBufferGB?: number;
    deviceMemoryGB?: number;
    cores?: number;
    isAppleSilicon?: boolean;
    isIntelIntegrated?: boolean;
    hasDiscrete?: boolean;
  };
};

type EngineState =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "checked"; check: SystemCheck }
  | { kind: "unsupported" }
  | { kind: "loading"; progress: number; text: string }
  | { kind: "ready" }
  | { kind: "error"; message: string };

type ChatTurn =
  | { role: "user"; text: string }
  | {
      role: "assistant";
      reply: AskMaxReply;
      source: "rules" | "llm" | "loading";
    };

const isWebGpuSupported = () =>
  typeof navigator !== "undefined" && "gpu" in navigator;

async function runSystemCheck(): Promise<SystemCheck> {
  const reasons: string[] = [];
  const details: SystemCheck["details"] = { webgpu: false };

  if (typeof navigator === "undefined") {
    return {
      verdict: "block",
      reasons: ["Server-side — no client info"],
      details,
    };
  }
  if (!("gpu" in navigator)) {
    return {
      verdict: "block",
      reasons: [
        "Your browser doesn't support WebGPU. Try Chrome / Edge 113+ or Safari 18+.",
      ],
      details,
    };
  }
  details.webgpu = true;

  // deviceMemory is a non-standard but widely supported hint
  type NavigatorWithMemory = Navigator & { deviceMemory?: number };
  const deviceMemory = (navigator as NavigatorWithMemory).deviceMemory;
  if (deviceMemory !== undefined) details.deviceMemoryGB = deviceMemory;
  details.cores = navigator.hardwareConcurrency;

  // navigator.gpu.requestAdapter() exists at runtime in modern browsers; we
  // shape it as our minimal type to avoid pulling in @webgpu/types.
  type GpuLike = {
    requestAdapter: () => Promise<GPUAdapterLite | null>;
  };
  const gpu = (navigator as Navigator & { gpu?: GpuLike }).gpu;
  if (!gpu) {
    return { verdict: "block", reasons: ["No GPU access."], details };
  }

  let adapter: GPUAdapterLite | null = null;
  try {
    adapter = await gpu.requestAdapter();
  } catch {
    return {
      verdict: "block",
      reasons: ["Couldn't access the GPU adapter."],
      details,
    };
  }
  if (!adapter) {
    return {
      verdict: "block",
      reasons: ["No suitable GPU adapter found."],
      details,
    };
  }

  let info: GPUAdapterInfoLite | undefined;
  if (adapter.info) {
    info = adapter.info;
  } else if (adapter.requestAdapterInfo) {
    try {
      info = await adapter.requestAdapterInfo();
    } catch {
      // some browsers reject; we'll keep going without info
    }
  }

  const vendor = (info?.vendor ?? "").toLowerCase();
  const architecture = (info?.architecture ?? "").toLowerCase();
  const description = info?.description ?? "";
  if (vendor) details.vendor = vendor;
  if (architecture) details.architecture = architecture;
  if (description) details.description = description;

  const isAppleSilicon = /apple/.test(vendor) || /apple/.test(architecture);
  const isIntelIntegrated = /intel/.test(vendor);
  const hasDiscrete =
    /amd|nvidia/.test(vendor) || /radeon|geforce|nvidia|amd/i.test(description);
  details.isAppleSilicon = isAppleSilicon;
  details.isIntelIntegrated = isIntelIntegrated;
  details.hasDiscrete = hasDiscrete;

  const maxBufferBytes = adapter.limits?.maxBufferSize ?? 0;
  const maxBufferGB = maxBufferBytes / 1024 ** 3;
  if (maxBufferBytes) details.maxBufferGB = maxBufferGB;

  let verdict: SystemCheck["verdict"] = "ok";
  const escalate = (next: SystemCheck["verdict"]) => {
    if (next === "block") verdict = "block";
    else if (next === "warn" && verdict !== "block") verdict = "warn";
  };

  if (maxBufferBytes && maxBufferGB < 0.4) {
    escalate("block");
    reasons.push(
      `GPU buffer limit is only ${maxBufferGB.toFixed(2)} GB — the model probably won't fit.`,
    );
  } else if (maxBufferBytes && maxBufferGB < 1) {
    escalate("warn");
    reasons.push(
      `GPU buffer limit is ${maxBufferGB.toFixed(2)} GB — borderline for the 280 MB model.`,
    );
  }

  if (deviceMemory !== undefined && deviceMemory < 4) {
    escalate("warn");
    reasons.push(`Only ${deviceMemory} GB system RAM detected.`);
  }

  if (details.cores !== undefined && details.cores < 4) {
    escalate("warn");
    reasons.push(`Only ${details.cores} CPU cores detected.`);
  }

  if (isIntelIntegrated && !hasDiscrete && !isAppleSilicon) {
    escalate("warn");
    reasons.push(
      "Intel integrated GPU detected — these sometimes produce garbled output with quantized models.",
    );
  }

  if (verdict === "ok") {
    if (isAppleSilicon) {
      reasons.push("Apple Silicon detected — should run great.");
    } else if (hasDiscrete) {
      reasons.push("Discrete GPU detected — should run well.");
    } else if (vendor) {
      reasons.push(
        `GPU: ${vendor}${architecture ? " · " + architecture : ""}.`,
      );
    } else {
      reasons.push("WebGPU available — should run.");
    }
  }

  return { verdict, reasons, details };
}

// Older / weaker GPUs sometimes produce garbage logits with the q4 quantized
// 0.5B model. Heuristic: very low letter ratio, long runs of the same
// character, suspicious code-token openers — none of which we'd expect from a
// well-formed answer about Max's background.
function looksGarbled(text: string): boolean {
  const t = text.trim();
  if (t.length < 40) return false;
  const head = t.slice(0, 200);
  const letters = head.match(/[A-Za-z]/g)?.length ?? 0;
  const ratio = letters / head.length;
  if (ratio < 0.55) return true;
  if (/(.)\1{7,}/.test(head)) return true; // 8+ same chars in a row
  if (/^[\s]*[.;,)\]>}=\\][^\s]/.test(t)) return true; // starts with weird punctuation
  if (/\b\d{6,}\b/.test(head)) return true; // long digit runs
  return false;
}

export function AskMax() {
  const [open, setOpen] = useState(false);
  const [engineState, setEngineState] = useState<EngineState>({ kind: "idle" });
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const engineRef = useRef<MLCEngine | null>(null);
  const systemPromptRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    systemPromptRef.current = buildAskMaxContext();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns, open, engineState]);

  const checkSystem = async () => {
    if (!isWebGpuSupported()) {
      setEngineState({ kind: "unsupported" });
      return;
    }
    setEngineState({ kind: "checking" });
    const check = await runSystemCheck();
    if (check.details.webgpu === false) {
      setEngineState({ kind: "unsupported" });
      return;
    }
    setEngineState({ kind: "checked", check });
  };

  const loadEngine = async () => {
    if (!isWebGpuSupported()) {
      setEngineState({ kind: "unsupported" });
      return;
    }
    setEngineState({ kind: "loading", progress: 0, text: "Starting…" });
    try {
      const webllm = await import("@mlc-ai/web-llm");
      const engine = await webllm.CreateMLCEngine(MODEL_ID, {
        initProgressCallback: (report) => {
          setEngineState({
            kind: "loading",
            progress: report.progress ?? 0,
            text: report.text ?? "Loading…",
          });
        },
      });
      engineRef.current = engine;
      setEngineState({ kind: "ready" });
    } catch (err) {
      console.error("[AskMax] load error", err);
      setEngineState({
        kind: "error",
        message:
          err instanceof Error ? err.message : "Couldn't load the local model.",
      });
    }
  };

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || streaming) return;

    const ruleReply = answerAskMax(text);
    const engineReady = engineState.kind === "ready" && engineRef.current;

    setTurns((prev) => [
      ...prev,
      { role: "user", text },
      engineReady
        ? {
            role: "assistant",
            reply: { text: "" },
            source: "loading",
          }
        : { role: "assistant", reply: ruleReply, source: "rules" },
    ]);
    setInput("");

    if (!engineReady) return;

    setStreaming(true);
    try {
      const engine = engineRef.current!;
      const history: { role: "user" | "assistant"; content: string }[] = [];
      for (const t of turns.slice(-MAX_HISTORY * 2)) {
        if (t.role === "user") {
          history.push({ role: "user", content: t.text });
        } else if (t.source !== "loading" && t.reply.text.trim()) {
          history.push({ role: "assistant", content: t.reply.text });
        }
      }

      const stream = await engine.chat.completions.create({
        stream: true,
        temperature: 0.4,
        max_tokens: MAX_GEN_TOKENS,
        messages: [
          { role: "system", content: systemPromptRef.current },
          ...history,
          { role: "user", content: text },
        ],
      });

      let acc = "";
      let aborted = false;
      for await (const chunk of stream) {
        const delta = chunk?.choices?.[0]?.delta?.content ?? "";
        if (!delta) continue;
        acc += delta;
        if (acc.length > 60 && looksGarbled(acc)) {
          aborted = true;
          break;
        }
        setTurns((prev) => {
          const next = prev.slice(0, -1);
          next.push({
            role: "assistant",
            reply: { text: acc, cta: ruleReply.cta },
            source: "llm",
          });
          return next;
        });
      }

      const finalText = acc.trim();
      const finalIsBad = aborted || !finalText || looksGarbled(finalText);

      if (finalIsBad) {
        // GPU produced junk (older drivers + q4 quantization) or returned
        // nothing useful. Fall back to the rule reply silently.
        setTurns((prev) => {
          const next = prev.slice(0, -1);
          next.push({ role: "assistant", reply: ruleReply, source: "rules" });
          return next;
        });
      }
    } catch (err) {
      console.error("[AskMax] generate error", err);
      setTurns((prev) => {
        const next = prev.slice(0, -1);
        next.push({ role: "assistant", reply: ruleReply, source: "rules" });
        return next;
      });
    } finally {
      setStreaming(false);
    }
  };

  const renderCta = (cta: NonNullable<AskMaxReply["cta"]>) => {
    const cls =
      "mt-2 inline-flex items-center gap-1 rounded-md bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-emerald-600";
    if (cta.external) {
      return (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {cta.label} →
        </a>
      );
    }
    return (
      <Link href={cta.href} className={cls} onClick={() => setOpen(false)}>
        {cta.label} →
      </Link>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Ask Max" : "Open Ask Max"}
        className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-zinc-900/95 px-3.5 py-2 text-sm font-medium text-emerald-300 shadow-lg backdrop-blur-md transition-all hover:bg-zinc-800 sm:right-6 sm:bottom-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {open ? "Close" : "Ask Max"}
      </button>

      {open && (
        <div className="fixed inset-x-2 bottom-16 z-50 flex max-h-[75vh] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl sm:right-6 sm:bottom-20 sm:left-auto sm:w-96">
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <div>
                <div className="text-xs font-medium text-zinc-100">Ask Max</div>
                <div className="text-[9px] text-zinc-500">
                  {engineState.kind === "ready"
                    ? "local Qwen2.5 · runs in your browser"
                    : "instant rule-based answers"}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-2.5 overflow-y-auto px-3 py-3 text-sm"
          >
            <div className="space-y-3">
              <p className="text-zinc-300">
                Ask anything about Max&apos;s background, roles, or projects.
                You&apos;ll get instant rule-based answers — or load a tiny
                local AI for richer ones.
              </p>
              <div className="flex flex-col gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => ask(q)}
                    disabled={streaming}
                    className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1.5 text-left text-xs text-zinc-300 transition-colors hover:border-emerald-700 hover:bg-zinc-900 hover:text-emerald-300 disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {turns.length > 0 && (
              <div className="my-2 border-t border-zinc-800/60" />
            )}

            {turns.map((turn, i) =>
              turn.role === "user" ? (
                <div
                  key={i}
                  className="ml-6 rounded-lg bg-emerald-950/40 px-2.5 py-1.5 text-zinc-100"
                >
                  <div className="text-[9px] tracking-wide text-zinc-500 uppercase">
                    you
                  </div>
                  <div className="mt-0.5 leading-relaxed">{turn.text}</div>
                </div>
              ) : (
                <div
                  key={i}
                  className="mr-6 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-zinc-200"
                >
                  <div className="flex items-center justify-between text-[9px] tracking-wide text-zinc-500 uppercase">
                    <span>ask max</span>
                    <span className="text-zinc-600">
                      {turn.source === "llm"
                        ? "qwen2.5 0.5b"
                        : turn.source === "loading"
                          ? "thinking…"
                          : "rules"}
                    </span>
                  </div>
                  <div className="mt-0.5 leading-relaxed whitespace-pre-wrap">
                    {turn.reply.text || (turn.source === "loading" ? "…" : "")}
                  </div>
                  {turn.reply.cta && renderCta(turn.reply.cta)}
                </div>
              ),
            )}

            {/* Engine load controls — placed BELOW the chat so questions still
                work without ever loading the model. */}
            {engineState.kind === "idle" && (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-zinc-400">
                Want richer answers? A tiny open-source LLM (Qwen 2.5 0.5B, ~280
                MB) can run entirely in your browser via WebGPU. Run a quick
                system check first — it takes a second.
                <button
                  type="button"
                  onClick={checkSystem}
                  className="mt-2 rounded-md bg-emerald-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-600"
                >
                  Check my system
                </button>
              </div>
            )}

            {engineState.kind === "checking" && (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-zinc-400">
                Probing GPU adapter…
              </div>
            )}

            {engineState.kind === "checked" && (
              <SystemCheckResult
                check={engineState.check}
                onContinue={loadEngine}
                onCancel={() => setEngineState({ kind: "idle" })}
              />
            )}

            {engineState.kind === "loading" && (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5 text-xs text-zinc-400">
                <div className="text-zinc-300">{engineState.text}</div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-emerald-500 transition-[width]"
                    style={{
                      width: `${Math.round(engineState.progress * 100)}%`,
                    }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-zinc-500">
                  Cached after first load — subsequent visits are instant.
                </p>
              </div>
            )}

            {engineState.kind === "unsupported" && (
              <div className="rounded-lg border border-amber-900/40 bg-amber-950/10 p-2.5 text-xs text-amber-300">
                Local AI needs WebGPU (Chrome / Edge 113+ or Safari 18+). The
                rule-based answers above still work great.
              </div>
            )}

            {engineState.kind === "error" && (
              <div className="rounded-lg border border-red-900/40 bg-red-950/10 p-2.5 text-xs text-red-300">
                Couldn&apos;t load the local model. Sticking with rule-based
                answers.
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="border-t border-zinc-800 bg-zinc-900 p-2"
          >
            <div className="flex items-end gap-1.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:border-emerald-700 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                className="rounded-md bg-emerald-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {streaming ? "…" : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function SystemCheckResult({
  check,
  onContinue,
  onCancel,
}: {
  check: SystemCheck;
  onContinue: () => void;
  onCancel: () => void;
}) {
  const palette = {
    ok: "border-emerald-900/50 bg-emerald-950/20 text-emerald-300",
    warn: "border-amber-900/50 bg-amber-950/20 text-amber-300",
    block: "border-red-900/50 bg-red-950/20 text-red-300",
  }[check.verdict];
  const label = {
    ok: "Looks good",
    warn: "Borderline",
    block: "Probably won't work",
  }[check.verdict];

  return (
    <div className={`rounded-lg border p-2.5 text-xs ${palette}`}>
      <div className="flex items-center justify-between">
        <span className="font-semibold tracking-wide uppercase">
          {check.verdict === "ok" ? "✓" : check.verdict === "warn" ? "⚠" : "✗"}{" "}
          {label}
        </span>
        <span className="text-[10px] text-zinc-500">
          {check.details.maxBufferGB
            ? `${check.details.maxBufferGB.toFixed(1)} GB GPU buf`
            : ""}
          {check.details.deviceMemoryGB
            ? ` · ${check.details.deviceMemoryGB} GB RAM`
            : ""}
          {check.details.cores ? ` · ${check.details.cores} cores` : ""}
        </span>
      </div>
      <ul className="mt-2 ml-4 list-disc space-y-1 text-zinc-300">
        {check.reasons.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        {check.verdict !== "block" ? (
          <button
            type="button"
            onClick={onContinue}
            className="rounded-md bg-emerald-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            {check.verdict === "warn"
              ? "Try anyway (~280 MB)"
              : "Load AI (~280 MB)"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onContinue}
            className="rounded-md border border-red-900/40 bg-red-950/20 px-2.5 py-1.5 text-xs font-semibold text-red-200 transition-colors hover:bg-red-950/40"
          >
            Force-load anyway
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-500"
        >
          Stick with rule-based
        </button>
      </div>
      {check.verdict === "warn" && (
        <p className="mt-2 text-[10px] text-zinc-500">
          If output looks garbled we&apos;ll silently fall back to rule-based
          answers.
        </p>
      )}
    </div>
  );
}
