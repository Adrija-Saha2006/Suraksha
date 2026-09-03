# SurakhsChain

Insurance/fintech dashboard for Suraksha. Built with React, TypeScript, Vite and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build   # type-checks and builds for production
npm run lint    # oxlint
```

## Structure

- `src/data` — the mock data layer (`types.ts` + a `mock*.ts`/`use*.ts` pair per domain: dashboard,
  claims, disaster events). Components never hardcode user/policy/claim/event values; they read through
  a `use*()` hook, so swapping the mock for a real API call is a one- or two-file change.
- `src/components/layout` — app shell: `Sidebar` (desktop), `BottomNav` (mobile), `AppLayout`.
- `src/components/common` — shared primitives (`Card`, `StatusPill`, `SectionHeading`, `Logo`).
- `src/components/dashboard` — Home page sections (greeting, policy summary, coverage breakdown,
  nominee, recent activity, quick actions).
- `src/components/claims` — claim type selector, Accident/Flood forms, claim tracking timeline and
  payout/settlement views.
- `src/components/disaster` — the Parametric Protection page: flood event card, payout summary, the
  animated water-level gauge, and the automated response step flow.
- `src/pages` — routed pages: `Home`, `Claims` + `ClaimTracking` (`/claims/:claimId`), `Disaster`,
  `Operations` (placeholder).

## Navigation

Home | Claims | Disaster | Operations — sidebar on desktop, bottom navigation on mobile. Home, Claims
and Disaster are fully built; Operations is a placeholder page ready for future work.

## Author

Adrija Saha — project owner and lead.
