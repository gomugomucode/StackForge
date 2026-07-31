export interface ProductionProjectSpec {
  id: string;
  title: string;
  slug: string;
  technology: string;
  level: "Level 1: Small Feature" | "Level 2: Complete Application" | "Level 3: Production Clone" | "Level 4: Enterprise Architecture";
  businessProblem: string;
  functionalRequirements: string[];
  architectureDiagramSpec: string;
  databaseSchemaDDL: string;
  apiEndpoints: { method: string; path: string; description: string }[];
  folderStructure: string;
  deploymentGuide: string;
  evaluationRubric: { criteria: string; weight: number }[];
  hiringSkills: string[];
  realCompaniesUsingSimilar: string[];
}

export class ProjectRegistry {
  public static async getProjectsByTechnology(technology: string): Promise<ProductionProjectSpec[]> {
    return [
      {
        id: "proj_stackforge_os",
        title: "StackForge Developer Knowledge Operating System Engine",
        slug: "stackforge-developer-knowledge-os",
        technology: "nextjs",
        level: "Level 4: Enterprise Architecture",
        businessProblem: "Developers waste hundreds of hours navigating disconnected tutorials, broken links, and outdated code snippets.",
        functionalRequirements: [
          "Git MDX source of truth sync engine to PostgreSQL meta index",
          "Knowledge Graph DAG cycle detector using DFS",
          "20-Point Educational Quality Gatekeeper Engine",
          "Search Engine V5 with multi-entity weighted relevance ranking",
        ],
        architectureDiagramSpec: "graph TD; GitMDX-->SyncEngine; SyncEngine-->Postgres; Postgres-->GraphEngine;",
        databaseSchemaDDL: `
          CREATE TABLE "LearningNode" (
            "id" TEXT PRIMARY KEY,
            "slug" TEXT UNIQUE NOT NULL,
            "title" TEXT NOT NULL,
            "technology" TEXT NOT NULL,
            "difficulty" TEXT NOT NULL,
            "qualityScore" DOUBLE PRECISION NOT NULL
          );
        `,
        apiEndpoints: [
          { method: "GET", path: "/api/search?q=query", description: "Multi-entity weighted search" },
          { method: "GET", path: "/api/graph/validate", description: "Validate Knowledge Graph DAG integrity" },
        ],
        folderStructure: `
          src/
          ├── features/
          │   ├── graph/
          │   ├── quality/
          │   └── search/
          └── lib/
              └── mdx/
        `,
        deploymentGuide: "Deploy to Vercel Serverless Edge runtime with Neon PostgreSQL database and Redis cache.",
        evaluationRubric: [
          { criteria: "Architecture & DAG Integrity", weight: 30 },
          { criteria: "Code Quality & TypeScript Strictness", weight: 30 },
          { criteria: "Search & Database Performance", weight: 20 },
          { criteria: "Educational Completeness", weight: 20 },
        ],
        hiringSkills: ["Next.js App Router", "TypeScript", "PostgreSQL", "System Design", "Search Ranking", "DAG Algorithms"],
        realCompaniesUsingSimilar: ["Vercel", "MDN", "roadmap.sh", "GitHub", "Stripe"],
      },
      {
        id: "proj_realtime_collaboration",
        title: "Distributed Realtime Collaborative Editor",
        slug: "realtime-collaborative-editor",
        technology: "react",
        level: "Level 3: Production Clone",
        businessProblem: "Distributed engineering teams need low-latency collaborative document editing with Conflict-Free Replicated Data Types (CRDTs).",
        functionalRequirements: [
          "WebSockets connection management with automatic reconnection backoff",
          "Yjs CRDT state synchronization across clients",
          "Presence indicators and cursor tracking",
        ],
        architectureDiagramSpec: "graph LR; ReactClient<-->WebSocketServer; WebSocketServer<-->RedisPubSub;",
        databaseSchemaDDL: `
          CREATE TABLE "Document" (
            "id" TEXT PRIMARY KEY,
            "title" TEXT NOT NULL,
            "contentState" BYTEA NOT NULL,
            "updatedAt" TIMESTAMP DEFAULT NOW()
          );
        `,
        apiEndpoints: [
          { method: "GET", path: "/api/documents/:id", description: "Fetch document snapshot" },
          { method: "WS", path: "/ws/collaborate/:id", description: "Realtime WebSocket CRDT channel" },
        ],
        folderStructure: `
          src/
          ├── components/
          │   └── editor/
          ├── hooks/
          │   └── useYjs.ts
          └── server/
              └── wsHandler.ts
        `,
        deploymentGuide: "Deploy WebSocket server to AWS ECS Fargate container instances with AWS ElastiCache Redis.",
        evaluationRubric: [
          { criteria: "CRDT Sync & Conflict Resolution", weight: 40 },
          { criteria: "WebSocket Connection Resilience", weight: 30 },
          { criteria: "UI Responsiveness & Layout", weight: 30 },
        ],
        hiringSkills: ["React", "WebSockets", "CRDTs (Yjs)", "Redis Pub/Sub", "Distributed Systems"],
        realCompaniesUsingSimilar: ["Figma", "Notion", "Linear", "Excalidraw"],
      },
    ];
  }
}
