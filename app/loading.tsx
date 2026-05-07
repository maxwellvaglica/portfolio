export default function Loading() {
  return (
    <div className="panel" aria-busy="true" aria-live="polite">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm tracking-wide text-zinc-400 uppercase">
            Loading…
          </span>
        </div>
        <div className="mt-6 h-9 w-2/3 animate-pulse rounded bg-zinc-800/70" />
        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-zinc-800/60" />
        <div className="mt-8 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-800/60" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-zinc-800/60" />
          <div className="h-4 w-9/12 animate-pulse rounded bg-zinc-800/60" />
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="h-28 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50" />
          <div className="h-28 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50" />
        </div>
      </div>
    </div>
  );
}
