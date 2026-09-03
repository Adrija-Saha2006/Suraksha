import type { PropsWithChildren } from 'react'

export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral'

const toneClass: Record<BadgeTone, string> = {
  success: 'bg-status-active-bg text-status-active',
  warning: 'bg-status-warning-bg text-status-warning',
  danger: 'bg-status-danger-bg text-status-danger',
  neutral: 'bg-paper text-muted',
}

interface StatusBadgeProps {
  tone: BadgeTone
}

export function StatusBadge({ tone, children }: PropsWithChildren<StatusBadgeProps>) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-[12px] py-[4px] text-[13px] leading-[1.2] ${toneClass[tone]}`}
    >
      {children}
    </span>
  )
}
