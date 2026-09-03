import { CheckCircle2, Circle, CircleDot } from 'lucide-react'

import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { ClaimTimelineStep } from '../../data/types'
import { formatDate } from '../../lib/format'

function StepIcon({ status }: { status: ClaimTimelineStep['status'] }) {
  if (status === 'complete') {
    return <CheckCircle2 size={22} strokeWidth={1.75} className="text-status-active" />
  }
  if (status === 'current') {
    return <CircleDot size={22} strokeWidth={1.75} className="text-status-warning" />
  }
  return <Circle size={22} strokeWidth={1.75} className="text-border" />
}

export function ClaimTimeline({ steps }: { steps: ClaimTimelineStep[] }) {
  return (
    <section>
      <SectionHeading>Verification timeline</SectionHeading>
      <Card className="p-0">
        <ol>
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1
            return (
              <li key={step.id} className="flex gap-[16px] px-[24px]">
                <div className="flex flex-col items-center">
                  <div className="pt-[20px]">
                    <StepIcon status={step.status} />
                  </div>
                  {!isLast && (
                    <span
                      className={`w-px flex-1 ${step.status === 'complete' ? 'bg-status-active' : 'bg-border'}`}
                    />
                  )}
                </div>
                <div className={`flex flex-1 flex-col gap-[4px] pt-[18px] ${isLast ? 'pb-[20px]' : 'pb-[24px]'}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-[10px]">
                    <span
                      className={`text-[15px] leading-[1.2] ${
                        step.status === 'upcoming' ? 'text-muted' : 'text-ink'
                      }`}
                    >
                      {step.label}
                    </span>
                    {step.date && (
                      <span className="text-[13px] leading-[1.2] text-muted">{formatDate(step.date)}</span>
                    )}
                  </div>
                  <span className="text-[13px] leading-[1.2] text-muted">{step.description}</span>
                </div>
              </li>
            )
          })}
        </ol>
      </Card>
    </section>
  )
}
