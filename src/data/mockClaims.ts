import { isoDaysAgo } from '../lib/format'
import type { AccidentClaimSubmission, Claim, ClaimTimelineStep } from './types'

// Standing in for a future POST /api/claims response. A real backend would
// return exactly this shape (or close to it) once verification is under
// way, so components read claim.timeline / claim.transactions rather than
// any status string — swapping this for a live claim record is a one-file
// change, same as the dashboard's mock data layer.

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

export function submitAccidentClaim(input: AccidentClaimSubmission): Claim {
  const amount = 100000
  const emergencyAdvance = 10000
  const finalPayout = 90000
  const timeline = buildTimeline(input.incidentDate)
  const advanceSettledAt = timeline.find((step) => step.id === 'stellar_settlement')?.date
    ?? input.incidentDate

  return {
    id: 'SC-48291',
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

export const defaultAccidentClaimSubmission: AccidentClaimSubmission = {
  policyId: '',
  incidentDate: isoDaysAgo(4),
  location: '',
  description: '',
  evidenceFiles: [],
}
