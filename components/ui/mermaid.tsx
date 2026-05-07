"use client";

import { useEffect, useId, useRef, useState } from "react";

type MermaidProps = {
  chart: string;
  className?: string;
};

export function Mermaid({ chart, className }: MermaidProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        });
        const { svg: rendered } = await mermaid.render(`mmd-${id}`, chart);
        if (!cancelled) setSvg(rendered);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : String(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <pre className="rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-xs text-red-300">
        Mermaid render error: {error}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-500">
        Rendering diagram…
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
