import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const [challenges, topProfiles] = await Promise.all([
      prisma.challenge.findMany({
        take: 10,
        include: { topic: { select: { title: true, technology: true } } },
      }),
      prisma.profile.findMany({
        take: 10,
        orderBy: { xp: 'desc' },
        include: { user: { select: { name: true, avatar: true, githubAvatar: true } } },
      }),
    ])

    return NextResponse.json({
      activeChallenge: challenges[0] ? {
        id: challenges[0].id,
        title: challenges[0].title,
        description: challenges[0].description,
        difficulty: challenges[0].difficulty,
        technology: challenges[0].topic?.technology || 'TypeScript',
        timeLimitSeconds: 900, // 15-minute sprint
        xpReward: 250,
      } : null,
      challenges,
      leaderboards: {
        global: topProfiles.map((p, rank) => ({
          rank: rank + 1,
          name: p.user.name || 'Developer',
          avatar: p.user.githubAvatar || p.user.avatar,
          xp: p.xp,
          level: p.level,
        })),
      },
    })
  } catch (error) {
    console.error('Mobile Challenges API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 })
  }
}
