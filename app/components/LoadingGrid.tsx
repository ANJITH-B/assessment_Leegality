interface LoadingGridProps {
  count?: number;
}
export function SkeletonCard() {
  return (
    <div className="overflow-hidden w-full rounded border border-slate-200 bg-white p-5 shadow-sm">
      <div className="h-56 rounded bg-slate-200" />
      <div className="mt-5 space-y-3">
        <div className="h-3 w-3/4 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-3 w-1/2 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-3 w-1/3 rounded-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}

export default function LoadingGrid({ count = 12 }: LoadingGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function LoadingDetailPage() {
  return (
    <div className="grid gap-6 rounded border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.4fr_1fr]">
      <div className="h-80 rounded bg-slate-200 animate-pulse" />
      <div className="space-y-5">
        <div className="h-8 w-3/4 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-6 w-1/3 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-4 w-2/5 rounded-full bg-slate-200 animate-pulse" />
        <div className="space-y-3 pt-4">
          <div className="h-3 w-full rounded-full bg-slate-200 animate-pulse" />
          <div className="h-3 w-11/12 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-3 w-4/5 rounded-full bg-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
