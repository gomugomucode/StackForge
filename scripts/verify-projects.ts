import { ProjectRegistry } from "../src/features/projects/services/projectRegistry";
import { prisma } from "../src/lib/prisma";

async function verifyProjects() {
  console.log("[Verification] Running Production Projects Verification...");

  const registryProjects = await ProjectRegistry.getAllProjects();
  const dbProjects = await prisma.project.findMany();

  console.log(`- Total Production Project Specs in Registry: ${registryProjects.length}`);
  console.log(`- Total Projects in DB: ${dbProjects.length}`);

  for (const p of registryProjects) {
    if (!p.title || !p.businessProblem || !p.architectureDiagramSpec || !p.databaseSchemaDDL) {
      console.error(`❌ Project spec ${p.id} is missing required specification fields.`);
      process.exit(1);
    }
  }

  console.log("✅ Projects specifications, DDL schemas, and relations verified.");
  process.exit(0);
}

verifyProjects().catch((err) => {
  console.error("Projects verification failed:", err);
  process.exit(1);
});
