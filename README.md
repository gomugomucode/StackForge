# StackForge — Programming Education Platform

A production-quality, dark‑themed programming education UI built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Prisma**, **PostgreSQL**, and **NextAuth**. The platform delivers interactive coding lessons, quizzes, and a community hub.

## Features

- **Modern UI** with glassmorphism, gradient accents, and smooth animations.
- **Authentication** via NextAuth (OAuth, email/password).
- **Content Engine** powered by MDX and Contentlayer for blog posts and lessons.
- **Server‑Side Rendering** and **Server Actions** for fast, SEO‑friendly pages.
- **Database** backed by PostgreSQL accessed through Prisma ORM.
- **Responsive Design** across mobile, tablet, and desktop.
- **Analytics** and **leaderboards** for student progress.

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

```text
app/                     # Next.js App Router – pages, layouts, route handlers
  ├── api/               # API routes (auth, etc.)
  ├── layout.tsx        # Root layout with providers
  └── page.tsx          # Home page
prisma/                  # Prisma schema and migrations
  └── schema.prisma
content/                 # MDX content for lessons and blog posts
public/                  # Static assets (images, fonts)
src/                     # Shared React components and utilities
  ├── components/       # UI components (cards, nav, etc.)
  └── lib/              # Helper libraries (auth client, db client)
```

## License

MIT © 2024 StackForge Academy.
