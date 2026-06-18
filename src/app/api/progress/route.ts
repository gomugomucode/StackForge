import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { XP_REWARDS } from "@/lib/gamification"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const progress = await prisma.userProgress.findMany({
    where: { userId: session.user.id }
  })

  return NextResponse.json({
    completedNodes: progress.map(p => p.nodeId)
  })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { nodeId } = await req.json()

  const progress = await prisma.userProgress.upsert({
    where: {
      userId_nodeId: {
        userId: session.user.id,
        nodeId
      }
    },
    update: { completed: true },
    create: {
      userId: session.user.id,
      nodeId,
      completed: true
    }
  })

  // Grant XP for completion
  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      xp: {
        increment: XP_REWARDS.NODE_COMPLETION
      }
    }
  })

  return NextResponse.json({
    progress,
    user: {
      xp: updatedUser.xp,
      level: updatedUser.level // Note: Level is updated manually or via a trigger in DB
    }
  })
}
