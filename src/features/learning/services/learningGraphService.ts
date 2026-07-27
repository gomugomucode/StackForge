import { prisma } from "@/lib/prisma";

export interface GraphRecommendation {
  lessonId: string;
  title: string;
  slug: string;
  difficulty: string;
  xpAwarded: number;
  skillsGained: string[];
  prerequisites: string[];
  relevanceScore: number;
  reason: string;
}

/**
 * Evaluates whether a lesson is unlocked for a specific user based on prerequisite DAG rules.
 */
export async function checkLessonUnlocked(userId: string, lessonId: string): Promise<{ unlocked: boolean; missingPrereqs: string[] }> {
  const dependencies = await prisma.lessonDependency.findMany({
    where: { lessonId },
    include: { prerequisite: true },
  });

  if (dependencies.length === 0) {
    return { unlocked: true, missingPrereqs: [] };
  }

  const prereqIds = dependencies.map((d: any) => d.prerequisiteId);
  const completedProgress = await prisma.progress.findMany({
    where: {
      userId,
      lessonId: { in: prereqIds },
      completed: true,
    },
  });

  const completedIds = new Set(completedProgress.map((p: any) => p.lessonId));
  const missingPrereqs = dependencies
    .filter((d: any) => !completedIds.has(d.prerequisiteId))
    .map((d: any) => d.prerequisite.title);

  return {
    unlocked: missingPrereqs.length === 0,
    missingPrereqs,
  };
}

/**
 * Graph-based Recommendation Engine using Topological Skill-Gap Analysis
 */
export async function getRecommendedNextLessons(userId: string, limit = 5): Promise<GraphRecommendation[]> {
  // 1. Fetch user completion state & skill proficiencies
  let userProgress: any[] = [];
  let userSkills: any[] = [];
  let allLessons: any[] = [];

  try {
    userProgress = await prisma.progress.findMany({ where: { userId, completed: true } });
  } catch {}
  try {
    userSkills = await prisma.skillProficiency.findMany({ where: { userId } });
  } catch {}
  try {
    allLessons = await prisma.lesson.findMany({
      include: {
        targetDeps: { include: { prerequisite: true } },
      },
    });
  } catch {}

  const completedLessonIds = new Set(userProgress.map((p: any) => p.lessonId));
  const skillScoreMap = new Map<string, number>(userSkills.map((s: any) => [s.technology.toLowerCase(), s.score]));

  const recommendations: GraphRecommendation[] = [];

  for (const lesson of allLessons) {
    // Skip if already completed
    if (completedLessonIds.has(lesson.id)) continue;

    // Check prerequisite unlock status
    const targetDeps = lesson.targetDeps || [];
    const prereqIds = targetDeps.map((d: any) => d.prerequisiteId);
    const allPrereqsMet = prereqIds.every((id: string) => completedLessonIds.has(id));

    if (!allPrereqsMet) continue; // Locked node

    // Calculate Skill Gap Score (lower user skill in lesson's domain -> higher recommendation)
    let avgSkillScore = 100;
    const skillsGained: string[] = lesson.skillsGained || [];
    if (skillsGained.length > 0) {
      const scores = skillsGained.map((skill: string) => skillScoreMap.get(skill.toLowerCase()) ?? 0);
      avgSkillScore = scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
    }

    // Relevance scoring formula: (Skill Gap Weight * 0.5) + (XP Incentive * 0.3) + (Difficulty Readiness * 0.2)
    const skillGapWeight = 100 - avgSkillScore;
    const xpIncentive = Math.min(100, lesson.xpAwarded || 50);
    const difficultyScore = lesson.difficulty === "beginner" ? 80 : lesson.difficulty === "intermediate" ? 60 : 40;

    const relevanceScore = Math.round(skillGapWeight * 0.5 + xpIncentive * 0.3 + difficultyScore * 0.2);

    let reason = "Recommended to advance your foundational concepts.";
    if (skillGapWeight > 60) {
      reason = `Boost your proficiency in ${skillsGained.join(", ") || "core concepts"} based on your recent skill diagnostics.`;
    } else if (targetDeps.length > 0) {
      reason = `Direct next step following completion of ${targetDeps.map((d: any) => d.prerequisite?.title || "").join(", ")}.`;
    }

    recommendations.push({
      lessonId: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      difficulty: lesson.difficulty || "beginner",
      xpAwarded: lesson.xpAwarded || 50,
      skillsGained,
      prerequisites: targetDeps.map((d: any) => d.prerequisite?.title || ""),
      relevanceScore,
      reason,
    });
  }

  // Sort descending by relevance score
  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit);
}
