import { AtomicRegistry, AtomicUnit } from "@/lib/mdx/atomic-registry";
import { ContentRegistry, ParsedMDXFile } from "@/lib/mdx/content-registry";

export interface AssembledLesson {
  conceptId: string;
  title: string;
  technology: string;
  readingTimeMinutes: number;
  summary: string;
  prerequisites: string[];
  nextTopics: string[];
  tags: string[];
  qualityScore: number;
  canonicalUrl: string;
  conceptExplanation: string;
  examples: AtomicUnit[];
  exercises: AtomicUnit[];
  quizzes: AtomicUnit[];
  interviewQuestions: AtomicUnit[];
  officialReferences: Record<string, any>[];
}

export class ContentAssembler {
  public static assembleLesson(conceptId: string): AssembledLesson | null {
    // 1. Check for atomic units first
    const atomicUnits = AtomicRegistry.getUnitsForConcept(conceptId);
    
    // Find concept unit
    const conceptUnit = atomicUnits.find((u) => u.type === "concept");
    
    if (conceptUnit) {
      const meta = conceptUnit.metadata;
      return {
        conceptId,
        title: meta.title || conceptUnit.title,
        technology: meta.technology || "general",
        readingTimeMinutes: meta.estimatedReadingTime || 20,
        summary: meta.summary || "",
        prerequisites: meta.prerequisites || [],
        nextTopics: meta.nextTopics || [],
        tags: meta.tags || [],
        qualityScore: meta.qualityScore || 95.0,
        canonicalUrl: meta.canonicalUrl || `https://stackforge.dev/content/${meta.technology}/${conceptId}`,
        conceptExplanation: conceptUnit.content,
        examples: atomicUnits.filter((u) => u.type === "example"),
        exercises: atomicUnits.filter((u) => u.type === "exercise"),
        quizzes: atomicUnits.filter((u) => u.type === "quiz"),
        interviewQuestions: atomicUnits.filter((u) => u.type === "interview"),
        officialReferences: atomicUnits
          .filter((u) => u.type === "reference")
          .map((u) => u.metadata),
      };
    }

    // 2. Fallback to MDX Content Registry
    const file = ContentRegistry.getContentBySlug(conceptId);
    if (!file) return null;

    const fm = file.frontmatter;

    return {
      conceptId: fm.slug,
      title: fm.title,
      technology: fm.technology,
      readingTimeMinutes: file.readingTimeMinutes,
      summary: fm.summary || "",
      prerequisites: fm.prerequisites || [],
      nextTopics: fm.nextTopics || [],
      tags: fm.tags || [],
      qualityScore: fm.qualityScore || 95.0,
      canonicalUrl: fm.canonicalUrl || `https://stackforge.dev/content/${fm.technology}/${fm.slug}`,
      conceptExplanation: file.body,
      examples: [],
      exercises: [],
      quizzes: [],
      interviewQuestions: [],
      officialReferences: [],
    };
  }
}
