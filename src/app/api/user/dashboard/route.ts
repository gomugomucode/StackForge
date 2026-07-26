import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [roadmaps, activities, certificates, submissions, tutorSessions] = await Promise.all([
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
      // Fetch real AI tutor sessions
      prisma.tutorSession.findMany({
        where: { userId: user.id },
        include: { messages: true },
        orderBy: { updatedAt: 'desc' },
        take: 3,
      }),
    ]);

    // Calculate database-backed Resume Learning target for most recent active roadmap
    let resumeLearning = null;
    const mostRecentRoadmap = (roadmaps as any[])[0];
    if (mostRecentRoadmap && mostRecentRoadmap.roadmap) {
      const rm = mostRecentRoadmap.roadmap;
      const [userProgress, modules] = await Promise.all([
        prisma.progress.findMany({
          where: { userId: user.id, completed: true },
          select: { lessonId: true },
        }),
        prisma.module.findMany({
          where: { roadmapId: rm.id },
          include: {
            lessons: {
              select: {
                id: true,
                slug: true,
                title: true,
                difficulty: true,
                estimatedHours: true,
              },
            },
          },
        }),
      ]);

      const completedLessonIds = new Set((userProgress as any[]).map((p) => p.lessonId));
      let nextLesson: any = null;
      let nextModule: any = null;
      let hoursRemaining = 0;

      for (const mod of modules) {
        for (const les of mod.lessons) {
          if (!completedLessonIds.has(les.id)) {
            hoursRemaining += les.estimatedHours || 1;
            if (!nextLesson) {
              nextLesson = les;
              nextModule = mod;
            }
          }
        }
      }

      if (nextLesson && nextModule) {
        resumeLearning = {
          roadmapSlug: rm.slug,
          roadmapTitle: rm.title,
          moduleTitle: nextModule.title,
          moduleSlug: nextModule.slug,
          lessonTitle: nextLesson.title,
          lessonSlug: nextLesson.slug,
          completionPercentage: mostRecentRoadmap.completionPercentage,
          hoursRemaining,
          xpReward: nextLesson.difficulty === "advanced" ? 200 : nextLesson.difficulty === "intermediate" ? 150 : 100,
        };
      }
    }

    return NextResponse.json({
      resumeLearning,
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
      tutorSessions: (tutorSessions as any[]).map(ts => ({
        id: ts.id,
        topic: ts.topic,
        messageCount: ts.messages?.length || 0,
        updatedAt: ts.updatedAt,
      })),
    });
  } catch (error) {
    console.error("[API /user/dashboard] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
