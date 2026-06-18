# ⚒️ StackForge

**The Ultimate Forge for Modern Developers.**

StackForge is a high-performance developer resource platform designed to transition coders into elite engineers. By providing architectural blueprints, distilled cheat sheets, and production-grade projects, we bridge the gap between tutorial hell and real-world engineering.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

## 🏗️ Detailed Folder Structure

```text
src/
├── app/                        # Next.js App Router (File-system Routing)
│   ├── api/                    # Backend API Endpoints
│   │   ├── ai/                 # AI-powered interview & mentor routes
│   │   ├── bookmarks/          # User bookmark management
│   │   ├── certifications/     # Certification issuance and tracking
│   │   ├── circles/            # Community circles and networking
│   │   ├── projects/           # Project submission and review logic
│   │   ├── progress/            # Learning progress tracking
│   │   └── user/               # User profile and stats management
│   ├── interview/              # Interview Prep Module
│   │   ├── [slug]/             # Dynamic category pages for interview questions
│   │   └── mock/               # AI Mock Interview simulation interface
│   ├── projects/               # Project Learning System
│   │   ├── sandbox/[id]/       # Project execution environment
│   │   └── page.tsx            # Projects discovery gallery
│   ├── tools/                  # Developer Utility Suite
│   │   ├── base64-tool/        # Base64 Encoder/Decoder
│   │   ├── color-picker/       # Advanced Color Palette tool
│   │   ├── json-formatter/     # JSON beautifier and validator
│   │   └── regex-tester/       # Regular Expression tester
│   └── globals.css             # Global Tailwind styles and design tokens
├── components/                 # Modular Component Architecture
│   ├── ui/                     # Atomic UI (Buttons, Inputs, Dialogs - shadcn)
│   ├── layout/                 # Core Layout (Navbar, Sidebar, CommandMenu)
│   ├── home/                    # Landing page specific sections
│   ├── projects/               # Project-specific views (SubmitModal, LearningView)
│   ├── roadmaps/               # Learning path views (QuizView, FinalExamView)
│   └── cheatsheets/            # Documentation and cheat sheet renderers
├── context/                    # Global State Management (React Context)
│   ├── BookmarkContext.tsx     # Manages saved questions/resources
│   ├── ProgressContext.tsx     # Tracks user progress through roadmaps
│   └── UserStatsContext.tsx    # Synchronizes XP and streak data
├── data/                       # Single Source of Truth (SSOT)
│   ├── interviews.ts           # Curated interview questions and categories
│   └── projects.ts             # Master project requirements and metadata
├── lib/                        # Shared Utilities
│   ├── prisma.ts               # Singleton Prisma Client instance
│   └── utils.ts                # Helper functions (cn for Tailwind, formatting)
└── types/                      # TypeScript Definitions
    └── next-auth.d.ts          # Session and User interface extensions
prisma/                         # Database Layer
└── schema.prisma               # Data models for Users, Projects, and Progress
public/                          # Static Assets (Images, SVG, Robots.txt)
```

## ⚙️ Codebase Architecture

StackForge implements a **Layered Architecture** to ensure scalability and maintainability:

1.  **Data Layer (`/data`, `/prisma`)**: Defines the static content and the database schema. This ensures a consistent source of truth for all educational content.
2.  **State Layer (`/context`)**: Provides global accessibility to user-specific data (like XP and Bookmarks) without prop-drilling.
3.  **Business Logic Layer (`/app/api`)**: Handles server-side operations, AI integrations, and database mutations.
4.  **Presentation Layer (`/components`, `/app`)**: A strictly typed UI layer that consumes state and API data to render a high-performance, responsive interface.

## 🛠️ Getting Started

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd stackforge
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/stackforge"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Providers (Optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### 3. Database Setup
Generate the Prisma client and sync the schema:
```bash
npx prisma generate
npx prisma db push
```

### 4. Launch
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 📐 Design Principles

- **Depth-Based UI**: Utilizing a specific grayscale palette (Pure Black $\rightarrow$ Charcoal $\rightarrow$ Zinc) to create visual hierarchy.
- **Bento Grid System**: Information is organized in high-density grids for rapid scannability.
- **Performance-First**: Utilizing Next.js 15 Server Components to minimize client-side JavaScript.
- **Fluid Motion**: Coordinated animations using `framer-motion` for an "app-like" feel.
