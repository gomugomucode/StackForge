import { prisma } from '@/lib/prisma';

export async function updateStreak(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) throw new Error('Profile not found');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActive = new Date(profile.lastActive);
  lastActive.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - lastActive.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  let newStreak = profile.streak;

  if (diffDays === 1) {
    // Streak continues
    newStreak += 1;
  } else if (diffDays > 1) {
    // Streak broken
    newStreak = 1;
  } else if (diffDays === 0) {
    // Already active today, keep streak as is
  }

  return await prisma.profile.update({
    where: { userId },
    data: {
      streak: newStreak,
      lastActive: new Date(),
    },
  });
}

export async function getStreak(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    select: { streak: true },
  });
  return profile?.streak || 0;
}
