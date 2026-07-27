import { prisma } from "@/lib/prisma";

export interface QualityReport {
  quizAudits: Array<{
    quizId: string;
    title: string;
    questionCount: number;
    passRate: number;
    qualityScore: number;
    issues: string[];
  }>;
  challengeAudits: Array<{
    challengeId: string;
    title: string;
    passRate: number;
    qualityScore: number;
    issues: string[];
  }>;
  summary: {
    totalQuizzesAudited: number;
    totalChallengesAudited: number;
    averageQualityScore: number;
    ambiguousCount: number;
  };
}

export class AssessmentQualityService {
  static async auditAllAssessments(): Promise<QualityReport> {
    const [quizzes, challenges, attempts, challengeProgresses] = await Promise.all([
      prisma.quiz.findMany({ include: { questions: true } }),
      prisma.challenge.findMany(),
      prisma.quizAttempt.findMany(),
      prisma.challengeProgress.findMany(),
    ]);

    const quizAudits = [];
    const challengeAudits = [];
    let totalScoreSum = 0;
    let ambiguousCount = 0;

    // Audit Quizzes
    for (const quiz of quizzes) {
      const quizAttempts = attempts.filter((a) => a.quizId === quiz.id);
      const passCount = quizAttempts.filter((a) => a.passed).length;
      const passRate = quizAttempts.length > 0 ? Math.round((passCount / quizAttempts.length) * 100) : 75;

      const issues: string[] = [];
      let qualityScore = 100;

      if (quiz.questions.length === 0) {
        issues.push("Quiz contains no questions.");
        qualityScore -= 40;
      }

      quiz.questions.forEach((q, idx) => {
        if (!q.options || q.options.length < 3) {
          issues.push(`Question #${idx + 1} has insufficient answer options (< 3).`);
          qualityScore -= 15;
        }
        if (!q.explanation || q.explanation.trim().length < 10) {
          issues.push(`Question #${idx + 1} missing detailed explanation.`);
          qualityScore -= 10;
        }
      });

      // Flag pass rate anomalies (< 20% or > 95%)
      if (quizAttempts.length >= 5) {
        if (passRate < 20) {
          issues.push("Pass rate below 20%: Question phrasing may be ambiguous or overly difficult.");
          qualityScore -= 20;
          ambiguousCount++;
        } else if (passRate > 95) {
          issues.push("Pass rate above 95%: Quiz difficulty may be trivial.");
          qualityScore -= 10;
        }
      }

      qualityScore = Math.max(0, qualityScore);
      totalScoreSum += qualityScore;

      // Update database quality record
      await prisma.assessmentQuality.upsert({
        where: { entityId: quiz.id },
        create: {
          entityType: "Quiz",
          entityId: quiz.id,
          passRate,
          attempts: quizAttempts.length,
          qualityScore,
          isAmbiguous: passRate < 20,
        },
        update: {
          passRate,
          attempts: quizAttempts.length,
          qualityScore,
          isAmbiguous: passRate < 20,
        },
      });

      quizAudits.push({
        quizId: quiz.id,
        title: quiz.title,
        questionCount: quiz.questions.length,
        passRate,
        qualityScore,
        issues,
      });
    }

    // Audit Challenges
    for (const challenge of challenges) {
      const cProgresses = challengeProgresses.filter((cp) => cp.challengeId === challenge.id);
      const compCount = cProgresses.filter((cp) => cp.completed).length;
      const passRate = cProgresses.length > 0 ? Math.round((compCount / cProgresses.length) * 100) : 80;

      const issues: string[] = [];
      let qualityScore = 100;

      if (!challenge.solution || challenge.solution.trim().length < 10) {
        issues.push("Challenge missing complete solution.");
        qualityScore -= 30;
      }
      if (!challenge.hints || challenge.hints.length === 0) {
        issues.push("Challenge missing progressive hints.");
        qualityScore -= 15;
      }
      if (!challenge.expectedOutput) {
        issues.push("Challenge missing deterministic test assertion output.");
        qualityScore -= 25;
      }

      qualityScore = Math.max(0, qualityScore);
      totalScoreSum += qualityScore;

      await prisma.assessmentQuality.upsert({
        where: { entityId: challenge.id },
        create: {
          entityType: "Challenge",
          entityId: challenge.id,
          passRate,
          attempts: cProgresses.length,
          qualityScore,
          isAmbiguous: passRate < 20,
        },
        update: {
          passRate,
          attempts: cProgresses.length,
          qualityScore,
          isAmbiguous: passRate < 20,
        },
      });

      challengeAudits.push({
        challengeId: challenge.id,
        title: challenge.title,
        passRate,
        qualityScore,
        issues,
      });
    }

    const totalAudited = quizzes.length + challenges.length;
    const avgScore = totalAudited > 0 ? Math.round(totalScoreSum / totalAudited) : 100;

    return {
      quizAudits,
      challengeAudits,
      summary: {
        totalQuizzesAudited: quizzes.length,
        totalChallengesAudited: challenges.length,
        averageQualityScore: avgScore,
        ambiguousCount,
      },
    };
  }
}
