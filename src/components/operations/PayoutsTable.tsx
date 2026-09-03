import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import { StatusBadge } from './StatusBadge'
import type { Payout } from '../../data/types'
import { formatCurrency } from '../../lib/format'
import { fundingLabel, fundingTone, payoutLabel, payoutTone, stellarLabel, stellarTone } from '../../lib/operations'

const thClass = 'px-[16px] py-[12px] text-[13px] font-normal text-muted'

export function PayoutsTable({ payouts }: { payouts: Payout[] }) {
  return (
    <section>
      <SectionHeading>Payouts</SectionHeading>
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className={thClass}>Claim</th>
              <th className={`${thClass} text-right`}>Amount</th>
              <th className={thClass}>Funding</th>
              <th className={thClass}>Stellar</th>
              <th className={thClass}>Status</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout, index) => (
              <tr key={payout.id} className={index !== payouts.length - 1 ? 'border-b border-border' : ''}>
                <td className="px-[16px] py-[14px] text-[15px] leading-[1.2]">{payout.claimId}</td>
                <td className="px-[16px] py-[14px] text-right text-[15px] leading-[1.2] tracking-[-0.03em]">
                  {formatCurrency(payout.amount, payout.currency)}
                </td>
                <td className="px-[16px] py-[14px]">
                  <StatusBadge tone={fundingTone(payout.funding)}>{fundingLabel(payout.funding)}</StatusBadge>
                </td>
                <td className="px-[16px] py-[14px]">
                  {payout.stellarStatus === 'confirmed' ? (
                    <StatusBadge tone={stellarTone(payout.stellarStatus)}>
                      {stellarLabel(payout.stellarStatus)}
                    </StatusBadge>
                  ) : (
                    <span className="text-[15px] leading-[1.2] text-muted">
                      {stellarLabel(payout.stellarStatus)}
                    </span>
                  )}
                </td>
                <td className="px-[16px] py-[14px]">
                  <StatusBadge tone={payoutTone(payout.status)}>{payoutLabel(payout.status)}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  )
}
