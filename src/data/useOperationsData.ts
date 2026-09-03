import { useEffect, useState } from 'react'

import { fetchOperationsData } from './mockOperations'
import type { OperationsData } from './types'

interface OperationsDataResult {
  data: OperationsData | undefined
  isLoading: boolean
  error: Error | null
}

/**
 * Single access point for the Operations dashboard. Fetches once on
 * mount via fetchOperationsData() — swapping that function's body for a
 * real `GET /api/operations/dashboard` call is the only change needed
 * once a backend exists; this hook's loading/error handling already
 * matches what a real fetch needs, same pattern as useDashboardData/
 * useClaim/useDisasterEvent.
 */
export function useOperationsData(): OperationsDataResult {
  const [data, setData] = useState<OperationsData | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchOperationsData()
      .then((result) => {
        if (cancelled) return
        setData(result)
        setError(null)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err : new Error('Failed to load operations data'))
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
