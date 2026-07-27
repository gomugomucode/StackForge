import { prisma } from "@/lib/prisma";

export interface SkillProficiencyResult {
  technology: string;
  score: number; // 0 - 100
  confidence: "Beginner" | "Competent" | "Strong" | "Expert";
  metrics: {
    quizAccuracy: number;
    challengeRate: number;
    projectScore: number;
    streakBonus: number;
  };
}

export class SkillEngine {
  /**
   * Calculates dynamic skill proficiency score for a user across a technology
   */
  static async calculateProficiency(userId: string, technology: string): Promise<SkillProficiencyResult> {
    try {
      const [quizAttempts, challengeProgress, projectSubmissions, streak] = await Promise.all([
        prisma.quizAttempt.findMany({
          where: { userId },
          select: { percentage: true },
        }).catch(() => []),
        prisma.challengeProgress.findMany({
          where: { userId, completed: true },
        }).catch(() => []),
        prisma.projectSubmission.findMany({
          where: { userId },
          include: { autoReview: true },
        }).catch(() => []),
        prisma.streakTracking.findUnique({
          where: { userId },
        }).catch(() => null),
      ]);

      // 1. Quiz Score Avg (w1 = 0.30)
      const quizAccuracy = quizAttempts.length > 0
        ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / quizAttempts.length)
        : 0;

      // 2. Challenge Completion Rate (w2 = 0.25)
      const challengeRate = Math.min(challengeProgress.length * 10, 100);

      // 3. Project Score (w3 = 0.35)
      const projectScores = projectSubmissions
        .map((s) => s.autoReview?.overallScore || 75)
        .filter(Boolean);
      const projectScore = projectScores.length > 0
        ? Math.round(projectScores.reduce((a, b) => a + b, 0) / projectScores.length)
        : projectSubmissions.length * 25;

      // 4. Streak Bonus (w4 = 0.10)
      const currentStreak = streak?.currentStreak || 0;
      const streakBonus = Math.min(currentStreak * 5, 100);

      // Weighted Calculation
      const rawScore = Math.round(
        0.30 * quizAccuracy +
        0.25 * challengeRate +
        0.35 * projectScore +
        0.10 * streakBonus
      );

      const score = Math.min(Math.max(rawScore, 0), 100);

      let confidence: "Beginner" | "Competent" | "Strong" | "Expert" = "Beginner";
      if (score >= 85) confidence = "Expert";
      else if (score >= 70) confidence = "Strong";
      else if (score >= 50) confidence = "Competent";

      return {
        technology,
        score,
        confidence,
        metrics: {
          quizAccuracy,
          challengeRate,
          projectScore,
          streakBonus,
        },
      };
    } catch (error) {
      console.error("[SkillEngine] Error calculating proficiency:", error);
      return {
        technology,
        score: 0,
        confidence: "Beginner",
        metrics: { quizAccuracy: 0, challengeRate: 0, projectScore: 0, streakBonus: 0 },
      };
    }
  }
}
