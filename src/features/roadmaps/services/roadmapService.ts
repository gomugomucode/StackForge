import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { roadmaps as staticRoadmaps, Roadmap } from "@/data/roadmaps";

type DbRoadmap = Prisma.RoadmapGetPayload<{
  include: {
    modules: {
      include: {
        lessons: true;
      };
    };
    finalExam: {
      include: {
        questions: true;
      };
    };
  };
}>;

type DbModule = DbRoadmap["modules"][number];
type DbLesson = DbModule["lessons"][number];
type DbQuestion = NonNullable<DbRoadmap["finalExam"]>["questions"][number];

export async function getAllRoadmaps(): Promise<Roadmap[]> {
  try {
    const dbRoadmaps: DbRoadmap[] = await prisma.roadmap.findMany({
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
        finalExam: {
          include: {
            questions: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (dbRoadmaps.length === 0) {
      return staticRoadmaps;
    }

    return dbRoadmaps.map((r: DbRoadmap) => ({
      slug: r.slug,
      title: r.title,
      description: r.description,
      category: r.category,
      color: r.color,
      icon: r.icon,
      overview: r.overview,
      modules: r.modules.map((m: DbModule) => ({
        slug: m.slug,
        title: m.title,
        description: m.description,
        lessons: m.lessons.map((l: DbLesson) => ({
          slug: l.slug,
          title: l.title,
          description: l.description,
          whatIsIt: l.whatIsIt,
          whyItMatters: l.whyItMatters,
          syntax: l.syntax,
          declaration: l.declaration,
          example: l.example,
          commonMistakes: l.commonMistakes,
          practiceTask: l.practiceTask,
          internalResources: l.cheatsheetId ? [`/cheatsheets/${l.slug}`] : [],
          difficulty: l.difficulty as "Beginner" | "Intermediate" | "Advanced",
          estimatedTime: `${l.estimatedHours}h`,
          xpReward: 200,
        })),
      })),
      finalExam: r.finalExam
        ? {
            passingScore: r.finalExam.passingScore,
            questions: r.finalExam.questions.map((q: DbQuestion) => ({
              question: q.question,
              options: q.options,
              correctOption: parseInt(q.answer, 10) || 0,
            })),
          }
        : undefined,
    }));
  } catch (error) {
    console.warn("[roadmapService] Falling back to static roadmaps data:", error);
    return staticRoadmaps;
  }
}

export async function getRoadmapBySlug(slug: string): Promise<Roadmap | null> {
  try {
    const r: DbRoadmap | null = await prisma.roadmap.findUnique({
      where: { slug },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
        finalExam: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!r) {
      return staticRoadmaps.find((sr) => sr.slug === slug) || null;
    }

    return {
      slug: r.slug,
      title: r.title,
      description: r.description,
      category: r.category,
      color: r.color,
      icon: r.icon,
      overview: r.overview,
      modules: r.modules.map((m: DbModule) => ({
        slug: m.slug,
        title: m.title,
        description: m.description,
        lessons: m.lessons.map((l: DbLesson) => ({
          slug: l.slug,
          title: l.title,
          description: l.description,
          whatIsIt: l.whatIsIt,
          whyItMatters: l.whyItMatters,
          syntax: l.syntax,
          declaration: l.declaration,
          example: l.example,
          commonMistakes: l.commonMistakes,
          practiceTask: l.practiceTask,
          internalResources: l.cheatsheetId ? [`/cheatsheets/${l.slug}`] : [],
          difficulty: l.difficulty as "Beginner" | "Intermediate" | "Advanced",
          estimatedTime: `${l.estimatedHours}h`,
          xpReward: 200,
        })),
      })),
      finalExam: r.finalExam
        ? {
            passingScore: r.finalExam.passingScore,
            questions: r.finalExam.questions.map((q: DbQuestion) => ({
              question: q.question,
              options: q.options,
              correctOption: parseInt(q.answer, 10) || 0,
            })),
          }
        : undefined,
    };
  } catch (error) {
    console.warn(`[roadmapService] Error fetching roadmap ${slug}, falling back to static data:`, error);
    return staticRoadmaps.find((sr) => sr.slug === slug) || null;
  }
}
