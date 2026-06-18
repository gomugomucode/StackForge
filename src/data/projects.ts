export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  estimatedTime: string;
  requirements: string[];
  architecture: {
    overview: string;
    techStack: string[];
    diagram: string;
  };
  tasks: ProjectTask[];
  solution: string;
  challenges: string[];
}

export const projects: Project[] = [
  {
    id: 'p1',
    slug: 'ai-code-reviewer',
    title: 'AI Code Reviewer',
    description: 'Build a tool that analyzes GitHub PRs and suggests improvements using LLMs.',
    difficulty: 'Advanced',
    category: 'AI & Fullstack',
    tags: ['Next.js', 'OpenAI', 'GitHub API'],
    estimatedTime: '4-6 Weeks',
    requirements: [
      'Node.js installed',
      'OpenAI API Key',
      'GitHub App Secrets',
      'Postgres Database'
    ],
    architecture: {
      overview: 'A serverless pipeline that triggers on GitHub Webhooks, processes code via OpenAI, and posts comments back to the PR.',
      techStack: ['Next.js 15', 'Prisma', 'Tailwind CSS', 'OpenAI SDK'],
      diagram: 'Webhook -> Queue -> Analyzer -> GitHub API'
    },
    tasks: [
      { id: 't1', title: 'GitHub App Setup', description: 'Create a GitHub App and configure webhooks.', isCompleted: false },
      { id: 't2', title: 'PR Fetcher', description: 'Implement logic to fetch PR diffs from GitHub API.', isCompleted: false },
      { id: 't3', title: 'AI Prompt Engineering', description: 'Design prompts for high-quality code reviews.', isCompleted: false },
      { id: 't4', title: 'Review Poster', description: 'Post suggestions as line-comments on the PR.', isCompleted: false },
    ],
    solution: 'https://github.com/example/ai-reviewer-solution',
    challenges: [
      'Handling large diffs that exceed token limits.',
      'Avoiding duplicate comments on the same line.',
      'Managing asynchronous webhook responses.'
    ]
  },
  {
    id: 'p2',
    slug: 'realtime-collab-editor',
    title: 'Collaborative Markdown Editor',
    description: 'A Notion-like editor where multiple users can edit a document in real-time.',
    difficulty: 'Intermediate',
    category: 'Real-time Systems',
    tags: ['Yjs', 'WebSockets', 'React'],
    estimatedTime: '2-3 Weeks',
    requirements: [
      'Understanding of CRDTs',
      'Basic React knowledge',
      'Node.js for WebSocket server'
    ],
    architecture: {
      overview: 'Uses Yjs for Conflict-free Replicated Data Types (CRDTs) with a WebSocket provider for synchronization.',
      techStack: ['React', 'Yjs', 'Tiptap', 'Socket.io'],
      diagram: 'Client <-> WebSocket Server <-> State Store'
    },
    tasks: [
      { id: 't1', title: 'Editor Setup', description: 'Integrate Tiptap editor into React.', isCompleted: false },
      { id: 't2', title: 'CRDT Integration', description: 'Connect Yjs to the editor instance.', isCompleted: false },
      { id: 't3', title: 'Sync Server', description: 'Build a simple Hocuspocus or Y-websocket server.', isCompleted: false },
    ],
    solution: 'https://github.com/example/collab-editor-solution',
    challenges: [
      'Handling cursor synchronization between users.',
      'Implementing document versioning/snapshots.',
      'Optimizing network traffic for large documents.'
    ]
  }
]
