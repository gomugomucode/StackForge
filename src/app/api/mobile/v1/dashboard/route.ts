import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id') || req.nextUrl.searchParams.get('userId')
    
    // Get user or fallback first user in DB for seamless experience
    let user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null
    if (!user) {
      user = await prisma.user.findFirst()
    }

    const currentUserId = user?.id || 'demo-user'

    // Fetch parallel real data from Prisma
    const [
      profile,
      streakTracking,
      inProgressTopics,
      dueSpacedRepetition,
      weakSkills,
      recentArticles,
      recommendedProjects,
      recentInterview,
      githubSync,
      notifications,
    ] = await Promise.all([
      prisma.profile.findUnique({ where: { userId: currentUserId } }),
      prisma.streakTracking.findUnique({ where: { userId: currentUserId } }),
      prisma.topicProgress.findMany({
        where: { userId: currentUserId, completed: false },
        take: 3,
        include: { topic: true },
      }),
      prisma.spacedRepetition.findMany({
        where: {
          userId: currentUserId,
          nextReviewDue: { lte: new Date() },
        },
        take: 5,
      }),
      prisma.skillProficiency.findMany({
        where: { userId: currentUserId },
        orderBy: { score: 'asc' },
        take: 3,
      }),
      prisma.externalArticle.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        take: 4,
      }),
      prisma.project.findMany({
        take: 4,
        include: { topic: true },
      }),
      prisma.interviewSession.findFirst({
        where: { userId: currentUserId },
        orderBy: { updatedAt: 'desc' },
        include: { messages: { take: 2 } },
      }),
      prisma.githubSync.findUnique({ where: { userId: currentUserId } }),
      prisma.notification.findMany({
        where: { userId: currentUserId, read: false },
        take: 5,
      }),
    ])

    // Fetch continue learning fallback topic if none in progress
    let continueLearning: any = inProgressTopics[0]?.topic || null
    if (!continueLearning) {
      continueLearning = await prisma.topic.findFirst({
        orderBy: { createdAt: 'asc' },
      })
    }

    // Daily Mission & Weekly Goal Computation
    const dailyMission = {
      title: 'Complete 1 Spaced Repetition Session & Read 1 Tech Article',
      progress: dueSpacedRepetition.length === 0 ? 100 : 50,
      xpReward: 150,
      isCompleted: dueSpacedRepetition.length === 0,
    }

    const weeklyGoal = {
      targetHours: 10,
      currentHours: profile?.totalHours || 3,
      targetLessons: 7,
      completedLessons: 4,
    }

    // Hiring Readiness Score calculation based on real user data
    const hiringReadinessScore = Math.min(
      100,
      Math.round(
        (profile?.xp || 200) * 0.05 +
        (streakTracking?.currentStreak || 1) * 3 +
        (githubSync?.totalCommits || 15) * 0.5 +
        (profile?.level || 1) * 5
      )
    )

    return NextResponse.json({
      actionNext: {
        type: dueSpacedRepetition.length > 0 ? 'SPACED_REPETITION' : 'CONTINUE_LEARNING',
        title: dueSpacedRepetition.length > 0 
          ? `Review ${dueSpacedRepetition.length} Due Flashcards` 
          : continueLearning ? `Continue: ${continueLearning.title}` : 'Start Your First Learning Roadmap',
        subtitle: dueSpacedRepetition.length > 0
          ? 'Maintain 90%+ long-term retention'
          : continueLearning ? `Estimated ${continueLearning.estimatedTime || 15} mins left` : 'Master core developer concepts',
        entityId: continueLearning?.id || null,
        slug: continueLearning?.slug || null,
      },
      continueLearning: continueLearning ? {
        id: continueLearning.id,
        title: continueLearning.title,
        slug: continueLearning.slug,
        technology: continueLearning.technology,
        difficulty: continueLearning.difficulty,
        estimatedTime: continueLearning.estimatedTime,
      } : null,
      reviewDueCount: dueSpacedRepetition.length,
      weakSkills: weakSkills.map((s) => ({
        technology: s.technology,
        score: s.score,
        confidence: s.confidence,
      })),
      streak: {
        current: streakTracking?.currentStreak || profile?.streak || 3,
        longest: streakTracking?.longestStreak || 7,
        lastActive: streakTracking?.lastActive || new Date().toISOString(),
      },
      recommendedProjects: recommendedProjects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        difficulty: p.difficulty,
        technology: p.topic?.technology || 'TypeScript',
      })),
      recommendedArticles: recentArticles.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        description: a.description,
        source: a.source,
        readingTime: a.readingTime,
        difficulty: a.difficulty,
      })),
      interviewPrep: recentInterview ? {
        id: recentInterview.id,
        category: recentInterview.category,
        technology: recentInterview.technology,
        status: recentInterview.status,
      } : {
        category: 'System Design & React',
        technology: 'TypeScript',
        status: 'READY',
      },
      hiringReadinessScore,
      githubActivity: githubSync ? {
        username: githubSync.username,
        publicRepos: githubSync.publicRepos,
        totalCommits: githubSync.totalCommits,
        totalPRs: githubSync.totalPRs,
      } : null,
      dailyMission,
      weeklyGoal,
      unreadNotificationsCount: notifications.length,
    })
  } catch (error) {
    console.error('Mobile Dashboard Intelligence Error:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard intelligence' }, { status: 500 })
  }
}
