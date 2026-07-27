export interface QualityScoreInput {
  isOfficialDocs?: boolean;
  isStackForgeOriginal?: boolean;
  matchesUserRoadmap?: boolean;
  updatedWithin30Days?: boolean;
  bookmarkCount?: number;
  engagementScore?: number;
}

export class QualityScorer {
  /**
   * Calculates the Content Quality Score based on StackForge V14 non-linear rules
   */
  static calculateScore(input: QualityScoreInput): number {
    let score = 50; // Base score

    if (input.isOfficialDocs) score += 30;
    if (input.isStackForgeOriginal) score += 30;
    if (input.matchesUserRoadmap) score += 20;
    if (input.updatedWithin30Days) score += 10;
    if (input.bookmarkCount && input.bookmarkCount > 0) {
      score += Math.min(10, input.bookmarkCount * 2);
    }
    if (input.engagementScore) {
      score += Math.min(10, input.engagementScore);
    }

    return Math.min(100, Math.round(score));
  }
}
