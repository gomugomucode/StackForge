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
  public static async getAllProjects(): Promise<ProductionProjectSpec[]> {
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
      {
        id: "proj_event_streaming_analytics",
        title: "High-Throughput Distributed Event Analytics Engine",
        slug: "distributed-event-analytics-engine",
        technology: "nodejs",
        level: "Level 4: Enterprise Architecture",
        businessProblem: "High-scale applications require sub-second ingestion of telemetry events with sliding window aggregation.",
        functionalRequirements: [
          "Apache Kafka consumer group partitioning and offset management",
          "Sliding time-window event aggregation using Redis Sorted Sets",
          "PostgreSQL pgvector / timescale hypertable persistence",
        ],
        architectureDiagramSpec: "graph TD; EventProducers-->KafkaInbound; KafkaInbound-->NodeConsumers; NodeConsumers-->RedisWindow; NodeConsumers-->TimescaleDB;",
        databaseSchemaDDL: `
          CREATE TABLE "TelemetryEvent" (
            "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            "tenantId" TEXT NOT NULL,
            "eventName" TEXT NOT NULL,
            "payload" JSONB NOT NULL,
            "timestamp" TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `,
        apiEndpoints: [
          { method: "POST", path: "/api/v1/events/ingest", description: "Batch ingest telemetry events" },
          { method: "GET", path: "/api/v1/analytics/metrics", description: "Query sliding window metrics" },
        ],
        folderStructure: `
          src/
          ├── consumers/
          │   └── eventConsumer.ts
          ├── agg/
          │   └── windowAggregator.ts
          └── storage/
              └── timescaleClient.ts
        `,
        deploymentGuide: "Deploy Node.js workers to Kubernetes (EKS) with Helm chart and Strimzi Kafka operator.",
        evaluationRubric: [
          { criteria: "Ingestion Throughput & Backpressure", weight: 40 },
          { criteria: "Fault Tolerance & Rebalance Handling", weight: 30 },
          { criteria: "Data Compression & Storage Efficiency", weight: 30 },
        ],
        hiringSkills: ["Node.js", "Apache Kafka", "PostgreSQL / TimescaleDB", "Redis", "Kubernetes"],
        realCompaniesUsingSimilar: ["Datadog", "Mixpanel", "Segment", "PostHog"],
      },
      {
        id: "proj_vector_search_engine",
        title: "Edge AI Hybrid Semantic Vector Search Engine",
        slug: "edge-ai-vector-search-engine",
        technology: "typescript",
        level: "Level 4: Enterprise Architecture",
        businessProblem: "Modern applications require hybrid BM25 lexical + Cosine dense vector search over high-dimensional embeddings.",
        functionalRequirements: [
          "Transformer embedding generation via ONNX runtime in WebAssembly",
          "HNSW index vector similarity search with pgvector",
          "Reciprocal Rank Fusion (RRF) score merging",
        ],
        architectureDiagramSpec: "graph LR; UserQuery-->BM25Search; UserQuery-->EmbeddingEngine; EmbeddingEngine-->HNSWVectorIndex; BM25Search & HNSWVectorIndex-->RRFMerger;",
        databaseSchemaDDL: `
          CREATE EXTENSION IF NOT EXISTS vector;
          CREATE TABLE "DocumentEmbedding" (
            "id" TEXT PRIMARY KEY,
            "content" TEXT NOT NULL,
            "embedding" vector(1536) NOT NULL,
            "createdAt" TIMESTAMP DEFAULT NOW()
          );
          CREATE INDEX ON "DocumentEmbedding" USING hnsw ("embedding" vector_cosine_ops);
        `,
        apiEndpoints: [
          { method: "POST", path: "/api/search/hybrid", description: "Hybrid lexical + vector search query" },
          { method: "POST", path: "/api/documents/index", description: "Generate embeddings & index document" },
        ],
        folderStructure: `
          src/
          ├── vector/
          │   └── hnswIndex.ts
          ├── search/
          │   └── rrfMerger.ts
          └── embeddings/
              └── onnxEngine.ts
        `,
        deploymentGuide: "Deploy to Cloudflare Workers Edge with Supabase pgvector.",
        evaluationRubric: [
          { criteria: "Search Recall & Precision (NDCG@10)", weight: 40 },
          { criteria: "Vector Index Build & Search Latency", weight: 30 },
          { criteria: "TypeScript Type Safety & Abstractions", weight: 30 },
        ],
        hiringSkills: ["TypeScript", "pgvector", "Vector Databases", "ONNX Runtime", "RAG Systems"],
        realCompaniesUsingSimilar: ["Pinecone", "Elasticsearch", "Algolia", "OpenAI"],
      },
    ];
  }

  public static async getProjectsByTechnology(technology: string): Promise<ProductionProjectSpec[]> {
    const all = await this.getAllProjects();
    const tech = technology.toLowerCase();
    const filtered = all.filter((p) => p.technology.toLowerCase() === tech);
    return filtered.length > 0 ? filtered : all;
  }
}
