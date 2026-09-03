import { Card } from '../common/Card'
import { StatusPill } from '../common/StatusPill'
import type { Policy } from '../../data/types'
import { daysUntil, formatCurrency, formatDate } from '../../lib/format'

export function PolicySummaryCard({ policy }: { policy: Policy }) {
  const daysLeft = daysUntil(policy.expiry)

  return (
    <Card className="flex flex-col gap-[20px] md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-wrap items-center gap-[10px]">
          <span className="text-[15px] leading-[1.2] text-muted">{policy.planName}</span>
          <StatusPill status={policy.status} />
        </div>
        <span className="text-[15px] leading-[1.2] text-muted">Policy ID {policy.id}</span>
        <span className="text-[15px] leading-[1.2] text-muted">
          Valid until {formatDate(policy.expiry)}
          {daysLeft >= 0 ? ` · ${daysLeft} days left` : ' · expired'}
        </span>
      </div>

      <div className="flex flex-col gap-[10px] md:items-end md:text-right">
        <span className="text-[15px] leading-[1.2] text-muted">Total coverage</span>
        <span className="text-subheading font-normal tracking-[-0.03em]">
          {formatCurrency(policy.totalCoverage, policy.currency)}
        </span>
      </div>
    </Card>
  )
}
