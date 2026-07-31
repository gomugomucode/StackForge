export interface QualityAuditResult {
  filepath: string;
  slug: string;
  overallScore: number; // 0 to 100
  passed: boolean;
  scoreBreakdown: {
    hasBeginnerExplanation: boolean;
    hasSeniorExplanation: boolean;
    hasInternalArchitecture: boolean;
    hasMentalModel: boolean;
    hasCodeExamples: boolean;
    hasProductionExample: boolean;
    hasDebuggingGuide: boolean;
    hasPerformanceNotes: boolean;
    hasSecurityNotes: boolean;
    hasInterviewQuestions: boolean;
    hasExercisesOrProjects: boolean;
    hasOfficialReferences: boolean;
    noAIFiller: boolean;
  };
  warnings: string[];
}
