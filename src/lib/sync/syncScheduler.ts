import { prisma } from "@/lib/prisma";
import { RSSAdapter } from "./rssAdapter";
import { MediumSyncService } from "./mediumSync";
import { GitHubRepoSyncService } from "./githubRepoSync";
import { ContentRanker } from "../content/contentRanker";
import { logger } from "@/lib/logger";

export class SyncScheduler {
  private static RSS_SOURCES = [
    { name: "Vercel Blog", url: "https://vercel.com/atom" },
    { name: "Supabase Blog", url: "https://supabase.com/rss.xml" },
    { name: "Dev.to Main Feed", url: "https://dev.to/feed" },
  ];

  /**
   * Triggers full content synchronization from RSS, Medium, Personal Blog & GitHub
   */
  static async runFullSync(): Promise<{ articlesSynced: number; projectsSynced: number }> {
    let articlesCount = 0;
    let projectsCount = 0;

    const externalArticleDelegate = (prisma as any).externalArticle;
    const externalProjectDelegate = (prisma as any).externalProject;
    const syncHistoryDelegate = (prisma as any).syncHistory;

    try {
      // 1. Sync Medium & Personal Blog Articles
      const mediumArticles = await MediumSyncService.fetchMediumArticles();
      const personalArticles = await MediumSyncService.fetchPersonalBlogArticles();

      const allArticles = [...mediumArticles, ...personalArticles];

      // 2. Sync RSS Sources
      for (const src of this.RSS_SOURCES) {
        const rssArticles = await RSSAdapter.fetchFeed(src.url, src.name);
        allArticles.push(...rssArticles);
      }

      // 3. Persist Articles to Database
      if (externalArticleDelegate) {
        for (const art of allArticles) {
          const { score, keyTakeaways, difficulty } = ContentRanker.rankAndSummarizeArticle(
            art.title,
            art.description,
            art.source
          );

          await externalArticleDelegate.upsert({
            where: { slug: art.slug },
            create: {
              title: art.title,
              slug: art.slug,
              description: art.description,
              content: art.content || art.description,
              author: art.author,
              coverImage: art.coverImage || null,
              tags: art.tags,
              readingTime: art.readingTime,
              source: art.source,
              sourceUrl: art.sourceUrl,
              canonicalUrl: art.canonicalUrl || art.sourceUrl,
              mediumUrl: art.mediumUrl || null,
              publishedAt: art.publishedAt,
              score,
              keyTakeaways,
              difficulty,
            },
            update: {
              description: art.description,
              score,
              keyTakeaways,
              difficulty,
            },
          });
          articlesCount++;
        }
      }

      // 4. Sync Real GitHub Repositories
      const repos = await GitHubRepoSyncService.syncFeaturedRepositories();
      if (externalProjectDelegate) {
        for (const repo of repos) {
          await externalProjectDelegate.upsert({
            where: { slug: repo.slug },
            create: {
              title: repo.title,
              slug: repo.slug,
              description: repo.description,
              repoUrl: repo.repoUrl,
              stars: repo.stars,
              forks: repo.forks,
              language: repo.language,
              topics: repo.topics,
              ogImage: repo.ogImage || null,
            },
            update: {
              stars: repo.stars,
              forks: repo.forks,
              description: repo.description,
            },
          });
          projectsCount++;
        }
      }

      // Record Sync History Log
      if (syncHistoryDelegate) {
        await syncHistoryDelegate.create({
          data: {
            sourceName: "Full Engine Sync",
            itemsSynced: articlesCount + projectsCount,
            status: "SUCCESS",
          },
        });
      }

      logger.info("Content sync completed successfully", { articlesSynced: articlesCount, projectsSynced: projectsCount });
    } catch (error: any) {
      logger.error("Content sync failed", error);
    }

    return { articlesSynced: articlesCount, projectsSynced: projectsCount };
  }
}
