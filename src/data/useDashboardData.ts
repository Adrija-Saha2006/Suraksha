import { mockDashboardData } from './mockData'
import type { DashboardData } from './types'

interface DashboardDataResult {
  data: DashboardData
  isLoading: boolean
  error: null
}

/**
 * Single access point for dashboard data. Today it resolves the mock
 * dataset synchronously; swapping this body for a real API call
 * (e.g. React Query / SWR against `/api/dashboard`) is the only change
 * needed to move the whole page off mock data.
 */
export function useDashboardData(): DashboardDataResult {
  return {
    data: mockDashboardData,
    isLoading: false,
    error: null,
  }
}
