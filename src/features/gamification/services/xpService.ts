import { prisma } from '@/lib/prisma';

export const XP_REWARDS = {
  READ_LESSON: 10,
  COMPLETE_QUIZ: 25,
  FINISH_SECTION: 50,
  FINISH_ROADMAP: 100,
  INTERVIEW_PRACTICE: 20,
  BOOKMARK_CONTENT: 2,
  DAILY_STREAK_BONUS: 15,
} as const;

type RewardType = keyof typeof XP_REWARDS;

export async function addXP(userId: string, rewardType: RewardType) {
  const xpAmount = XP_REWARDS[rewardType];
  
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) throw new Error('Profile not found');

  const newXP = profile.xp + xpAmount;
  const newLevel = calculateLevel(newXP);

  return await prisma.profile.update({
    where: { userId },
    data: {
      xp: newXP,
      level: newLevel,
    },
  });
}

function calculateLevel(xp: number): number {
  // Level 1: 0-99, Level 2: 100-249, Level 3: 250-449...
  // Base formula: 100 * (level - 1) + some growth
  // Simpler: Level = floor(sqrt(xp / 10)) + 1
  return Math.floor(Math.sqrt(xp / 10)) + 1;
}

export async function getUserXP(userId: string) {
  return await prisma.profile.findUnique({
    where: { userId },
    select: { xp: true, level: true },
  });
}
