import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { addXP } from "@/features/gamification/services/xpService";
import { CodeExecutionService } from "@/features/sandbox/services/codeExecutionService";

export async function POST(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { challengeId, solution, language = "javascript" } = body;

    if (!challengeId || !solution || typeof solution !== "string") {
      return NextResponse.json(
        { error: "challengeId and solution string are required" },
        { status: 400 }
      );
    }

    // Fetch challenge target metadata if stored in database
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    }).catch(() => null);

    // Run real code evaluation against CodeExecutionService
    const executionResult = await CodeExecutionService.executeCode(solution, language);

    if (!executionResult.success) {
      return NextResponse.json({
        success: false,
        error: executionResult.error || "Code execution failed",
        output: executionResult.output,
        executionTime: executionResult.executionTime,
      }, { status: 422 });
    }

    // Validate expected output if defined on the challenge model
    if (challenge?.expectedOutput) {
      const normalizedActual = executionResult.output.trim().toLowerCase();
      const normalizedExpected = challenge.expectedOutput.trim().toLowerCase();

      if (!normalizedActual.includes(normalizedExpected)) {
        return NextResponse.json({
          success: false,
          error: `Output mismatch. Expected to find "${challenge.expectedOutput}", but received "${executionResult.output.trim()}"`,
          output: executionResult.output,
          executionTime: executionResult.executionTime,
        }, { status: 422 });
      }
    }

    // Record verified completion in database
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

    // Award XP for verified completion
    try {
      await addXP(user.id, "CHALLENGE_COMPLETION", challengeId);
    } catch (e) {
      console.warn("[challenge/submit] XP reward skipped or already claimed:", e);
    }

    return NextResponse.json({
      success: true,
      output: executionResult.output,
      executionTime: executionResult.executionTime,
      progress,
    });
  } catch (error: any) {
    console.error("[API /learning/challenge/submit] Error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
