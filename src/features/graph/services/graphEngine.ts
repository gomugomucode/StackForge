import { prisma } from "@/lib/prisma";
import { GraphNode, GraphEdge, Subgraph, GraphIntegrityReport } from "../types/graph";
import { logger } from "@/lib/logger";

export class GraphEngine {
  /**
   * Retrieves full details for a node by slug or ID.
   */
  public static async getNodeBySlug(slug: string): Promise<GraphNode | null> {
    try {
      const node = await prisma.learningNode.findUnique({
        where: { slug: slug.toLowerCase() },
      });

      if (!node) return null;

      return {
        id: node.id,
        slug: node.slug,
        title: node.title,
        technology: node.technology,
        difficulty: node.difficulty,
        qualityScore: node.qualityScore,
        learningObjectives: node.learningObjectives,
        prerequisites: node.prerequisites,
        entityType: node.entityType,
      };
    } catch (error) {
      logger.error(`[GraphEngine] Error fetching node ${slug}`, error);
      return null;
    }
  }

  /**
   * Retrieves all prerequisite nodes required to unlock a target node (Recursive DAG traversal).
   */
  public static async getPrerequisites(targetSlug: string): Promise<GraphNode[]> {
    try {
      const targetNode = await this.getNodeBySlug(targetSlug);
      if (!targetNode) return [];

      const visited = new Set<string>();
      const result: GraphNode[] = [];
      const queue: string[] = [targetNode.id];

      while (queue.length > 0) {
        const currentId = queue.shift()!;
        if (visited.has(currentId)) continue;
        visited.add(currentId);

        // Find incoming PREREQUISITE edges where targetNodeId === currentId
        const edges = await prisma.learningEdge.findMany({
          where: {
            targetNodeId: currentId,
            edgeType: "PREREQUISITE",
          },
        });

        for (const edge of edges) {
          if (!visited.has(edge.sourceNodeId)) {
            queue.push(edge.sourceNodeId);
            const node = await prisma.learningNode.findUnique({
              where: { id: edge.sourceNodeId },
            });
            if (node) {
              result.push({
                id: node.id,
                slug: node.slug,
                title: node.title,
                technology: node.technology,
                difficulty: node.difficulty,
                qualityScore: node.qualityScore,
                learningObjectives: node.learningObjectives,
                prerequisites: node.prerequisites,
                entityType: node.entityType,
              });
            }
          }
        }
      }

      return result;
    } catch (error) {
      logger.error(`[GraphEngine] Error fetching prerequisites for ${targetSlug}`, error);
      return [];
    }
  }

  /**
   * Recommends next logical nodes that list target node as a prerequisite.
   */
  public static async getNextRecommended(sourceSlug: string): Promise<GraphNode[]> {
    try {
      const sourceNode = await this.getNodeBySlug(sourceSlug);
      if (!sourceNode) return [];

      const edges = await prisma.learningEdge.findMany({
        where: {
          sourceNodeId: sourceNode.id,
        },
      });

      const targetIds = edges.map((e) => e.targetNodeId);
      if (targetIds.length === 0) return [];

      const nodes = await prisma.learningNode.findMany({
        where: { id: { in: targetIds } },
        orderBy: { qualityScore: "desc" },
      });

      return nodes.map((node) => ({
        id: node.id,
        slug: node.slug,
        title: node.title,
        technology: node.technology,
        difficulty: node.difficulty,
        qualityScore: node.qualityScore,
        learningObjectives: node.learningObjectives,
        prerequisites: node.prerequisites,
        entityType: node.entityType,
      }));
    } catch (error) {
      logger.error(`[GraphEngine] Error fetching next recommended for ${sourceSlug}`, error);
      return [];
    }
  }

