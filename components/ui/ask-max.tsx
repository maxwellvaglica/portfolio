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

type EngineState =
  | { kind: "idle" }
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
      for await (const chunk of stream) {
        const delta = chunk?.choices?.[0]?.delta?.content ?? "";
        if (!delta) continue;
        acc += delta;
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

      if (!acc.trim()) {
        // Empty completion — fall back to the rule reply silently.
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
            {turns.length === 0 && (
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
                      className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1.5 text-left text-xs text-zinc-300 transition-colors hover:border-emerald-700 hover:bg-zinc-900 hover:text-emerald-300"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
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
                Want richer answers? Load a tiny open-source LLM (Qwen 2.5 0.5B,
                ~280 MB) that runs entirely in your browser via WebGPU.
                <button
                  type="button"
                  onClick={loadEngine}
                  className="mt-2 rounded-md bg-emerald-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-600"
                >
                  Load local AI
                </button>
              </div>
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
