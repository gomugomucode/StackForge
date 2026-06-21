import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { challengeId, solution } = body;

    if (!challengeId || !solution) {
      return NextResponse.json(
        { error: "challengeId and solution are required" },
        { status: 400 }
      );
    }

    // Fetch the challenge to validate the solution
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
      include: { topic: true },
    });

    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    // Normalize solutions for comparison (trim whitespace)
    const normalizedUserSolution = solution.trim();
    const normalizedExpectedSolution = challenge.solution.trim();

    // Simple string-based comparison (can be expanded later with sandboxed execution)
    const isCorrect =
      normalizedUserSolution === normalizedExpectedSolution ||
      normalizedUserSolution.replace(/\s+/g, "") ===
        normalizedExpectedSolution.replace(/\s+/g, "");

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Award XP if correct
    if (isCorrect) {
      const xpAmount =
        challenge.difficulty === "advanced"
          ? 50
          : challenge.difficulty === "intermediate"
          ? 30
          : 15;

      await prisma.xpTransaction.create({
        data: {
          userId: user.id,
          amount: xpAmount,
          reason: "COMPLETE_CHALLENGE",
        },
      });

      // Update profile XP
      await prisma.profile.upsert({
        where: { userId: user.id },
        update: { xp: { increment: xpAmount } },
        create: { userId: user.id, xp: xpAmount },
      });
    }

    return NextResponse.json({
      success: true,
      isCorrect,
      expectedOutput: challenge.expectedOutput,
      xpAwarded: isCorrect
        ? challenge.difficulty === "advanced"
          ? 50
          : challenge.difficulty === "intermediate"
          ? 30
          : 15
        : 0,
    });
  } catch (error) {
    console.error("[API /learning/challenge/submit] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
