import { HeartPulse, Skull, Waves } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { PolicyCoverage } from '../../data/types'
import { formatCurrency } from '../../lib/format'

interface CoverageLine {
  key: keyof PolicyCoverage
  label: string
  icon: LucideIcon
}

const coverageLines: CoverageLine[] = [
  { key: 'accident', label: 'Accident cover', icon: HeartPulse },
  { key: 'death', label: 'Death cover', icon: Skull },
  { key: 'flood', label: 'Flood cover', icon: Waves },
]

export function CoverageGrid({
  coverage,
  currency,
}: {
  coverage: PolicyCoverage
  currency: string
}) {
  return (
    <section>
      <SectionHeading>Coverage breakdown</SectionHeading>
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-3">
        {coverageLines.map(({ key, label, icon: Icon }) => (
          <Card key={key} className="flex flex-col gap-[20px]">
            <Icon size={22} strokeWidth={1.75} className="text-brand-green-dark" />
            <div className="flex flex-col gap-[10px]">
              <span className="text-[15px] leading-[1.2] text-muted">{label}</span>
              <span className="text-[18px] leading-[1.1] tracking-[-0.03em]">
                {formatCurrency(coverage[key], currency)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
