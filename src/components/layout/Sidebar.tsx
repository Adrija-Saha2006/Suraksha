import { NavLink } from 'react-router-dom'

import { Logo } from '../common/Logo'
import { navItems } from './navItems'

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[220px] flex-col border-r border-ink bg-ink text-paper md:flex">
      <div className="flex items-center px-[24px] py-[30px]">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-[6px] px-[14px]">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-[10px] rounded-[4px] px-[12px] py-[10px] text-[15px] leading-[1.2] transition-colors ${
                isActive
                  ? 'bg-paper text-ink'
                  : 'text-paper/70 hover:bg-paper/10 hover:text-paper'
              }`
            }
          >
            <Icon size={18} strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-paper/15 px-[24px] py-[20px] text-[13px] leading-[1.2] text-paper/50">
        Arakis Insurance
      </div>
    </aside>
  )
}
