import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy } from 'lucide-react'
import type { Achievement } from '@/lib/data/achievements'

interface AchievementToastProps {
  achievement: Achievement | null
  onDismiss: () => void
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  useEffect(() => {
    if (!achievement) return
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [achievement, onDismiss])

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: 60, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 40, x: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[70] max-w-xs w-full"
        >
          <div className="glass-card p-4 rounded-2xl border border-accent-purple/30 shadow-2xl shadow-accent-purple/10 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10 pointer-events-none`} />

            <button
              onClick={onDismiss}
              className="absolute top-2.5 right-2.5 p-1 rounded-lg hover:bg-surface-800 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3 relative">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
                {achievement.emoji}
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Trophy className="w-3.5 h-3.5 text-accent-purple" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-purple">
                    Achievement Unlocked
                  </span>
                </div>
                <h4 className="font-bold text-sm text-text-primary">{achievement.title}</h4>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{achievement.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
