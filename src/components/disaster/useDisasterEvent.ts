import { useEffect, useState } from 'react'

import { fetchCurrentFloodEvent } from '../../data/mockDisasterEvent'
import type { DisasterEvent } from '../../data/types'

interface DisasterEventResult {
  data: DisasterEvent | undefined
  isLoading: boolean
  error: Error | null
}

/**
 * Single access point for the current disaster event. Fetches once on
 * mount via fetchCurrentFloodEvent() (which already reads whichever
 * location was most recently reported via the Claims page's Flood flow)
 * — swapping that function's body for a real
 * `GET /api/disaster-events/current` call is the only change needed
 * once a backend exists; this hook's loading/error handling already
 * matches what a real fetch needs.
 */
export function useDisasterEvent(): DisasterEventResult {
  const [data, setData] = useState<DisasterEvent | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchCurrentFloodEvent()
      .then((event) => {
        if (cancelled) return
        setData(event)
        setError(null)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err : new Error('Failed to load disaster event'))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, isLoading, error }
}
