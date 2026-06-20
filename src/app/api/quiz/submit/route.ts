import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addXP } from '@/features/gamification/services/xpService';
import { updateStreak } from '@/features/gamification/services/streakService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId, answers } = await req.json();

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correctCount++;
      }
    });

    const score = (correctCount / quiz.questions.length) * 100;

    // Record attempt
    await prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId: quizId,
        score: Math.round(score),
        correctAnswers: correctCount,
      },
    });

    // Award XP if they passed (e.g., > 70%)
    if (score >= 70) {
      await addXP(session.user.id, 'COMPLETE_QUIZ');
      await updateStreak(session.user.id);
    }

    return NextResponse.json({
      score: Math.round(score),
      correctCount,
      totalQuestions: quiz.questions.length,
      passed: score >= 70,
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
