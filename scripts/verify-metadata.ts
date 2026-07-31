import { ContentRegistry } from "../src/lib/mdx/content-registry";

async function verifyMetadata() {
  console.log("[Verification] Running Metadata Schema Completeness Check...");
  const files = ContentRegistry.getAllContentFiles();

  let validCount = 0;

  for (const file of files) {
    const fm = file.frontmatter;
    if (fm.title && fm.slug && fm.technology && fm.summary) {
      validCount++;
    } else {
      console.warn(`⚠️ Warning: Incomplete metadata in ${file.filepath}`);
    }
  }

  console.log(`[Verification] Metadata Check Complete. ${validCount}/${files.length} files fully complete.`);
  process.exit(validCount === files.length ? 0 : 1);
}

verifyMetadata().catch((err) => {
  console.error("Metadata verification failed:", err);
  process.exit(1);
});
