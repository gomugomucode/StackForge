import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hasAccess } from "@/lib/access-control";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function GET() {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const certs = await prisma.certification.findMany({
    where: { userId: user.id },
    orderBy: { issuedAt: "desc" },
  });

  return NextResponse.json(certs);
}

export async function POST(req: Request) {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { roadmapId, score } = await req.json();
    if (!roadmapId) {
      return NextResponse.json(
        { error: "Roadmap ID is required" },
        { status: 400 }
      );
    }

    // Look up the caller's User row for plan-limit checks. The schema
    // stores the plan on `User`.
    const userRow = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!userRow) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const certCount = await prisma.certification.count({
      where: { userId: user.id },
    });
    if (!hasAccess(userRow.plan as any, "certificationsLimit", certCount)) {
      return NextResponse.json(
        {
          error: "Certification limit reached",
          upgradeUrl: "/pricing",
          plan: userRow.plan,
        },
        { status: 403 }
      );
    }

    // Server-side safety check: every lesson in the roadmap must be
    // marked complete before a certificate is issued.
    const roadmap = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
      include: {
        modules: { include: { lessons: true } },
      },
    });
    if (!roadmap) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }

    const allLessonIds = roadmap.modules.flatMap((m) =>
      m.lessons.map((l) => l.id)
    );
    if (allLessonIds.length === 0) {
      return NextResponse.json(
        { error: "Roadmap has no lessons" },
        { status: 400 }
      );
    }

    const completed = await prisma.progress.findMany({
      where: {
        userId: user.id,
        lessonId: { in: allLessonIds },
        completed: true,
      },
      select: { lessonId: true },
    });

    if (completed.length < allLessonIds.length) {
      return NextResponse.json(
        { error: "All lessons must be completed first" },
        { status: 400 }
      );
    }

    const cert = await prisma.certification.upsert({
      where: {
        userId_roadmapId: { userId: user.id, roadmapId },
      },
      update: { score, issuedAt: new Date() },
      create: { userId: user.id, roadmapId, score },
    });

    return NextResponse.json(cert);
  } catch (error) {
    console.error("Certification API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
