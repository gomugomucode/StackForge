export const XP_REWARDS = {
  NODE_COMPLETION: 20,
  PROJECT_COMPLETION: 100,
  DAILY_LOGIN: 10,
  QUIZ_PASS: 50,
}

export function calculateLevel(xp: number): number {
  // Level = floor(sqrt(xp / 100)) + 1
  // Level 1: 0-99 XP
  // Level 2: 100-399 XP
  // Level 3: 400-899 XP
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function getXPForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 100
}

export function getXPToNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp)
  const nextLevelXp = getXPForLevel(currentLevel + 1)
  return nextLevelXp - currentXp
}
