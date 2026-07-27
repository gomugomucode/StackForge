export interface CareerRoadmapData {
  id: string;
  slug: string;
  title: string;
  description: string;
  role: string;
  estimatedTime: string;
  skills: string[];
  hiringChecklist: string[];
  featuredProjects: string[];
}

export const careerRoadmaps: CareerRoadmapData[] = [
  {
    id: "career-frontend",
    slug: "frontend-engineer",
    title: "Frontend Software Engineer",
    description: "Master Modern React 19, Next.js 15, TypeScript, State Management, Web Performance, and Accessibility.",
    role: "Frontend Engineer",
    estimatedTime: "3-4 Months",
    skills: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Web Vitals", "WCAG 2.1 AA"],
    hiringChecklist: [
      "Build & deploy a production React/Next.js application.",
      "Achieve 95+ Lighthouse performance score.",
      "Pass TypeScript strict mode diagnostics quiz.",
      "Implement accessible keyboard navigation & ARIA roles.",
    ],
    featuredProjects: ["ai-code-reviewer", "realtime-collab-editor"],
  },
  {
    id: "career-backend",
    slug: "backend-engineer",
    title: "Backend Software Engineer",
    description: "Node.js runtime, PostgreSQL, Prisma ORM, Distributed Caching, System Architecture, and API Security.",
    role: "Backend Engineer",
    estimatedTime: "4-5 Months",
    skills: ["Node.js", "PostgreSQL", "Prisma ORM", "Redis", "Docker", "REST & GraphQL"],
    hiringChecklist: [
      "Design normalized relational database schemas.",
      "Implement rate-limiting and JWT token authentication.",
      "Build a high-throughput webhook processing pipeline.",
      "Optimize SQL query latency under 100ms.",
    ],
    featuredProjects: ["ai-code-reviewer"],
  },
  {
    id: "career-fullstack",
    slug: "fullstack-engineer",
    title: "Full-Stack Software Engineer",
    description: "End-to-end product architecture: React/Next.js frontend, Node/Prisma backend, CI/CD, and Cloud deployment.",
    role: "Full-Stack Engineer",
    estimatedTime: "5-6 Months",
    skills: ["React 19", "Next.js 15", "Node.js", "Prisma", "PostgreSQL", "Tailwind CSS", "GitHub Actions"],
    hiringChecklist: [
      "Deploy a full-stack Next.js app with authentication & database.",
      "Write multi-dimensional unit and integration tests.",
      "Integrate automated CI/CD deployment pipelines.",
      "Complete 2 industry-standard portfolio projects.",
    ],
    featuredProjects: ["ai-code-reviewer", "realtime-collab-editor"],
  },
  {
    id: "career-ai",
    slug: "ai-engineer",
    title: "AI & LLM Systems Engineer",
    description: "Generative AI, Prompt Engineering, Vector Databases, Retrieval-Augmented Generation (RAG), and Model Evaluation.",
    role: "AI Engineer",
    estimatedTime: "4-5 Months",
    skills: ["Python", "TypeScript", "OpenAI SDK", "LangChain", "Vector Embeddings", "RAG Systems"],
    hiringChecklist: [
      "Engineer structured JSON schema prompts with LLMs.",
      "Build a grounded RAG knowledge retrieval engine.",
      "Implement token window chunking for large diffs.",
      "Deploy an AI-powered code reviewer bot.",
    ],
    featuredProjects: ["ai-code-reviewer"],
  },
];
