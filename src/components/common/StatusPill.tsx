import type { PolicyStatus } from '../../data/types'

const statusConfig: Record<PolicyStatus, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-status-active-bg text-status-active',
  },
  expiring_soon: {
    label: 'Expiring soon',
    className: 'bg-status-warning-bg text-status-warning',
  },
  expired: {
    label: 'Expired',
    className: 'bg-status-danger-bg text-status-danger',
  },
  pending: {
    label: 'Pending',
    className: 'bg-status-warning-bg text-status-warning',
  },
}

export function StatusPill({ status }: { status: PolicyStatus }) {
  const { label, className } = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center rounded-full px-[12px] py-[4px] text-[13px] leading-[1.2] ${className}`}
    >
      {label}
    </span>
  )
}
