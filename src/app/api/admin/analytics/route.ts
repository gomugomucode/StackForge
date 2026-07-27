import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const adminCheck = await requireAdmin(req);
  if (adminCheck instanceof NextResponse) return adminCheck;

  try {
    const [
      totalUsers,
      totalProgress,
      completedProgress,
      totalQuizAttempts,
      passedQuizAttempts,
      totalChallenges,
      completedChallenges,
      totalSubmissions,
      auditLogs,
      recentEvents,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.progress.count(),
      prisma.progress.count({ where: { completed: true } }),
      prisma.quizAttempt.count(),
      prisma.quizAttempt.count({ where: { passed: true } }),
      prisma.challengeProgress.count(),
      prisma.challengeProgress.count({ where: { completed: true } }),
      prisma.projectSubmission.count(),
      prisma.adminAuditLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { email: true, name: true } } },
      }),
      prisma.analyticsEvent.findMany({
        take: 15,
        orderBy: { timestamp: "desc" },
      }),
    ]);

    const lessonCompletionRate = totalProgress > 0 ? Math.round((completedProgress / totalProgress) * 100) : 0;
    const quizPassRate = totalQuizAttempts > 0 ? Math.round((passedQuizAttempts / totalQuizAttempts) * 100) : 0;
    const challengeSuccessRate = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;

    return NextResponse.json({
      success: true,
      metrics: {
        totalUsers,
        lessonCompletionRate,
        quizPassRate,
        challengeSuccessRate,
        totalSubmissions,
        completedProgress,
        passedQuizAttempts,
      },
      auditLogs,
      recentEvents,
    });
  } catch (error: any) {
    logger.error("Failed to fetch admin analytics metrics", error);
    return NextResponse.json({ error: "Failed to fetch analytics", details: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, eventName, metadata } = await req.json();
    if (!eventName) {
      return NextResponse.json({ error: "eventName is required" }, { status: 400 });
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        userId: userId || null,
        eventName,
        metadata: metadata || {},
      },
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error: any) {
    logger.error("Failed to log analytics event", error);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }
}
