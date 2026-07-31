import { SyncEngine } from "../src/features/content/services/syncEngine";

async function main() {
  console.log("Starting Git MDX Metadata Sync to PostgreSQL...");
  const startTime = Date.now();

  const stats = await SyncEngine.syncGitMDXToDatabase();

  const duration = Date.now() - startTime;
  console.log("\n================ SYNC REPORT ================");
  console.log(`Files Processed:          ${stats.filesProcessed}`);
  console.log(`LearningNodes Upserted:   ${stats.learningNodesUpserted}`);
  console.log(`LearningEdges Created:    ${stats.learningEdgesCreated}`);
  console.log(`Duration:                 ${duration}ms`);
  console.log(`Errors:                   ${stats.errors.length}`);
  if (stats.errors.length > 0) {
    console.log("\nErrors detail:");
    stats.errors.forEach((err, idx) => console.log(` ${idx + 1}. ${err}`));
  }
  console.log("=============================================\n");

  process.exit(stats.errors.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Unhandled exception in sync-mdx-metadata script:", err);
  process.exit(1);
});
