import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const [recentAchievements, recentSubmissions, topDailyActivities] = await Promise.all([
      prisma.achievement.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, avatar: true, githubAvatar: true } } },
      }),
      prisma.projectSubmission.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          project: { select: { title: true } },
          user: { select: { name: true, avatar: true, githubAvatar: true } },
        },
      }),
      prisma.dailyActivity.findMany({
        take: 10,
        orderBy: { xpEarned: 'desc' },
        include: { user: { select: { name: true, avatar: true, githubAvatar: true } } },
      }),
    ])

    // Format rich developer social activity feed items
    const feedItems = [
      ...recentAchievements.map((a) => ({
        id: `ach_${a.id}`,
        type: 'ACHIEVEMENT',
        user: {
          name: a.user.name || 'Developer',
          avatar: a.user.githubAvatar || a.user.avatar,
        },
        title: `Earned Badge: ${a.name}`,
        subtitle: a.description || 'Mastered a new technical milestone',
        timestamp: a.createdAt,
        likes: 12,
      })),
      ...recentSubmissions.map((s) => ({
        id: `sub_${s.id}`,
        type: 'PROJECT_SUBMISSION',
        user: {
          name: s.user.name || 'Developer',
          avatar: s.user.githubAvatar || s.user.avatar,
        },
        title: `Submitted Project: ${s.project.title}`,
        subtitle: `Repository: ${s.repoUrl}`,
        timestamp: s.createdAt,
        likes: 18,
      })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json({
      feedItems,
      leaderboard: topDailyActivities.map((da) => ({
        userId: da.userId,
        name: da.user.name || 'Developer',
        avatar: da.user.githubAvatar || da.user.avatar,
        xpEarned: da.xpEarned,
      })),
    })
  } catch (error) {
    console.error('Mobile Social Feed API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch social feed' }, { status: 500 })
  }
}
