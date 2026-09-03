import { CreditCard, FileCheck, FileText, ShieldCheck, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Card } from '../common/Card'
import { SectionHeading } from '../common/SectionHeading'
import type { ActivityItem, ActivityType } from '../../data/types'
import { timeAgo } from '../../lib/format'

const activityIcons: Record<ActivityType, LucideIcon> = {
  payment: CreditCard,
  claim: FileText,
  document: FileCheck,
  policy: ShieldCheck,
  nominee: UserCheck,
}

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <section>
      <SectionHeading>Recent activity</SectionHeading>
      <Card className="p-0">
        <ul>
          {items.map((item, index) => {
            const Icon = activityIcons[item.type]
            return (
              <li
                key={item.id}
                className={`flex items-start gap-[14px] px-[24px] py-[16px] ${
                  index !== items.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <Icon size={18} strokeWidth={1.75} className="mt-[2px] shrink-0 text-brand-green-dark" />
                <div className="flex flex-1 flex-col gap-[4px]">
                  <span className="text-[15px] leading-[1.2]">{item.title}</span>
                  <span className="text-[15px] leading-[1.2] text-muted">{item.description}</span>
                </div>
                <span className="shrink-0 text-[13px] leading-[1.2] text-muted">
                  {timeAgo(item.date)}
                </span>
              </li>
            )
          })}
        </ul>
      </Card>
    </section>
  )
}
