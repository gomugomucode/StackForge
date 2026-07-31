import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id') || req.nextUrl.searchParams.get('userId')

    if (!userId) {
      // Fallback demo user for initial explore state if requested
      const demoUser = await prisma.user.findFirst({
        include: {
          profile: true,
          streakTrackings: true,
          skillProficiencies: true,
        },
      })

      if (!demoUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      return NextResponse.json(formatUserSession(demoUser))
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        streakTrackings: true,
        skillProficiencies: true,
        accounts: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User session invalid' }, { status: 404 })
    }

    return NextResponse.json(formatUserSession(user))
  } catch (error) {
    console.error('Mobile Auth Session Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

function formatUserSession(user: any) {
  // Strict Avatar Priority Rule: OAuth avatar -> Uploaded avatar -> Initials monogram
  const oauthAccount = user.accounts?.find((a: any) => a.provider === 'github' || a.provider === 'google')
  const oauthAvatar = user.githubAvatar || (oauthAccount ? null : null)
  
  const displayAvatar = oauthAvatar || user.avatar || null
  
  const nameParts = (user.name || user.email || 'Developer').split(' ')
  const initials = nameParts.length >= 2 
    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    : `${nameParts[0][0]}${nameParts[0][1] || ''}`.toUpperCase()

  return {
    id: user.id,
    name: user.name || 'StackForge Developer',
    email: user.email,
    role: user.role,
    plan: user.plan,
    avatar: displayAvatar,
    avatarType: oauthAvatar ? 'OAUTH' : user.avatar ? 'UPLOADED' : 'INITIALS',
    initials,
    githubUsername: user.githubUsername,
    publicProfile: user.publicProfile,
    profile: {
      xp: user.profile?.xp || 0,
      level: user.profile?.level || 1,
      streak: user.streakTrackings?.currentStreak || user.profile?.streak || 0,
      totalHours: user.profile?.totalHours || 0,
      skillLevel: user.profile?.skillLevel || 'Intermediate',
      interests: user.profile?.interests || [],
      goal: user.profile?.goal || 'Senior Full-Stack Engineer',
    },
    skillProficiencies: user.skillProficiencies || [],
  }
}
