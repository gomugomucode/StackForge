import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest, props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  const username = params.username;

  try {
    // Find user by githubUsername, email prefix, or ID
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { githubUsername: { equals: username, mode: "insensitive" } },
          { email: { startsWith: `${username}@`, mode: "insensitive" } },
          { id: username },
        ],
      },
      include: {
        profile: true,
        certifications: { include: { roadmap: true } },
        skillProficiencies: true,
        submissions: {
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { project: true, autoReview: true },
        },
        roadmapCompletions: { include: { roadmap: true } },
        dailyActivities: { take: 30, orderBy: { date: "desc" } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (user.publicProfile === false) {
      return NextResponse.json({ error: "This profile is private" }, { status: 403 });
    }

    const githubSync = await prisma.githubSync.findUnique({
      where: { userId: user.id },
    });

    // Structure Evidence Data
    const evidence = {
      username: user.githubUsername || user.name || "Software Developer",
      avatar: user.githubAvatar || user.avatar || null,
      joinedAt: user.createdAt,
      stats: {
        xp: user.profile?.xp || 0,
        streak: user.profile?.streak || 0,
        level: user.profile?.level || 1,
        skillLevel: user.profile?.skillLevel || "Intermediate",
      },
      certifications: user.certifications.map((c) => ({
        id: c.id,
        roadmapTitle: c.roadmap.title,
        issuedAt: c.issuedAt,
        score: c.score,
        verificationCode: c.verificationCode,
        verifyUrl: `/verify/${c.verificationCode}`,
      })),
      skillProficiencies: user.skillProficiencies.map((s) => ({
        technology: s.technology,
        score: s.score,
        confidence: s.confidence,
      })),
      projectReviews: user.submissions.map((sub) => ({
        projectTitle: sub.project.title,
        repoUrl: sub.repoUrl,
        demoUrl: sub.demoUrl,
        submittedAt: sub.createdAt,
        review: sub.autoReview
          ? {
              overallScore: sub.autoReview.overallScore,
              readmeScore: sub.autoReview.readmeScore,
              codeQuality: sub.autoReview.codeQuality,
              testCoverage: sub.autoReview.testCoverage,
              securityScore: sub.autoReview.securityScore,
              feedback: sub.autoReview.feedbackJson ? JSON.parse(sub.autoReview.feedbackJson) : null,
            }
          : null,
      })),
      githubActivity: githubSync
        ? {
            username: githubSync.username,
            publicRepos: githubSync.publicRepos,
            totalCommits: githubSync.totalCommits,
            totalPRs: githubSync.totalPRs,
            languages: githubSync.languages,
            lastSyncedAt: githubSync.lastSyncedAt,
          }
        : null,
      learningTimeline: user.dailyActivities.map((a) => ({
        date: a.date,
        xpEarned: a.xpEarned,
      })),
    };

    return NextResponse.json({ success: true, evidence });
  } catch (error: any) {
    logger.error("Failed to fetch public profile", error, { username });
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}
