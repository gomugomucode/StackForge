import { prisma } from '../db/client'

export const ProgressRepository = {
  async getProgress(userId: string, contentId: string) {
    return prisma.progress.findFirst({
      where: {
        userId,
        contentId,
      },
    })
  },

  async updateProgress(userId: string, contentId: string, percent: number, completed: boolean) {
    return prisma.progress.upsert({
      where: {
        userId_contentId: {
          userId,
          contentId,
        },
      },
      update: { percent, completed },
      create: { userId, contentId, percent, completed, contentType: 'TUTORIAL' }, // Default to TUTORIAL, should be passed in.
    })
  },

  async getUserProgress(userId: string) {
    return prisma.progress.findMany({
      where: { userId },
    })
  },
}
