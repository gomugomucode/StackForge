import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session.user.id }
  })

  return NextResponse.json(bookmarks)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { resourceId, type } = await req.json()

  const bookmark = await prisma.bookmark.upsert({
    where: {
      userId_resourceId: {
        userId: session.user.id,
        resourceId
      }
    },
    update: {}, // Do nothing on update, we handle delete via a separate route or logic
    create: {
      userId: session.user.id,
      resourceId,
      type
    }
  })

  return NextResponse.json(bookmark)
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { resourceId } = await req.json()

  const deleted = await prisma.bookmark.delete({
    where: {
      userId_resourceId: {
        userId: session.user.id,
        resourceId
      }
    }
  })

  return NextResponse.json({ deleted })
}
