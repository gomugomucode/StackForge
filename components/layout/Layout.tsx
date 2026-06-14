import { Outlet } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { InstallPrompt } from '../ui/InstallPrompt'
import { AchievementProvider } from '../ui/AchievementContext'
import AIMentorPanel from '../tech/AIMentorPanel'
import { useState } from 'react'

export function Layout() {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <AchievementProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 relative">
          <Outlet />
          <div className={`fixed top-0 right-0 h-screen transition-all duration-300 z-40 ${isAiOpen ? 'translate-x-0 w-96' : 'translate-x-full w-0'}`}>
            <AIMentorPanel />
          </div>
        </main>
        <Footer />
        <InstallPrompt />
        <button 
          onClick={() => setIsAiOpen(!isAiOpen)}
          className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all z-50 group"
        >
          <div className="flex items-center gap-2">
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-bold">
              AI Mentor
            </span>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs">AI</span>
            </div>
          </div>
        </button>
      </div>
    </AchievementProvider>
  )
}

