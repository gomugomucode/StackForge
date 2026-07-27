import { prisma } from "@/lib/prisma";

export interface SpacedRepetitionTopic {
  topicId: string;
  retentionScore: number;
  daysSinceLastReview: number;
  nextReviewDue: Date;
  needsReview: boolean;
}

export class SpacedRepetitionService {
  /**
   * Calculates memory retention based on Ebbinghaus forgetting curve formula: R = e^(-t / S)
   */
  static calculateRetention(lastReviewedAt: Date, stabilityDays = 7): number {
    const now = new Date();
    const elapsedDays = (now.getTime() - lastReviewedAt.getTime()) / (1000 * 60 * 60 * 24);
    const retention = Math.exp(-elapsedDays / stabilityDays);
    return Math.max(0, Math.round(retention * 100));
  }

  /**
   * Fetches topics due for spaced repetition review for a user
   */
  static async getUserTopicsForReview(userId: string): Promise<SpacedRepetitionTopic[]> {
    const completedProgress = await prisma.topicProgress.findMany({
      where: { userId, completed: true },
      include: { topic: true },
    });

    const results: SpacedRepetitionTopic[] = [];
    const dbDelegate = (prisma as any).spacedRepetition;

    for (const progress of completedProgress) {
      const lastReviewedAt = progress.completedAt || progress.lastAccessed || new Date();
      const retentionScore = this.calculateRetention(lastReviewedAt);
      const daysSince = Math.floor((Date.now() - lastReviewedAt.getTime()) / (1000 * 60 * 60 * 24));
      const needsReview = retentionScore < 65;

      const nextDue = new Date(lastReviewedAt.getTime() + 7 * 24 * 60 * 60 * 1000);

      // Persist in DB if model delegate exists
      if (dbDelegate) {
        await dbDelegate.upsert({
          where: { userId_topicId: { userId, topicId: progress.topicId } },
          create: {
            userId,
            topicId: progress.topicId,
            retentionScore,
            lastReviewedAt,
            nextReviewDue: nextDue,
          },
          update: {
            retentionScore,
            lastReviewedAt,
            nextReviewDue: nextDue,
          },
        });
      }

      if (needsReview) {
        results.push({
          topicId: progress.topicId,
          retentionScore,
          daysSinceLastReview: daysSince,
          nextReviewDue: nextDue,
          needsReview: true,
        });
      }
    }

    return results.sort((a, b) => a.retentionScore - b.retentionScore);
  }
}
