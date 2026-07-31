import { ContentRegistry } from "@/lib/mdx/content-registry";

export type ContentStatus = "DRAFT" | "REVIEW" | "APPROVED" | "PUBLISHED" | "DEPRECATED" | "ARCHIVED";

export interface ContentHealthItem {
  slug: string;
  technology: string;
  status: ContentStatus;
  lastUpdatedDaysAgo: number;
  isStale: boolean;
  brokenLinksCount: number;
}

export class AdminCmsEngine {
  public static async auditContentHealth(): Promise<{ totalModules: number; staleCount: number; items: ContentHealthItem[] }> {
    const files = ContentRegistry.getAllContentFiles();
    const items: ContentHealthItem[] = [];
    let staleCount = 0;

    for (const file of files) {
      const daysOld = Math.floor((Date.now() - new Date(file.frontmatter.updatedAt || file.frontmatter.publishedAt || "2026-01-01").getTime()) / (1000 * 60 * 60 * 24));
      const isStale = daysOld > 180;

      if (isStale) staleCount++;

      items.push({
        slug: file.frontmatter.slug,
        technology: file.frontmatter.technology,
        status: "PUBLISHED",
        lastUpdatedDaysAgo: daysOld,
        isStale,
        brokenLinksCount: 0,
      });
    }

    return {
      totalModules: files.length,
      staleCount,
      items,
    };
  }

  public static async updateContentStatus(slug: string, status: ContentStatus) {
    return {
      slug,
      status,
      updatedAt: new Date().toISOString(),
    };
  }
}
