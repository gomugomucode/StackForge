import { prisma } from '@/lib/prisma';
import { trackDailyActivity } from './streakService';

export const XP_REWARDS = {
  TOPIC_COMPLETION: 25,
  QUIZ_PASS: 50,
  CHALLENGE_COMPLETION: 100,
  ROADMAP_COMPLETION: 500,
  READ_LESSON: 10, // Keeping for legacy support
  INTERVIEW_PRACTICE: 20,
  BOOKMARK_CONTENT: 2,
  DAILY_STREAK_BONUS: 15,
} as const;

type RewardType = keyof typeof XP_REWARDS;

export async function addXP(userId: string, rewardType: RewardType, referenceId?: string) {
  const xpAmount = XP_REWARDS[rewardType];
  const reason = referenceId ? `${rewardType}:${referenceId}` : rewardType;

  // Prevent duplicate rewards for the same action
  const existingTransaction = await prisma.xpTransaction.findFirst({
    where: {
      userId,
      reason,
    },
  });

  if (existingTransaction) {
    return { success: false, message: "XP already awarded for this action" };
  }

  // Use a transaction to ensure both Profile and XpTransaction are updated together
  const result = await prisma.$transaction(async (tx) => {
    const profile = await tx.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    const newXP = profile.xp + xpAmount;
    const newLevel = calculateLevel(newXP);

    const updatedProfile = await tx.profile.update({
      where: { userId },
      data: {
        xp: newXP,
        level: newLevel,
      },
    });

    await tx.xpTransaction.create({
      data: {
        userId,
        amount: xpAmount,
        reason,
      },
    });

    return updatedProfile;
  });

  // Track daily activity and streak independently of the transaction
  // to avoid locking the profile table longer than necessary.
  await trackDailyActivity(userId, xpAmount);

  return { success: true, profile: result };
}

export function calculateLevel(xp: number): number {
  if (xp < 100) return 1;
  const n = (-75 + Math.sqrt(5625 + 100 * xp)) / 50;
  return Math.floor(n) + 1;
}

export function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  const n = level - 1;
  return 25 * n * n + 75 * n;
}

export function getLevelStats(xp: number) {
  const level = calculateLevel(xp);
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForLevel(level + 1);
  const xpInCurrentLevel = xp - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;
  const progressPercentage = Math.min(
    100,
    Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100)
  );

  return {
    level,
    xp,
    currentLevelXP,
    nextLevelXP,
    xpInCurrentLevel,
    xpNeededForNextLevel,
    progressPercentage,
  };
}

export async function getUserXP(userId: string) {
  return await prisma.profile.findUnique({
    where: { userId },
    select: { xp: true, level: true },
  });
}

export async function getUserGamificationStats(userId: string) {
  let profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    profile = await prisma.profile.create({
      data: { userId },
    });
  }

  const streakData = await prisma.streakTracking.findUnique({
    where: { userId },
  });

  const levelStats = getLevelStats(profile.xp);

  return {
    xp: profile.xp,
    level: levelStats.level,
    streak: streakData?.currentStreak ?? profile.streak,
    totalHours: profile.totalHours,
    lastActive: profile.lastActive,
    levelStats,
  };
}
