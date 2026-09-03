// Placeholder shown while useClaim() is loading a claim. Mirrors the
// tracking page's layout (hero, incident card, timeline, payout cards,
// settlement list) so content doesn't jump into place once it resolves.
export function ClaimTrackingSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-[40px]" aria-busy="true" aria-label="Loading claim">
      <div className="h-[190px] border border-border bg-surface" />
      <div className="h-[160px] border border-border bg-surface" />
      <div className="h-[420px] border border-border bg-surface" />
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
        <div className="h-[90px] border border-border bg-surface" />
        <div className="h-[90px] border border-border bg-surface" />
      </div>
      <div className="h-[90px] border border-border bg-surface" />
    </div>
  )
}
