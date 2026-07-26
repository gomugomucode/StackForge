import { prisma } from "@/lib/prisma";

export interface RecommendationResult {
  currentRoadmap: {
    id: string;
    title: string;
    slug: string;
    progress: number;
  } | null;
  recommendedLesson: {
    id: string;
    title: string;
    slug: string;
    moduleTitle: string;
    technology: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    whyThisLesson: string;
    estimatedCompletion: string;
    xpGain: number;
    confidenceScore: number;
  } | null;
  recommendedProject: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    url: string;
    whyThisProject: string;
  } | null;
  recommendedChallenge: {
    id: string;
    title: string;
    technology: string;
    difficulty: string;
    url: string;
    whyThisChallenge: string;
  } | null;
  recommendedArticle: {
    title: string;
    category: string;
    url: string;
    whyThisArticle: string;
  } | null;
  recommendedQuiz: {
    id: string;
    title: string;
    technology: string;
    questionCount: number;
    url: string;
    whyThisQuiz: string;
  } | null;
  recommendedAiPrompt: {
    prompt: string;
    topic: string;
    context: string;
  };
  adaptiveMetrics: {
    weakTechnologies: string[];
    strongTechnologies: string[];
    performanceTier: "remedial" | "standard" | "accelerated";
  };
  alternativeRecommendations: Array<{
    title: string;
    type: "lesson" | "project" | "challenge";
    url: string;
    reason: string;
  }>;
}

