import { ContentRegistry } from "../src/lib/mdx/content-registry";
import { parseMDXContent } from "../src/lib/mdx/parser";

async function verifyContent() {
  console.log("[Verification] Running MDX Content Quality Check...");
  const files = ContentRegistry.getAllContentFiles();
  let errors = 0;

  for (const file of files) {
    if (!file.frontmatter.title || !file.frontmatter.slug || !file.frontmatter.technology) {
      console.error(`❌ Content error in ${file.filepath}: Missing required frontmatter fields`);
      errors++;
    }
    if (file.readingTimeMinutes < 1) {
      console.error(`❌ Content error in ${file.filepath}: Invalid reading time`);
      errors++;
    }
  }

  console.log(`[Verification] Content Check Complete. ${files.length} files scanned, ${errors} errors.`);
  process.exit(errors > 0 ? 1 : 0);
}

verifyContent().catch((err) => {
  console.error("Content verification failed:", err);
  process.exit(1);
});
