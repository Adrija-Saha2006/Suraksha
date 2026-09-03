import type { DashboardUser } from '../../data/types'
import { getGreeting } from '../../lib/format'

export function GreetingHeader({ user }: { user: DashboardUser }) {
  return (
    <div className="border border-ink bg-ink px-[24px] py-[30px] text-paper md:px-[40px] md:py-[40px]">
      <p className="text-[18px] leading-[1.1] text-paper/70">{getGreeting()},</p>
      <h1 className="mt-[10px] text-heading font-normal tracking-[-0.03em]">
        {user.firstName}
      </h1>
      <p className="mt-[10px] max-w-[440px] text-[15px] leading-[1.2] text-paper/60">
        Here is where your coverage, nominee and recent activity stand today.
      </p>
    </div>
  )
}
