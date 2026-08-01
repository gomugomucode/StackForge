export interface CompletenessResult {
  score: number;
  passed: boolean;
  breakdown: Record<string, boolean>;
  missingSections: string[];
}

export class ContentCompletenessEngine {
  private static readonly MANDATORY_CRITERIA = [
    { key: "hasOverview", pattern: /overview|introduction|what is/i, name: "Overview / Why It Exists" },
    { key: "hasMentalModel", pattern: /mental model|concept/i, name: "Mental Model" },
    { key: "hasInternals", pattern: /internal|how it works|architecture/i, name: "Internal Architecture" },
    { key: "hasCodeExample", pattern: /```/, name: "Code Example" },
    { key: "hasExecutionTrace", pattern: /trace|step-by-step|flow/i, name: "Execution Trace" },
    { key: "hasMistakes", pattern: /mistake|pitfall|gotcha/i, name: "Common Mistakes" },
    { key: "hasDebugging", pattern: /debug|error|troubleshoot/i, name: "Debugging Walkthrough" },
    { key: "hasPerformance", pattern: /performance|optimization|memory/i, name: "Performance Implications" },
    { key: "hasSecurity", pattern: /security|auth|vulnerability/i, name: "Security Considerations" },
    { key: "hasInterviewQs", pattern: /interview|question/i, name: "Interview Questions" },
    { key: "hasQuiz", pattern: /quiz|knowledge check/i, name: "Mini Quiz" },
    { key: "hasExercise", pattern: /exercise|challenge/i, name: "Mini Exercise / Project" },
    { key: "hasReferences", pattern: /reference|official docs|http/i, name: "Official References" },
    { key: "hasRelated", pattern: /related|next steps|prerequisite/i, name: "Related Lessons" },
  ];

  public static evaluateCompleteness(rawMDX: string): CompletenessResult {
    const breakdown: Record<string, boolean> = {};
    const missingSections: string[] = [];
    let matchedCount = 0;

    for (const item of this.MANDATORY_CRITERIA) {
      const isMatched = item.pattern.test(rawMDX);
      breakdown[item.key] = isMatched;
      if (isMatched) {
        matchedCount++;
      } else {
        missingSections.push(item.name);
      }
    }

    const score = Math.round((matchedCount / this.MANDATORY_CRITERIA.length) * 100);
    return {
      score,
      passed: score >= 90,
      breakdown,
      missingSections,
    };
  }
}
