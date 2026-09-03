// Shape of the data this dashboard renders. Mirrors the future backend/API
// response so the UI can be pointed at a real endpoint without changes.

export interface DashboardUser {
  id: string
  name: string
  firstName: string
}

export type PolicyStatus = 'active' | 'expiring_soon' | 'expired' | 'pending'

export interface PolicyCoverage {
  accident: number
  death: number
  flood: number
}

export interface Policy {
  id: string
  planName: string
  totalCoverage: number
  status: PolicyStatus
  expiry: string // ISO date
  startDate: string // ISO date
  currency: string
  coverage: PolicyCoverage
}

export interface Nominee {
  name: string
  relationship: string
  verified: boolean
}

export type ActivityType =
  | 'payment'
  | 'claim'
  | 'document'
  | 'policy'
  | 'nominee'

export interface ActivityItem {
  id: string
  type: ActivityType
  title: string
  description: string
  date: string // ISO date
}

export interface DashboardData {
  user: DashboardUser
  policy: Policy
  nominee: Nominee
  recentActivity: ActivityItem[]
}
