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

export async function GET() {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
