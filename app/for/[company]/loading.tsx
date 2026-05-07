export default function CompanyLoading() {
  return (
    <div className="panel" aria-busy="true" aria-live="polite">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 h-4 w-40 animate-pulse rounded bg-zinc-800/60" />
        <div className="mb-2 h-3 w-24 animate-pulse rounded bg-emerald-900/40" />
        <div className="h-12 w-3/4 animate-pulse rounded bg-zinc-800/70" />
        <div className="mt-5 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-800/60" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-zinc-800/60" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800/60" />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <div className="h-9 w-40 animate-pulse rounded-lg bg-zinc-800/60" />
          <div className="h-9 w-36 animate-pulse rounded-lg bg-zinc-800/60" />
          <div className="h-9 w-36 animate-pulse rounded-lg bg-zinc-800/60" />
        </div>
      </div>
    </div>
  );
}
