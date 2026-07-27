import assert from "node:assert";
import { GithubSyncService } from "../src/features/github/services/githubSyncService";

export async function testGithubSync() {
  const review = await GithubSyncService.evaluateProjectRepository("https://github.com/stackforge/demo-app");
  assert(review.overallScore >= 0, "Overall score should be non-negative");
  assert(review.readmeScore >= 0, "README score should be non-negative");
  assert(review.feedback.strengths.length > 0, "Strengths should be present");
  console.log("✅ testGithubSync passed");
}
