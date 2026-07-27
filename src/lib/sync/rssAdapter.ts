import { logger } from "@/lib/logger";

export interface NormalizedArticle {
  title: string;
  slug: string;
  description: string;
  content?: string;
  author: string;
  coverImage?: string;
  tags: string[];
  readingTime: number;
  source: string;
  sourceUrl: string;
  canonicalUrl?: string;
  mediumUrl?: string;
  publishedAt: Date;
}

export class RSSAdapter {
  /**
   * Simple regex-based RSS/Atom parser for Node.js server environments
   */
  static parseFeed(xmlText: string, sourceName: string): NormalizedArticle[] {
    const items: NormalizedArticle[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;

    let match;
    const matches: string[] = [];

    while ((match = itemRegex.exec(xmlText)) !== null) {
      matches.push(match[1]);
    }
    if (matches.length === 0) {
      while ((match = entryRegex.exec(xmlText)) !== null) {
        matches.push(match[1]);
      }
    }

    for (const rawItem of matches) {
      const title = this.extractTag(rawItem, "title") || "Untitled Engineering Post";
      const link = this.extractTag(rawItem, "link") || this.extractAttr(rawItem, "link", "href") || "";
      const description = this.cleanHtml(this.extractTag(rawItem, "description") || this.extractTag(rawItem, "summary") || "");
      const author = this.extractTag(rawItem, "dc:creator") || this.extractTag(rawItem, "author") || sourceName;
      const pubDateStr = this.extractTag(rawItem, "pubDate") || this.extractTag(rawItem, "published") || new Date().toISOString();
      const coverImage = this.extractAttr(rawItem, "media:content", "url") || this.extractAttr(rawItem, "enclosure", "url") || undefined;

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const wordCount = description.split(/\s+/).length;
      const readingTime = Math.max(2, Math.ceil(wordCount / 200));

      if (title && link) {
        items.push({
          title,
          slug,
          description: description.substring(0, 300),
          content: description,
          author,
          coverImage,
          tags: [sourceName.toLowerCase(), "software-engineering", "architecture"],
          readingTime,
          source: sourceName,
          sourceUrl: link,
          canonicalUrl: link,
          publishedAt: new Date(pubDateStr),
        });
      }
    }

    return items;
  }

  private static extractTag(xml: string, tag: string): string {
    const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, "is");
    const match = regex.exec(xml);
    if (!match) return "";
    return match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1").trim();
  }

  private static extractAttr(xml: string, tag: string, attr: string): string {
    const regex = new RegExp(`<${tag}[^>]*${attr}=["']([^"']+)["'][^>]*>`, "i");
    const match = regex.exec(xml);
    return match ? match[1] : "";
  }

  private static cleanHtml(html: string): string {
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }

  /**
   * Fetches RSS feed from URL and returns normalized articles
   */
  static async fetchFeed(url: string, sourceName: string): Promise<NormalizedArticle[]> {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "StackForge-Content-Sync/1.0" },
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed from ${url}: HTTP ${response.status}`);
      }

      const xmlText = await response.text();
      return this.parseFeed(xmlText, sourceName);
    } catch (err: any) {
      logger.error("RSS fetch error", err, { sourceName, url });
      return [];
    }
  }
}
