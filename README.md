# Arakis

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

- `src/data` — the mock data layer (`types.ts`, `mockData.ts`, `useDashboardData.ts`). Components never
  hardcode user/policy values; they read from `useDashboardData()`, so swapping the mock for a real API
  call is a one-file change.
- `src/components/layout` — app shell: `Sidebar` (desktop), `BottomNav` (mobile), `AppLayout`.
- `src/components/dashboard` — Home page sections (greeting, policy summary, coverage breakdown,
  nominee, recent activity, quick actions).
- `src/components/common` — shared primitives (`Card`, `StatusPill`, `SectionHeading`, `Logo`).
- `src/pages` — routed pages: `Home` (built out), `Claims` / `Disaster` / `Operations` (stubs).

## Navigation

Home | Claims | Disaster | Operations — sidebar on desktop, bottom navigation on mobile. Only Home is
fully built; the others are placeholder pages ready for future work.
