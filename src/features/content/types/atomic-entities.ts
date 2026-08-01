export interface AtomicLesson {
  title: string;
  slug: string;
  technology: string;
  module: string;
  mentalModel: string;
  internalArchitecture: string;
  executionTrace: string;
  codeExample: string;
  commonMistakes: string[];
  performanceNotes: string;
  securityNotes: string;
  prerequisites: string[];
}

export interface DebuggingLab {
  id: string;
  title: string;
  slug: string;
  technology: string;
  symptoms: string[];
  reproductionCode: string;
  rootCause: string;
  diagnosisProcess: string[];
  fixCode: string;
  preventionChecklist: string[];
}

export interface ArchitectureGuide {
  id: string;
  title: string;
  slug: string;
  technology: string;
  overview: string;
  deepDiveMechanics: string;
  storageMemoryModel: string;
  networkProtocol?: string;
}

export interface ProjectSpec {
  id: string;
  title: string;
  slug: string;
  tier: "Beginner" | "Intermediate" | "Advanced" | "Enterprise";
  problemStatement: string;
  userStories: string[];
  databaseSchema: string;
  apiDesign: string;
  folderStructure: string;
  rubric: string[];
}

export function validateAtomicLesson(lesson: any): boolean {
  return Boolean(
    lesson &&
    typeof lesson.title === "string" &&
    typeof lesson.slug === "string" &&
    typeof lesson.technology === "string" &&
    Array.isArray(lesson.prerequisites)
  );
}
