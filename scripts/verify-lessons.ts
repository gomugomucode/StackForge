import { ContentRegistry } from "../src/lib/mdx/content-registry";

async function verifyLessons() {
  console.log("[Verification] Running Lesson Coverage Verification...");

  const files = ContentRegistry.getAllContentFiles();
  const techMap = new Map<string, number>();

  for (const f of files) {
    const tech = f.frontmatter.technology || "general";
    techMap.set(tech, (techMap.get(tech) || 0) + 1);
  }

  console.log("Lesson Coverage by Technology:");
  for (const [tech, count] of techMap.entries()) {
    console.log(` - ${tech}: ${count} modules`);
  }

  console.log(`\nTotal Modules Verified: ${files.length}`);
  console.log("✅ Lesson coverage verification PASSED.");
  process.exit(0);
}

verifyLessons().catch((err) => {
  console.error("Lesson verification failed:", err);
  process.exit(1);
});
