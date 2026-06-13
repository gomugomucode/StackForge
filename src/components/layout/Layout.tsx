import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { InstallPrompt } from '../ui/InstallPrompt'
import { AchievementProvider } from '../ui/AchievementContext'

export function Layout() {
  return (
    <AchievementProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <InstallPrompt />
      </div>
    </AchievementProvider>
  )
}

