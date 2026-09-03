import { Card } from '../common/Card'
import type { OperationsKpis } from '../../data/types'
import { formatCompactINR } from '../../lib/format'

interface KpiLine {
  key: keyof OperationsKpis
  label: string
  value: (kpis: OperationsKpis) => string
}

const kpiLines: KpiLine[] = [
  {
    key: 'activePolicies',
    label: 'Active Policies',
    value: (kpis) => kpis.activePolicies.toLocaleString('en-IN'),
  },
  {
    key: 'activeClaims',
    label: 'Active Claims',
    value: (kpis) => kpis.activeClaims.toLocaleString('en-IN'),
  },
  {
    key: 'awaitingVerification',
    label: 'Awaiting Verification',
    value: (kpis) => kpis.awaitingVerification.toLocaleString('en-IN'),
  },
  {
    key: 'todaysPayouts',
    label: "Today's Payouts",
    value: (kpis) => formatCompactINR(kpis.todaysPayouts),
  },
  {
    key: 'treasuryBalance',
    label: 'Treasury Balance',
    value: (kpis) => formatCompactINR(kpis.treasuryBalance),
  },
]

export function KpiCards({ kpis }: { kpis: OperationsKpis }) {
  return (
    <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 lg:grid-cols-5">
      {kpiLines.map(({ key, label, value }) => (
        <Card key={key} className="flex flex-col gap-[10px]">
          <span className="text-[13px] leading-[1.2] text-muted">{label}</span>
          <span className="text-subheading font-normal tracking-[-0.03em]">{value(kpis)}</span>
        </Card>
      ))}
    </div>
  )
}
