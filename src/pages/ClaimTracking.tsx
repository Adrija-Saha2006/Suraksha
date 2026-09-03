import { Link, useParams } from 'react-router-dom'

import { ClaimHeader } from '../components/claims/ClaimHeader'
import { ClaimIncidentSummary } from '../components/claims/ClaimIncidentSummary'
import { ClaimPayoutSummary } from '../components/claims/ClaimPayoutSummary'
import { ClaimTimeline } from '../components/claims/ClaimTimeline'
import { ClaimTrackingSkeleton } from '../components/claims/ClaimTrackingSkeleton'
import { ClaimTransactions } from '../components/claims/ClaimTransactions'
import { useClaim } from '../data/useClaim'
import { ComingSoon } from './ComingSoon'

export default function ClaimTracking() {
  const { claimId } = useParams<{ claimId: string }>()
  const { data: claim, isLoading, error } = useClaim(claimId)

  if (isLoading) return <ClaimTrackingSkeleton />

  if (error || !claim) {
    return (
      <ComingSoon
        eyebrow="Not found"
        title="Claim not found"
        description="We couldn't find that claim. It may have been submitted in a different session — file a new one to see the tracking flow."
      />
    )
  }

  return (
    <div className="flex flex-col gap-[40px]">
      <ClaimHeader claim={claim} />
      <ClaimIncidentSummary claim={claim} />
      <ClaimTimeline steps={claim.timeline} />
      <ClaimPayoutSummary claim={claim} />
      <ClaimTransactions transactions={claim.transactions} currency={claim.currency} />
      <Link
        to="/claims"
        className="inline-flex w-fit items-center justify-center rounded-full border border-ink px-[20px] py-[10px] text-[15px] leading-[1.2] text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        File another claim
      </Link>
    </div>
  )
}
