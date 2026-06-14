# StackForge Academy — Programming Education Platform

A production‑grade, dark‑themed programming education platform built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Prisma**, **PostgreSQL**, and **NextAuth**. The app delivers interactive coding lessons, quizzes, and a community hub.

## Features

- Modern UI with glassmorphism, gradient accents, and smooth animations.
- Authentication via NextAuth (OAuth, credentials).
- Content engine powered by MDX and Contentlayer for lessons and blog posts.
- Server‑Side Rendering and Server Actions for fast, SEO‑friendly pages.
- Database backed by PostgreSQL accessed through Prisma ORM.
- Responsive design across mobile, tablet, and desktop.
- Analytics and leaderboards for student progress.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with TypeScript strict mode.
- **Styling:** Tailwind CSS v4, custom dark theme with glassmorphism.
- **ORM:** Prisma ORM connected to PostgreSQL.
- **Auth:** NextAuth.js (OAuth providers, credentials).
- **Content:** MDX + Contentlayer for static content.
- **Animations:** Framer Motion.
- **Icons:** Lucide React.

## Getting Started

```bash
npm install        # install dependencies
npm run dev        # start the development server (http://localhost:3000)
```

## Production Build

```bash
npm run build       # compile the application
npm run start       # start the production server
```

## Project Structure

```
app/
├───(api)
│   └───auth
│       └───[...nextauth]
│           └───route.ts
├───(auth)
│   └───login
│       └───page.tsx
├───(dashboard)
│   ├───bookmarks
│   │   └───page.tsx
│   └───profile
│       └───page.tsx
├───about
│   └───page.tsx
├───analytics
│   └───page.tsx
├───blog
│   └───page.tsx
├───certificates
│   ├───page.tsx
│   └───[id]
│       └───page.tsx
├───certifications
│   └───page.tsx
├───cheatsheets
│   ├───page.tsx
│   ├───[slug]
│   │   └───page.tsx
│   └───[slug]
│       └───page.tsx
├───community
│   └───page.tsx
├───compare
│   └───page.tsx
├───interview-prep
│   └───page.tsx
├───learn
│   (no files)
├───marketplace
│   └───page.tsx
├───mentor
│   └───page.tsx
├───notes
│   └───page.tsx
├───playground
│   └───page.tsx
├───profile
│   (no files)
├───projects
│   ├───page.tsx
│   ├───[slug]
│   │   └───page.tsx
│   └───[slug]
│       └───page.tsx
├───resources
│   └───page.tsx
├───roadmaps
│   ├───page.tsx
│   ├───[slug]
│   │   └───page.tsx
│   └───[slug]
│       └───page.tsx
├───settings
│   (no files)
├───skill-tree
│   └───page.tsx
├───tech-hub
│   └───page.tsx
├───tools
│   └───page.tsx
├───tutorials
│   ├───page.tsx
│   ├───[slug]
│   │   └───page.tsx
│   └───[slug]
│       └───page.tsx
└───verify
    ├───[certificateId]
    │   └───page.tsx
    └───[certificateId]
        └───page.tsx

globals.css
layout.tsx
page.tsx
api/
    auth/
        route.ts
auth.ts
middleware.ts
components/
lib/
content/
prisma/
public/
features/
scripts/
server/
    db/
    repositories/
supabase/
    migrations/
```

## License

MIT © 2024 StackForge Academy.
