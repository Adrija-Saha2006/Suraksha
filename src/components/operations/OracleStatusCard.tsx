import { CheckCircle2, Circle } from 'lucide-react'

import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import { StatusBadge } from './StatusBadge'
import type { OracleSource } from '../../data/types'
import { verificationLabel, verificationTone } from '../../lib/operations'

interface OracleStatusCardProps {
  sources: OracleSource[]
  claimId: string
}

export function OracleStatusCard({ sources, claimId }: OracleStatusCardProps) {
  const verifiedCount = sources.filter((source) => source.verified).length

  return (
    <section>
      <SectionHeading>Oracle</SectionHeading>
      <Card className="flex flex-col gap-[20px]">
        <span className="text-[13px] leading-[1.2] text-muted">
          Verification sources for claim {claimId}
        </span>

        <ul className="flex flex-col gap-[10px]">
          {sources.map((source) => (
            <li key={source.id} className="flex items-center gap-[10px] text-[15px] leading-[1.2]">
              {source.verified ? (
                <CheckCircle2 size={18} strokeWidth={1.75} className="text-status-active" aria-hidden="true" />
              ) : (
                <Circle size={18} strokeWidth={1.75} className="text-border" aria-hidden="true" />
              )}
              {source.name}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[10px]">
          <span className="text-[15px] leading-[1.2] text-muted">Verification:</span>
          <StatusBadge tone={verificationTone(verifiedCount, sources.length)}>
            {verificationLabel(verifiedCount, sources.length)}
          </StatusBadge>
        </div>
      </Card>
    </section>
  )
}
