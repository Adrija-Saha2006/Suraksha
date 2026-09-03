export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

export function daysUntil(iso: string): number {
  const msPerDay = 1000 * 60 * 60 * 24
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(iso)
  target.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / msPerDay)
}

export function getGreeting(hour: number = new Date().getHours()): string {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function isoDaysAgo(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

export function truncateMiddle(value: string, front: number = 6, back: number = 6): string {
  if (value.length <= front + back + 1) return value
  return `${value.slice(0, front)}…${value.slice(-back)}`
}

export function timeAgo(iso: string): string {
  const msPerDay = 1000 * 60 * 60 * 24
  const days = Math.round((Date.now() - new Date(iso).getTime()) / msPerDay)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`
  const years = Math.round(days / 365)
  return `${years} year${years > 1 ? 's' : ''} ago`
}
