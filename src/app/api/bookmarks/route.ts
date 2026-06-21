import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function GET() {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: user.id },
  });

  return NextResponse.json(bookmarks);
}

export async function POST(req: Request) {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resourceId, type } = await req.json();
  if (!resourceId || !type) {
    return NextResponse.json(
      { error: "resourceId and type are required" },
      { status: 400 }
    );
  }

  const bookmark = await prisma.bookmark.upsert({
    where: {
      userId_resourceId: {
        userId: user.id,
        resourceId,
      },
    },
    update: {},
    create: {
      userId: user.id,
      resourceId,
      type,
    },
  });

  return NextResponse.json(bookmark);
}

export async function DELETE(req: Request) {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resourceId } = await req.json();
  if (!resourceId) {
    return NextResponse.json(
      { error: "resourceId is required" },
      { status: 400 }
    );
  }

  // Make sure the bookmark belongs to the caller before deleting it.
  const existing = await prisma.bookmark.findUnique({
    where: { userId_resourceId: { userId: user.id, resourceId } },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const deleted = await prisma.bookmark.delete({
    where: { userId_resourceId: { userId: user.id, resourceId } },
  });

  return NextResponse.json({ deleted });
}
