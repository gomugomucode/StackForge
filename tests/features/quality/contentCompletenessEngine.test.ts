import { describe, it, expect } from "vitest";
import { ContentCompletenessEngine } from "../../../src/features/quality/services/contentCompletenessEngine";

describe("ContentCompletenessEngine", () => {
  it("scores complete lesson text correctly", () => {
    const fullMDX = `
      # React State
      ## Overview
      ## Why It Exists
      ## Mental Model
      ## How It Works Internally
      ## Execution Trace
      ## Code Example
      \`\`\`tsx
      const [state, setState] = useState(0);
      \`\`\`
      ## Common Mistakes
      ## Debugging Walkthrough
      ## Performance Implications
      ## Security Considerations
      ## Interview Questions
      ## Mini Quiz
      ## Exercise
      ## Mini Project
      ## Architecture Notes
      ## Official References
      ## Related Lessons
    `;
    const result = ContentCompletenessEngine.evaluateCompleteness(fullMDX);
    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.passed).toBe(true);
  });
});
