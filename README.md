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
├───(auth)
│   └───login
├───(dashboard)
│   ├───bookmarks
│   └───profile
├───about
├───analytics
├───blog
├───certificates
│   └───[id]
├───certifications
├───cheatsheets
│   ├───[slug]
│   │   └───
│   └───[slug]
├───community
├───compare
├───interview-prep
├───learn
├───marketplace
├───mentor
├───notes
├───playground
├───profile
├───projects
│   ├───[slug]
│   │   └───
│   └───[slug]
├───resources
├───roadmaps
│   ├───[slug]
│   │   └───
│   └───[slug]
├───settings
├───skill-tree
├───tech-hub
├───tools
├───tutorials
│   ├───[slug]
│   │   └───
│   └───[slug]
└───verify
    ├───[certificateId]
    │   └───
    └───[certificateId]
├─ api/
├─ layout.tsx
└─ page.tsx
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
├─ db/
└─ repositories/
supabase/
└─ migrations/e
```

## License

MIT © 2024 StackForge Academy.
