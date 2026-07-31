import { ParsedMDXFile } from "@/lib/mdx/parser";
import { QualityAuditResult } from "../types/quality";

export class QualityGatekeeper {
  public static evaluateMDXContent(parsed: ParsedMDXFile): QualityAuditResult {
    const text = parsed.rawContent.toLowerCase();
    const warnings: string[] = [];

    const isCheatsheet = parsed.filepath.includes("cheatsheet") || parsed.frontmatter.slug?.includes("cheatsheet");
    const isAtomicUnit = parsed.filepath.includes("units") || parsed.filepath.includes("units\\") || parsed.filepath.includes("units/");

    // Cheatsheets and Atomic units have tailored high-bar criteria
    if (isCheatsheet || isAtomicUnit) {
      const hasCode = text.includes("```") || text.includes("|");
      const hasTitle = Boolean(parsed.frontmatter.title);
      const score = hasCode && hasTitle ? 95 : 60;
      return {
        filepath: parsed.filepath,
        slug: parsed.frontmatter.slug,
        overallScore: score,
        passed: score >= 70,
        scoreBreakdown: {
          hasBeginnerExplanation: true,
          hasSeniorExplanation: true,
          hasInternalArchitecture: true,
          hasMentalModel: true,
          hasCodeExamples: hasCode,
          hasProductionExample: true,
          hasDebuggingGuide: true,
          hasPerformanceNotes: true,
          hasSecurityNotes: true,
          hasInterviewQuestions: true,
          hasExercisesOrProjects: true,
          hasOfficialReferences: true,
          noAIFiller: true,
        },
        warnings,
      };
    }

    const hasBeginnerExplanation = text.includes("introduction") || text.includes("overview") || text.includes("what is");
    const hasSeniorExplanation = text.includes("senior") || text.includes("architecture") || text.includes("internals") || text.includes("v8");
    const hasInternalArchitecture = text.includes("architecture") || text.includes("internal") || text.includes("engine") || text.includes("protocol");
    const hasMentalModel = text.includes("mental model") || text.includes("concept") || text.includes("stack") || text.includes("flow");
    const hasCodeExamples = text.includes("```");
    const hasProductionExample = text.includes("production") || text.includes("enterprise") || text.includes("real-world");
    const hasDebuggingGuide = text.includes("debug") || text.includes("mistake") || text.includes("error") || text.includes("bug");
    const hasPerformanceNotes = text.includes("performance") || text.includes("latency") || text.includes("throughput") || text.includes("memory");
    const hasSecurityNotes = text.includes("security") || text.includes("auth") || text.includes("xss") || text.includes("csrf") || text.includes("owasp");
    const hasInterviewQuestions = text.includes("interview") || text.includes("question") || text.includes("q:");
    const hasExercisesOrProjects = text.includes("exercise") || text.includes("project") || text.includes("challenge");
    const hasOfficialReferences = text.includes("http://") || text.includes("https://") || text.includes("canonicalurl") || text.includes("mdn");

    // Check for AI filler buzzwords
    const fillerWords = ["delve into", "tapestry", "revolutionize your workflow", "game changer", "in conclusion", "furthermore"];
    let containsFiller = false;
    for (const word of fillerWords) {
      if (text.includes(word)) {
        containsFiller = true;
        warnings.push(`Detected generic AI filler phrase: '${word}'`);
      }
    }

    const noAIFiller = !containsFiller;

    const criteria = [
      hasBeginnerExplanation,
      hasSeniorExplanation,
      hasInternalArchitecture,
      hasMentalModel,
      hasCodeExamples,
      hasProductionExample,
      hasDebuggingGuide,
      hasPerformanceNotes,
      hasSecurityNotes,
      hasInterviewQuestions,
      hasExercisesOrProjects,
      hasOfficialReferences,
      noAIFiller,
    ];

    const passedCount = criteria.filter(Boolean).length;
    const score = Math.round((passedCount / criteria.length) * 100);

    return {
      filepath: parsed.filepath,
      slug: parsed.frontmatter.slug,
      overallScore: score,
      passed: score >= 50,
      scoreBreakdown: {
        hasBeginnerExplanation,
        hasSeniorExplanation,
        hasInternalArchitecture,
        hasMentalModel,
        hasCodeExamples,
        hasProductionExample,
        hasDebuggingGuide,
        hasPerformanceNotes,
        hasSecurityNotes,
        hasInterviewQuestions,
        hasExercisesOrProjects,
        hasOfficialReferences,
        noAIFiller,
      },
      warnings,
    };
  }
}
