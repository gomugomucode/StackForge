import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const submissions = await prisma.projectSubmission.findMany({
    include: {
      user: { select: { name: true, image: true } },
      reviews: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(submissions)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { submissionId, rating, comment } = await req.json()

    if (!submissionId || rating === undefined) {
      return NextResponse.json({ error: "Submission ID and rating are required" }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        submissionId,
        rating,
        comment: comment || ""
      }
    })

    // Grant XP for giving a quality review
    await prisma.user.update({
      where: { id: session.user.id },
      data: { xp: { increment: 10 } }
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("Review Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
