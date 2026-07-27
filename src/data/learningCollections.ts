export interface CollectionItem {
  type: "ARTICLE" | "LESSON" | "PROJECT" | "QUIZ" | "INTERVIEW" | "DOCS";
  title: string;
  url: string;
  readingTimeOrTime: string;
}

export interface LearningCollectionData {
  id: string;
  slug: string;
  title: string;
  description: string;
  technology: string;
  iconName: string;
  color: string;
  itemCount: number;
  items: CollectionItem[];
}

export const learningCollections: LearningCollectionData[] = [
  {
    id: "col-react",
    slug: "become-a-react-engineer",
    title: "Become a Senior React Engineer",
    description: "Master React 19, Server Components, Hooks lifecycle, State Management, and Performance Tuning.",
    technology: "React",
    iconName: "Code2",
    color: "sky",
    itemCount: 6,
    items: [
      { type: "LESSON", title: "React Hooks & State Management", url: "/learn/react/overview", readingTimeOrTime: "30 mins" },
      { type: "ARTICLE", title: "React 19 Server Components Deep-Dive", url: "/blog", readingTimeOrTime: "10 mins read" },
      { type: "PROJECT", title: "Real-time Collaborative Editor", url: "/projects/realtime-collab-editor", readingTimeOrTime: "2-3 Weeks" },
      { type: "QUIZ", title: "React Virtual DOM & Reconciliation Quiz", url: "/quizzes", readingTimeOrTime: "15 mins" },
      { type: "INTERVIEW", title: "React Architecture Interview Questions", url: "/interview", readingTimeOrTime: "20 mins" },
      { type: "DOCS", title: "Official React Documentation", url: "https://react.dev", readingTimeOrTime: "Reference" },
    ],
  },
  {
    id: "col-ts",
    slug: "master-typescript",
    title: "Master TypeScript & Type Systems",
    description: "From strict mode basics to advanced generics, conditional types, mapped types, and AST transformations.",
    technology: "TypeScript",
    iconName: "FileText",
    color: "indigo",
    itemCount: 5,
    items: [
      { type: "LESSON", title: "TypeScript Generics & Utility Types", url: "/learn/typescript/overview", readingTimeOrTime: "25 mins" },
      { type: "ARTICLE", title: "Type-Safe API Contracts with Prisma & Zod", url: "/blog", readingTimeOrTime: "8 mins read" },
      { type: "PROJECT", title: "AI Code Reviewer Bot", url: "/projects/ai-code-reviewer", readingTimeOrTime: "4 Weeks" },
      { type: "QUIZ", title: "TypeScript Strict Mode Diagnostics", url: "/quizzes", readingTimeOrTime: "10 mins" },
      { type: "DOCS", title: "Official TypeScript Docs", url: "https://www.typescriptlang.org/docs/", readingTimeOrTime: "Reference" },
    ],
  },
  {
    id: "col-next",
    slug: "nextjs-mastery",
    title: "Next.js 15 Full-Stack Mastery",
    description: "App Router, Server Actions, Middleware, Streaming RSC, ISR, and Edge Runtime Optimization.",
    technology: "Next.js",
    iconName: "Sparkles",
    color: "emerald",
    itemCount: 5,
    items: [
      { type: "LESSON", title: "App Router & Server Actions", url: "/learn/nextjs/overview", readingTimeOrTime: "40 mins" },
      { type: "ARTICLE", title: "Caching & Revalidation Strategies in Next.js 15", url: "/blog", readingTimeOrTime: "12 mins read" },
      { type: "PROJECT", title: "AI Code Reviewer Platform", url: "/projects/ai-code-reviewer", readingTimeOrTime: "4 Weeks" },
      { type: "INTERVIEW", title: "Next.js SSR vs ISR Interview Questions", url: "/interview", readingTimeOrTime: "15 mins" },
      { type: "DOCS", title: "Official Next.js Documentation", url: "https://nextjs.org/docs", readingTimeOrTime: "Reference" },
    ],
  },
  {
    id: "col-sys",
    slug: "system-design",
    title: "System Design & Scalable Architecture",
    description: "Distributed Systems, Microservices, Caching Strategies, Message Queues, and Load Balancing.",
    technology: "System Design",
    iconName: "Layers",
    color: "amber",
    itemCount: 5,
    items: [
      { type: "LESSON", title: "Consistent Hashing & Distributed Caching", url: "/learn/system-design/overview", readingTimeOrTime: "45 mins" },
      { type: "ARTICLE", title: "Designing High-Throughput Webhook Processing", url: "/blog", readingTimeOrTime: "15 mins read" },
      { type: "PROJECT", title: "Distributed Task Queue Service", url: "/projects", readingTimeOrTime: "3 Weeks" },
      { type: "INTERVIEW", title: "System Design Mock Interviews", url: "/interview", readingTimeOrTime: "30 mins" },
      { type: "DOCS", title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", readingTimeOrTime: "Reference" },
    ],
  },
];
