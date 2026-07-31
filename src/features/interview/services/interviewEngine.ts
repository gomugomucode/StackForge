export interface InterviewSessionRequest {
  userId: string;
  mode: "Frontend" | "Backend" | "SystemDesign" | "Company";
  targetCompany?: string;
  durationMinutes: number;
}

export interface InterviewSessionResult {
  sessionId: string;
  score: number;
  technicalAccuracy: number;
  communicationScore: number;
  weaknessReport: string[];
  recommendedLessons: string[];
}

export class InterviewEngine {
  public static async startSession(req: InterviewSessionRequest) {
    return {
      sessionId: `int_${Date.now()}`,
      mode: req.mode,
      durationMinutes: req.durationMinutes,
      questions: [
        {
          id: "q1",
          question: "Walk through how the V8 Engine optimizes dynamic object property lookups using Hidden Classes (Shapes) and Inline Caching.",
          idealAnswerSlug: "js-performance-architecture",
        },
        {
          id: "q2",
          question: "Explain the Dual-Write problem in microservice architectures and how the Transactional Outbox pattern resolves it.",
          idealAnswerSlug: "system-design-microservices-kafka",
        },
      ],
    };
  }

  public static async evaluateSession(sessionId: string): Promise<InterviewSessionResult> {
    return {
      sessionId,
      score: 88,
      technicalAccuracy: 90,
      communicationScore: 86,
      weaknessReport: ["Detailed memory allocation of V8 Scavenger GC", "Saga Pattern Compensation Transactions"],
      recommendedLessons: ["js-performance-architecture", "system-design-microservices-kafka"],
    };
  }
}
