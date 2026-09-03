import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AccidentClaimForm } from '../components/claims/AccidentClaimForm'
import { ClaimTypeComingSoon } from '../components/claims/ClaimTypeComingSoon'
import { ClaimTypeSelector } from '../components/claims/ClaimTypeSelector'
import { FloodClaimForm } from '../components/claims/FloodClaimForm'
import { SectionHeading } from '../components/common/SectionHeading'
import { submitAccidentClaim } from '../data/mockClaims'
import { reportFloodLocation } from '../data/mockDisasterEvent'
import type { AccidentClaimSubmission, ClaimType } from '../data/types'
import { claimTypeLabels, isClaimType } from '../lib/claims'

export default function Claims() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const requestedType = searchParams.get('type')

  const [claimType, setClaimType] = useState<ClaimType | null>(
    isClaimType(requestedType) ? requestedType : null,
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleAccidentSubmit(input: AccidentClaimSubmission) {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const claim = await submitAccidentClaim(input)
      navigate(`/claims/${claim.id}`)
    } catch {
      setSubmitError('Something went wrong submitting your claim. Please try again.')
      setIsSubmitting(false)
    }
  }

  function handleFloodSubmit(location: string) {
    reportFloodLocation(location)
    navigate('/disaster')
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

      {claimType === 'accident' && (
        <AccidentClaimForm
          onSubmit={handleAccidentSubmit}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}
      {claimType === 'flood' && <FloodClaimForm onSubmit={handleFloodSubmit} />}
      {claimType === 'death' && <ClaimTypeComingSoon label={claimTypeLabels.death} />}
    </div>
  )
}
