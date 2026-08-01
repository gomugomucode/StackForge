import { describe, it, expect } from "vitest";
import { getArchitectureGuidesByTechnology } from "../../../src/features/architecture/data/architectureGuides";

describe("architectureGuides", () => {
  it("returns architecture guides for react", () => {
    const guides = getArchitectureGuidesByTechnology("react");
    expect(guides.length).toBeGreaterThan(0);
    expect(guides[0].storageMemoryModel).toBeDefined();
  });
});
