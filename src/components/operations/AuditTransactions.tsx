import { CheckCircle2 } from 'lucide-react'

import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { AuditTransaction } from '../../data/types'
import { formatCurrency, formatDate, truncateMiddle } from '../../lib/format'

export function AuditTransactions({ transactions }: { transactions: AuditTransaction[] }) {
  return (
    <section>
      <SectionHeading>Blockchain / Audit</SectionHeading>
      <p className="mb-[20px] max-w-[640px] text-[15px] leading-[1.2] text-muted">
        Stellar is Arakis's settlement and audit layer — every payout is recorded here for a verifiable
        trail. It is not a beneficiary wallet or bank account: payouts still settle to beneficiaries
        through regulated bank/UPI rails, and the insurer remains the risk bearer.
      </p>
      <Card className="p-0">
        <ul>
          {transactions.map((txn, index) => (
            <li
              key={txn.id}
              className={`flex flex-wrap items-start justify-between gap-[10px] px-[24px] py-[16px] ${
                index !== transactions.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex flex-col gap-[4px]">
                <span className="text-[13px] leading-[1.2] text-muted">PAYOUT · {txn.claimId}</span>
                <span className="text-[15px] leading-[1.1] tracking-[-0.03em]">
                  {formatCurrency(txn.amount, txn.currency)}
                </span>
                <span className="flex items-center gap-[6px] text-[13px] leading-[1.2] text-muted">
                  {txn.network} — {txn.status === 'confirmed' ? 'CONFIRMED' : 'PENDING'}
                  {txn.status === 'confirmed' && (
                    <CheckCircle2 size={14} strokeWidth={2} className="text-status-active" aria-hidden="true" />
                  )}
                </span>
              </div>
              <div className="flex flex-col items-end gap-[4px]">
                <span className="text-[13px] leading-[1.2] text-muted">
                  TX: {truncateMiddle(txn.reference)}
                </span>
                <span className="text-[13px] leading-[1.2] text-muted">{formatDate(txn.date)}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
