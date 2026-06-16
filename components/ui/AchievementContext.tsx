import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { AchievementToast } from './AchievementToast'
import type { Achievement } from '@/lib/data/achievements'

interface AchievementContextValue {
  showAchievement: (achievement: Achievement) => void
}

const AchievementContext = createContext<AchievementContextValue | null>(null)

interface ToastState {
  current: Achievement | null
  queue: Achievement[]
}

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [toastState, setToastState] = useState<ToastState>({ current: null, queue: [] })

  const showAchievement = useCallback((achievement: Achievement) => {
    setToastState((prev) => {
      if (prev.current) {
        return { ...prev, queue: [...prev.queue, achievement] }
      }
      return { ...prev, current: achievement }
    })
  }, [])

  const handleDismiss = useCallback(() => {
    setToastState((prev) => {
      if (prev.queue.length > 0) {
        return { current: prev.queue[0], queue: prev.queue.slice(1) }
      }
      return { current: null, queue: [] }
    })
  }, [])

  return (
    <AchievementContext.Provider value={{ showAchievement }}>
      {children}
      {toastState.current && (
        <AchievementToast achievement={toastState.current} onDismiss={handleDismiss} />
      )}
    </AchievementContext.Provider>
  )
}

export function useAchievementToast() {
  const ctx = useContext(AchievementContext)
  if (!ctx) {
    throw new Error('useAchievementToast must be used within AchievementProvider')
  }
  return ctx
}
