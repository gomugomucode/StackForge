import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const members = await prisma.circleMembership.findMany({
      where: { userId: session.user.id },
      include: {
        circle: true
      }
    })

    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { circleId } = await req.json()

    if (!circleId) return NextResponse.json({ error: "Circle ID is required" }, { status: 400 })

    const membership = await prisma.circleMembership.upsert({
      where: {
        userId_circleId: {
          userId: session.user.id,
          circleId: circleId
        }
      },
      update: {},
      create: {
        userId: session.user.id,
        circleId: circleId,
        role: 'MEMBER'
      }
    })

    return NextResponse.json(membership)
  } catch (error) {
    console.error("Join Circle Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
