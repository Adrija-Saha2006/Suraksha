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

// --- Claims -----------------------------------------------------------

export type ClaimType = 'accident' | 'death' | 'flood'

export type ClaimStatus =
  | 'submitted'
  | 'in_verification'
  | 'partially_paid'
  | 'settled'
  | 'rejected'

export type ClaimStepStatus = 'complete' | 'current' | 'upcoming'

export interface ClaimTimelineStep {
  id: string
  label: string
  status: ClaimStepStatus
  description: string
  date: string | null // ISO date once the step completes, else null
}

export interface ClaimTransaction {
  id: string
  label: string
  amount: number
  reference: string
  network: string
  date: string // ISO date
}

export interface Claim {
  id: string
  type: ClaimType
  status: ClaimStatus
  policyId: string
  incidentDate: string // ISO date
  location: string
  description: string
  evidenceFiles: string[]
  amount: number
  currency: string
  emergencyAdvance: number
  finalPayout: number
  timeline: ClaimTimelineStep[]
  transactions: ClaimTransaction[]
}

export interface AccidentClaimSubmission {
  policyId: string
  incidentDate: string
  location: string
  description: string
  evidenceFiles: string[]
}

// --- Disaster / parametric protection ----------------------------------

export type DisasterEventType = 'flood'

export type OracleStatus = 'verified' | 'pending'

export interface DisasterFlowStep {
  id: string
  label: string
  description: string
}

export interface DisasterEvent {
  id: string
  type: DisasterEventType
  location: string
  measuredLevel: number
  triggerThreshold: number
  unit: string
  secondaryConfirmation: boolean
  oracleStatus: OracleStatus
  eligiblePolicies: number
  totalPayoutAuthorized: number
  currency: string
  flow: DisasterFlowStep[]
}

// --- Operations (insurer/admin control center) --------------------------

export interface OperationsKpis {
  activePolicies: number
  activeClaims: number
  awaitingVerification: number
  todaysPayouts: number
  treasuryBalance: number
  currency: string
}

export type OperationsClaimStatus = 'advance_paid' | 'pending' | 'paid' | 'rejected'

export interface OperationsClaim {
  id: string
  type: ClaimType
  amount: number
  currency: string
  verifiedCount: number
  totalSources: number
  status: OperationsClaimStatus
}

export interface OracleSource {
  id: string
  name: string
  verified: boolean
}

export type FundingStatus = 'funded' | 'pending'
export type StellarSettlementStatus = 'confirmed' | 'pending'
export type PayoutStatus = 'paid' | 'pending'

export interface Payout {
  id: string
  claimId: string
  amount: number
  currency: string
  funding: FundingStatus
  stellarStatus: StellarSettlementStatus
  stellarReference: string | null
  status: PayoutStatus
}

export interface Treasury {
  availableBalance: number
  reservedBalance: number
  currency: string
  fundingProvider: string
  pendingFunding: number
}

export interface AuditTransaction {
  id: string
  claimId: string
  amount: number
  currency: string
  network: string
  status: StellarSettlementStatus
  reference: string
  date: string // ISO date
}

export interface OperationsData {
  kpis: OperationsKpis
  claims: OperationsClaim[]
  oracleSources: OracleSource[]
  payouts: Payout[]
  treasury: Treasury
  transactions: AuditTransaction[]
}
