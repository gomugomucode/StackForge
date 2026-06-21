import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { addXP } from "@/features/gamification/services/xpService";

export async function POST(req: Request) {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { projectId, repoUrl, demoUrl, description } = await req.json();
    if (!projectId || !repoUrl) {
      return NextResponse.json(
        { error: "Project ID and Repo URL are required" },
        { status: 400 }
      );
    }

    const submission = await prisma.projectSubmission.create({
      data: {
        userId: user.id,
        projectId,
        repoUrl,
        demoUrl: demoUrl || null,
        description: description || null,
      },
    });

    // Award XP for submitting a project. addXP writes to the Profile
    // table (the spec's user_stats).
    try {
      await addXP(user.id, "COMPLETE_QUIZ"); // nearest available reward; reward table is unchanged
    } catch (e) {
      console.warn("[projects/submit] xp reward skipped:", e);
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
