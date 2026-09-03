import { AuditTransactions } from '../components/operations/AuditTransactions'
import { ClaimsTable } from '../components/operations/ClaimsTable'
import { KpiCards } from '../components/operations/KpiCards'
import { OperationsSkeleton } from '../components/operations/OperationsSkeleton'
import { OracleStatusCard } from '../components/operations/OracleStatusCard'
import { PayoutsTable } from '../components/operations/PayoutsTable'
import { TreasuryCard } from '../components/operations/TreasuryCard'
import { useOperationsData } from '../data/useOperationsData'
import { ComingSoon } from './ComingSoon'

export default function Operations() {
  const { data, isLoading, error } = useOperationsData()

  if (isLoading) return <OperationsSkeleton />

  if (error || !data) {
    return (
      <ComingSoon
        eyebrow="Unavailable"
        title="Couldn't load operations data"
        description="We weren't able to reach the operations service. Please refresh the page or try again shortly."
      />
    )
  }

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-heading font-normal tracking-[-0.03em]">Operations</h1>
        <p className="max-w-[560px] text-[15px] leading-[1.2] text-muted">
          Insurer control center — policy, claim, verification and settlement status across Arakis.
        </p>
      </div>

      <KpiCards kpis={data.kpis} />

      <ClaimsTable claims={data.claims} />

      <OracleStatusCard sources={data.oracleSources} claimId={data.claims[0]?.id ?? ''} />

      <PayoutsTable payouts={data.payouts} />

      <TreasuryCard treasury={data.treasury} />

      <AuditTransactions transactions={data.transactions} />
    </div>
  )
}
