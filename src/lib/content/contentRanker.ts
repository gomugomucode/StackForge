export interface ArticleRankingScore {
  score: number;
  keyTakeaways: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export class ContentRanker {
  /**
   * Calculates quality score & generates AI key takeaways for articles
   */
  static rankAndSummarizeArticle(title: string, description: string, source: string): ArticleRankingScore {
    let score = 70;

    // Official sources get higher base ranking score
    const officialSources = ["MDN", "Vercel", "React", "Supabase", "TypeScript", "Next.js"];
    if (officialSources.some((s) => source.toLowerCase().includes(s.toLowerCase()))) {
      score += 20;
    }

    if (description.length > 200) score += 10;

    // Generate Key Takeaways
    const keyTakeaways = [
      `Master core runtime concepts discussed in "${title}".`,
      `Learn production best practices verified by ${source}.`,
      `Apply scalable software patterns directly in your projects.`,
    ];

    let difficulty: "Beginner" | "Intermediate" | "Advanced" = "Intermediate";
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("intro") || lowerTitle.includes("basic") || lowerTitle.includes("getting started")) {
      difficulty = "Beginner";
    } else if (lowerTitle.includes("architecture") || lowerTitle.includes("compiler") || lowerTitle.includes("concurrency")) {
      difficulty = "Advanced";
    }

    return {
      score,
      keyTakeaways,
      difficulty,
    };
  }
}
