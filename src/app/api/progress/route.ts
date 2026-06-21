import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { addXP, XP_REWARDS } from "@/features/gamification/services/xpService";
import { calculateLevel } from "@/lib/gamification";

/**
 * Lesson-based progress. The schema uses `Progress` with `lessonId`.
 * Earlier versions referenced a non-existent `userProgress` model —
 * fixed here.
 */

export async function GET(req: Request) {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const topicId = searchParams.get("topicId");

  if (topicId) {
    const topicProgress = await prisma.topicProgress.findUnique({
      where: {
        userId_topicId: { userId: user.id, topicId },
      },
    });

    return NextResponse.json({
      completed: topicProgress?.completed || false,
      quizScore: 0, // Will be fetched from QuizAttempt in Phase 5
      challengesCompleted: 0, // Will be calculated in Phase 6
      totalChallenges: 0,
      lastAccessed: topicProgress?.lastAccessed,
      completedAt: topicProgress?.completedAt,
    });
  }

  const progress = await prisma.progress.findMany({
    where: { userId: user.id },
  });
  return NextResponse.json({ completedNodes: progress.map((p) => p.lessonId) });
}

export async function POST(req: Request) {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { lessonId } = await req.json();
  if (!lessonId) {
    return NextResponse.json(
      { error: "lessonId is required" },
      { status: 400 }
    );
  }

  const progress = await prisma.progress.upsert({
    where: {
      userId_lessonId: { userId: user.id, lessonId },
    },
    update: { completed: true },
    create: {
      userId: user.id,
      lessonId,
      completed: true,
    },
  });

  // Update Roadmap Progress
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: { include: { roadmap: true } } }
    });

    if (lesson?.module?.roadmapId) {
      const roadmapId = lesson.module.roadmapId;
      
      const totalLessons = await prisma.lesson.count({
        where: { module: { roadmapId } }
      });

      const completedLessonsCount = await prisma.progress.count({
        where: {
          userId: user.id,
          lesson: { module: { roadmapId } },
          completed: true
        }
      });

      const completionPercentage = Math.round((completedLessonsCount / totalLessons) * 100);

      await prisma.roadmapCompletion.upsert({
        where: {
          userId_roadmapId: {
            userId: user.id,
            roadmapId: roadmapId,
          },
        },
        update: {
          completionPercentage,
          updatedAt: new Date(),
        },
        create: {
          userId: user.id,
          roadmapId: roadmapId,
          completionPercentage,
        },
      });
    }
  } catch (e) {
    console.error("Error updating roadmap progress for lesson:", e);
  }

  // Award XP for lesson completion. addXP writes to the Profile table
  // (which is the spec's user_stats).
  let updatedProfile: Awaited<ReturnType<typeof addXP>> | null = null;
  try {
    updatedProfile = await addXP(user.id, "READ_LESSON");
  } catch (e) {
    // Lazy-create the Profile if it's missing for some reason.
    await prisma.profile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });
    updatedProfile = await addXP(user.id, "READ_LESSON");
  }

  return NextResponse.json({
    progress,
    user: {
      xp: updatedProfile.xp,
      level: updatedProfile.level,
    },
  });
}
