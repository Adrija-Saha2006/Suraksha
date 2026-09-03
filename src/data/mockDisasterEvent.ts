import type { DisasterEvent, DisasterFlowStep } from './types'

// Nadia District is only the example shown until a location has actually
// been reported — see reportFloodLocation() below.
const DEFAULT_LOCATION = 'Nadia District'

const SIMULATED_LATENCY_MS = 300

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

// Static process copy, written generically (no restated figures) so it
// can't drift out of sync with the numbers shown elsewhere on the page.
const FLOW_STEPS: DisasterFlowStep[] = [
  {
    id: 'flood_detected',
    label: 'Flood detected',
    description: 'River gauge sensors in the affected district report a rising water level.',
  },
  {
    id: 'threshold_breached',
    label: 'Threshold breached',
    description: 'The measured level crosses the parametric trigger threshold.',
  },
  {
    id: 'oracle_verifies',
    label: 'Oracle verifies',
    description: 'An independent data oracle cross-checks the reading against secondary sources.',
  },
  {
    id: 'eligible_policies_identified',
    label: 'Eligible policies identified',
    description: 'Active flood policies in the affected district are matched automatically.',
  },
  {
    id: 'automatic_payouts_authorized',
    label: 'Automatic payouts authorized',
    description: 'Payout is authorized for release — no claims filed by beneficiaries.',
  },
  {
    id: 'settlement',
    label: 'Settlement',
    description: 'Payout is settled and recorded on Stellar for audit.',
  },
]

// Standing in for a future GET /api/disaster-events/current response.
// Every number and status the Disaster page renders — measured level,
// trigger threshold, eligible policy count, payout total, confirmation
// states — lives here, not in a component. Only `location` varies today
// (see reportFloodLocation); a real backend would vary the rest too, per
// whichever event is actually current.
function buildFloodEvent(location: string): DisasterEvent {
  return {
    id: 'EVT-FLD-2026-0091',
    type: 'flood',
    location,
    measuredLevel: 412,
    triggerThreshold: 350,
    unit: 'mm',
    secondaryConfirmation: true,
    oracleStatus: 'verified',
    eligiblePolicies: 247,
    totalPayoutAuthorized: 12350000,
    currency: 'INR',
    flow: FLOW_STEPS,
  }
}

// In-memory stand-in for "which location is currently being monitored" —
// set when a flood is reported via the Claims page's Flood flow. A real
// backend replaces this with a live feed of verified events.
let reportedLocation: string | null = null

// ~ POST /api/disaster-events/report. Async and latency-simulated like
// mockClaims.ts's submitAccidentClaim(), so the Claims page's Flood form
// already exercises a real submitting/error UI ahead of a live endpoint.
export async function reportFloodLocation(location: string): Promise<void> {
  reportedLocation = location
  await delay(undefined)
}

// ~ GET /api/disaster-events/current. Async and latency-simulated so
// useDisasterEvent() already exercises real loading/error states —
// pointing this at a real endpoint is the only change needed later.
export async function fetchCurrentFloodEvent(): Promise<DisasterEvent> {
  return delay(buildFloodEvent(reportedLocation ?? DEFAULT_LOCATION))
}
