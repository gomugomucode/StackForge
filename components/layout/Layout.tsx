"use client";
import { Footer } from './Footer'
import { InstallPrompt } from '../ui/InstallPrompt'
import { useState } from 'react'
import AIMentorPanel from '../tech/AIMentorPanel'
import { Sparkles } from 'lucide-react'

export function Layout({ children }: { children: React.ReactNode }) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* AI Mentor Slide-over Overlay */}
      <div className={`fixed top-0 right-0 h-screen transition-all duration-300 z-50 ${isAiOpen ? 'translate-x-0 w-full max-w-md' : 'translate-x-full w-0'}`}>
        <AIMentorPanel isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      </div>

      <main className="flex-1 flex flex-col w-full">
        {children}
        <Footer />
      </main>

      {/* AI Mentor Floating Trigger */}
      <button 
        onClick={() => setIsAiOpen(!isAiOpen)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all z-40 group flex items-center gap-2"
      >
        <span className={`max-w-0 overflow-hidden transition-all duration-300 whitespace-nowrap font-bold ${isAiOpen ? 'max-w-xs' : 'group-hover:max-w-xs'}`}>
          {isAiOpen ? 'Close AI' : 'AI Mentor'}
        </span>
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
      </button>

      <InstallPrompt />
    </div>
  )
}
