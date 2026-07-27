import { prisma } from "@/lib/prisma";
import { getRecommendedNextLessons } from "@/features/learning/services/learningGraphService";

export interface GroundedUserContext {
  userId: string;
  name: string | null;
  email: string | null;
  activeRoadmap: { title: string; completionPercentage: number } | null;
  recentCompletedLessons: string[];
  failedQuizTopics: string[];
  completedChallengesCount: number;
  latestProjectReview: {
    title: string;
    overallScore: number;
    readmeScore: number;
    codeQuality: number;
    securityScore: number;
  } | null;
  skillProficiencies: Array<{ tech: string; score: number; confidence: string }>;
  goal: string | null;
  graphRecommendations: Array<{ title: string; reason: string }>;
}

export async function buildGroundedUserContext(userId: string): Promise<GroundedUserContext> {
  const [user, profile, completedLessons, failedQuizzes, challenges, latestSubmission, skills, roadmapComp] =
    await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.profile.findUnique({ where: { userId } }),
      prisma.progress.findMany({
        where: { userId, completed: true },
        take: 5,
        orderBy: { updatedAt: "desc" },
        include: { lesson: { select: { title: true } } },
      }),
      prisma.quizAttempt.findMany({
        where: { userId, passed: false },
        take: 5,
        orderBy: { completedAt: "desc" },
      }),
      prisma.challengeProgress.count({ where: { userId, completed: true } }),
      prisma.projectSubmission.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { project: true, autoReview: true },
      }),
      prisma.skillProficiency.findMany({ where: { userId } }),
      prisma.roadmapCompletion.findFirst({
        where: { userId },
        orderBy: { updatedAt: "desc" },
        include: { roadmap: true },
      }),
    ]);

  const graphRecs = await getRecommendedNextLessons(userId, 3);

  return {
    userId,
    name: user?.name || null,
    email: user?.email || null,
    activeRoadmap: roadmapComp
      ? { title: roadmapComp.roadmap.title, completionPercentage: roadmapComp.completionPercentage }
      : null,
    recentCompletedLessons: completedLessons.map((p) => p.lesson.title),
    failedQuizTopics: failedQuizzes.map((q) => `Quiz ID ${q.quizId} (Score: ${q.percentage}%)`),
    completedChallengesCount: challenges,
    latestProjectReview: latestSubmission?.autoReview
      ? {
          title: latestSubmission.project.title,
          overallScore: latestSubmission.autoReview.overallScore,
          readmeScore: latestSubmission.autoReview.readmeScore,
          codeQuality: latestSubmission.autoReview.codeQuality,
          securityScore: latestSubmission.autoReview.securityScore,
        }
      : null,
    skillProficiencies: skills.map((s) => ({ tech: s.technology, score: s.score, confidence: s.confidence })),
    goal: profile?.goal || null,
    graphRecommendations: graphRecs.map((r) => ({ title: r.title, reason: r.reason })),
  };
}
