import { prisma } from "@/lib/prisma";

export interface TimelineEventItem {
  id: string;
  eventType: "STARTED_ROADMAP" | "COMPLETED_LESSON" | "PASSED_QUIZ" | "SOLVED_CHALLENGE" | "BUILT_PROJECT" | "GITHUB_COMMIT" | "CERTIFICATE_EARNED" | "INTERVIEW_COMPLETED";
  title: string;
  description?: string;
  link?: string;
  timestamp: Date;
}

export class DeveloperTimelineService {
  /**
   * Fetches unified chronological engineering timeline for a user
   */
  static async getUserTimeline(userId: string): Promise<TimelineEventItem[]> {
    const events: TimelineEventItem[] = [];

    // 1. Progress completions
    try {
      const progress = await prisma.progress.findMany({
        where: { userId, completed: true },
        include: { lesson: true },
        orderBy: { updatedAt: "desc" },
        take: 10,
      });

      for (const p of progress) {
        events.push({
          id: `progress-${p.id}`,
          eventType: "COMPLETED_LESSON",
          title: `Completed Lesson: ${p.lesson.title}`,
          description: `Earned ${p.lesson.xpAwarded} XP in ${p.lesson.slug}`,
          link: `/roadmaps/full-stack/lesson/${p.lesson.slug}`,
          timestamp: p.completedAt || p.updatedAt,
        });
      }
    } catch {}

    // 2. Project Submissions
    try {
      const submissions = await prisma.projectSubmission.findMany({
        where: { userId },
        include: { project: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      for (const sub of submissions) {
        events.push({
          id: `submission-${sub.id}`,
          eventType: "BUILT_PROJECT",
          title: `Built Project: ${sub.project.title}`,
          description: `Submitted GitHub Repo: ${sub.repoUrl}`,
          link: `/projects`,
          timestamp: sub.createdAt,
        });
      }
    } catch {}

    // 3. Certifications
    try {
      const certs = await prisma.certification.findMany({
        where: { userId },
        include: { roadmap: true },
        orderBy: { issuedAt: "desc" },
      });

      for (const cert of certs) {
        events.push({
          id: `cert-${cert.id}`,
          eventType: "CERTIFICATE_EARNED",
          title: `Earned Certification: ${cert.roadmap.title}`,
          description: `Verified Code: ${cert.verificationCode} (${cert.score}% Score)`,
          link: `/cert`,
          timestamp: cert.issuedAt,
        });
      }
    } catch {}

    // Sort descending by timestamp
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}
