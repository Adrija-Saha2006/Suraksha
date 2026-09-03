import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { AccidentClaimForm } from '../components/claims/AccidentClaimForm'
import { ClaimHeader } from '../components/claims/ClaimHeader'
import { ClaimIncidentSummary } from '../components/claims/ClaimIncidentSummary'
import { ClaimPayoutSummary } from '../components/claims/ClaimPayoutSummary'
import { ClaimTimeline } from '../components/claims/ClaimTimeline'
import { ClaimTransactions } from '../components/claims/ClaimTransactions'
import { ClaimTypeComingSoon } from '../components/claims/ClaimTypeComingSoon'
import { ClaimTypeSelector } from '../components/claims/ClaimTypeSelector'
import { SectionHeading } from '../components/common/SectionHeading'
import { submitAccidentClaim } from '../data/mockClaims'
import type { AccidentClaimSubmission, Claim, ClaimType } from '../data/types'
import { claimTypeLabels, isClaimType } from '../lib/claims'

export default function Claims() {
  const [searchParams] = useSearchParams()
  const requestedType = searchParams.get('type')

  const [claimType, setClaimType] = useState<ClaimType | null>(
    isClaimType(requestedType) ? requestedType : null,
  )
  const [claim, setClaim] = useState<Claim | null>(null)

  function handleAccidentSubmit(input: AccidentClaimSubmission) {
    setClaim(submitAccidentClaim(input))
  }

  function handleFileAnother() {
    setClaim(null)
    setClaimType(null)
  }

  if (claim) {
    return (
      <div className="flex flex-col gap-[40px]">
        <ClaimHeader claim={claim} />
        <ClaimIncidentSummary claim={claim} />
        <ClaimTimeline steps={claim.timeline} />
        <ClaimPayoutSummary claim={claim} />
        <ClaimTransactions transactions={claim.transactions} currency={claim.currency} />
        <button
          type="button"
          onClick={handleFileAnother}
          className="inline-flex w-fit items-center justify-center rounded-full border border-ink px-[20px] py-[10px] text-[15px] leading-[1.2] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          File another claim
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-heading font-normal tracking-[-0.03em]">File a claim</h1>
        <p className="max-w-[520px] text-[15px] leading-[1.2] text-muted">
          Tell us what happened. Accident claims release an emergency advance automatically once
          verified.
        </p>
      </div>

      <section>
        <SectionHeading>What happened?</SectionHeading>
        <ClaimTypeSelector value={claimType} onChange={setClaimType} />
      </section>

      {claimType === 'accident' && <AccidentClaimForm onSubmit={handleAccidentSubmit} />}
      {claimType && claimType !== 'accident' && (
        <ClaimTypeComingSoon label={claimTypeLabels[claimType]} />
      )}
    </div>
  )
}
