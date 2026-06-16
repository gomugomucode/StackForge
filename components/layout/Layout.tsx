"use client";
import { Footer } from './Footer'
import { InstallPrompt } from '../ui/InstallPrompt'
import { useState } from 'react'
import AIMentorPanel from '../tech/AIMentorPanel'

export function Layout({ children }: { children: React.ReactNode }) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AIMentorPanel isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <main className="flex-1 flex flex-col">
        {children}
        <Footer />
      </main>
      <InstallPrompt />
    </div>
  )
}
