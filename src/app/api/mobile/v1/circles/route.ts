import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id') || req.nextUrl.searchParams.get('userId') || 'demo-user'

    const [circles, myMemberships] = await Promise.all([
      prisma.circle.findMany({
        take: 15,
        include: {
          members: {
            take: 5,
            include: { user: { select: { name: true, avatar: true, githubAvatar: true } } },
          },
        },
      }),
      prisma.circleMembership.findMany({
        where: { userId },
        include: { circle: true },
      }),
    ])

    return NextResponse.json({
      circles: circles.map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description || 'Developer study group',
        membersCount: c.members.length,
        members: c.members.map((m) => ({
          userId: m.userId,
          name: m.user.name || 'Developer',
          avatar: m.user.githubAvatar || m.user.avatar,
        })),
        isMember: myMemberships.some((m) => m.circleId === c.id),
      })),
      myMemberships,
    })
  } catch (error) {
    console.error('Mobile Circles API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch study circles' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, circleId, action } = await req.json()

    if (!userId || !circleId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    if (action === 'JOIN') {
      const membership = await prisma.circleMembership.upsert({
        where: { userId_circleId: { userId, circleId } },
        update: {},
        create: { userId, circleId, role: 'MEMBER' },
      })
      return NextResponse.json({ success: true, membership })
    } else {
      await prisma.circleMembership.deleteMany({
        where: { userId, circleId },
      })
      return NextResponse.json({ success: true, action: 'LEFT' })
    }
  } catch (error) {
    console.error('Mobile Circles Join Post Error:', error)
    return NextResponse.json({ error: 'Failed to update membership' }, { status: 500 })
  }
}
