import { CheckCircle2, CircleDashed } from 'lucide-react'

import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { Nominee } from '../../data/types'

export function NomineeCard({ nominee }: { nominee: Nominee }) {
  return (
    <section>
      <SectionHeading>Nominee</SectionHeading>
      <Card className="flex items-start justify-between gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[18px] leading-[1.1] tracking-[-0.03em]">{nominee.name}</span>
          <span className="text-[15px] leading-[1.2] text-muted">{nominee.relationship}</span>
        </div>

        <span
          className={`inline-flex items-center gap-[6px] rounded-full px-[12px] py-[4px] text-[13px] leading-[1.2] ${
            nominee.verified
              ? 'bg-status-active-bg text-status-active'
              : 'bg-status-warning-bg text-status-warning'
          }`}
        >
          {nominee.verified ? (
            <CheckCircle2 size={14} strokeWidth={2} />
          ) : (
            <CircleDashed size={14} strokeWidth={2} />
          )}
          {nominee.verified ? 'Verified' : 'Pending verification'}
        </span>
      </Card>
    </section>
  )
}
