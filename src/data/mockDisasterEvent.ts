import type { DisasterEvent } from './types'

// Standing in for a future GET /api/disaster-events/:id response. Every
// number and status the Disaster page renders — measured level, trigger
// threshold, eligible policy count, payout total, confirmation states —
// lives here, not in a component. Flow step copy is written generically
// (no restated figures) so it can't drift out of sync with the numbers
// above it.
export const mockFloodEvent: DisasterEvent = {
  id: 'EVT-FLD-2026-0091',
  type: 'flood',
  location: 'Nadia District',
  measuredLevel: 412,
  triggerThreshold: 350,
  unit: 'mm',
  secondaryConfirmation: true,
  oracleStatus: 'verified',
  eligiblePolicies: 247,
  totalPayoutAuthorized: 12350000,
  currency: 'INR',
  flow: [
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
  ],
}
