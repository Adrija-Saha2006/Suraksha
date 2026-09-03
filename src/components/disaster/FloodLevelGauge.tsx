import {
  GAUGE_OVERFLOW_DELAY_MS,
  GAUGE_OVERFLOW_DURATION_MS,
  GAUGE_RISE_DURATION_MS,
} from './useFloodSimulation'
import type { DisasterEvent } from '../../data/types'

const MAX_SCALE_MM = 500

interface FloodLevelGaugeProps {
  event: Pick<DisasterEvent, 'measuredLevel' | 'triggerThreshold' | 'unit'>
  hasStarted: boolean
}

export function FloodLevelGauge({ event, hasStarted }: FloodLevelGaugeProps) {
  const { measuredLevel, triggerThreshold, unit } = event
  const belowThresholdPct = (Math.min(measuredLevel, triggerThreshold) / MAX_SCALE_MM) * 100
  const aboveThresholdPct = (Math.max(measuredLevel - triggerThreshold, 0) / MAX_SCALE_MM) * 100
  const thresholdPct = (triggerThreshold / MAX_SCALE_MM) * 100

  return (
    <div className="flex flex-col gap-[10px]">
      <div
        className="relative h-[260px] w-full overflow-hidden border border-border bg-paper sm:h-[320px]"
        role="img"
        aria-label={`Water level gauge, ${
          hasStarted ? `currently ${measuredLevel} ${unit}` : 'at rest'
        }, trigger threshold ${triggerThreshold} ${unit}`}
      >
        {/* Trigger threshold marker */}
        <div
          className="absolute inset-x-0 z-10 border-t border-dashed border-status-danger"
          style={{ bottom: `${thresholdPct}%` }}
        >
          <span className="absolute right-[10px] -top-[22px] bg-paper px-[6px] text-[13px] leading-[1.2] text-status-danger">
            Trigger · {triggerThreshold} {unit}
          </span>
        </div>

        {/* Below-threshold fill */}
        <div
          className="absolute inset-x-0 bottom-0 bg-brand-green-dark/70 transition-[height] ease-out motion-reduce:transition-none"
          style={{
            height: hasStarted ? `${belowThresholdPct}%` : '0%',
            transitionDuration: `${GAUGE_RISE_DURATION_MS}ms`,
          }}
        />

        {/* Above-threshold fill — starts once the below segment has risen */}
        <div
          className="absolute inset-x-0 bg-status-danger/80 transition-[height] ease-out motion-reduce:transition-none"
          style={{
            height: hasStarted ? `${aboveThresholdPct}%` : '0%',
            bottom: `${thresholdPct}%`,
            transitionDuration: `${GAUGE_OVERFLOW_DURATION_MS}ms`,
            transitionDelay: `${GAUGE_OVERFLOW_DELAY_MS}ms`,
          }}
        />
      </div>

      <div className="flex items-center justify-between text-[13px] leading-[1.2] text-muted">
        <span>
          0 {unit}
        </span>
        <span>
          {MAX_SCALE_MM} {unit}
        </span>
      </div>
    </div>
  )
}
