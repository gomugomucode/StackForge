import assert from "node:assert";
import { checkLessonUnlocked } from "../src/features/learning/services/learningGraphService";

export async function testLearningGraph() {
  const result = await checkLessonUnlocked("user-123", "lesson-no-prereq");
  assert.strictEqual(result.unlocked, true);
  assert.strictEqual(result.missingPrereqs.length, 0);
  console.log("✅ testLearningGraph passed");
}
