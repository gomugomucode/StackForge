import { logger } from "@/lib/logger";

export interface GitHubRepoDetails {
  title: string;
  slug: string;
  description: string;
  repoUrl: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  readmeContent?: string;
  ogImage?: string;
}

export class GitHubRepoSyncService {
  private static FEATURED_REPOS = [
    "vercel/next.js",
    "facebook/react",
    "prisma/prisma",
    "supabase/supabase",
    "tailwindlabs/tailwindcss",
    "microsoft/TypeScript",
  ];

  /**
   * Fetches real repository metadata from GitHub REST API
   */
  static async fetchRepoDetails(repoPath: string): Promise<GitHubRepoDetails | null> {
    try {
      const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
        headers: {
          "User-Agent": "StackForge-Content-Sync/1.0",
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 86400 },
      });

      if (!response.ok) {
        throw new Error(`GitHub API HTTP ${response.status} for ${repoPath}`);
      }

      const data = await response.json();
      const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      return {
        title: data.name,
        slug,
        description: data.description || "Real open-source developer repository.",
        repoUrl: data.html_url,
        stars: data.stargazers_count || 0,
        forks: data.forks_count || 0,
        language: data.language || "TypeScript",
        topics: data.topics || ["open-source", "developer-tools"],
        ogImage: `https://opengraph.githubassets.com/1/${repoPath}`,
      };
    } catch (err: any) {
      logger.error("GitHub repo fetch error", err, { repoPath });
      return null;
    }
  }

  /**
   * Syncs featured GitHub repositories
   */
  static async syncFeaturedRepositories(): Promise<GitHubRepoDetails[]> {
    const results: GitHubRepoDetails[] = [];
    for (const repoPath of this.FEATURED_REPOS) {
      const repo = await this.fetchRepoDetails(repoPath);
      if (repo) results.push(repo);
    }
    return results;
  }
}
