// Placeholder shown while useDashboardData() is loading (e.g. mid-fetch
// once it's backed by a real API). Mirrors the Home page's layout so
// content doesn't jump into place.
export function DashboardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-[40px]" aria-busy="true" aria-label="Loading dashboard">
      <div className="h-[190px] border border-border bg-surface" />

      <div className="flex flex-wrap gap-[10px]">
        <div className="h-[42px] w-[160px] rounded-full bg-border" />
        <div className="h-[42px] w-[150px] rounded-full bg-border" />
        <div className="h-[42px] w-[130px] rounded-full bg-border" />
      </div>

      <div className="h-[110px] border border-border bg-surface" />

      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-3">
        <div className="h-[140px] border border-border bg-surface" />
        <div className="h-[140px] border border-border bg-surface" />
        <div className="h-[140px] border border-border bg-surface" />
      </div>

      <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="h-[100px] border border-border bg-surface" />
        <div className="h-[220px] border border-border bg-surface" />
      </div>
    </div>
  )
}
