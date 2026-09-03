import { CloudRain, FileText, Home, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Claims', to: '/claims', icon: FileText },
  { label: 'Disaster', to: '/disaster', icon: CloudRain },
  { label: 'Operations', to: '/operations', icon: Settings },
]
