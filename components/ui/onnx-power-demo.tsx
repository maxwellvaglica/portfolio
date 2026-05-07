"use client";

import { useEffect, useMemo, useState } from "react";

type Weights = {
  fc1: { W: number[][]; b: number[] };
  fc2: { W: number[][]; b: number[] };
  out: { W: number[][]; b: number[] };
};

type ModelData = {
  input_dim: number;
  output_dim: number;
  feature_columns: string[];
  scaler: { mean: number[]; scale: number[] };
  weights: Weights;
};

const SLIDER_FEATURES = [
  "Pd_bus4",
  "Pd_bus8",
  "Pd_bus15",
  "Pd_bus20",
  "Pd_bus27",
  "Pg_gen2",
  "Pg_gen5",
  "Pg_gen10",
];

const FEATURE_LABEL: Record<string, string> = {
  Pd_bus4: "Bus 4 active load (Pd)",
  Pd_bus8: "Bus 8 active load (Pd)",
  Pd_bus15: "Bus 15 active load (Pd)",
  Pd_bus20: "Bus 20 active load (Pd)",
  Pd_bus27: "Bus 27 active load (Pd)",
  Pg_gen2: "Gen 2 active output (Pg)",
  Pg_gen5: "Gen 5 active output (Pg)",
  Pg_gen10: "Gen 10 active output (Pg)",
};

function dot(W: number[][], x: number[]): number[] {
  const out = new Array<number>(W.length);
  for (let i = 0; i < W.length; i++) {
    const row = W[i];
    let s = 0;
    for (let j = 0; j < row.length; j++) s += row[j] * x[j];
    out[i] = s;
  }
  return out;
}

function addBias(v: number[], b: number[]) {
  const out = new Array<number>(v.length);
  for (let i = 0; i < v.length; i++) out[i] = v[i] + b[i];
  return out;
}

function relu(v: number[]) {
  const out = new Array<number>(v.length);
  for (let i = 0; i < v.length; i++) out[i] = Math.max(0, v[i]);
  return out;
}

function sigmoid(v: number[]) {
  const out = new Array<number>(v.length);
  for (let i = 0; i < v.length; i++) {
    const x = v[i];
    out[i] = x >= 0 ? 1 / (1 + Math.exp(-x)) : Math.exp(x) / (1 + Math.exp(x));
  }
  return out;
}

export function OnnxPowerDemo() {
  const [model, setModel] = useState<ModelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/power_system_nn.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: ModelData) => {
        if (!cancelled) setModel(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sliderConfig = useMemo(() => {
    if (!model) return [];
    return SLIDER_FEATURES.filter((f) => model.feature_columns.includes(f)).map(
      (name) => {
        const idx = model.feature_columns.indexOf(name);
        const mean = model.scaler.mean[idx];
        const scale = model.scaler.scale[idx];
        const min = mean - 2 * scale;
        const max = mean + 2 * scale;
        return {
          name,
          label: FEATURE_LABEL[name] ?? name,
          idx,
          mean,
          min,
          max,
          step: (max - min) / 100,
        };
      },
    );
  }, [model]);

  const predictions = useMemo(() => {
    if (!model) return null;
    const x = new Array<number>(model.input_dim);
    for (let i = 0; i < model.input_dim; i++) {
      const col = model.feature_columns[i];
      const raw = overrides[col] ?? model.scaler.mean[i];
      x[i] = (raw - model.scaler.mean[i]) / model.scaler.scale[i];
    }
    const h1 = relu(addBias(dot(model.weights.fc1.W, x), model.weights.fc1.b));
    const h2 = relu(addBias(dot(model.weights.fc2.W, h1), model.weights.fc2.b));
    const logits = addBias(dot(model.weights.out.W, h2), model.weights.out.b);
    return sigmoid(logits);
  }, [model, overrides]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-300">
        Couldn&apos;t load the trained model ({error}). Demo unavailable.
      </div>
    );
  }

  if (!model || !predictions) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-500">
        Loading PowerSystemNN weights…
      </div>
    );
  }

  const overloaded = predictions.filter((p) => p > 0.5).length;
  const maxIdx = predictions.indexOf(Math.max(...predictions));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {sliderConfig.map((cfg) => {
          const value = overrides[cfg.name] ?? cfg.mean;
          return (
            <label key={cfg.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{cfg.label}</span>
                <span className="font-mono text-zinc-500">
                  {value.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={cfg.min}
                max={cfg.max}
                step={cfg.step}
                value={value}
                onChange={(e) =>
                  setOverrides((prev) => ({
                    ...prev,
                    [cfg.name]: parseFloat(e.target.value),
                  }))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-emerald-500"
              />
            </label>
          );
        })}
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <div className="text-xs tracking-wide text-zinc-500 uppercase">
              Predicted overloaded branches
            </div>
            <div className="mt-1 text-3xl font-bold text-zinc-100">
              {overloaded}
              <span className="ml-1 text-base font-medium text-zinc-500">
                / 46
              </span>
            </div>
          </div>
          <div className="text-right text-xs text-zinc-500">
            <div>
              Highest risk: branch {maxIdx + 1} (
              {(predictions[maxIdx] * 100).toFixed(1)}%)
            </div>
            <div>Threshold: 50%</div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(23,minmax(0,1fr))] gap-px sm:grid-cols-[repeat(46,minmax(0,1fr))]">
          {predictions.map((p, i) => {
            const intensity = Math.round(p * 100);
            const bg =
              p > 0.5
                ? "bg-red-500"
                : p > 0.25
                  ? "bg-amber-500"
                  : "bg-emerald-700";
            return (
              <div
                key={i}
                title={`Branch ${i + 1}: ${intensity}% overload probability`}
                className={`${bg} h-6 transition-colors`}
                style={{ opacity: 0.35 + p * 0.65 }}
              />
            );
          })}
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-emerald-700" />{" "}
            ok
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-amber-500" />{" "}
            watch
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-red-500" />{" "}
            overload predicted
          </span>
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        37 features (8 surfaced as sliders, the rest held at training-mean) →
        StandardScaler → 120 → 80 → 46 sigmoid heads. Inference runs as plain
        JavaScript matmul over the trained weights — no model server, no API
        call. Try sliding Bus 8 load up while pulling Gen 2 down.
      </p>
    </div>
  );
}
