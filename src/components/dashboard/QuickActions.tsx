import { Link } from 'react-router-dom'

interface ActionButtonProps {
  to: string
  variant: 'primary' | 'secondary' | 'outline'
  children: string
}

function ActionButton({ to, variant, children }: ActionButtonProps) {
  const variantClass = {
    primary: 'bg-status-danger text-paper border-status-danger hover:opacity-90',
    secondary: 'bg-ink text-paper border-ink hover:opacity-90',
    outline: 'bg-transparent text-ink border-ink hover:bg-ink hover:text-paper',
  }[variant]

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-full border px-[20px] py-[10px] text-[15px] leading-[1.2] transition-colors ${variantClass}`}
    >
      {children}
    </Link>
  )
}

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-[10px]">
      <ActionButton to="/claims?type=accident" variant="primary">
        Report Accident
      </ActionButton>
      <ActionButton to="/claims?type=death" variant="secondary">
        Report Death
      </ActionButton>
      <ActionButton to="/operations" variant="outline">
        View Policy
      </ActionButton>
    </div>
  )
}
