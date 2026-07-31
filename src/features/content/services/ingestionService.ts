import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export interface IngestionSource {
  name: string;
  type: "RSS" | "MEDIUM" | "GITHUB" | "BLOG";
  url: string;
}

export interface IngestedItem {
  title: string;
  slug: string;
  description: string;
  content?: string;
  source: string;
  sourceUrl: string;
  canonicalUrl?: string;
  publishedAt: Date;
  tags: string[];
  readingTime: number;
  qualityScore: number;
}

export class IngestionService {
  // Pre-configured trusted content sources as per architectural specifications
  public static defaultSources: IngestionSource[] = [
    {
      name: "Medium (@gomugomucode)",
      type: "MEDIUM",
      url: "https://medium.com/feed/@gomugomucode",
    },
    {
      name: "Personal Blog (anupambaral.com.np)",
      type: "BLOG",
      url: "https://anupambaral.com.np/rss.xml",
    },
    {
      name: "Dev.to Top Engineering",
      type: "RSS",
      url: "https://dev.to/feed",
    },
    {
      name: "GitHub (gomugomucode)",
      type: "GITHUB",
      url: "https://api.github.com/users/gomugomucode/repos",
    },
  ];

  /**
   * Executes the ingestion pipeline across all trusted content sources.
   */
  public static async runIngestionPipeline(sources: IngestionSource[] = this.defaultSources): Promise<{
    totalSynced: number;
    sourcesProcessed: number;
    errors: string[];
  }> {
    let totalSynced = 0;
    let sourcesProcessed = 0;
    const errors: string[] = [];

    logger.info(`[IngestionService] Starting content ingestion pipeline across ${sources.length} sources`);

    for (const source of sources) {
      try {
        let syncedCount = 0;

        if (source.type === "RSS" || source.type === "MEDIUM" || source.type === "BLOG") {
          syncedCount = await this.ingestRSSFeed(source);
        } else if (source.type === "GITHUB") {
          syncedCount = await this.ingestGitHubRepos(source);
        }

        totalSynced += syncedCount;
        sourcesProcessed++;

        await prisma.syncHistory.create({
          data: {
            sourceName: source.name,
            itemsSynced: syncedCount,
            status: "SUCCESS",
          },
        });
      } catch (err: any) {
        const errorMsg = `Failed ingestion for source ${source.name}: ${err.message}`;
        logger.error(errorMsg, err);
        errors.push(errorMsg);

        await prisma.syncHistory.create({
          data: {
            sourceName: source.name,
            itemsSynced: 0,
            status: "FAILED",
            errorLog: err.message,
          },
        });
      }
    }

    logger.info(`[IngestionService] Ingestion complete. Synced ${totalSynced} items from ${sourcesProcessed} sources.`);
    return { totalSynced, sourcesProcessed, errors };
  }

  /**
   * Ingests and normalizes RSS / Atom XML feeds.
   */
  private static async ingestRSSFeed(source: IngestionSource): Promise<number> {
    const response = await fetch(source.url, {
      headers: {
        "User-Agent": "StackForge-Ingestion-Engine/2.0 (+https://stackforge.dev)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} fetching ${source.url}`);
    }

    const xmlText = await response.text();
    const items = this.parseRSSXML(xmlText, source.name);
    let count = 0;

    for (const item of items) {
      const canonical = item.canonicalUrl || item.sourceUrl;

      // Check if article already exists by slug or canonical URL
      const existing = await prisma.externalArticle.findFirst({
        where: {
          OR: [{ slug: item.slug }, { canonicalUrl: canonical }],
        },
      });

      if (!existing) {
        await prisma.externalArticle.create({
          data: {
            title: item.title,
            slug: item.slug,
            description: item.description,
            content: item.content,
            source: source.name,
            sourceUrl: item.sourceUrl,
            canonicalUrl: canonical,
            mediumUrl: source.type === "MEDIUM" ? item.sourceUrl : null,
            publishedAt: item.publishedAt,
            tags: item.tags,
            readingTime: item.readingTime,
            score: item.qualityScore,
            status: "PUBLISHED",
          },
        });
        count++;
      }
    }

    return count;
  }

  /**
   * Ingests public repositories via GitHub API.
   */
  private static async ingestGitHubRepos(source: IngestionSource): Promise<number> {
    const headers: Record<string, string> = {
      "User-Agent": "StackForge-Ingestion-Engine/2.0",
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(source.url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status} for ${source.url}`);
    }

    const repos: any[] = await response.json();
    let count = 0;

    for (const repo of repos) {
      if (repo.fork || repo.private) continue;

      const slug = `gh-${repo.owner.login}-${repo.name}`.toLowerCase();

      await prisma.externalProject.upsert({
        where: { slug },
        update: {
          title: repo.name,
          description: repo.description || "Public developer repository",
          repoUrl: repo.html_url,
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          language: repo.language || "TypeScript",
          topics: repo.topics || [],
          updatedAt: new Date(),
        },
        create: {
          title: repo.name,
          slug,
          description: repo.description || "Public developer repository",
          repoUrl: repo.html_url,
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          language: repo.language || "TypeScript",
          topics: repo.topics || [],
        },
      });
      count++;
    }

    return count;
  }

  /**
   * Robust RSS/Atom XML text parser extracting articles.
   */
  private static parseRSSXML(xml: string, sourceName: string): IngestedItem[] {
    const results: IngestedItem[] = [];
    const itemRegex = /<(item|entry)>([\s\S]*?)<\/(item|entry)>/gi;

    let match: RegExpExecArray | null;

    while ((match = itemRegex.exec(xml)) !== null) {
      const block = match[2];

      const title = this.extractTagContent(block, "title");
      let link = this.extractTagContent(block, "link");
      if (!link) {
        // Fallback for Atom <link href="..."/>
        const hrefMatch = /<link[^>]+href=["']([^"']+)["']/i.exec(block);
        if (hrefMatch) link = hrefMatch[1];
      }

      const description = this.cleanHTML(this.extractTagContent(block, "description") || this.extractTagContent(block, "summary"));
      const content = this.extractTagContent(block, "content:encoded") || this.extractTagContent(block, "content");
      const pubDateStr = this.extractTagContent(block, "pubDate") || this.extractTagContent(block, "published") || this.extractTagContent(block, "updated");

      if (title && link) {
        const slug = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 60);

        const wordCount = (content || description).split(/\s+/).length;
        const readingTime = Math.max(1, Math.ceil(wordCount / 200));

        // Quality scoring: Official sources / Medium / personal blogs get high scores
        let qualityScore = 85.0;
        if (sourceName.includes("gomugomucode") || sourceName.includes("anupambaral")) {
          qualityScore = 98.0;
        }

        results.push({
          title,
          slug,
          description: description.slice(0, 300),
          content: content ? this.cleanHTML(content) : undefined,
          source: sourceName,
          sourceUrl: link,
          canonicalUrl: link,
          publishedAt: pubDateStr ? new Date(pubDateStr) : new Date(),
          tags: [sourceName.toLowerCase().split(" ")[0]],
          readingTime,
          qualityScore,
        });
      }
    }

    return results;
  }

  private static extractTagContent(xmlBlock: string, tagName: string): string {
    const regex = new RegExp(`<${tagName}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tagName}>`, "i");
    const m = regex.exec(xmlBlock);
    if (!m) return "";
    return (m[1] || m[2] || "").trim();
  }

  private static cleanHTML(html: string): string {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
}
