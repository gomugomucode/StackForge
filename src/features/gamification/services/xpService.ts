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

function calculateLevel(xp: number): number {
  // xp: 0-99 -> L1
  // xp: 100-249 -> L2 (req 100)
  // xp: 250-449 -> L3 (req 150)
  // xp: 450-749 -> L4 (req 200)
  // Formula: level = n, xp_required = sum(100 + 50*(i-1)) for i from 1 to n
  // This is a simple arithmetic progression.
  // xp = n/2 * (2*100 + (n-1)*50) = n/2 * (200 + 50n - 50) = n/2 * (150 + 50n) = 75n + 25n^2
  // 25n^2 + 75n - xp = 0
  // n = (-75 + sqrt(75^2 - 4*25*(-xp))) / (2*25)
  // n = (-75 + sqrt(5625 + 100xp)) / 50
  
  if (xp < 100) return 1;
  const n = (-75 + Math.sqrt(5625 + 100 * xp)) / 50;
  return Math.floor(n) + 1;
}

export async function getUserXP(userId: string) {
  return await prisma.profile.findUnique({
    where: { userId },
    select: { xp: true, level: true },
  });
}
