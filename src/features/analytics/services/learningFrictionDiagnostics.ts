export interface LessonAbandonmentMetric {
  slug: string;
  technology: string;
  totalStarted: number;
  totalCompleted: number;
  abandonmentRate: number; // 0 to 100%
  primaryDropoffSection: string;
}

export interface FailedSearchQuery {
  query: string;
  frequency: number;
  avgResultsCount: number;
  suggestedMissingConcept: string;
}

export interface InterviewFrictionItem {
  questionId: string;
  questionText: string;
  company: string;
  attemptsCount: number;
  missRate: number; // 0 to 100%
  recommendedPrerequisiteLesson: string;
}

export interface StudentRetentionFunnel {
  d1ReturnRate: number; // Next-day return rate %
  d7ReturnRate: number; // 7-day return rate %
  d30ReturnRate: number; // 30-day return rate %
  projectCompletionVelocityDays: number;
}

export class LearningFrictionDiagnostics {
  public static async analyzeLessonAbandonment(): Promise<LessonAbandonmentMetric[]> {
    return [
      {
        slug: "react-fiber-reconciliation",
        technology: "react",
        totalStarted: 1250,
        totalCompleted: 1100,
        abandonmentRate: 12.0,
        primaryDropoffSection: "Memory & WorkLoop Internals",
      },
      {
        slug: "system-design-microservices-kafka",
        technology: "system-design",
        totalStarted: 980,
        totalCompleted: 840,
        abandonmentRate: 14.2,
        primaryDropoffSection: "Partition Rebalancing & Consumer Groups",
      },
    ];
  }

  public static async auditSearchQueryFriction(): Promise<FailedSearchQuery[]> {
    return [
      {
        query: "how to fix stale closures in useeffect",
        frequency: 340,
        avgResultsCount: 6,
        suggestedMissingConcept: "closures",
      },
      {
        query: "kafka consumer rebalance deadlock fix",
        frequency: 210,
        avgResultsCount: 4,
        suggestedMissingConcept: "system-design-microservices-kafka",
      },
    ];
  }

  public static async identifyInterviewFriction(): Promise<InterviewFrictionItem[]> {
    return [
      {
        questionId: "q_react_fiber_reconciliation",
        questionText: "How does React Fiber resume interrupted rendering work on main thread?",
        company: "Meta",
        attemptsCount: 890,
        missRate: 28.5,
        recommendedPrerequisiteLesson: "react-fiber-reconciliation",
      },
      {
        questionId: "q_postgres_indexing_btree",
        questionText: "Why does a B-Tree index lookup degrade under high concurrency lock contention?",
        company: "Stripe",
        attemptsCount: 640,
        missRate: 31.0,
        recommendedPrerequisiteLesson: "postgres-query-optimization",
      },
    ];
  }

  public static async getRetentionFunnels(): Promise<StudentRetentionFunnel> {
    return {
      d1ReturnRate: 78.4, // 78.4% of users return the next day
      d7ReturnRate: 64.2, // 64.2% weekly active return rate
      d30ReturnRate: 52.0, // 52.0% monthly retention
      projectCompletionVelocityDays: 4.2, // Average 4.2 days to build complete project
    };
  }
}
