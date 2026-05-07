export default function ProjectLoading() {
  return (
    <div className="panel" aria-busy="true" aria-live="polite">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 h-4 w-32 animate-pulse rounded bg-zinc-800/60" />

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="h-12 w-3/4 animate-pulse rounded bg-zinc-800/70" />
            <div className="h-5 w-full animate-pulse rounded bg-zinc-800/60" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-zinc-800/60" />
          </div>
          <div className="h-9 w-32 shrink-0 animate-pulse rounded-lg bg-zinc-800/60" />
        </div>

        <div className="mt-6 aspect-video w-full animate-pulse rounded-xl bg-zinc-900/60" />

        <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Preparing project…
        </div>

        <div className="mt-6 space-y-3">
          <div className="h-32 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/40" />
          <div className="h-32 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/40" />
        </div>
      </div>
    </div>
  );
}
