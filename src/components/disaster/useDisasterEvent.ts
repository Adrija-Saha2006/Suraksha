import { useState } from 'react'

import { getCurrentFloodEvent } from '../../data/mockDisasterEvent'
import type { DisasterEvent } from '../../data/types'

interface DisasterEventResult {
  data: DisasterEvent
  isLoading: boolean
  error: null
}

/**
 * Single access point for the current disaster event. Reads whichever
 * location was most recently reported via the Claims page's Flood flow,
 * captured once at mount (a fresh navigation to /disaster mounts this
 * again, picking up any newly reported location). Swapping this for a
 * real `GET /api/disaster-events/current` call is the only change needed
 * once a backend exists.
 */
export function useDisasterEvent(): DisasterEventResult {
  const [data] = useState<DisasterEvent>(() => getCurrentFloodEvent())
  return { data, isLoading: false, error: null }
}