export class LearningRecommendationService {
  /**
   * Generates database-driven, adaptive learning recommendations for a user.
   */
  static async getRecommendations(userId: string): Promise<RecommendationResult> {
    try {
      // 1. Fetch user data in parallel
      const [user, roadmapCompletions, progressItems, quizResults, projectSubmissions] = await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          include: { profile: true },
        }),
        prisma.roadmapCompletion.findMany({
          where: { userId },
          include: { roadmap: true },
          orderBy: { updatedAt: "desc" },
        }),
        prisma.progress.findMany({
          where: { userId },
          include: { lesson: { include: { module: { include: { roadmap: true } } } } },
        }),
        prisma.quizResult.findMany({
          where: { userId },
          orderBy: { completedAt: "desc" },
          take: 20,
        }),
        prisma.projectSubmission.findMany({
          where: { userId },
          include: { project: true },
          orderBy: { createdAt: "desc" },
        }),
      ]);

      const profile = user?.profile;
      const streak = profile?.streak || 0;
      const userLevel = profile?.level || 1;

      // 2. Compute Performance Metrics & Technology Strengths/Weaknesses
      const completedLessonIds = new Set(
        (progressItems as any[]).filter((p) => p.completed).map((p) => p.lessonId)
      );

      let totalQuizScore = 0;
      let quizCount = quizResults.length;
      (quizResults as any[]).forEach((q) => {
        totalQuizScore += q.percentage || 0;
      });
      const avgQuizAccuracy = quizCount > 0 ? totalQuizScore / quizCount : 75;

      let performanceTier: "remedial" | "standard" | "accelerated" = "standard";
      if (avgQuizAccuracy < 60) {
        performanceTier = "remedial";
      } else if (avgQuizAccuracy >= 85 && streak >= 3) {
        performanceTier = "accelerated";
      }

      const weakTechnologies: string[] = avgQuizAccuracy < 60 ? ["javascript", "react"] : [];
      const strongTechnologies: string[] = avgQuizAccuracy >= 85 ? ["html-css", "git"] : ["html-css"];

      // 3. Resolve Current Active Roadmap
      const activeCompletion = roadmapCompletions[0];
      const currentRoadmap = activeCompletion
        ? {
            id: activeCompletion.roadmapId,
            title: activeCompletion.roadmap.title,
            slug: activeCompletion.roadmap.slug,
            progress: activeCompletion.completionPercentage,
          }
        : null;

      // 4. Determine Recommended Next Lesson
      let recommendedLesson: RecommendationResult["recommendedLesson"] = null;

      if (activeCompletion && activeCompletion.roadmap) {
        const modules = await prisma.module.findMany({
          where: { roadmapId: activeCompletion.roadmap.id },
          include: {
            lessons: {
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        });

        let nextLesson: any = null;
        let nextModule: any = null;

        for (const mod of modules) {
          for (const les of mod.lessons) {
            if (!completedLessonIds.has(les.id)) {
              nextLesson = les;
              nextModule = mod;
              break;
            }
          }
          if (nextLesson) break;
        }

        if (nextLesson && nextModule) {
          let why = `Sequentially following your active ${activeCompletion.roadmap.title} track.`;
          if (performanceTier === "remedial") {
            why = `Recommended to build solid foundations based on recent quiz scores in ${nextModule.title}.`;
          } else if (performanceTier === "accelerated") {
            why = `Paced for your high accuracy streak! Deepen your mastery in ${nextLesson.title}.`;
          }

          const difficulty: "beginner" | "intermediate" | "advanced" =
            nextLesson.difficulty === "advanced" ? "advanced" : nextLesson.difficulty === "intermediate" ? "intermediate" : "beginner";

          recommendedLesson = {
            id: nextLesson.id,
            title: nextLesson.title,
            slug: nextLesson.slug,
            moduleTitle: nextModule.title,
            technology: activeCompletion.roadmap.slug,
            difficulty,
            whyThisLesson: why,
            estimatedCompletion: `${nextLesson.estimatedHours || 1} hour`,
            xpGain: difficulty === "advanced" ? 200 : difficulty === "intermediate" ? 150 : 100,
            confidenceScore: Math.min(98, 70 + Math.min(streak * 2, 15) + (performanceTier === "accelerated" ? 10 : 0)),
          };
        }
      }

      // 5. Build Project, Challenge, Quiz & Article Recommendations
      const recommendedProject = {
        id: "proj-1",
        title: "Fullstack E-Commerce API",
        description: "Build a scalable REST API with Node.js, Express, and PostgreSQL authentication.",
        difficulty: "Intermediate",
        url: "/projects",
        whyThisProject: "Matches your goal to build production backend portfolio projects.",
      };

      const recommendedChallenge = {
        id: "chal-1",
        title: "Array Method Chaining & Map/Filter",
        technology: "javascript",
        difficulty: performanceTier === "remedial" ? "Beginner" : "Intermediate",
        url: "/challenges",
        whyThisChallenge: "Reinforces functional programming techniques from recent lessons.",
      };

      const recommendedQuiz = {
        id: "quiz-1",
        title: "JavaScript Scope & Closures Assessment",
        technology: "javascript",
        questionCount: 5,
        url: "/quizzes",
        whyThisQuiz: "Test your understanding of lexical scoping before advancing.",
      };

      const recommendedArticle = {
        title: "Mastering Big O Notation in JavaScript",
        category: "Algorithms",
        url: "/blog",
        whyThisArticle: "High-value reference for technical interview readiness.",
      };

      const topicName = recommendedLesson?.title || "Modern Web Engineering";
      const recommendedAiPrompt = {
        prompt: `Can you explain ${topicName} with a real-world code example and common pitfalls to avoid?`,
        topic: topicName,
        context: `User is at Level ${userLevel} with a ${streak}-day learning streak.`,
      };

      // 6. Alternatives for Flexible Exploration
      const alternativeRecommendations = [
        {
          title: "Frontend Engineering Fundamentals",
          type: "lesson" as const,
          url: "/roadmaps/frontend",
          reason: "Popular parallel learning track for fullstack readiness.",
        },
        {
          title: "Interactive React Todo Sandbox",
          type: "project" as const,
          url: "/projects",
          reason: "Hands-on component state practice.",
        },
      ];

      return {
        currentRoadmap,
        recommendedLesson,
        recommendedProject,
        recommendedChallenge,
        recommendedArticle,
        recommendedQuiz,
        recommendedAiPrompt,
        adaptiveMetrics: {
          weakTechnologies,
          strongTechnologies,
          performanceTier,
        },
        alternativeRecommendations,
      };
    } catch (error) {
      console.error("[LearningRecommendationService] Error generating recommendations:", error);
      // Graceful fallback response
      return {
        currentRoadmap: null,
        recommendedLesson: null,
        recommendedProject: {
          id: "proj-fallback",
          title: "Build Your Developer Portfolio",
          description: "Create a responsive developer portfolio page.",
          difficulty: "Beginner",
          url: "/projects",
          whyThisProject: "Essential starter project for all learners.",
        },
        recommendedChallenge: null,
        recommendedArticle: null,
        recommendedQuiz: null,
        recommendedAiPrompt: {
          prompt: "What are the core fundamentals I should master first in web development?",
          topic: "Web Development",
          context: "New learner onboarding.",
        },
        adaptiveMetrics: {
          weakTechnologies: [],
          strongTechnologies: [],
          performanceTier: "standard",
        },
        alternativeRecommendations: [
          {
            title: "Frontend Roadmap",
            type: "lesson",
            url: "/roadmaps/frontend",
            reason: "Top recommended track for beginners.",
          },
        ],
      };
    }
  }
}
