import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export interface SearchQueryOptions {
  query: string;
  technology?: string;
  difficulty?: string;
  entityType?: string; // "lesson" | "article" | "project" | "cheatsheet" | "interview" | "github"
  source?: string;
  limit?: number;
}

export interface SearchResultItem {
  id: string;
  title: string;
  slug: string;
  type: string;
  category: string;
  technology?: string;
  difficulty?: string;
  summary?: string;
  url: string;
  canonicalUrl?: string;
  qualityScore: number;
  score: number;
}

export class SearchService {
  /**
   * Performs weighted multi-entity hybrid search across local Git MDX metadata, database entities, and external synced feeds.
   */
  public static async executeSearch(options: SearchQueryOptions): Promise<SearchResultItem[]> {
    const { query, technology, difficulty, entityType, limit = 20 } = options;
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) return [];

    const results: SearchResultItem[] = [];

    try {
      // 1. Search LearningNodes (Git MDX Metadata)
      try {
        const nodes = await prisma.learningNode.findMany({
          where: {
            OR: [
              { title: { contains: cleanQuery, mode: "insensitive" } },
              { slug: { contains: cleanQuery, mode: "insensitive" } },
              { learningObjectives: { hasSome: [cleanQuery] } },
            ],
            ...(technology ? { technology: { equals: technology.toLowerCase() } } : {}),
            ...(difficulty ? { difficulty: { equals: difficulty, mode: "insensitive" } } : {}),
          },
          take: 15,
        });

        for (const node of nodes) {
          const titleMatch = node.title.toLowerCase().includes(cleanQuery);
          const score = (titleMatch ? 100 : 40) + 50 + node.qualityScore * 0.5;

          results.push({
            id: `node-${node.id}`,
            title: node.title,
            slug: node.slug,
            type: "lesson",
            category: "Git MDX Curriculum",
            technology: node.technology,
            difficulty: node.difficulty,
            summary: node.learningObjectives[0] || "",
            url: `/roadmaps/${node.technology}/lesson/${node.slug}`,
            qualityScore: node.qualityScore,
            score,
          });
        }
      } catch (err) {
        logger.error("[SearchService] Error querying LearningNode", err);
      }

      // 2. Search ExternalArticles (RSS / Medium / Blogs)
      try {
        const articles = await prisma.externalArticle.findMany({
          where: {
            OR: [
              { title: { contains: cleanQuery, mode: "insensitive" } },
              { description: { contains: cleanQuery, mode: "insensitive" } },
              { tags: { hasSome: [cleanQuery] } },
            ],
            ...(difficulty ? { difficulty: { equals: difficulty, mode: "insensitive" } } : {}),
          },
          take: 15,
        });

        for (const art of articles) {
          const titleMatch = art.title.toLowerCase().includes(cleanQuery);
          const ageDays = (Date.now() - new Date(art.publishedAt).getTime()) / (1000 * 3600 * 24);
          const freshnessBonus = Math.max(0, 20 - ageDays * 0.2);

          const score = (titleMatch ? 80 : 30) + art.score * 0.4 + freshnessBonus;

          results.push({
            id: `article-${art.id}`,
            title: art.title,
            slug: art.slug,
            type: "article",
            category: `Article (${art.source})`,
            technology: art.tags[0] || "general",
            difficulty: art.difficulty,
            summary: art.description,
            url: art.sourceUrl || `/blog/${art.slug}`,
            canonicalUrl: art.canonicalUrl || art.sourceUrl,
            qualityScore: art.score,
            score,
          });
        }
      } catch (err) {
        logger.error("[SearchService] Error querying ExternalArticle", err);
      }

      // 3. Search ExternalProjects (GitHub Repos)
      try {
        const repos = await prisma.externalProject.findMany({
          where: {
            OR: [
              { title: { contains: cleanQuery, mode: "insensitive" } },
              { description: { contains: cleanQuery, mode: "insensitive" } },
              { topics: { hasSome: [cleanQuery] } },
            ],
            ...(technology ? { language: { contains: technology, mode: "insensitive" } } : {}),
          },
          take: 10,
        });

        for (const repo of repos) {
          const titleMatch = repo.title.toLowerCase().includes(cleanQuery);
          const starScore = Math.min(30, Math.log10(repo.stars + 1) * 10);
          const score = (titleMatch ? 75 : 25) + starScore;

          results.push({
            id: `repo-${repo.id}`,
            title: `${repo.title} (${repo.stars} ★)`,
            slug: repo.slug,
            type: "github",
            category: "GitHub Engineering Repo",
            technology: repo.language,
            summary: repo.description,
            url: repo.repoUrl,
            canonicalUrl: repo.repoUrl,
            qualityScore: 85,
            score,
          });
        }
      } catch (err) {
        logger.error("[SearchService] Error querying ExternalProject", err);
      }

      // 4. Search InterviewQuestions
      try {
        const interviews = await prisma.interviewQuestion.findMany({
          where: {
            OR: [
              { question: { contains: cleanQuery, mode: "insensitive" } },
              { answer: { contains: cleanQuery, mode: "insensitive" } },
              { tags: { hasSome: [cleanQuery] } },
            ],
            ...(difficulty ? { difficulty: { equals: difficulty, mode: "insensitive" } } : {}),
          },
          take: 10,
        });

        for (const iq of interviews) {
          const score = 70 + iq.companyFrequency * 2;

          results.push({
            id: `interview-${iq.id}`,
            title: iq.question,
            slug: iq.id,
            type: "interview",
            category: "Interview Question",
            difficulty: iq.difficulty,
            summary: iq.answer.slice(0, 150) + "...",
            url: `/interviews`,
            qualityScore: 90,
            score,
          });
        }
      } catch (err) {
        logger.error("[SearchService] Error querying InterviewQuestion", err);
      }

      // Filter by entityType if requested
      let filteredResults = results;
      if (entityType) {
        filteredResults = results.filter((r) => r.type.toLowerCase() === entityType.toLowerCase());
      }

      // Sort by weighted score descending and return top N
      filteredResults.sort((a, b) => b.score - a.score);

      return filteredResults.slice(0, limit);
    } catch (error) {
      logger.error("[SearchService] Fatal error executing search", error);
      return [];
    }
  }
}
