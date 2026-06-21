import { prisma } from '@/lib/prisma';

export async function trackDailyActivity(userId: string, xpEarned: number) {
  const today = new Date().toISOString().split('T')[0];

  // 1. Update or create daily activity
  await prisma.dailyActivity.upsert({
    where: {
      userId_date: { userId, date: today },
    },
    update: {
      xpEarned: { increment: xpEarned },
    },
    create: {
      userId,
      date: today,
      xpEarned,
    },
  });

  // 2. Update streak
  return await updateStreak(userId);
}

async function updateStreak(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const streak = await prisma.streakTracking.findUnique({
    where: { userId },
  });

  if (!streak) {
    const newStreak = await prisma.streakTracking.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActive: today,
      },
    });
    return newStreak;
  }

  const lastActive = new Date(streak.lastActive);
  lastActive.setHours(0, 0, 0, 0);

  if (lastActive.getTime() === today.getTime()) {
    return streak;
  } else if (lastActive.getTime() === yesterday.getTime()) {
    const updatedStreak = await prisma.streakTracking.update({
      where: { userId },
      data: {
        currentStreak: { increment: 1 },
        longestStreak: { 
          set: streak.currentStreak + 1 > streak.longestStreak ? streak.currentStreak + 1 : streak.longestStreak 
        },
        lastActive: today,
      },
    });
    return updatedStreak;
  } else {
    const resetStreak = await prisma.streakTracking.update({
      where: { userId },
      data: {
        currentStreak: 1,
        lastActive: today,
      },
    });
    return resetStreak;
  }
}

export async function getStreak(userId: string) {
  return await prisma.streakTracking.findUnique({
    where: { userId },
  });
}
