import { ContentRegistry } from "../src/lib/mdx/content-registry";
import { QualityGatekeeper } from "../src/features/quality/services/qualityGatekeeper";

async function verifyEducationalQuality() {
  console.log("=======================================================");
  console.log("  STACKFORGE 20-POINT EDUCATIONAL QUALITY AUDIT  ");
  console.log("=======================================================\n");

  const files = ContentRegistry.getAllContentFiles();
  let passedCount = 0;
  let totalScore = 0;

  let highBarCount = 0;
  for (const file of files) {
    const result = QualityGatekeeper.evaluateMDXContent(file);
    totalScore += result.overallScore;

    if (result.overallScore >= 70) {
      passedCount++;
    } else {
      console.warn(`⚠️ Quality Warning in ${file.filepath}: Score ${result.overallScore}/100`);
      result.warnings.forEach((w) => console.warn(`   - ${w}`));
    }
    if (result.overallScore >= 90) {
      highBarCount++;
    }
  }

  const avgScore = Math.round(totalScore / files.length);

  console.log(`- Scanned MDX Modules: ${files.length}`);
  console.log(`- Modules Passing Standard Quality Bar (>=70%): ${passedCount}/${files.length}`);
  console.log(`- Modules Achieving High Excellence Bar (>=90%): ${highBarCount}/${files.length}`);
  console.log(`- Average Educational Quality Score: ${avgScore} / 100`);

  if (passedCount < Math.floor(files.length * 0.90) || avgScore < 85) {
    console.error("❌ Educational Quality Audit FAILED: Too many low-quality modules.");
    process.exit(1);
  }

  console.log("\n✅ Educational Quality Audit PASSED with Excellence.");
  process.exit(0);
}

verifyEducationalQuality().catch((err) => {
  console.error("Educational quality verification failed:", err);
  process.exit(1);
});
