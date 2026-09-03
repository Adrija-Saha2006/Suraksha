import type { Claim, ClaimStatus } from '../../data/types'
import { formatCurrency } from '../../lib/format'
import { claimTypeLabels } from '../../lib/claims'

const claimStatusConfig: Record<ClaimStatus, { label: string; className: string }> = {
  submitted: { label: 'Submitted', className: 'bg-status-warning-bg text-status-warning' },
  in_verification: { label: 'In verification', className: 'bg-status-warning-bg text-status-warning' },
  partially_paid: { label: 'Partially paid', className: 'bg-status-warning-bg text-status-warning' },
  settled: { label: 'Settled', className: 'bg-status-active-bg text-status-active' },
  rejected: { label: 'Rejected', className: 'bg-status-danger-bg text-status-danger' },
}

export function ClaimHeader({ claim }: { claim: Claim }) {
  const completedSteps = claim.timeline.filter((step) => step.status === 'complete').length
  const totalSteps = claim.timeline.length
  const { label, className } = claimStatusConfig[claim.status]

  return (
    <div className="flex flex-col gap-[20px] border border-ink bg-ink px-[24px] py-[30px] text-paper md:flex-row md:items-end md:justify-between md:px-[40px] md:py-[40px]">
      <div className="flex flex-col gap-[10px]">
        <span className="text-[15px] leading-[1.2] text-paper/70">Claim {claim.id}</span>
        <h1 className="text-heading font-normal tracking-[-0.03em]">{claimTypeLabels[claim.type]}</h1>
        <div className="flex flex-wrap items-center gap-[10px]">
          <span
            className={`inline-flex items-center rounded-full px-[12px] py-[4px] text-[13px] leading-[1.2] ${className}`}
          >
            {label}
          </span>
          <span className="text-[15px] leading-[1.2] text-paper/60">
            {completedSteps} of {totalSteps} steps complete
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] md:items-end md:text-right">
        <span className="text-[15px] leading-[1.2] text-paper/70">Claim amount</span>
        <span className="text-subheading font-normal tracking-[-0.03em]">
          {formatCurrency(claim.amount, claim.currency)}
        </span>
      </div>
    </div>
  )
}
