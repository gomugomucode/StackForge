import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { hasAccess } from "@/lib/access-control"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const certs = await prisma.certification.findMany({
    where: { userId: session.user.id },
    orderBy: { issuedAt: 'desc' }
  })

  return NextResponse.json(certs)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { roadmapId, score } = await req.json()

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    // Check Certification limit
    const certCount = await prisma.certification.count({
      where: { userId: session.user.id }
    })
    if (!hasAccess(user.plan as any, 'certificationsLimit', certCount)) {
      return NextResponse.json({ 
        error: "Certification limit reached", 
        upgradeUrl: "/pricing",
        plan: user.plan 
      }, { status: 403 })
    }

    if (!roadmapId) {
      return NextResponse.json({ error: "Roadmap ID is required" }, { status: 400 })
    }

    // Double check if all nodes are actually completed before issuing
    // This is a server-side safety check to prevent API abuse
    const progress = await prisma.userProgress.findMany({
      where: {
        userId: session.user.id,
        nodeId: {
          in: (await import('@/data/roadmaps')).roadmaps
            .find(r => r.id === roadmapId)?.nodes.map(n => n.id) || []
        },
        completed: true
      }
    })

    const roadmap = (await import('@/data/roadmaps')).roadmaps.find(r => r.id === roadmapId)
    if (!roadmap) return NextResponse.json({ error: "Roadmap not found" }, { status: 404 })

    if (progress.length < roadmap.nodes.length) {
      return NextResponse.json({ error: "All nodes must be completed first" }, { status: 400 })
    }

    const cert = await prisma.certification.upsert({
      where: {
        userId_roadmapId: {
          userId: session.user.id,
          roadmapId: roadmapId
        }
      },
      update: {
        score: score,
        issuedAt: new Date()
      },
      create: {
        userId: session.user.id,
        roadmapId: roadmapId,
        score: score
      }
    })

    return NextResponse.json(cert)
  } catch (error) {
    console.error("Certification API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
