import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = req.headers.get('x-user-id') || searchParams.get('userId') || 'demo-user'
    const category = searchParams.get('category')
    const technology = searchParams.get('technology')

    // Fetch due spaced repetition cards & interview questions
    const [dueFlashcards, interviewQuestions, recentSessions] = await Promise.all([
      prisma.spacedRepetition.findMany({
        where: { userId },
        include: { user: { select: { name: true } } },
        take: 10,
      }),
      prisma.interviewQuestion.findMany({
        where: {
          ...(difficultyFilter(searchParams.get('difficulty'))),
        },
        take: 15,
        orderBy: { companyFrequency: 'desc' },
      }),
      prisma.interviewSession.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 5,
      }),
    ])

    return NextResponse.json({
      dueFlashcardsCount: dueFlashcards.length,
      dueFlashcards,
      interviewQuestions,
      recentSessions,
    })
  } catch (error) {
    console.error('Mobile Interview API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch interview content' }, { status: 500 })
  }
}

function difficultyFilter(diff: string | null) {
  if (!diff) return {}
  return { difficulty: diff }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, questionId, score, feedback } = body

    if (!userId || !questionId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    // Update or create SpacedRepetition schedule (SM-2 algorithm simulation)
    const existing = await prisma.spacedRepetition.findFirst({
      where: { userId, topicId: questionId },
    })

    const newInterval = score >= 4 ? (existing ? existing.intervalDays * 2 : 3) : 1
    const nextReviewDue = new Date()
    nextReviewDue.setDate(nextReviewDue.getDate() + newInterval)

    const updatedRepetition = await prisma.spacedRepetition.upsert({
      where: { userId_topicId: { userId, topicId: questionId } },
      update: {
        lastReviewedAt: new Date(),
        nextReviewDue,
        intervalDays: newInterval,
        retentionScore: score >= 4 ? 100.0 : 60.0,
      },
      create: {
        userId,
        topicId: questionId,
        lastReviewedAt: new Date(),
        nextReviewDue,
        intervalDays: newInterval,
        retentionScore: score >= 4 ? 100.0 : 60.0,
      },
    })

    return NextResponse.json({ success: true, updatedRepetition })
  } catch (error) {
    console.error('Mobile Interview Post Error:', error)
    return NextResponse.json({ error: 'Failed to record review' }, { status: 500 })
  }
}
