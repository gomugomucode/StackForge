import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addXP } from "@/features/gamification/services/xpService";
import { updateStreak } from "@/features/gamification/services/streakService";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import * as z from "zod";

const submitSchema = z.object({
  quizId: z.string().min(1),
  answers: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  const user = await getSupabaseServerUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = submitSchema.parse(body);
    const { quizId, answers } = validated;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) correctCount++;
    });

    const score = (correctCount / quiz.questions.length) * 100;

    await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        score: Math.round(score),
        correctAnswers: correctCount,
      },
    });

    if (score >= 70) {
      try {
        await addXP(user.id, "COMPLETE_QUIZ");
        await updateStreak(user.id);
      } catch (e) {
        console.warn("[quiz/submit] reward skipped:", e);
      }
    }

    return NextResponse.json({
      score: Math.round(score),
      correctCount,
      totalQuestions: quiz.questions.length,
      passed: score >= 70,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
