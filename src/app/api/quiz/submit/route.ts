import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { addXP } from "@/features/gamification/services/xpService";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { quizId, answers } = body;

    if (!quizId || !answers) {
      return NextResponse.json({ error: "quizId and answers are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((q, index) => {
      if (q.answer === answers[index]) {
        correctCount++;
      }
    });

    const score = correctCount;
    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 80; // Assume 80% pass rate

    // Save attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        score,
        percentage,
        passed,
        correctAnswers: correctCount,
      },
    });

    // Award XP on first pass only based on quiz type
    if (passed) {
      const xpReward = quiz.type === 'quick' ? 10 : 50;
      await addXP(user.id, `QUIZ_PASS_${quiz.type.toUpperCase()}`, quizId, xpReward);
    }

    return NextResponse.json({
      success: true,
      attempt,
      passed,
      percentage,
    });
  } catch (error) {
    console.error("[API /quiz/submit] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
