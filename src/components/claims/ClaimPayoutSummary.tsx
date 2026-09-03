import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { Claim } from '../../data/types'
import { formatCurrency } from '../../lib/format'

interface PayoutLine {
  stepId: string
  label: string
  amount: (claim: Claim) => number
}

const payoutLines: PayoutLine[] = [
  { stepId: 'emergency_advance', label: 'Emergency Advance', amount: (claim) => claim.emergencyAdvance },
  { stepId: 'final_payout', label: 'Final Payout', amount: (claim) => claim.finalPayout },
]

export function ClaimPayoutSummary({ claim }: { claim: Claim }) {
  return (
    <section>
      <SectionHeading>Payout</SectionHeading>
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
        {payoutLines.map(({ stepId, label, amount }) => {
          const step = claim.timeline.find((s) => s.id === stepId)
          const paid = step?.status === 'complete'
          return (
            <Card key={stepId} className="flex flex-col gap-[14px]">
              <div className="flex items-center justify-between gap-[10px]">
                <span className="text-[15px] leading-[1.2] text-muted">{label}</span>
                <span
                  className={`inline-flex items-center rounded-full px-[12px] py-[4px] text-[13px] leading-[1.2] ${
                    paid ? 'bg-status-active-bg text-status-active' : 'bg-status-warning-bg text-status-warning'
                  }`}
                >
                  {paid ? 'Paid' : 'Pending'}
                </span>
              </div>
              <span className="text-subheading font-normal tracking-[-0.03em]">
                {formatCurrency(amount(claim), claim.currency)}
              </span>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
