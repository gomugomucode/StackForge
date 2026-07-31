import { ContentRegistry } from "../src/lib/mdx/content-registry";
import { parseMDXContent } from "../src/lib/mdx/parser";
import { SyncEngine } from "../src/features/content/services/syncEngine";
import { GraphEngine } from "../src/features/graph/services/graphEngine";
import { SearchService } from "../src/features/search/services/searchService";
import { IngestionService } from "../src/features/content/services/ingestionService";

async function runPipelineTests() {
  console.log("\n=======================================================");
  console.log("   STACKFORGE PHASE 1: KNOWLEDGE SYSTEM VERIFICATION   ");
  console.log("=======================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail: string = "") {
    if (condition) {
      console.log(`✅ PASS: ${testName} ${detail ? `(${detail})` : ""}`);
      passed++;
    } else {
      console.log(`❌ FAIL: ${testName} ${detail ? `(${detail})` : ""}`);
      failed++;
    }
  }

  // ----------------------------------------------------
  // Test 1: MDX Parser & Content Registry
  // ----------------------------------------------------
  console.log("--- 1. MDX Parser & ContentRegistry Verification ---");
  const sampleMDX = `---
title: "React Server Components Architecture"
slug: "react-server-components"
technology: "react"
difficulty: "Advanced"
summary: "Deep dive into RSC, streaming SSR, and server actions"
prerequisites: ["react-hooks", "nextjs-app-router"]
qualityScore: 95.0
---
# Introduction to RSC

React Server Components move rendering logic to the server.
`;

  const parsed = parseMDXContent(sampleMDX, "content/frontend/react/rsc.mdx");
  assert(parsed.frontmatter.title === "React Server Components Architecture", "MDX Parser extracts title");
  assert(parsed.frontmatter.slug === "react-server-components", "MDX Parser extracts slug");
  assert(parsed.frontmatter.technology === "react", "MDX Parser extracts technology");
  assert(parsed.frontmatter.prerequisites?.length === 2, "MDX Parser extracts prerequisites");
  assert(parsed.headings.length === 1 && parsed.headings[0].text === "Introduction to RSC", "MDX Parser extracts headings");

  const registryFiles = ContentRegistry.getAllContentFiles();
  assert(Array.isArray(registryFiles), "ContentRegistry discovers filesystem MDX files", `Found ${registryFiles.length} files`);

  // ----------------------------------------------------
  // Test 2: Git MDX Metadata Database Sync
  // ----------------------------------------------------
  console.log("\n--- 2. Database Metadata Sync Verification ---");
  const syncStats = await SyncEngine.syncGitMDXToDatabase();
  assert(syncStats.errors.length === 0, "SyncEngine completes without errors", `Upserted ${syncStats.learningNodesUpserted} nodes`);

  // ----------------------------------------------------
  // Test 3: Developer Knowledge Graph Engine
  // ----------------------------------------------------
  console.log("\n--- 3. Knowledge Graph Engine Verification ---");
  const integrity = await GraphEngine.validateGraphIntegrity();
  assert(integrity.hasCycles === false, "Knowledge Graph is a valid DAG without cycles");
  assert(typeof integrity.totalNodes === "number", "Knowledge Graph tracks total node count", `Total nodes: ${integrity.totalNodes}`);

  if (registryFiles.length > 0) {
    const firstSlug = registryFiles[0].frontmatter.slug;
    const node = await GraphEngine.getNodeBySlug(firstSlug);
    assert(node !== null && node.slug === firstSlug, "GraphEngine retrieves node by slug", `Node: ${firstSlug}`);

    const sub = await GraphEngine.getGraphNeighbourhood(firstSlug, 2);
    assert(sub.nodes.length > 0, "GraphEngine returns localized neighborhood subgraph");
  }

  // ----------------------------------------------------
  // Test 4: Unified Weighted Search Engine V2
  // ----------------------------------------------------
  console.log("\n--- 4. Search Engine V2 Verification ---");
  const searchResults = await SearchService.executeSearch({ query: "react", limit: 5 });
  assert(Array.isArray(searchResults), "SearchService returns search results array");
  if (searchResults.length > 0) {
    assert(typeof searchResults[0].score === "number" && searchResults[0].score > 0, "Search results have weighted scores", `Top result score: ${searchResults[0].score}`);
  }

  // ----------------------------------------------------
  // Summary
  // ----------------------------------------------------
  console.log("\n=======================================================");
  console.log(`  VERIFICATION RESULTS: ${passed} PASSED, ${failed} FAILED  `);
  console.log("=======================================================\n");

  process.exit(failed > 0 ? 1 : 0);
}

runPipelineTests().catch((err) => {
  console.error("Pipeline verification failed with unhandled exception:", err);
  process.exit(1);
});
