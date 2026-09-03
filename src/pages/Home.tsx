import { CoverageGrid } from '../components/dashboard/CoverageGrid'
import { GreetingHeader } from '../components/dashboard/GreetingHeader'
import { NomineeCard } from '../components/dashboard/NomineeCard'
import { PolicySummaryCard } from '../components/dashboard/PolicySummaryCard'
import { QuickActions } from '../components/dashboard/QuickActions'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { useDashboardData } from '../data/useDashboardData'

export default function Home() {
  const { data } = useDashboardData()
  const { user, policy, nominee, recentActivity } = data

  return (
    <div className="flex flex-col gap-[40px]">
      <GreetingHeader user={user} />

      <QuickActions />

      <PolicySummaryCard policy={policy} />

      <CoverageGrid coverage={policy.coverage} currency={policy.currency} />

      <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <NomineeCard nominee={nominee} />
        <RecentActivity items={recentActivity} />
      </div>
    </div>
  )
}
