import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { UploadCloud } from 'lucide-react'

import { useDashboardData } from '../../data/useDashboardData'
import type { AccidentClaimSubmission } from '../../data/types'
import { isoDaysAgo } from '../../lib/format'

const fieldClass =
  'w-full border border-border bg-surface px-[14px] py-[10px] text-[15px] leading-[1.2] text-ink outline-none focus:border-ink'
const labelClass = 'text-[15px] leading-[1.2] text-muted'

interface AccidentClaimFormProps {
  onSubmit: (input: AccidentClaimSubmission) => void
  isSubmitting: boolean
  submitError: string | null
}

export function AccidentClaimForm({ onSubmit, isSubmitting, submitError }: AccidentClaimFormProps) {
  const { data } = useDashboardData()
  const policy = data?.policy

  const dateId = useId()
  const locationId = useId()
  const descriptionId = useId()
  const evidenceId = useId()

  const [incidentDate, setIncidentDate] = useState(isoDaysAgo(4))
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [evidenceFiles, setEvidenceFiles] = useState<string[]>([])

  const today = isoDaysAgo(0)
  const canSubmit = Boolean(policy && location.trim() && description.trim() && !isSubmitting)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!policy || !canSubmit) return
    onSubmit({
      policyId: policy.id,
      incidentDate,
      location: location.trim(),
      description: description.trim(),
      evidenceFiles,
    })
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

      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
        <div className="flex flex-col gap-[6px]">
          <label htmlFor={dateId} className={labelClass}>
            Date of incident
          </label>
          <input
            id={dateId}
            type="date"
            required
            max={today}
            value={incidentDate}
            onChange={(event) => setIncidentDate(event.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <label htmlFor={locationId} className={labelClass}>
            Location
          </label>
          <input
            id={locationId}
            type="text"
            required
            placeholder="e.g. MG Road, Bengaluru"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor={descriptionId} className={labelClass}>
          Description
        </label>
        <textarea
          id={descriptionId}
          required
          rows={4}
          placeholder="What happened? Include any details that will help verification."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-[6px]">
        <span className={labelClass}>Evidence</span>
        <label
          htmlFor={evidenceId}
          className="flex cursor-pointer flex-col items-center justify-center gap-[10px] border border-dashed border-border px-[24px] py-[30px] text-center hover:border-ink/40"
        >
          <UploadCloud size={22} strokeWidth={1.75} className="text-brand-green-dark" />
          <span className="text-[15px] leading-[1.2] text-muted">
            {evidenceFiles.length > 0
              ? `${evidenceFiles.length} file${evidenceFiles.length > 1 ? 's' : ''} selected`
              : 'Upload photos, reports or receipts'}
          </span>
          <input
            id={evidenceId}
            type="file"
            multiple
            accept="image/*,.pdf"
            className="hidden"
            onChange={(event) =>
              setEvidenceFiles(Array.from(event.target.files ?? []).map((file) => file.name))
            }
          />
        </label>
        {evidenceFiles.length > 0 && (
          <ul className="flex flex-col gap-[4px]">
            {evidenceFiles.map((name) => (
              <li key={name} className="text-[13px] leading-[1.2] text-muted">
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {submitError && (
        <p className="text-[15px] leading-[1.2] text-status-danger">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex w-fit items-center justify-center rounded-full border border-status-danger bg-status-danger px-[24px] py-[10px] text-[15px] leading-[1.2] text-paper transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSubmitting ? 'Submitting…' : 'Submit Claim'}
      </button>
    </form>
  )
}
