import { ShieldCheck } from 'lucide-react'

import { Card } from '../common/Card'

export function NoClaimRequiredNotice() {
  return (
    <Card className="flex flex-col gap-[10px] border-l-[3px] border-l-brand-green-dark">
      <div className="flex items-center gap-[10px]">
        <ShieldCheck size={22} strokeWidth={1.75} className="text-brand-green-dark" aria-hidden="true" />
        <span className="text-[18px] leading-[1.1] tracking-[-0.03em]">No individual claim required.</span>
      </div>
      <p className="max-w-[640px] text-[15px] leading-[1.2] text-muted">
        Parametric flood cover pays out automatically once a qualifying event is measured, confirmed and
        verified. Beneficiaries in the affected area do not need to file a claim, submit evidence, or wait
        on manual review — payout is triggered by the data itself.
      </p>
    </Card>
  )
}
