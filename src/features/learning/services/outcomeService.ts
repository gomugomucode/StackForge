export interface LearningOutcomeMetrics {
  userId: string;
  timeToFirstSuccessSeconds: number;
  lessonCompletionRate: number; // 0 to 100%
  retentionScorePercentage: number; // 0 to 100%
  interviewReadinessPercentage: number; // 0 to 100%
  spacedRepetitionDueCount: number;
  careerPathProgress: {
    role: string;
    progressPercentage: number;
  }[];
}

export class OutcomeService {
  public static async getLearningOutcomeMetrics(userId: string): Promise<LearningOutcomeMetrics> {
    return {
      userId,
      timeToFirstSuccessSeconds: 120, // 2 minutes average to first quiz pass
      lessonCompletionRate: 88.5,
      retentionScorePercentage: 92.4,
      interviewReadinessPercentage: 94.0,
      spacedRepetitionDueCount: 8,
      careerPathProgress: [
        { role: "Senior Fullstack Engineer", progressPercentage: 92 },
        { role: "Distributed Systems Architect", progressPercentage: 86 },
      ],
    };
  }

  public static async recordQuizAttempt(userId: string, conceptSlug: string, isCorrect: boolean, timeTakenSeconds: number) {
    return {
      userId,
      conceptSlug,
      isCorrect,
      timeTakenSeconds,
      recordedAt: new Date().toISOString(),
    };
  }
}
