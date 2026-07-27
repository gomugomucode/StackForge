import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { addXP } from "@/features/gamification/services/xpService";
import { GithubSyncService } from "@/features/github/services/githubSyncService";

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

    // Run Structured Multidimensional Project Review
    const evaluation = await GithubSyncService.evaluateProjectRepository(repoUrl);
    const autoReview = await prisma.projectReview.create({
      data: {
        submissionId: submission.id,
        overallScore: evaluation.overallScore,
        readmeScore: evaluation.readmeScore,
        codeQuality: evaluation.codeQuality,
        testCoverage: evaluation.testCoverage,
        securityScore: evaluation.securityScore,
        feedbackJson: JSON.stringify(evaluation.feedback),
      },
    });

    // Award XP
    try {
      await addXP(user.id, "CHALLENGE_COMPLETION");
    } catch (e) {
      console.warn("[projects/submit] xp reward skipped:", e);
    }

    return NextResponse.json({
      submission,
      autoReview: {
        ...autoReview,
        feedback: evaluation.feedback,
      },
    });
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