  /**
   * Retrieves localized subgraph neighborhood up to N hops away.
   */
  public static async getGraphNeighbourhood(slug: string, depth: number = 2): Promise<Subgraph> {
    try {
      const root = await this.getNodeBySlug(slug);
      if (!root) return { nodes: [], edges: [] };

      const visitedNodeIds = new Set<string>([root.id]);
      const resultNodes: GraphNode[] = [root];
      const resultEdges: GraphEdge[] = [];

      let currentLevelIds = [root.id];

      for (let d = 0; d < depth; d++) {
        if (currentLevelIds.length === 0) break;

        const edges = await prisma.learningEdge.findMany({
          where: {
            OR: [
              { sourceNodeId: { in: currentLevelIds } },
              { targetNodeId: { in: currentLevelIds } },
            ],
          },
        });

        const nextLevelIds = new Set<string>();

        for (const e of edges) {
          resultEdges.push({
            id: e.id,
            sourceNodeId: e.sourceNodeId,
            targetNodeId: e.targetNodeId,
            edgeType: e.edgeType as any,
            weight: e.weight,
          });

          const otherId = currentLevelIds.includes(e.sourceNodeId) ? e.targetNodeId : e.sourceNodeId;
          if (!visitedNodeIds.has(otherId)) {
            visitedNodeIds.add(otherId);
            nextLevelIds.add(otherId);
          }
        }

        if (nextLevelIds.size > 0) {
          const newNodes = await prisma.learningNode.findMany({
            where: { id: { in: Array.from(nextLevelIds) } },
          });

          for (const n of newNodes) {
            resultNodes.push({
              id: n.id,
              slug: n.slug,
              title: n.title,
              technology: n.technology,
              difficulty: n.difficulty,
              qualityScore: n.qualityScore,
              learningObjectives: n.learningObjectives,
              prerequisites: n.prerequisites,
              entityType: n.entityType,
            });
          }
        }

        currentLevelIds = Array.from(nextLevelIds);
      }

      // Deduplicate edges
      const edgeMap = new Map<string, GraphEdge>();
      for (const edge of resultEdges) {
        edgeMap.set(`${edge.sourceNodeId}->${edge.targetNodeId}`, edge);
      }

      return {
        nodes: resultNodes,
        edges: Array.from(edgeMap.values()),
        rootNodeSlug: slug,
      };
    } catch (error) {
      logger.error(`[GraphEngine] Error fetching graph neighborhood for ${slug}`, error);
      return { nodes: [], edges: [] };
    }
  }

  /**
   * Performs graph integrity validation: cycle detection & orphan node detection.
   */
  public static async validateGraphIntegrity(): Promise<GraphIntegrityReport> {
    try {
      const allNodes = await prisma.learningNode.findMany();
      const allEdges = await prisma.learningEdge.findMany();

      const totalNodes = allNodes.length;
      const totalEdges = allEdges.length;

      // Build adjacency list
      const adj = new Map<string, string[]>();
      const nodeIdsWithEdges = new Set<string>();

      for (const edge of allEdges) {
        if (!adj.has(edge.sourceNodeId)) adj.set(edge.sourceNodeId, []);
        adj.get(edge.sourceNodeId)!.push(edge.targetNodeId);

        nodeIdsWithEdges.add(edge.sourceNodeId);
        nodeIdsWithEdges.add(edge.targetNodeId);
      }

      // Detect orphan nodes (nodes with 0 edges connected)
      const orphanNodes = allNodes
        .filter((n) => !nodeIdsWithEdges.has(n.id))
        .map((n) => n.slug);

      // Detect cycles using DFS (0 = unvisited, 1 = visiting, 2 = visited)
      const state = new Map<string, number>();
      const cycleNodes: string[] = [];
      let hasCycles = false;

      const dfs = (u: string, path: string[]) => {
        state.set(u, 1);
        path.push(u);

        const neighbors = adj.get(u) || [];
        for (const v of neighbors) {
          const vState = state.get(v) || 0;
          if (vState === 1) {
            hasCycles = true;
            cycleNodes.push(v);
          } else if (vState === 0) {
            dfs(v, path);
          }
        }

        state.set(u, 2);
        path.pop();
      };

      for (const node of allNodes) {
        if ((state.get(node.id) || 0) === 0) {
          dfs(node.id, []);
        }
      }

      return {
        isValid: !hasCycles,
        totalNodes,
        totalEdges,
        hasCycles,
        cycleNodes,
        orphanNodes,
      };
    } catch (error) {
      logger.error("[GraphEngine] Error performing graph integrity validation", error);
      return {
        isValid: false,
        totalNodes: 0,
        totalEdges: 0,
        hasCycles: false,
        cycleNodes: [],
        orphanNodes: [],
      };
    }
  }
}
