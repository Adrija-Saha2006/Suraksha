import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { Treasury } from '../../data/types'
import { formatCurrency } from '../../lib/format'

export function TreasuryCard({ treasury }: { treasury: Treasury }) {
  return (
    <section>
      <SectionHeading>Treasury</SectionHeading>
      <Card className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] leading-[1.2] text-muted">Available balance</span>
          <span className="text-subheading font-normal tracking-[-0.03em]">
            {formatCurrency(treasury.availableBalance, treasury.currency)}
          </span>
        </div>
        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] leading-[1.2] text-muted">Reserved balance</span>
          <span className="text-subheading font-normal tracking-[-0.03em]">
            {formatCurrency(treasury.reservedBalance, treasury.currency)}
          </span>
        </div>
        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] leading-[1.2] text-muted">Funding provider</span>
          <span className="text-[15px] leading-[1.2]">{treasury.fundingProvider}</span>
        </div>
        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] leading-[1.2] text-muted">Pending funding</span>
          <span className="text-[15px] leading-[1.2]">
            {formatCurrency(treasury.pendingFunding, treasury.currency)}
          </span>
        </div>
      </Card>
    </section>
  )
}
