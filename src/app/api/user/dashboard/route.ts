import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [roadmaps, activities, certificates] = await Promise.all([
      // Fetch roadmaps the user has started (has progress)
      prisma.roadmapCompletion.findMany({
        where: { userId: user.id },
        include: { roadmap: true },
        orderBy: { updatedAt: 'desc' },
      }),
      // Fetch recent activities from XP transactions
      prisma.xpTransaction.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      // Fetch earned certifications
      prisma.certification.findMany({
        where: { userId: user.id },
        include: { roadmap: true }, // Assuming we might want roadmap name
        orderBy: { issuedAt: 'desc' },
      }),
    ]);

    return NextResponse.json({
      activeRoadmaps: roadmaps.map(r => ({
        id: r.roadmapId,
        title: r.roadmap.title,
        progress: r.completionPercentage,
        slug: r.roadmap.slug,
        color: r.roadmap.color,
      })),
      recentActivity: activities.map(a => ({
        id: a.id,
        action: a.reason,
        date: a.createdAt,
        type: 'xp',
      })),
      certificates: certificates.map(c => ({
        id: c.id,
        roadmapName: (c as any).roadmap?.title || 'Course',
        issuedAt: c.issuedAt,
      })),
    });
  } catch (error) {
    console.error("[API /user/dashboard] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
