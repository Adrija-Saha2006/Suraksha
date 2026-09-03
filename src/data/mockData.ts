import type { DashboardData } from './types'

// Placeholder data standing in for a future GET /api/dashboard response.
// Every value a component needs must live here — never inline in a
// component — so swapping this for a real fetch is a one-file change.
export const mockDashboardData: DashboardData = {
  user: {
    id: 'usr_8841',
    name: 'Priya Sharma',
    firstName: 'Priya',
  },
  policy: {
    id: 'ARK-2025-9931',
    planName: 'Arakis Complete Cover',
    totalCoverage: 2500000,
    status: 'active',
    expiry: '2027-04-18',
    startDate: '2026-04-18',
    currency: 'INR',
    coverage: {
      accident: 1000000,
      death: 1000000,
      flood: 500000,
    },
  },
  nominee: {
    name: 'Rohan Sharma',
    relationship: 'Spouse',
    verified: true,
  },
  recentActivity: [
    {
      id: 'act_1',
      type: 'payment',
      title: 'Premium paid',
      description: 'Quarterly premium of ₹3,250 received',
      date: '2026-08-18',
    },
    {
      id: 'act_2',
      type: 'document',
      title: 'Policy document updated',
      description: 'Coverage schedule reissued after renewal',
      date: '2026-07-02',
    },
    {
      id: 'act_3',
      type: 'nominee',
      title: 'Nominee verified',
      description: 'Rohan Sharma completed KYC verification',
      date: '2026-05-27',
    },
    {
      id: 'act_4',
      type: 'policy',
      title: 'Policy activated',
      description: 'Arakis Complete Cover went into effect',
      date: '2026-04-18',
    },
  ],
}
