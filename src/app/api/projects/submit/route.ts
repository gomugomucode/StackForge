import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { projectId, repoUrl, demoUrl, description } = await req.json()

    if (!projectId || !repoUrl) {
      return NextResponse.json({ error: "Project ID and Repo URL are required" }, { status: 400 })
    }

    const submission = await prisma.projectSubmission.create({
      data: {
        userId: session.user.id,
        projectId,
        repoUrl,
        demoUrl: demoUrl || null,
        description: description || null,
      }
    })

    // Grant XP for submitting a project
    await prisma.user.update({
      where: { id: session.user.id },
      data: { xp: { increment: 50 } }
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error("Submission Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
