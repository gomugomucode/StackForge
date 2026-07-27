export interface MissionStep {
  id: string;
  stepNumber: number;
  type: "READ" | "QUIZ" | "CHALLENGE" | "BUILD" | "DEPLOY" | "REVIEW";
  title: string;
  description: string;
  url: string;
}

export interface LearningMissionData {
  id: string;
  slug: string;
  title: string;
  description: string;
  technology: string;
  xpAwarded: number;
  steps: MissionStep[];
}

export const learningMissions: LearningMissionData[] = [
  {
    id: "mission-auth",
    slug: "master-authentication",
    title: "Mission: Production Authentication & Security",
    description: "Learn JWT tokens, HMAC signature verification, OAuth 2.0, Supabase Auth, and RBAC authorization.",
    technology: "Security & Auth",
    xpAwarded: 250,
    steps: [
      { id: "s1", stepNumber: 1, type: "READ", title: "Read: Web Security & Token Storage", description: "Understand HttpOnly cookies vs localStorage token security.", url: "/blog" },
      { id: "s2", stepNumber: 2, type: "QUIZ", title: "Quiz: Authentication & Authorization", description: "Pass the 10-question security assessment.", url: "/quizzes" },
      { id: "s3", stepNumber: 3, type: "CHALLENGE", title: "Challenge: HMAC Signature Verification", description: "Implement signature verification for incoming webhooks.", url: "/learn/javascript/closure-scope" },
      { id: "s4", stepNumber: 4, type: "BUILD", title: "Build: OAuth GitHub Bot Service", description: "Build the AI Code Reviewer GitHub App.", url: "/projects/ai-code-reviewer" },
      { id: "s5", stepNumber: 5, type: "DEPLOY", title: "Deploy: Production Deployment & Verification", description: "Deploy full-stack app with verified SSL & security headers.", url: "/projects" },
    ],
  },
  {
    id: "mission-crdt",
    slug: "master-realtime-crdt",
    title: "Mission: Real-time Concurrency & CRDTs",
    description: "Build a Notion-style collaborative editor using Yjs, WebSockets, and Tiptap.",
    technology: "Real-time Systems",
    xpAwarded: 300,
    steps: [
      { id: "s1", stepNumber: 1, type: "READ", title: "Read: Conflict-free Replicated Data Types", description: "Understand state vector reconciliation across peers.", url: "/blog" },
      { id: "s2", stepNumber: 2, type: "QUIZ", title: "Quiz: WebSockets & Event Emitters", description: "Test your understanding of full-duplex socket connections.", url: "/quizzes" },
      { id: "s3", stepNumber: 3, type: "BUILD", title: "Build: Collaborative Markdown Workspace", description: "Implement Yjs CRDT bindings with Tiptap editor.", url: "/projects/realtime-collab-editor" },
      { id: "s4", stepNumber: 4, type: "REVIEW", title: "Review: Automated Code Review", description: "Submit GitHub repo for multi-dimensional AI architecture feedback.", url: "/projects" },
    ],
  },
];
