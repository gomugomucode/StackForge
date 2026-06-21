import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roadmapId = searchParams.get("roadmapId");

  const circles = await prisma.circle.findMany({
    where: roadmapId ? { roadmapId } : {},
    include: { _count: { select: { members: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(circles);
}

export async function POST(req: Request) {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, description, roadmapId } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: "Circle name is required" },
        { status: 400 }
      );
    }

    const circle = await prisma.circle.create({
      data: {
        name,
        description,
        roadmapId,
        members: {
          create: {
            userId: user.id,
            role: "ADMIN",
          },
        },
      },
    });

    return NextResponse.json(circle);
  } catch (error) {
    console.error("Create Circle Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
