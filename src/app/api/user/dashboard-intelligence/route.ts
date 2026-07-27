import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { getRecommendedNextLessons } from "@/features/learning/services/learningGraphService";
import { SpacedRepetitionService } from "@/features/learning/services/spacedRepetitionService";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const user = await getSupabaseServerUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const [graphRecs, reviewTopics, lastProgress, lastQuiz] = await Promise.all([
      getRecommendedNextLessons(user.id, 1),
      SpacedRepetitionService.getUserTopicsForReview(user.id),
      prisma.progress.findFirst({
        where: { userId: user.id },
        orderBy: { updatedAt: "desc" },
        include: { lesson: true },
      }),
      prisma.quizAttempt.findFirst({
        where: { userId: user.id },
        orderBy: { completedAt: "desc" },
      }),
    ]);

    let recommendedAction = null;

    if (reviewTopics.length > 0) {
      // Memory retention decay alert takes top priority
      const topReview = reviewTopics[0];
      recommendedAction = {
        type: "SPACED_REPETITION",
        title: `Review Weak Concepts`,
        targetUrl: `/learn/javascript/${topReview.topicId}`,
        estimatedMinutes: 12,
        reason: `Memory retention score dropped to ${topReview.retentionScore}% (Last reviewed ${topReview.daysSinceLastReview} days ago).`,
      };
    } else if (graphRecs.length > 0) {
      const rec = graphRecs[0];
      recommendedAction = {
        type: "NEXT_LESSON",
        title: rec.title,
        targetUrl: `/roadmaps/full-stack/lesson/${rec.slug}`,
        estimatedMinutes: 18,
        reason: rec.reason,
      };
    } else if (lastProgress) {
      recommendedAction = {
        type: "RESUME_LEARNING",
        title: lastProgress.lesson.title,
        targetUrl: `/roadmaps/full-stack/lesson/${lastProgress.lesson.slug}`,
        estimatedMinutes: 15,
        reason: `Resume your active track. Last accessed ${new Date(lastProgress.updatedAt).toLocaleDateString()}.`,
      };
    } else {
      recommendedAction = {
        type: "START_ROADMAP",
        title: "Full-Stack Web Development",
        targetUrl: "/roadmaps/full-stack",
        estimatedMinutes: 20,
        reason: "Begin your foundational engineering career path.",
      };
    }

    return NextResponse.json({
      success: true,
      recommendedAction,
      reviewAlertsCount: reviewTopics.length,
    });
  } catch (error: any) {
    logger.error("Failed to generate dashboard intelligence", error, { userId: user.id });
    return NextResponse.json({ error: "Dashboard intelligence failed" }, { status: 500 });
  }
}
