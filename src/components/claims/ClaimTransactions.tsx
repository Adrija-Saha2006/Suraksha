import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { ClaimTransaction } from '../../data/types'
import { formatCurrency, formatDate, truncateMiddle } from '../../lib/format'

interface ClaimTransactionsProps {
  transactions: ClaimTransaction[]
  currency: string
}

export function ClaimTransactions({ transactions, currency }: ClaimTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <section>
        <SectionHeading>Settlement references</SectionHeading>
        <Card>
          <p className="text-[15px] leading-[1.2] text-muted">
            No settlements yet. References appear here once a payout clears.
          </p>
        </Card>
      </section>
    )
  }

  return (
    <section>
      <SectionHeading>Settlement references</SectionHeading>
      <Card className="p-0">
        <ul>
          {transactions.map((txn, index) => (
            <li
              key={txn.id}
              className={`flex flex-wrap items-center justify-between gap-[10px] px-[24px] py-[16px] ${
                index !== transactions.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex flex-col gap-[4px]">
                <span className="text-[15px] leading-[1.2]">{txn.label}</span>
                <span className="text-[13px] leading-[1.2] text-muted">
                  {txn.network} · {truncateMiddle(txn.reference)} · {formatDate(txn.date)}
                </span>
              </div>
              <span className="text-[15px] leading-[1.1] tracking-[-0.03em]">
                {formatCurrency(txn.amount, currency)}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
