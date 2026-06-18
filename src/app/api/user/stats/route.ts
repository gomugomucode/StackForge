import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  return NextResponse.json({
    xp: user.xp,
    level: user.level,
    streak: user.streak
  })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const lastLogin = user.updatedAt // Simple approximation
  const today = new Date().toISOString().split('T')[0]
  const lastLoginDate = lastLogin.toISOString().split('T')[0]

  let newStreak = user.streak
  if (lastLoginDate !== today) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (lastLoginDate === yesterdayStr) {
      newStreak += 1
    } else {
      newStreak = 1
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      streak: newStreak,
      updatedAt: new Date()
    }
  })

  return NextResponse.json(updatedUser)
}
