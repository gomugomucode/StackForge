import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const topicSlug = searchParams.get('topicSlug')
    const lessonId = searchParams.get('lessonId')
    const category = searchParams.get('category')

    // Detail query for specific lesson
    if (lessonId) {
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
          module: { include: { roadmap: true } },
          resources: true,
        },
      })
      if (!lesson) {
        return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
      }
      return NextResponse.json(lesson)
    }

    // Detail query for specific topic
    if (topicSlug) {
      const topic = await prisma.topic.findUnique({
        where: { slug: topicSlug },
        include: {
          content: true,
          examples: true,
          challenges: true,
          quizzes: { include: { questions: true } },
          cheatSheets: true,
          interviews: true,
        },
      })
      if (!topic) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
      }
      return NextResponse.json(topic)
    }

    // List all roadmaps and topics for the learning tab
    const [roadmaps, topics] = await Promise.all([
      prisma.roadmap.findMany({
        where: category ? { category } : undefined,
        include: {
          modules: {
            include: {
              lessons: { select: { id: true, title: true, difficulty: true, estimatedHours: true } },
            },
          },
        },
      }),
      prisma.topic.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: {
          id: true,
          slug: true,
          title: true,
          technology: true,
          difficulty: true,
          estimatedTime: true,
          tags: true,
        },
      }),
    ])

    return NextResponse.json({
      roadmaps,
      topics,
    })
  } catch (error) {
    console.error('Mobile Learning API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch learning content' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, lessonId, topicId, completed, score } = body

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    if (lessonId) {
      const progress = await prisma.progress.upsert({
        where: { userId_lessonId: { userId, lessonId } },
        update: {
          completed: completed ?? true,
          completedAt: completed ? new Date() : null,
          lastAccessed: new Date(),
        },
        create: {
          userId,
          lessonId,
          completed: completed ?? true,
          completedAt: completed ? new Date() : null,
        },
      })

      // Award XP in profile
      await prisma.profile.update({
        where: { userId },
        data: { xp: { increment: 50 } },
      })

      return NextResponse.json({ success: true, progress, xpAwarded: 50 })
    }

    if (topicId) {
      const topicProgress = await prisma.topicProgress.upsert({
        where: { userId_topicId: { userId, topicId } },
        update: {
          completed: completed ?? true,
          completedAt: completed ? new Date() : null,
          lastAccessed: new Date(),
        },
        create: {
          userId,
          topicId,
          completed: completed ?? true,
          completedAt: completed ? new Date() : null,
        },
      })

      return NextResponse.json({ success: true, topicProgress })
    }

    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  } catch (error) {
    console.error('Mobile Learning Progress Post Error:', error)
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}
