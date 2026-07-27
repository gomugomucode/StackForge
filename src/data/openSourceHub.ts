export interface OpenSourceOpportunity {
  id: string;
  type: "GOOD_FIRST_ISSUE" | "HACKATHON" | "MENTORSHIP" | "FEATURED_PROJECT";
  title: string;
  repository: string;
  description: string;
  url: string;
  labels: string[];
  stars: number;
}

export const openSourceOpportunities: OpenSourceOpportunity[] = [
  {
    id: "oss-1",
    type: "GOOD_FIRST_ISSUE",
    title: "Add TypeScript types for server action context",
    repository: "vercel/next.js",
    description: "Good first issue for developers wanting to contribute to Next.js core TypeScript types.",
    url: "https://github.com/vercel/next.js/issues",
    labels: ["good-first-issue", "TypeScript"],
    stars: 141152,
  },
  {
    id: "oss-2",
    type: "GOOD_FIRST_ISSUE",
    title: "Improve error boundary diagnostics in React Server Components",
    repository: "facebook/react",
    description: "Help expand React DevTools diagnostics for server action error boundaries.",
    url: "https://github.com/facebook/react/issues",
    labels: ["good-first-issue", "React"],
    stars: 228400,
  },
  {
    id: "oss-3",
    type: "HACKATHON",
    title: "Global Open Source Web Development Hackathon",
    repository: "supabase/supabase",
    description: "Build open source full-stack applications with Supabase BaaS & Next.js.",
    url: "https://supabase.com/hackathon",
    labels: ["Hackathon", "Open Source", "Prize Pool"],
    stars: 73200,
  },
  {
    id: "oss-4",
    type: "MENTORSHIP",
    title: "Google Summer of Code Open Source Mentorship",
    repository: "prisma/prisma",
    description: "Pair with core Prisma maintainers to build database migration tools.",
    url: "https://github.com/prisma/prisma",
    labels: ["Mentorship", "GSoC"],
    stars: 39800,
  },
];
