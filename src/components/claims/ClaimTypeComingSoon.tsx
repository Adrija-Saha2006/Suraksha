export function ClaimTypeComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-start gap-[10px] border border-border bg-surface px-[24px] py-[30px]">
      <span className="text-[15px] leading-[1.2] text-muted">Coming soon</span>
      <p className="max-w-[480px] text-[15px] leading-[1.2] text-muted">
        {label} claims aren't available in this demo yet. Select Accident to see the full claim flow.
      </p>
    </div>
  )
}
