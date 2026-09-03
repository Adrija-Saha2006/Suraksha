import { NavLink } from 'react-router-dom'

import { navItems } from './navItems'

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-ink bg-ink text-paper md:hidden">
      {navItems.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-[4px] py-[10px] text-[12px] leading-[1.1] ${
              isActive ? 'text-brand-yellow' : 'text-paper/60'
            }`
          }
        >
          <Icon size={20} strokeWidth={1.75} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
