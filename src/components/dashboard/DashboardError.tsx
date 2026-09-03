export function DashboardError() {
  return (
    <div className="flex min-h-[60vh] flex-col items-start justify-center gap-[10px] border border-border bg-surface px-[30px] py-[40px]">
      <span className="text-[15px] leading-[1.2] text-muted">Something went wrong</span>
      <h1 className="text-heading font-normal tracking-[-0.03em]">Couldn't load your dashboard</h1>
      <p className="max-w-[520px] text-[18px] leading-[1.1] text-muted">
        We weren't able to reach the server. Please refresh the page or try again shortly.
      </p>
    </div>
  )
}
