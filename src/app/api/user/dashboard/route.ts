import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [roadmaps, activities, certificates, submissions] = await Promise.all([
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
        include: { roadmap: true },
        orderBy: { issuedAt: 'desc' },
      }),
      // Fetch real user project submissions
      prisma.projectSubmission.findMany({
        where: { userId: user.id },
        include: { project: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      activeRoadmaps: (roadmaps as any[]).map(r => ({
        id: r.roadmapId,
        title: r.roadmap.title,
        progress: r.completionPercentage,
        slug: r.roadmap.slug,
        color: r.roadmap.color,
      })),
      recentActivity: (activities as any[]).map(a => ({
        id: a.id,
        action: a.reason,
        date: a.createdAt,
        type: 'xp',
      })),
      certificates: (certificates as any[]).map(c => ({
        id: c.id,
        roadmapName: c.roadmap?.title || 'Course',
        issuedAt: c.issuedAt,
      })),
      projectSubmissions: (submissions as any[]).map(s => ({
        id: s.id,
        title: s.project?.title || 'Mini-Project',
        repoUrl: s.repoUrl,
        submittedAt: s.createdAt,
      })),
    });
  } catch (error) {
    console.error("[API /user/dashboard] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
