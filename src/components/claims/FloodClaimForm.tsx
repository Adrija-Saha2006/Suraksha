import { useId, useState } from 'react'
import type { FormEvent } from 'react'

import { useDashboardData } from '../../data/useDashboardData'

const fieldClass =
  'w-full border border-border bg-surface px-[14px] py-[10px] text-[15px] leading-[1.2] text-ink outline-none focus:border-ink'
const labelClass = 'text-[15px] leading-[1.2] text-muted'

interface FloodClaimFormProps {
  onSubmit: (location: string) => void
  isSubmitting: boolean
  submitError: string | null
}

export function FloodClaimForm({ onSubmit, isSubmitting, submitError }: FloodClaimFormProps) {
  const { data } = useDashboardData()
  const policy = data?.policy

  const locationId = useId()
  const [location, setLocation] = useState('')

  const canSubmit = Boolean(policy && location.trim() && !isSubmitting)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!canSubmit) return
    onSubmit(location.trim())
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[30px] border border-border bg-surface px-[24px] py-[24px]"
    >
      <div className="flex flex-col gap-[6px]">
        <span className={labelClass}>Policy</span>
        <div className="border border-border bg-paper px-[14px] py-[10px] text-[15px] leading-[1.2]">
          {policy ? `${policy.planName} · ${policy.id}` : 'No active policy found'}
        </div>
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor={locationId} className={labelClass}>
          Location
        </label>
        <input
          id={locationId}
          type="text"
          required
          placeholder="e.g. Nadia District"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className={fieldClass}
        />
      </div>

      <p className="text-[13px] leading-[1.2] text-muted">
        Flood cover is parametric — we check this location against verified sensor and oracle data
        instead of filing a claim. If a qualifying event is confirmed, payout is automatic.
      </p>

      {submitError && (
        <p className="text-[15px] leading-[1.2] text-status-danger">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex w-fit items-center justify-center rounded-full border border-ink bg-ink px-[24px] py-[10px] text-[15px] leading-[1.2] text-paper transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSubmitting ? 'Checking…' : 'Check Flood Status'}
      </button>
    </form>
  )
}
