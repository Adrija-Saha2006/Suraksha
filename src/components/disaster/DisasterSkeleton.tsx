// Placeholder shown while useDisasterEvent() is loading. Mirrors the
// Disaster page's layout (event card, payout cards, simulate button +
// gauge, step list) so content doesn't jump into place once it resolves.
export function DisasterSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-[40px]" aria-busy="true" aria-label="Loading disaster event">
      <div className="h-[160px] border border-border bg-surface" />

      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
        <div className="h-[90px] border border-border bg-surface" />
        <div className="h-[90px] border border-border bg-surface" />
      </div>

      <div className="flex flex-col gap-[20px]">
        <div className="h-[42px] w-[220px] rounded-full bg-border" />
        <div className="h-[280px] border border-border bg-surface sm:h-[320px]" />
      </div>

      <div className="h-[420px] border border-border bg-surface" />

      <div className="h-[90px] border border-border bg-surface" />
    </div>
  )
}
