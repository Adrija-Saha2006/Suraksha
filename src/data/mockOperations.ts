import { getClaimSnapshot } from './mockClaims'
import { isoDaysAgo } from '../lib/format'
import type { Claim, ClaimStatus, OperationsClaim, OperationsClaimStatus, OperationsData } from './types'

const SIMULATED_LATENCY_MS = 300

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

// Standing in for a future GET /api/operations/dashboard response.
//
// SC-48291's claims-table row, payout rows and audit transaction are
// *derived* from the same claim record the Claims page reads/writes
// (mockClaims.ts's claimStore), not retyped copies — resubmitting that
// claim changes what Operations shows too, the same way two services
// reading one backend database would stay in sync. Everything else here
// (the other two demo claims, oracle sources, treasury, KPIs) represents
// records this single-claim demo never lets you submit through the UI,
// so it's static illustrative data with no live source to derive from.
//
// fetchOperationsData() is a function, not a static export, so every
// call re-reads the current claim snapshot instead of freezing it at
// module load.

const claimStatusToOperationsStatus: Record<ClaimStatus, OperationsClaimStatus> = {
  submitted: 'pending',
  in_verification: 'pending',
  partially_paid: 'advance_paid',
  settled: 'paid',
  rejected: 'rejected',
}

// Oracle sources are the source of truth for how many of the 3 admin
// verification checks have cleared — the claims-table "2/3 VERIFIED"
// badge is computed from this, not a second hardcoded count.
const oracleSources = [
  { id: 'hospital', name: 'Hospital', verified: true },
  { id: 'police', name: 'Police', verified: true },
  { id: 'civil_registry', name: 'Civil Registry', verified: false },
]
const verifiedSourceCount = oracleSources.filter((source) => source.verified).length

function toFeaturedClaimRow(claim: Claim): OperationsClaim {
  return {
    id: claim.id,
    type: claim.type,
    amount: claim.amount,
    currency: claim.currency,
    verifiedCount: verifiedSourceCount,
    totalSources: oracleSources.length,
    status: claimStatusToOperationsStatus[claim.status],
  }
}

const otherClaims: OperationsClaim[] = [
  {
    id: 'SC-48292',
    type: 'death',
    amount: 200000,
    currency: 'INR',
    verifiedCount: 0,
    totalSources: 3,
    status: 'pending',
  },
  {
    id: 'SC-48293',
    type: 'flood',
    amount: 50000,
    currency: 'INR',
    verifiedCount: 3,
    totalSources: 3,
    status: 'paid',
  },
]

// ~ GET /api/operations/dashboard. Async and latency-simulated so
// useOperationsData() already exercises real loading/error states —
// pointing this at a real endpoint is the only change needed later.
export async function fetchOperationsData(): Promise<OperationsData> {
  const featuredClaim = getClaimSnapshot('SC-48291')
  const advanceSettlement = featuredClaim?.transactions.find((txn) => txn.label.includes('Advance'))

  return delay({
    kpis: {
      activePolicies: 12482,
      activeClaims: 38,
      awaitingVerification: 12,
      todaysPayouts: 420000,
      treasuryBalance: 2840000,
      currency: 'INR',
    },
    claims: featuredClaim ? [toFeaturedClaimRow(featuredClaim), ...otherClaims] : otherClaims,
    oracleSources,
    payouts: featuredClaim
      ? [
          {
            id: 'payout_sc48291_advance',
            claimId: featuredClaim.id,
            amount: featuredClaim.emergencyAdvance,
            currency: featuredClaim.currency,
            funding: 'funded',
            stellarStatus: 'confirmed',
            stellarReference: advanceSettlement?.reference ?? null,
            status: 'paid',
          },
          {
            id: 'payout_sc48291_final',
            claimId: featuredClaim.id,
            amount: featuredClaim.finalPayout,
            currency: featuredClaim.currency,
            funding: 'pending',
            stellarStatus: 'pending',
            stellarReference: null,
            status: 'pending',
          },
        ]
      : [],
    treasury: {
      availableBalance: 2140000,
      reservedBalance: 700000,
      currency: 'INR',
      fundingProvider: 'Regulated banking partner',
      pendingFunding: featuredClaim?.finalPayout ?? 0,
    },
    transactions: [
      ...(featuredClaim && advanceSettlement
        ? [
            {
              id: 'txn_sc48291_advance',
              claimId: featuredClaim.id,
              amount: advanceSettlement.amount,
              currency: featuredClaim.currency,
              network: advanceSettlement.network,
              status: 'confirmed' as const,
              reference: advanceSettlement.reference,
              date: advanceSettlement.date,
            },
          ]
        : []),
      {
        id: 'txn_sc48293_payout',
        claimId: 'SC-48293',
        amount: 50000,
        currency: 'INR',
        network: 'Stellar',
        status: 'confirmed',
        reference: 'STLR-2C6B90E4D1A7F3859B',
        date: isoDaysAgo(3),
      },
    ],
  })
}
