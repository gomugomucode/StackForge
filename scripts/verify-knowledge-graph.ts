import { GraphEngine } from "../src/features/graph/services/graphEngine";

async function verifyKnowledgeGraph() {
  console.log("[Verification] Running Knowledge Graph Integrity & Cycle Detection...");

  const integrity = await GraphEngine.validateGraphIntegrity();

  console.log(`- Total Nodes: ${integrity.totalNodes}`);
  console.log(`- Total Edges: ${integrity.totalEdges}`);
  console.log(`- Has Cycles:  ${integrity.hasCycles}`);
  console.log(`- Orphan Nodes Count: ${integrity.orphanNodes.length}`);

  if (integrity.hasCycles) {
    console.error("❌ Knowledge Graph integrity check FAILED: DAG contains cycles!");
    process.exit(1);
  }

  console.log("✅ Knowledge Graph integrity check PASSED: Valid DAG.");
  process.exit(0);
}

verifyKnowledgeGraph().catch((err) => {
  console.error("Knowledge Graph verification failed:", err);
  process.exit(1);
});
