import {
  getCompletedTopics,
  getStreak,
  getBookmarks,
  hasPerfectQuizScore,
  countTechsWithProgress,
  getUnlockedAchievements,
  unlockAchievement,
} from '@/lib/core/hooks/useProgress'

export interface Achievement {
  id: string
  title: string
  description: string
  emoji: string
  color: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first roadmap topic',
    emoji: '🚀',
    color: 'from-accent-purple to-accent-violet',
  },
  {
    id: 'quiz-whiz',
    title: 'Quiz Whiz',
    description: 'Score 100% on any chapter quiz',
    emoji: '🧠',
    color: 'from-accent-cyan to-accent-emerald',
  },
  {
    id: 'streak-builder',
    title: 'Streak Builder',
    description: 'Maintain a 7-day learning streak',
    emoji: '🔥',
    color: 'from-orange-500 to-amber-400',
  },
  {
    id: 'polyglot',
    title: 'Polyglot',
    description: 'Make progress in 3 or more technologies',
    emoji: '🌍',
    color: 'from-accent-emerald to-accent-cyan',
  },
  {
    id: 'note-taker',
    title: 'Note Taker',
    description: 'Bookmark 5 or more study items',
    emoji: '📚',
    color: 'from-accent-violet to-accent-purple',
  },
]

function hasAnyCompletedTopic(techIds: string[]): boolean {
  return techIds.some((id) => {
    const completed = getCompletedTopics(id)
    return Object.values(completed).some(Boolean)
  })
}

export function checkAchievements(techIds: string[]): Achievement[] {
  const newlyUnlocked: Achievement[] = []

  const checks: { id: string; condition: boolean }[] = [
    { id: 'first-step', condition: hasAnyCompletedTopic(techIds) },
    { id: 'quiz-whiz', condition: hasPerfectQuizScore() },
    { id: 'streak-builder', condition: getStreak() >= 7 },
    { id: 'polyglot', condition: countTechsWithProgress(techIds) >= 3 },
    { id: 'note-taker', condition: getBookmarks().length >= 5 },
  ]

  for (const { id, condition } of checks) {
    if (condition) {
      const achievement = ACHIEVEMENTS.find((a) => a.id === id)
      if (achievement && unlockAchievement(id)) {
        newlyUnlocked.push(achievement)
      }
    }
  }

  return newlyUnlocked
}

export function getAchievementProgress(techIds: string[]): Record<string, boolean> {
  const unlocked = new Set(getUnlockedAchievements())
  const progress: Record<string, boolean> = {}

  for (const achievement of ACHIEVEMENTS) {
    progress[achievement.id] = unlocked.has(achievement.id)
  }

  // Re-evaluate locked achievements for display accuracy
  if (!progress['first-step']) progress['first-step'] = hasAnyCompletedTopic(techIds)
  if (!progress['quiz-whiz']) progress['quiz-whiz'] = hasPerfectQuizScore()
  if (!progress['streak-builder']) progress['streak-builder'] = getStreak() >= 7
  if (!progress['polyglot']) progress['polyglot'] = countTechsWithProgress(techIds) >= 3
  if (!progress['note-taker']) progress['note-taker'] = getBookmarks().length >= 5

  return progress
}
