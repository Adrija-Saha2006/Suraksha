import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { Claim } from '../../data/types'
import { formatDate } from '../../lib/format'

export function ClaimIncidentSummary({ claim }: { claim: Claim }) {
  return (
    <section>
      <SectionHeading>What happened</SectionHeading>
      <Card className="flex flex-col gap-[20px]">
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
          <div className="flex flex-col gap-[4px]">
            <span className="text-[13px] leading-[1.2] text-muted">Policy</span>
            <span className="text-[15px] leading-[1.2]">{claim.policyId}</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span className="text-[13px] leading-[1.2] text-muted">Date</span>
            <span className="text-[15px] leading-[1.2]">{formatDate(claim.incidentDate)}</span>
          </div>
          <div className="flex flex-col gap-[4px] sm:col-span-2">
            <span className="text-[13px] leading-[1.2] text-muted">Location</span>
            <span className="text-[15px] leading-[1.2]">{claim.location}</span>
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] leading-[1.2] text-muted">Description</span>
          <p className="text-[15px] leading-[1.2] text-ink">{claim.description}</p>
        </div>

        {claim.evidenceFiles.length > 0 && (
          <div className="flex flex-col gap-[4px]">
            <span className="text-[13px] leading-[1.2] text-muted">Evidence</span>
            <span className="text-[15px] leading-[1.2]">
              {claim.evidenceFiles.length} file{claim.evidenceFiles.length > 1 ? 's' : ''} attached
            </span>
          </div>
        )}
      </Card>
    </section>
  )
}
