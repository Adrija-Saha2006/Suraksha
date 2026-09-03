import { mockDashboardData } from './mockData'
import type { DashboardData } from './types'

interface DashboardDataResult {
  data: DashboardData | undefined
  isLoading: boolean
  error: Error | null
}

/**
 * Single access point for dashboard data. Today it resolves the mock
 * dataset synchronously; swapping this body for a real API call
 * (e.g. React Query / SWR against `/api/dashboard`) is the only change
 * needed to move the whole page off mock data — callers already handle
 * the loading/error states this shape implies.
 */
export function useDashboardData(): DashboardDataResult {
  return {
    data: mockDashboardData,
    isLoading: false,
    error: null,
  }
}
