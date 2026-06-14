'use client'

import { AuthProvider } from '@/lib/core/context/AuthProvider'
import { AIProvider } from '@/lib/core/context/AIProvider'
import { ProgressProvider } from '@/lib/core/context/ProgressContext'
import { AchievementProvider } from '@/lib/core/context/AchievementContext'
import { ThemeProvider } from '@/lib/core/context/ThemeProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AIProvider>
          <ProgressProvider>
            <AchievementProvider>
              {children}
            </AchievementProvider>
          </ProgressProvider>
        </AIProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
