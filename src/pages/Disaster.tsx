import { CheckCircle2 } from 'lucide-react'

import { Card } from '../components/common/Card'
import { SectionHeading } from '../components/common/SectionHeading'
import { DisasterFlow } from '../components/disaster/DisasterFlow'
import { DisasterSkeleton } from '../components/disaster/DisasterSkeleton'
import { FloodEventCard } from '../components/disaster/FloodEventCard'
import { FloodLevelGauge } from '../components/disaster/FloodLevelGauge'
import { NoClaimRequiredNotice } from '../components/disaster/NoClaimRequiredNotice'
import { ParametricPayoutSummary } from '../components/disaster/ParametricPayoutSummary'
import { useDisasterEvent } from '../components/disaster/useDisasterEvent'
import { useFloodSimulation } from '../components/disaster/useFloodSimulation'
import { formatCurrency } from '../lib/format'
import { ComingSoon } from './ComingSoon'

export default function Disaster() {
  const { data: event, isLoading, error } = useDisasterEvent()
  const { phase, hasStarted, start, statusFor, activeStepLabel } = useFloodSimulation(event?.flow ?? [])

  if (isLoading) return <DisasterSkeleton />

  if (error || !event) {
    return (
      <ComingSoon
        eyebrow="Unavailable"
        title="Couldn't load this event"
        description="We weren't able to reach the disaster monitoring service. Please refresh the page or try again shortly."
      />
    )
  }

  const buttonLabel =
    phase === 'running' ? 'Simulating…' : phase === 'complete' ? 'Simulate again' : 'Simulate Flood Event'

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-heading font-normal uppercase tracking-[-0.03em]">Parametric Protection</h1>
        <p className="max-w-[560px] text-[15px] leading-[1.2] text-muted">
          Flood cover for {event.location} settles automatically when independently verified sensor and
          oracle data confirm a qualifying event — no paperwork, no waiting.
        </p>
      </div>

      <FloodEventCard event={event} />

      <ParametricPayoutSummary event={event} />

      <section className="flex flex-col gap-[20px]">
        <SectionHeading>Simulate flood event</SectionHeading>
        <p className="max-w-[640px] text-[15px] leading-[1.2] text-muted">
          Replay how this event was detected, verified and settled automatically.
        </p>

        <button
          type="button"
          onClick={start}
          disabled={phase === 'running'}
          className="inline-flex w-fit items-center justify-center rounded-full border border-ink bg-ink px-[24px] py-[10px] text-[15px] leading-[1.2] text-paper transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {buttonLabel}
        </button>

        <FloodLevelGauge event={event} hasStarted={hasStarted} />
      </section>

      <DisasterFlow steps={event.flow} statusFor={statusFor} activeStepLabel={activeStepLabel} />

      <NoClaimRequiredNotice />

      {phase === 'complete' && (
        <Card className="flex flex-col gap-[10px] border-l-[3px] border-l-status-active">
          <div className="flex items-center gap-[10px]">
            <CheckCircle2 size={22} strokeWidth={1.75} className="text-status-active" aria-hidden="true" />
            <span className="text-[18px] leading-[1.1] tracking-[-0.03em]">
              Event qualifies for automatic parametric payout
            </span>
          </div>
          <p className="max-w-[640px] text-[15px] leading-[1.2] text-muted">
            {formatCurrency(event.totalPayoutAuthorized, event.currency)} authorized across{' '}
            {event.eligiblePolicies.toLocaleString('en-IN')} policies in {event.location}. Settlement is
            recorded on Stellar for audit — no individual claim required.
          </p>
        </Card>
      )}
    </div>
  )
}
