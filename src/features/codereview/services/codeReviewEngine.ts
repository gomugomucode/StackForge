export interface CodeReviewRequest {
  code: string;
  language: string;
  context?: string;
}

export interface CodeReviewResponse {
  overallScore: number;
  securityScore: number;
  performanceScore: number;
  readabilityScore: number;
  suggestions: {
    category: "Security" | "Performance" | "Readability" | "Architecture";
    line?: number;
    issue: string;
    recommendation: string;
    linkedLessonSlug: string;
  }[];
}

export class CodeReviewEngine {
  public static async reviewCode(req: CodeReviewRequest): Promise<CodeReviewResponse> {
    return {
      overallScore: 92,
      securityScore: 95,
      performanceScore: 90,
      readabilityScore: 91,
      suggestions: [
        {
          category: "Security",
          issue: "Potential missing rate limiting on sensitive API endpoint",
          recommendation: "Wrap request handler with Redis Token Bucket rate limiting middleware.",
          linkedLessonSlug: "api-design-architecture",
        },
        {
          category: "Performance",
          issue: "Database query inside loop causes N+1 performance bottleneck",
          recommendation: "Use batch query loader or Prisma include clause.",
          linkedLessonSlug: "prisma-orm-architecture",
        },
      ],
    };
  }
}
