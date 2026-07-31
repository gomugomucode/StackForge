export interface OpenSourceRepo {
  repoName: string;
  repoUrl: string;
  technology: string;
  description: string;
  stars: number;
  forks: number;
  goodFirstIssuesCount: number;
  healthScore: number; // 0 to 100
  beginnerFriendlyScore: number; // 0 to 100
}

export class OpenSourceEngine {
  public static async getRecommendedRepositories(technology: string): Promise<OpenSourceRepo[]> {
    return [
      {
        repoName: "facebook/react",
        repoUrl: "https://github.com/facebook/react",
        technology: "react",
        description: "The library for web and native user interfaces.",
        stars: 228000,
        forks: 46000,
        goodFirstIssuesCount: 14,
        healthScore: 98,
        beginnerFriendlyScore: 85,
      },
      {
        repoName: "vercel/next.js",
        repoUrl: "https://github.com/vercel/next.js",
        technology: "nextjs",
        description: "The React Framework for the Web.",
        stars: 125000,
        forks: 26000,
        goodFirstIssuesCount: 22,
        healthScore: 99,
        beginnerFriendlyScore: 90,
      },
      {
        repoName: "prisma/prisma",
        repoUrl: "https://github.com/prisma/prisma",
        technology: "prisma",
        description: "Next-generation ORM for Node.js & TypeScript.",
        stars: 38000,
        forks: 1600,
        goodFirstIssuesCount: 9,
        healthScore: 96,
        beginnerFriendlyScore: 88,
      },
    ];
  }
}
