import { useEffect, useRef, useState } from 'react'

import type { DisasterFlowStep } from '../../data/types'

export type FloodStepStatus = 'upcoming' | 'active' | 'complete'
export type FloodSimulationPhase = 'idle' | 'running' | 'complete'

// Shared with FloodLevelGauge so the water animation and the step list
// read as one continuous sequence rather than two unrelated timers.
export const GAUGE_RISE_DURATION_MS = 1200
export const GAUGE_OVERFLOW_DELAY_MS = 900
export const GAUGE_OVERFLOW_DURATION_MS = 900

const STEP_GAP_MS = 900
const STEP_ACTIVE_TO_COMPLETE_MS = 650

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface FloodSimulationResult {
  phase: FloodSimulationPhase
  hasStarted: boolean
  start: () => void
  statusFor: (index: number) => FloodStepStatus
  activeStepLabel: string | null
}

/**
 * Drives the step-by-step replay animation on the Disaster page. Purely a
 * UI/interaction concern — the event data itself (src/data/mockDisasterEvent.ts)
 * already represents a fully verified, settled event; this hook just
 * paces out how it's revealed on screen.
 */
export function useFloodSimulation(steps: DisasterFlowStep[]): FloodSimulationResult {
  const [phase, setPhase] = useState<FloodSimulationPhase>('idle')
  const [completedCount, setCompletedCount] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1)
  const timeouts = useRef<number[]>([])

  function clearTimers() {
    timeouts.current.forEach((id) => window.clearTimeout(id))
    timeouts.current = []
  }

  useEffect(() => clearTimers, [])

  function start() {
    if (phase === 'running') return
    clearTimers()
    setPhase('running')
    setCompletedCount(0)
    setActiveIndex(-1)

    if (prefersReducedMotion()) {
      setActiveIndex(steps.length - 1)
      setCompletedCount(steps.length)
      setPhase('complete')
      return
    }

    steps.forEach((_, index) => {
      const activeAt = index * STEP_GAP_MS
      const completeAt = activeAt + STEP_ACTIVE_TO_COMPLETE_MS
      timeouts.current.push(window.setTimeout(() => setActiveIndex(index), activeAt))
      timeouts.current.push(window.setTimeout(() => setCompletedCount(index + 1), completeAt))
    })

    const totalMs = (steps.length - 1) * STEP_GAP_MS + STEP_ACTIVE_TO_COMPLETE_MS
    timeouts.current.push(window.setTimeout(() => setPhase('complete'), totalMs))
  }

  function statusFor(index: number): FloodStepStatus {
    if (index < completedCount) return 'complete'
    if (index === activeIndex) return 'active'
    return 'upcoming'
  }

  const activeStepLabel = activeIndex >= 0 ? (steps[activeIndex]?.label ?? null) : null

  return { phase, hasStarted: phase !== 'idle', start, statusFor, activeStepLabel }
}
