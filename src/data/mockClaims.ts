import { mockDashboardData } from './mockData'
import { isoDaysAgo } from '../lib/format'
import type { AccidentClaimSubmission, Claim, ClaimTimelineStep } from './types'

// Standing in for a future claims API. submitAccidentClaim() ~ POST
// /api/claims, fetchClaim() ~ GET /api/claims/:id. Both are already async
// and return promises the way a real fetch would, and useClaim() (see
// useClaim.ts) already polls fetchClaim() on an interval — so pointing
// these two functions at real endpoints is the only change needed for the
// Claims page to show live backend data, submission failures included.

const SIMULATED_LATENCY_MS = 350

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

function stepDate(incidentDateIso: string, offsetDays: number): string {
  const incident = new Date(incidentDateIso)
  const stepAt = new Date(incident)
  stepAt.setDate(stepAt.getDate() + offsetDays)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (stepAt > today ? today : stepAt).toISOString().slice(0, 10)
}

function buildTimeline(incidentDateIso: string): ClaimTimelineStep[] {
  return [
    {
      id: 'claim_submitted',
      label: 'Claim Submitted',
      status: 'complete',
      description: 'Accident claim received and logged against the policy.',
      date: stepDate(incidentDateIso, 0),
    },
    {
      id: 'hospital_verified',
      label: 'Hospital Verified',
      status: 'complete',
      description: 'Treating hospital confirmed admission and diagnosis.',
      date: stepDate(incidentDateIso, 1),
    },
    {
      id: 'police_verified',
      label: 'Police Verified',
      status: 'complete',
      description: 'First information report cross-checked with local authorities.',
      date: stepDate(incidentDateIso, 2),
    },
    {
      id: 'oracle_attestation',
      label: 'Oracle Attestation',
      status: 'complete',
      description: 'Independent data oracle attested to the reported incident.',
      date: stepDate(incidentDateIso, 3),
    },
    {
      id: 'sources_verified',
      label: '2 / 3 Sources Verified',
      status: 'complete',
      description: 'Hospital, police and oracle records cross-verified.',
      date: stepDate(incidentDateIso, 3),
    },
    {
      id: 'emergency_advance',
      label: 'Emergency Advance',
      status: 'complete',
      description: 'Advance released ahead of full verification to ease immediate costs.',
      date: stepDate(incidentDateIso, 4),
    },
    {
      id: 'stellar_settlement',
      label: 'Stellar Settlement',
      status: 'complete',
      description: 'Advance settled on-chain, giving this claim an auditable record.',
      date: stepDate(incidentDateIso, 4),
    },
    {
      id: 'final_verification',
      label: 'Final Verification',
      status: 'current',
      description: 'Remaining documentation is under final review.',
      date: null,
    },
    {
      id: 'final_payout',
      label: 'Final Payout',
      status: 'upcoming',
      description: 'Balance is released once final verification completes.',
      date: null,
    },
  ]
}

function buildAccidentClaim(id: string, input: AccidentClaimSubmission): Claim {
  const amount = 100000
  const emergencyAdvance = 10000
  const finalPayout = 90000
  const timeline = buildTimeline(input.incidentDate)
  const advanceSettledAt =
    timeline.find((step) => step.id === 'stellar_settlement')?.date ?? input.incidentDate

  return {
    id,
    type: 'accident',
    status: 'partially_paid',
    policyId: input.policyId,
    incidentDate: input.incidentDate,
    location: input.location,
    description: input.description,
    evidenceFiles: input.evidenceFiles,
    amount,
    currency: 'INR',
    emergencyAdvance,
    finalPayout,
    timeline,
    transactions: [
      {
        id: 'txn_1',
        label: 'Emergency Advance Settlement',
        amount: emergencyAdvance,
        reference: 'STLR-7FA1C9E0B3D4F6A2',
        network: 'Stellar',
        date: advanceSettledAt,
      },
    ],
  }
}

// In-memory stand-in for a claims table. Keyed by claim id so fetchClaim()
// has something to look up — a real backend replaces this Map entirely.
const claimStore = new Map<string, Claim>()

const demoSubmission: AccidentClaimSubmission = {
  policyId: mockDashboardData.policy.id,
  incidentDate: isoDaysAgo(4),
  location: 'MG Road, Bengaluru',
  description: 'Rear-ended at a signal; treated for minor whiplash at Apollo Hospital.',
  evidenceFiles: ['discharge_summary.pdf', 'fir_copy.pdf'],
}
claimStore.set('SC-48291', buildAccidentClaim('SC-48291', demoSubmission))

export async function submitAccidentClaim(input: AccidentClaimSubmission): Promise<Claim> {
  const claim = buildAccidentClaim('SC-48291', input)
  claimStore.set(claim.id, claim)
  return delay(claim)
}

export async function fetchClaim(claimId: string): Promise<Claim> {
  const claim = claimStore.get(claimId)
  if (!claim) {
    return Promise.reject(new Error(`Claim ${claimId} not found`))
  }
  return delay(claim)
}
