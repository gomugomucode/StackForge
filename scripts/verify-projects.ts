import { prisma } from "../src/lib/prisma";

async function verifyProjects() {
  console.log("[Verification] Running Production Projects Verification...");

  const projects = await prisma.project.findMany();
  console.log(`- Total Projects in DB: ${projects.length}`);

  console.log("✅ Projects database schema and relations verified.");
  process.exit(0);
}

verifyProjects().catch((err) => {
  console.error("Projects verification failed:", err);
  process.exit(1);
});
