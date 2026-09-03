import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { DisasterEvent } from '../../data/types'
import { formatCurrency } from '../../lib/format'

export function ParametricPayoutSummary({ event }: { event: DisasterEvent }) {
  return (
    <section>
      <SectionHeading>Automatic payout</SectionHeading>
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
        <Card className="flex flex-col gap-[14px]">
          <span className="text-[15px] leading-[1.2] text-muted">Eligible policies</span>
          <span className="text-subheading font-normal tracking-[-0.03em]">
            {event.eligiblePolicies.toLocaleString('en-IN')}
          </span>
        </Card>
        <Card className="flex flex-col gap-[14px]">
          <span className="text-[15px] leading-[1.2] text-muted">Total payout authorized</span>
          <span className="text-subheading font-normal tracking-[-0.03em]">
            {formatCurrency(event.totalPayoutAuthorized, event.currency)}
          </span>
        </Card>
      </div>
    </section>
  )
}
