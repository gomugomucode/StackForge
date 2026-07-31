export interface GraphNode {
  id: string;
  slug: string;
  title: string;
  technology: string;
  difficulty: string;
  qualityScore: number;
  learningObjectives: string[];
  prerequisites: string[];
  entityType: string;
}

export interface GraphEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  edgeType: "PREREQUISITE" | "NEXT_REC" | "RELATED";
  weight: number;
}

export interface Subgraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  rootNodeSlug?: string;
}

export interface GraphIntegrityReport {
  isValid: boolean;
  totalNodes: number;
  totalEdges: number;
  hasCycles: boolean;
  cycleNodes: string[];
  orphanNodes: string[];
}
