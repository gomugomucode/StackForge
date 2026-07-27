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

  const prereqIds = dependencies.map((d) => d.prerequisiteId);
  const completedProgress = await prisma.progress.findMany({
    where: {
      userId,
      lessonId: { in: prereqIds },
      completed: true,
    },
  });

  const completedIds = new Set(completedProgress.map((p) => p.lessonId));
  const missingPrereqs = dependencies
    .filter((d) => !completedIds.has(d.prerequisiteId))
    .map((d) => d.prerequisite.title);

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
  const [userProgress, userSkills, allLessons] = await Promise.all([
    prisma.progress.findMany({ where: { userId, completed: true } }),
    prisma.skillProficiency.findMany({ where: { userId } }),
    prisma.lesson.findMany({
      where: { status: "PUBLISHED" },
      include: {
        targetDeps: { include: { prerequisite: true } },
      },
    }),
  ]);

  const completedLessonIds = new Set(userProgress.map((p) => p.lessonId));
  const skillScoreMap = new Map(userSkills.map((s) => [s.technology.toLowerCase(), s.score]));

  const recommendations: GraphRecommendation[] = [];

  for (const lesson of allLessons) {
    // Skip if already completed
    if (completedLessonIds.has(lesson.id)) continue;

    // Check prerequisite unlock status
    const prereqIds = lesson.targetDeps.map((d) => d.prerequisiteId);
    const allPrereqsMet = prereqIds.every((id) => completedLessonIds.has(id));

    if (!allPrereqsMet) continue; // Locked node

    // Calculate Skill Gap Score (lower user skill in lesson's domain -> higher recommendation)
    let avgSkillScore = 100;
    if (lesson.skillsGained.length > 0) {
      const scores = lesson.skillsGained.map((skill) => skillScoreMap.get(skill.toLowerCase()) ?? 0);
      avgSkillScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    }

    // Relevance scoring formula: (Skill Gap Weight * 0.5) + (XP Incentive * 0.3) + (Difficulty Readiness * 0.2)
    const skillGapWeight = 100 - avgSkillScore;
    const xpIncentive = Math.min(100, lesson.xpAwarded);
    const difficultyScore = lesson.difficulty === "beginner" ? 80 : lesson.difficulty === "intermediate" ? 60 : 40;

    const relevanceScore = Math.round(skillGapWeight * 0.5 + xpIncentive * 0.3 + difficultyScore * 0.2);

    let reason = "Recommended to advance your foundational concepts.";
    if (skillGapWeight > 60) {
      reason = `Boost your proficiency in ${lesson.skillsGained.join(", ") || "core concepts"} based on your recent skill diagnostics.`;
    } else if (lesson.targetDeps.length > 0) {
      reason = `Direct next step following completion of ${lesson.targetDeps.map((d) => d.prerequisite.title).join(", ")}.`;
    }

    recommendations.push({
      lessonId: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      difficulty: lesson.difficulty,
      xpAwarded: lesson.xpAwarded,
      skillsGained: lesson.skillsGained,
      prerequisites: lesson.targetDeps.map((d) => d.prerequisite.title),
      relevanceScore,
      reason,
    });
  }

  // Sort descending by relevance score
  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit);
}
