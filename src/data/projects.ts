export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface ProjectRubric {
  architecture: number; // Max score 25
  quality: number;      // Max score 25
  coverage: number;     // Max score 25
  security: number;     // Max score 25
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  businessScenario: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  estimatedTime: string;
  requirements: string[];
  constraints: string[];
  acceptanceCriteria: string[];
  architecture: {
    overview: string;
    techStack: string[];
    diagram: string;
  };
  recommendedFolderStructure: string;
  tasks: ProjectTask[];
  solution: string;
  challenges: string[];
  stretchGoals: string[];
  commonMistakes: string[];
  rubric: ProjectRubric;
}

export const projects: Project[] = [
  {
    id: 'p1',
    slug: 'ai-code-reviewer',
    title: 'AI Code Reviewer (Production PR Bot)',
    description: 'Build a production-ready GitHub App bot that automatically audits PR diffs, executes security scans, and posts inline review comments.',
    businessScenario: 'Engineering teams waste 15+ hours per sprint on routine code review style checks and basic security audits. Your company needs an automated GitHub webhook service that performs instant AI code reviews upon PR creation.',
    difficulty: 'Advanced',
    category: 'AI & Fullstack',
    tags: ['Next.js 15', 'OpenAI', 'GitHub Webhooks', 'TypeScript'],
    estimatedTime: '4-6 Weeks',
    requirements: [
      'Node.js v20+ & TypeScript strict mode',
      'OpenAI API Key (GPT-4o-mini)',
      'GitHub App Secrets & Webhook secret signing',
      'Postgres Database with Prisma ORM'
    ],
    constraints: [
      'API responses must process PR diffs within a 10-second timeout budget.',
      'Must handle large PR diffs exceeding 8,000 tokens gracefully using chunking.',
      'Zero credential leaks: Never expose API keys or webhook signature secrets in git history.'
    ],
    acceptanceCriteria: [
      'Webhook signature verification implemented with HMAC-SHA256.',
      'Automated fetching of git diffs via GitHub REST/GraphQL API.',
      'Structured JSON review format with inline line-number comments.',
      'Deduplication logic preventing repeated bot comments on identical PR commits.'
    ],
    architecture: {
      overview: 'A serverless pipeline that verifies GitHub Webhook payloads, queues PR diff processing, calls OpenAI API with structured JSON schemas, and posts inline suggestions to GitHub.',
      techStack: ['Next.js 15 App Router', 'Prisma ORM', 'Tailwind CSS', 'OpenAI SDK', 'Octokit'],
      diagram: 'GitHub Event -> HMAC Verification -> Diff Analyzer -> OpenAI API -> Line Comment Post'
    },
    recommendedFolderStructure: `src/
├── app/
│   └── api/
│       └── webhooks/
│           └── github/route.ts
├── services/
│   ├── githubService.ts
│   └── aiReviewService.ts
└── lib/
    ├── crypto.ts
    └── prisma.ts`,
    tasks: [
      { id: 't1', title: 'GitHub App & Secret Setup', description: 'Configure GitHub App, webhooks, and HMAC signature verification.', isCompleted: false },
      { id: 't2', title: 'PR Diff Fetcher Service', description: 'Implement Octokit service to parse unified diff patches.', isCompleted: false },
      { id: 't3', title: 'Structured AI Prompting', description: 'Engineer JSON schema prompts for security and performance feedback.', isCompleted: false },
      { id: 't4', title: 'Inline Comment Poster', description: 'Post line-level review comments back to the GitHub PR thread.', isCompleted: false },
    ],
    solution: 'https://github.com/stackforge/ai-code-reviewer-reference',
    challenges: [
      'Managing asynchronous webhook retries when OpenAI rate limits occur.',
      'Avoiding duplicate comments on identical line hunks.',
      'Token window optimization for large multi-file diffs.'
    ],
    stretchGoals: [
      'Add automated ESLint and Prettier auto-fix PR suggestions.',
      'Integrate Slack/Discord notification webhooks for high-severity security flags.'
    ],
    commonMistakes: [
      'Failing to verify x-hub-signature-256 header (security vulnerability).',
      'Blocking the main HTTP webhook response thread (causes GitHub timeout).'
    ],
    rubric: {
      architecture: 25,
      quality: 25,
      coverage: 25,
      security: 25
    }
  },
  {
    id: 'p2',
    slug: 'realtime-collab-editor',
    title: 'Collaborative Markdown Workspace',
    description: 'A Notion-style real-time collaborative document engine using Conflict-free Replicated Data Types (CRDTs) and WebSockets.',
    businessScenario: 'Remote engineering teams require seamless, concurrent documentation editing without lock-outs or data loss during network dropouts.',
    difficulty: 'Intermediate',
    category: 'Real-time Systems',
    tags: ['Yjs', 'WebSockets', 'React', 'CRDTs'],
    estimatedTime: '2-3 Weeks',
    requirements: [
      'Understanding of Conflict-free Replicated Data Types (CRDTs)',
      'React state management and hook lifecycle',
      'Node.js WebSocket server (Socket.io or Y-Websocket)'
    ],
    constraints: [
      'Document synchronization latency must remain under 50ms across 10 active peers.',
      'Must support offline persistence and auto-reconnection synchronization.'
    ],
    acceptanceCriteria: [
      'Multi-user concurrent text editing without position jumping.',
      'User presence indicators showing cursor location and user avatar.',
      'Offline document caching with automatic state reconciliation on reconnect.',
      'Export document to Markdown and HTML formats.'
    ],
    architecture: {
      overview: 'Uses Yjs CRDT library with a WebSocket sync provider and Tiptap rich-text editor instance.',
      techStack: ['React 19', 'Yjs', 'Tiptap Editor', 'WebSocket Server'],
      diagram: 'Client Editor <-> Yjs Doc <-> WebSocket Server <-> Persistent Storage'
    },
    recommendedFolderStructure: `src/
├── components/
│   ├── Editor.tsx
│   └── UserPresence.tsx
├── hooks/
│   └── useYjsSync.ts
└── server/
    └── websocketServer.ts`,
    tasks: [
      { id: 't1', title: 'Rich Text Editor Setup', description: 'Integrate Tiptap editor with custom extensions.', isCompleted: false },
      { id: 't2', title: 'Yjs CRDT Bindings', description: 'Bind editor state to Y.Text CRDT structures.', isCompleted: false },
      { id: 't3', title: 'WebSocket Provider', description: 'Build WebSocket server for peer state broadcasts.', isCompleted: false },
    ],
    solution: 'https://github.com/stackforge/collab-editor-reference',
    challenges: [
      'Managing cursor offsets during concurrent deletions.',
      'Optimizing binary update messages for low bandwidth.'
    ],
    stretchGoals: [
      'Implement document snapshot version history and restore points.',
      'Add end-to-end document encryption.'
    ],
    commonMistakes: [
      'Mutating editor DOM directly instead of modifying CRDT document state.',
      'Failing to clean up WebSocket event listeners on component unmount.'
    ],
    rubric: {
      architecture: 25,
      quality: 25,
      coverage: 25,
      security: 25
    }
  }
];
