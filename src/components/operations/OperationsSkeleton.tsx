// Placeholder shown while useOperationsData() is loading. Mirrors the
// Operations page's layout (KPI row, two tables, three cards) so content
// doesn't jump into place once it resolves.
export function OperationsSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-[40px]" aria-busy="true" aria-label="Loading operations data">
      <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 lg:grid-cols-5">
        <div className="h-[90px] border border-border bg-surface" />
        <div className="h-[90px] border border-border bg-surface" />
        <div className="h-[90px] border border-border bg-surface" />
        <div className="h-[90px] border border-border bg-surface" />
        <div className="h-[90px] border border-border bg-surface" />
      </div>

      <div className="h-[220px] border border-border bg-surface" />
      <div className="h-[220px] border border-border bg-surface" />
      <div className="h-[180px] border border-border bg-surface" />
      <div className="h-[130px] border border-border bg-surface" />
      <div className="h-[220px] border border-border bg-surface" />
    </div>
  )
}
