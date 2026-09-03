import { HeartPulse, Skull, Waves } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { ClaimType } from '../../data/types'
import { claimTypeLabels } from '../../lib/claims'

const claimTypeIcons: Record<ClaimType, LucideIcon> = {
  accident: HeartPulse,
  death: Skull,
  flood: Waves,
}

const claimTypes = Object.keys(claimTypeLabels) as ClaimType[]

interface ClaimTypeSelectorProps {
  value: ClaimType | null
  onChange: (type: ClaimType) => void
}

export function ClaimTypeSelector({ value, onChange }: ClaimTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-3">
      {claimTypes.map((type) => {
        const Icon = claimTypeIcons[type]
        const selected = value === type
        return (
          <button
            key={type}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(type)}
            className={`flex flex-col items-start gap-[20px] border bg-surface px-[24px] py-[20px] text-left transition-colors ${
              selected ? 'border-ink' : 'border-border hover:border-ink/40'
            }`}
          >
            <Icon size={22} strokeWidth={1.75} className={selected ? 'text-ink' : 'text-brand-green-dark'} />
            <span className="text-[18px] leading-[1.1] tracking-[-0.03em]">{claimTypeLabels[type]}</span>
          </button>
        )
      })}
    </div>
  )
}
