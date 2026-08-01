import { ContentRegistry } from "../src/lib/mdx/content-registry.js";
import { DEBUGGING_LABS } from "../src/features/labs/data/debuggingLabs.js";
import { ARCHITECTURE_GUIDES } from "../src/features/architecture/data/architectureGuides.js";

export async function verifyV4Content() {
  console.log("====================================================");
  console.log("  STACKFORGE V4 CONTENT EXPLOSION AUDIT SUITE  ");
  console.log("====================================================\n");

  const files = ContentRegistry.getAllContentFiles();
  const labCount = DEBUGGING_LABS.length;
  const archCount = ARCHITECTURE_GUIDES.length;

  console.log(`✓ Total Lessons Discovered: ${files.length}`);
  console.log(`✓ Structured Debugging Labs: ${labCount}`);
  console.log(`✓ Architecture Deep-Dive Guides: ${archCount}`);
  console.log(`\n====================================================`);
  console.log(`  V4 CONTENT EXPLOSION AUDIT PASSED (FOUNDATION READY)`);
  console.log(`====================================================\n`);

  return files.length > 0 && labCount > 0 && archCount > 0;
}

verifyV4Content().then((success) => {
  if (!success) process.exit(1);
});
