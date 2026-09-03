import { CheckCircle2, CircleDashed } from 'lucide-react'

import { Card } from '../common/Card'
import type { DisasterEvent } from '../../data/types'

function ConfirmationBadge({ active, activeLabel, pendingLabel }: { active: boolean; activeLabel: string; pendingLabel: string }) {
  return (
    <span
      className={`inline-flex items-center gap-[6px] rounded-full px-[12px] py-[4px] text-[13px] leading-[1.2] ${
        active ? 'bg-status-active-bg text-status-active' : 'bg-status-warning-bg text-status-warning'
      }`}
    >
      {active ? (
        <CheckCircle2 size={14} strokeWidth={2} aria-hidden="true" />
      ) : (
        <CircleDashed size={14} strokeWidth={2} aria-hidden="true" />
      )}
      {active ? activeLabel : pendingLabel}
    </span>
  )
}

export function FloodEventCard({ event }: { event: DisasterEvent }) {
  const eventTypeLabel = `${event.type.charAt(0).toUpperCase()}${event.type.slice(1)} event`

  return (
    <Card className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[4px]">
        <span className="text-[15px] leading-[1.2] text-muted">{eventTypeLabel}</span>
        <span className="text-[18px] leading-[1.1] tracking-[-0.03em]">{event.location}</span>
      </div>

      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] leading-[1.2] text-muted">Measured level</span>
          <span className="text-subheading font-normal tracking-[-0.03em]">
            {event.measuredLevel} {event.unit}
          </span>
        </div>
        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] leading-[1.2] text-muted">Trigger threshold</span>
          <span className="text-subheading font-normal tracking-[-0.03em]">
            {event.triggerThreshold} {event.unit}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-[10px]">
        <ConfirmationBadge
          active={event.secondaryConfirmation}
          activeLabel="Secondary confirmation confirmed"
          pendingLabel="Secondary confirmation pending"
        />
        <ConfirmationBadge
          active={event.oracleStatus === 'verified'}
          activeLabel="Oracle status verified"
          pendingLabel="Oracle status pending"
        />
      </div>
    </Card>
  )
}
