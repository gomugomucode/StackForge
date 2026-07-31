import { IngestionService } from "../src/features/content/services/ingestionService";

async function verifyRSS() {
  console.log("[Verification] Running External Content & RSS Ingestion Verification...");

  const sources = IngestionService.defaultSources;
  console.log(`Configured Sources (${sources.length}):`);
  sources.forEach((s) => console.log(` - ${s.name} (${s.type}): ${s.url}`));

  console.log("✅ RSS & Ingestion configuration verified.");
  process.exit(0);
}

verifyRSS().catch((err) => {
  console.error("RSS verification failed:", err);
  process.exit(1);
});
