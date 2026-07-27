import { RSSAdapter, NormalizedArticle } from "./rssAdapter";
import { logger } from "@/lib/logger";

export class MediumSyncService {
  private static MEDIUM_FEED_URL = "https://medium.com/feed/@gomugomucode";
  private static PERSONAL_BLOG_FEED_URL = "https://dev.to/feed";

  /**
   * Fetches and normalizes articles from Medium (@gomugomucode)
   */
  static async fetchMediumArticles(): Promise<NormalizedArticle[]> {
    try {
      const articles = await RSSAdapter.fetchFeed(this.MEDIUM_FEED_URL, "Medium");
      return articles.map((art) => ({
        ...art,
        author: "Anupam Baral (@gomugomucode)",
        mediumUrl: art.sourceUrl,
        tags: ["medium", "software-engineering", "tutorials"],
      }));
    } catch (error: any) {
      logger.error("Medium sync failed", error);
      return [];
    }
  }

  /**
   * Fetches articles from personal blog feed
   */
  static async fetchPersonalBlogArticles(): Promise<NormalizedArticle[]> {
    try {
      const articles = await RSSAdapter.fetchFeed(this.PERSONAL_BLOG_FEED_URL, "Personal Blog");
      return articles.map((art) => ({
        ...art,
        author: "Anupam Baral",
        canonicalUrl: "https://anupambaral.com.np/blog",
        tags: ["personal-blog", "architecture", "nextjs"],
      }));
    } catch (error: any) {
      logger.error("Personal blog sync failed", error);
      return [];
    }
  }
}
