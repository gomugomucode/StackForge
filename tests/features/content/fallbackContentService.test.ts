import { describe, it, expect } from "vitest";
import { FallbackContentService } from "../../../src/features/content/services/fallbackContentService";

describe("FallbackContentService", () => {
  it("returns starter projects when topic has zero custom projects", () => {
    const projects = FallbackContentService.getRecommendedProjects("react");
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].title).toBeDefined();
  });

  it("provides smart suggestions for non-matching search queries", () => {
    const suggestions = FallbackContentService.getSmartSearchSuggestions("react state");
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions).toContain("React State Management");
  });
});
