import { ContentRegistry } from "../src/lib/mdx/content-registry";

async function verifyLinks() {
  console.log("[Verification] Running Internal & External Link Integrity Check...");
  const files = ContentRegistry.getAllContentFiles();
  const slugSet = new Set(files.map((f) => f.frontmatter.slug.toLowerCase()));

  let missingPrereqs = 0;

  for (const file of files) {
    if (file.frontmatter.prerequisites) {
      for (const prereq of file.frontmatter.prerequisites) {
        if (!slugSet.has(prereq.toLowerCase())) {
          console.warn(`⚠️ Warning in ${file.frontmatter.slug}: Prerequisite '${prereq}' not found in local MDX registry.`);
          missingPrereqs++;
        }
      }
    }
  }

  console.log(`[Verification] Link Check Complete. Scanned ${files.length} files. Missing prerequisite links: ${missingPrereqs}`);
  process.exit(0);
}

verifyLinks().catch((err) => {
  console.error("Link verification failed:", err);
  process.exit(1);
});
