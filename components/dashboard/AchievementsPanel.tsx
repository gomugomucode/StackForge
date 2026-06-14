import { useMemo } from 'react'
import { Lock, Trophy } from 'lucide-react'
import { ACHIEVEMENTS } from '../../data/achievements'
import { getUnlockedAchievements } from '../../core/hooks/useProgress'

export function AchievementsPanel() {
  const unlockedIds = useMemo(() => new Set(getUnlockedAchievements()), [])

  const earnedCount = ACHIEVEMENTS.filter((a) => unlockedIds.has(a.id)).length

  return (
    <div className="glass p-6 rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-text-primary flex items-center gap-1.5">
          <Trophy className="w-5 h-5 text-accent-purple" /> Achievements
        </h3>
        <span className="text-xs font-bold text-accent-purple bg-accent-purple/10 px-2.5 py-1 rounded-lg">
          {earnedCount}/{ACHIEVEMENTS.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {ACHIEVEMENTS.map((achievement) => {
          const isEarned = unlockedIds.has(achievement.id)

          return (
            <div
              key={achievement.id}
              className={`relative p-4 rounded-2xl border text-center transition-all duration-300 group ${
                isEarned
                  ? 'border-accent-purple/30 bg-accent-purple/5 hover:scale-105 hover:shadow-lg hover:shadow-accent-purple/10 cursor-default'
                  : 'border-border/10 bg-surface-950/30 grayscale opacity-60'
              }`}
              title={achievement.description}
            >
              {!isEarned && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20 z-10">
                  <Lock className="w-5 h-5 text-text-muted" />
                </div>
              )}

              <div className={`text-3xl mb-2 ${isEarned ? 'group-hover:scale-110 transition-transform' : ''}`}>
                {achievement.emoji}
              </div>
              <h4 className="text-xs font-bold text-text-primary leading-tight">{achievement.title}</h4>
              <p className="text-[10px] text-text-secondary mt-1 leading-snug line-clamp-2">
                {achievement.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
