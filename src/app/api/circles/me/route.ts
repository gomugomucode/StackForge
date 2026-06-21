import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function GET() {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const members = await prisma.circleMembership.findMany({
    where: { userId: user.id },
    include: { circle: true },
  });
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { circleId } = await req.json();
    if (!circleId) {
      return NextResponse.json(
        { error: "Circle ID is required" },
        { status: 400 }
      );
    }

    const membership = await prisma.circleMembership.upsert({
      where: {
        userId_circleId: { userId: user.id, circleId },
      },
      update: {},
      create: {
        userId: user.id,
        circleId,
        role: "MEMBER",
      },
    });
    return NextResponse.json(membership);
  } catch (error) {
    console.error("Join Circle Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
