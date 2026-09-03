import type {
  FundingStatus,
  OperationsClaimStatus,
  PayoutStatus,
  StellarSettlementStatus,
} from '../data/types'
import type { BadgeTone } from '../components/operations/StatusBadge'

export function verificationLabel(verifiedCount: number, totalSources: number): string {
  if (verifiedCount === 0) return 'VERIFYING'
  if (verifiedCount >= totalSources) return 'VERIFIED'
  return `${verifiedCount}/${totalSources} VERIFIED`
}

export function verificationTone(verifiedCount: number, totalSources: number): BadgeTone {
  if (verifiedCount === 0) return 'warning'
  if (verifiedCount >= totalSources) return 'success'
  return 'warning'
}

const claimStatusLabels: Record<OperationsClaimStatus, string> = {
  advance_paid: 'ADVANCE PAID',
  pending: 'PENDING',
  paid: 'PAID',
  rejected: 'REJECTED',
}

const claimStatusTones: Record<OperationsClaimStatus, BadgeTone> = {
  advance_paid: 'warning',
  pending: 'neutral',
  paid: 'success',
  rejected: 'danger',
}

export function claimStatusLabel(status: OperationsClaimStatus): string {
  return claimStatusLabels[status]
}

export function claimStatusTone(status: OperationsClaimStatus): BadgeTone {
  return claimStatusTones[status]
}

const fundingLabels: Record<FundingStatus, string> = {
  funded: 'FUNDED',
  pending: 'PENDING',
}

const fundingTones: Record<FundingStatus, BadgeTone> = {
  funded: 'success',
  pending: 'neutral',
}

export function fundingLabel(status: FundingStatus): string {
  return fundingLabels[status]
}

export function fundingTone(status: FundingStatus): BadgeTone {
  return fundingTones[status]
}

const stellarLabels: Record<StellarSettlementStatus, string> = {
  confirmed: 'CONFIRMED',
  pending: '—',
}

const stellarTones: Record<StellarSettlementStatus, BadgeTone> = {
  confirmed: 'success',
  pending: 'neutral',
}

export function stellarLabel(status: StellarSettlementStatus): string {
  return stellarLabels[status]
}

export function stellarTone(status: StellarSettlementStatus): BadgeTone {
  return stellarTones[status]
}

const payoutLabels: Record<PayoutStatus, string> = {
  paid: 'PAID',
  pending: 'PENDING',
}

const payoutTones: Record<PayoutStatus, BadgeTone> = {
  paid: 'success',
  pending: 'neutral',
}

export function payoutLabel(status: PayoutStatus): string {
  return payoutLabels[status]
}

export function payoutTone(status: PayoutStatus): BadgeTone {
  return payoutTones[status]
}
