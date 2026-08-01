import { describe, it, expect } from "vitest";
import { getDebuggingLabsByTechnology } from "@/features/labs/data/debuggingLabs";

describe("debuggingLabs", () => {
  it("returns debugging labs for react", () => {
    const labs = getDebuggingLabsByTechnology("react");
    expect(labs.length).toBeGreaterThan(0);
    expect(labs[0].rootCause).toBeDefined();
  });
});
