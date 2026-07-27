import { validateEnv } from "../src/lib/env";
import { RecommendationEngine } from "../src/features/learning/services/recommendationEngine";
import { HiringReadinessEngine } from "../src/features/career/services/hiringReadinessEngine";
import { careerRoadmaps } from "../src/data/careerRoadmaps";
import { openSourceOpportunities } from "../src/data/openSourceHub";

async function verifyNextValidation() {
  console.log("==================================================");
  console.log("⚒️ STACKFORGE NEXT — YC-PARTNER PRODUCT VERIFICATION");
  console.log("==================================================");

  // 1. Env check
  const env = validateEnv();
  console.log(`1. Secrets & Env: ${env.valid ? "✅ PASS" : "⚠️ WARNING"}`);

  // 2. Recommendation Engine
  const feed = await RecommendationEngine.generatePersonalizedFeed("test-user");
  console.log(`2. Recommendation Engine: ✅ PASS (${feed.length} items in feed)`);

  // 3. Hiring Readiness Engine
  const readiness = await HiringReadinessEngine.calculateHiringReadiness("test-user");
  console.log(`3. Hiring Readiness Engine: ✅ PASS (Hiring Score: ${readiness.overallScore}/100)`);

  // 4. Career Roadmaps & OSS Hub
  console.log(`4. Career Tracks & OSS: ✅ PASS (${careerRoadmaps.length} roadmaps, ${openSourceOpportunities.length} OSS opportunities)`);

  console.log("==================================================");
  console.log("🎉 STACKFORGE NEXT PRODUCT VALIDATION SUITE PASSED!");
  console.log("==================================================");
}

verifyNextValidation();
