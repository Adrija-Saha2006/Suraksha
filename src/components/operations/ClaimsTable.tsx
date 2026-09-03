import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import { StatusBadge } from './StatusBadge'
import type { OperationsClaim } from '../../data/types'
import { formatCurrency } from '../../lib/format'
import { claimTypeLabels } from '../../lib/claims'
import {
  claimStatusLabel,
  claimStatusTone,
  verificationLabel,
  verificationTone,
} from '../../lib/operations'

const thClass = 'px-[16px] py-[12px] text-[13px] font-normal text-muted'

export function ClaimsTable({ claims }: { claims: OperationsClaim[] }) {
  return (
    <section>
      <SectionHeading>Claims</SectionHeading>
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className={thClass}>Claim</th>
              <th className={thClass}>Type</th>
              <th className={`${thClass} text-right`}>Amount</th>
              <th className={thClass}>Verification</th>
              <th className={thClass}>Status</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, index) => (
              <tr key={claim.id} className={index !== claims.length - 1 ? 'border-b border-border' : ''}>
                <td className="px-[16px] py-[14px] text-[15px] leading-[1.2]">{claim.id}</td>
                <td className="px-[16px] py-[14px] text-[15px] leading-[1.2] text-muted">
                  {claimTypeLabels[claim.type]}
                </td>
                <td className="px-[16px] py-[14px] text-right text-[15px] leading-[1.2] tracking-[-0.03em]">
                  {formatCurrency(claim.amount, claim.currency)}
                </td>
                <td className="px-[16px] py-[14px]">
                  <StatusBadge tone={verificationTone(claim.verifiedCount, claim.totalSources)}>
                    {verificationLabel(claim.verifiedCount, claim.totalSources)}
                  </StatusBadge>
                </td>
                <td className="px-[16px] py-[14px]">
                  <StatusBadge tone={claimStatusTone(claim.status)}>
                    {claimStatusLabel(claim.status)}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  )
}
