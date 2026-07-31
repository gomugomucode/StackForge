import { SearchService } from "../src/features/search/services/searchService";

async function verifySearch() {
  console.log("[Verification] Running Search Engine V3 Verification...");

  const queries = ["react", "typescript", "postgres", "event loop", "docker", "system design"];
  let passed = 0;

  for (const q of queries) {
    const results = await SearchService.executeSearch({ query: q, limit: 5 });
    if (results.length > 0) {
      console.log(`✅ Search for '${q}': Found ${results.length} items (Top: '${results[0].title}' score ${results[0].score})`);
      passed++;
    } else {
      console.warn(`⚠️ Search for '${q}': 0 results returned`);
    }
  }

  console.log(`[Verification] Search Check Complete. ${passed}/${queries.length} queries returned weighted results.`);
  process.exit(passed > 0 ? 0 : 1);
}

verifySearch().catch((err) => {
  console.error("Search verification failed:", err);
  process.exit(1);
});
