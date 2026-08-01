import { prisma } from "@/lib/prisma";
import { ContentRegistry } from "@/lib/mdx/content-registry";
import { logger } from "@/lib/logger";

export interface SyncStats {
  filesProcessed: number;
  learningNodesUpserted: number;
  learningEdgesCreated: number;
  errors: string[];
}

export class SyncEngine {
  /**
   * Synchronizes metadata from git MDX files into PostgreSQL (LearningNode and LearningEdge).
   * Does NOT duplicate raw MDX bodies into PostgreSQL.
   */
  public static async syncGitMDXToDatabase(): Promise<SyncStats> {
    const stats: SyncStats = {
      filesProcessed: 0,
      learningNodesUpserted: 0,
      learningEdgesCreated: 0,
      errors: [],
    };

    try {
      const parsedFiles = ContentRegistry.getAllContentFiles();
      stats.filesProcessed = parsedFiles.length;

      logger.info(`[SyncEngine] Beginning git MDX sync for ${parsedFiles.length} files`);

      const nodeMap = new Map<string, string>(); // slug -> nodeId

      // Step 1: Upsert LearningNode metadata records
      for (const parsed of parsedFiles) {
        const fm = parsed.frontmatter;
        const slug = fm.slug.toLowerCase();

        try {
          const learningNode = await prisma.learningNode.upsert({
            where: { slug },
            update: {
              title: fm.title,
              technology: (fm.technology || "general").toLowerCase(),
              difficulty: fm.difficulty || "Intermediate",
              qualityScore: fm.qualityScore || 90.0,
              learningObjectives: fm.summary ? [fm.summary] : [],
              prerequisites: fm.prerequisites || [],
              updatedAt: new Date(),
            },
            create: {
              slug,
              entityType: "LESSON",
              entityId: `mdx-${slug}`,
              title: fm.title,
              technology: (fm.technology || "general").toLowerCase(),
              difficulty: fm.difficulty || "Intermediate",
              qualityScore: fm.qualityScore || 90.0,
              learningObjectives: fm.summary ? [fm.summary] : [],
              prerequisites: fm.prerequisites || [],
            },
          });

          nodeMap.set(slug, learningNode.id);
          stats.learningNodesUpserted++;
        } catch (err: any) {
          const msg = `Failed to upsert LearningNode for slug ${slug}: ${err.message}`;
          logger.error(msg, err);
          stats.errors.push(msg);
        }
      }

      // Step 2: Build graph relationships (LearningEdge) for prerequisites
      await prisma.learningEdge.deleteMany({});
      for (const parsed of parsedFiles) {
        const fm = parsed.frontmatter;
        const targetSlug = fm.slug.toLowerCase();
        const targetNodeId = nodeMap.get(targetSlug);

        if (!targetNodeId || !fm.prerequisites || fm.prerequisites.length === 0) {
          continue;
        }

        for (const prereqSlugRaw of fm.prerequisites) {
          const prereqSlug = prereqSlugRaw.toLowerCase();
          const sourceNodeId = nodeMap.get(prereqSlug);

          if (sourceNodeId && sourceNodeId !== targetNodeId) {
            try {
              await prisma.learningEdge.upsert({
                where: {
                  sourceNodeId_targetNodeId: {
                    sourceNodeId,
                    targetNodeId,
                  },
                },
                update: {
                  edgeType: "PREREQUISITE",
                },
                create: {
                  sourceNodeId,
                  targetNodeId,
                  edgeType: "PREREQUISITE",
                  weight: 1.0,
                },
              });

              stats.learningEdgesCreated++;
            } catch (err: any) {
              // Ignore edge duplicate errors
            }
          }
        }
      }

      logger.info(`[SyncEngine] Successfully finished MDX sync. Upserted ${stats.learningNodesUpserted} nodes, ${stats.learningEdgesCreated} edges.`);
    } catch (error: any) {
      logger.error("[SyncEngine] Fatal error during syncGitMDXToDatabase", error);
      stats.errors.push(`Fatal sync error: ${error.message}`);
    }

    return stats;
  }
}
