import { Outlet } from 'react-router-dom'

import { Logo } from '../common/Logo'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-paper">
      <Sidebar />

      <header className="sticky top-0 z-20 flex items-center border-b border-ink bg-ink px-[20px] py-[14px] md:hidden">
        <Logo markSize={26} />
      </header>

      <main className="px-[20px] py-[30px] pb-[90px] md:ml-[220px] md:px-[40px] md:py-[40px] md:pb-[40px]">
        <div className="mx-auto max-w-[1040px]">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
