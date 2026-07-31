import { ContentRegistry } from "@/lib/mdx/content-registry";

export interface DailyMission {
  userId: string;
  streakDays: number;
  todaysLessonSlug: string;
  todaysLessonTitle: string;
  flashcardsDueCount: number;
  weakTopics: string[];
  recommendedProjectSlug: string;
  reason: string;
}

export class DashboardService {
  public static async getDailyMission(userId: string): Promise<DailyMission> {
    const files = ContentRegistry.getAllContentFiles();
    const recommended = files[0];

    return {
      userId,
      streakDays: 7,
      todaysLessonSlug: recommended ? recommended.frontmatter.slug : "execution-context-event-loop",
      todaysLessonTitle: recommended ? recommended.frontmatter.title : "Execution Context & Event Loop",
      flashcardsDueCount: 12,
      weakTopics: ["PostgreSQL MVCC", "React Fiber Reconciler"],
      recommendedProjectSlug: "fullstack-saas-platform",
      reason: "Based on your target role (Senior Fullstack Architect) and recent quiz accuracy in Async I/O.",
    };
  }
}
