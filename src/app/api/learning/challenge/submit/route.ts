import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { addXP } from "@/features/gamification/services/xpService";

export async function POST(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { challengeId, solution } = body;

    if (!challengeId || !solution) {
      return NextResponse.json({ error: "challengeId and solution are required" }, { status: 400 });
    }

    // In a real system, we would evaluate the code here.
    // For now, we mark as completed if a solution was provided.
    const progress = await prisma.challengeProgress.upsert({
      where: {
        userId_challengeId: {
          userId: user.id,
          challengeId,
        },
      },
      update: { completed: true },
      create: {
        userId: user.id,
        challengeId,
        completed: true,
      },
    });

    // Award XP once for the first completion
    await addXP(user.id, "CHALLENGE_COMPLETION", challengeId);

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("[API /learning/challenge/submit] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
