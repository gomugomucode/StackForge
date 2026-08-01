import { describe, it, expect } from "vitest";
import { validateAtomicLesson } from "../../../src/features/content/types/atomic-entities";

describe("validateAtomicLesson", () => {
  it("validates valid atomic lesson structures", () => {
    const validLesson = {
      title: "React State & Dispatch",
      slug: "react-state-dispatch",
      technology: "react",
      module: "fundamentals",
      mentalModel: "Unidirectional data flow container.",
      internalArchitecture: "Fiber node memoizedState slot.",
      executionTrace: "useState -> dispatchSetState -> scheduleUpdateOnFiber",
      codeExample: "const [count, setCount] = useState(0);",
      commonMistakes: ["Mutating state directly", "Stale closures"],
      performanceNotes: "Wrap complex initializers in function callbacks.",
      securityNotes: "Sanitize state before sending to API.",
      prerequisites: ["react-jsx", "react-components"],
    };
    expect(validateAtomicLesson(validLesson)).toBe(true);
  });
});
