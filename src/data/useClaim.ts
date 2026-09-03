import { useEffect, useState } from 'react'

import { fetchClaim } from './mockClaims'
import type { Claim } from './types'

// How often the tracking view re-checks the claim while it's open. Once
// fetchClaim() hits a real endpoint, this is what makes verification
// steps (hospital/police/oracle/payout) appear on screen as they
// complete, without the user refreshing the page.
const POLL_INTERVAL_MS = 15000

interface ClaimResult {
  data: Claim | undefined
  isLoading: boolean
  error: Error | null
}

/**
 * Fetches a claim by id and keeps it fresh by polling. Today fetchClaim()
 * reads from an in-memory mock store; swapping it for a real
 * `GET /api/claims/:id` call is the only change needed — this hook's
 * polling loop, and every component that reads its `data`, stay the same.
 */
export function useClaim(claimId: string | undefined): ClaimResult {
  const [trackedClaimId, setTrackedClaimId] = useState(claimId)
  const [data, setData] = useState<Claim | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(Boolean(claimId))
  const [error, setError] = useState<Error | null>(null)

  // Reset state during render when claimId changes, rather than in an
  // effect — avoids an extra render pass, per React's guidance on
  // resetting state in response to a prop change.
  if (claimId !== trackedClaimId) {
    setTrackedClaimId(claimId)
    setData(undefined)
    setError(null)
    setIsLoading(Boolean(claimId))
  }

  useEffect(() => {
    if (!claimId) return
    const id = claimId

    let cancelled = false

    async function load(isInitial: boolean) {
      try {
        const claim = await fetchClaim(id)
        if (cancelled) return
        setData(claim)
        setError(null)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err : new Error('Failed to load claim'))
      } finally {
        if (!cancelled && isInitial) setIsLoading(false)
      }
    }

    load(true)
    const interval = setInterval(() => load(false), POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [claimId])

  return { data, isLoading, error }
}
