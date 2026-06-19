import { prisma } from "@/lib/prisma";
import { AuthUser } from "../types/auth.types";

export const userService = {
  async createProfile(userId: string) {
    return await prisma.profile.create({
      data: {
        userId,
        xp: 0,
        streak: 0,
        level: 1,
        totalHours: 0,
      },
    });
  },

  async getUserProfile(userId: string) {
    return await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });
  },

  async updateXP(userId: string, amount: number) {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) return null;

    const newXP = profile.xp + amount;
    let newLevel = profile.level;
    
    // Simple level logic: every 1000 XP is a level
    newLevel = Math.floor(newXP / 1000) + 1;

    return await prisma.profile.update({
      where: { userId },
      data: {
        xp: newXP,
        level: newLevel,
      },
    });
  },

  async updateStreak(userId: string) {
    return await prisma.profile.update({
      where: { userId },
      data: {
        streak: {
          increment: 1,
        },
      },
    });
  },
};
