import type { ClaimType } from '../data/types'

export const claimTypeLabels: Record<ClaimType, string> = {
  accident: 'Accident',
  death: 'Death',
  flood: 'Flood',
}

export function isClaimType(value: string | null): value is ClaimType {
  return value === 'accident' || value === 'death' || value === 'flood'
}
