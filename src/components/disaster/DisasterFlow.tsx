import { CheckCircle2, Circle, CircleDot } from 'lucide-react'

import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { DisasterFlowStep } from '../../data/types'
import type { FloodStepStatus } from './useFloodSimulation'

function StepIcon({ status }: { status: FloodStepStatus }) {
  if (status === 'complete') {
    return <CheckCircle2 size={22} strokeWidth={1.75} className="text-status-active" aria-hidden="true" />
  }
  if (status === 'active') {
    return (
      <CircleDot
        size={22}
        strokeWidth={1.75}
        className="animate-pulse text-status-warning motion-reduce:animate-none"
        aria-hidden="true"
      />
    )
  }
  return <Circle size={22} strokeWidth={1.75} className="text-border" aria-hidden="true" />
}

interface DisasterFlowProps {
  steps: DisasterFlowStep[]
  statusFor: (index: number) => FloodStepStatus
  activeStepLabel: string | null
}

export function DisasterFlow({ steps, statusFor, activeStepLabel }: DisasterFlowProps) {
  return (
    <section>
      <SectionHeading>Automated response</SectionHeading>
      <span className="sr-only" aria-live="polite">
        {activeStepLabel ? `Now processing: ${activeStepLabel}` : ''}
      </span>
      <Card className="p-0">
        <ol>
          {steps.map((step, index) => {
            const status = statusFor(index)
            const isLast = index === steps.length - 1
            return (
              <li key={step.id} className="flex gap-[16px] px-[24px]">
                <div className="flex flex-col items-center">
                  <div className="pt-[20px]">
                    <StepIcon status={status} />
                  </div>
                  {!isLast && (
                    <span
                      className={`w-px flex-1 transition-colors duration-500 ${
                        status === 'complete' ? 'bg-status-active' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
                <div className={`flex flex-1 flex-col gap-[4px] pt-[18px] ${isLast ? 'pb-[20px]' : 'pb-[24px]'}`}>
                  <span
                    className={`text-[15px] leading-[1.2] transition-colors ${
                      status === 'upcoming' ? 'text-muted' : 'text-ink'
                    }`}
                  >
                    {step.label}
                  </span>
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
