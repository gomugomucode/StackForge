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

## 📊 Current Implementation Status

Based on the latest platform reports, StackForge is transitioning from a **High-Fidelity Prototype** to a **Functional Beta**.

### ✅ Completed / High Stability
- **Prisma Infrastructure**: Singleton pattern implemented to prevent connection leaks.
- **Global Bookmarking**: DB-synced bookmarking system with global context provider.
- **Progress Tracking**: Hybrid roadmap tracking with XP rewards integration.
- **Interview Hub**: Expanded content library with interactive "Expert Answer" reveals.
- **Roadmaps & Paths**: Fully functional lock/unlock node mechanism.
- **CheatSheets & Projects**: High-quality curated content and viewing experience.
- **Search System**: High-performance global search for rapid resource discovery.

### 🟡 In Progress / Partial
- **Authentication**: Auth shell and adapter ready; provider keys pending in `.env`.
- **Gamification Engine**: XP and Leveling logic implemented; UI integration in Dashboard/Navbar pending.

### 🔴 Planned / Missing
- **AI Integration**: AI Mentor and Mock Interview simulations.
- **Community Layers**: Peer reviews, social profiles, and leaderboards.
- **Certification System**: PDF generation and final qualification exams.
- **Monetization**: Premium gating and subscription infrastructure.

## 🏗️ Detailed Folder Structure

```text
src/
├── app/                        # Next.js App Router (File-system Routing)
│   ├── api/                    # Backend API Endpoints
│   │   ├── ai/                 # AI-powered interview & mentor routes
│   │   ├── auth/               # NextAuth configuration
│   │   ├── bookmarks/          # User bookmark management
│   │   ├── certifications/     # Certification issuance and tracking
│   │   ├── circles/            # Community circles and networking
│   │   ├── progress/            # Learning progress tracking
│   │   ├── projects/           # Project submission and review logic
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
│   │   ├── jwt-decoder/        # JWT Token analyzer
│   │   ├── regex-tester/       # Regular Expression tester
│   │   └── timestamp-converter/# Epoch/ISO date converter
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
│   ├── gamification.ts         # XP, Leveling and Reward logic
│   └── utils.ts                # Helper functions (cn for Tailwind, formatting)
└── types/                      # TypeScript Definitions
    └── next-auth.d.ts          # Session and User interface extensions
prisma/                         # Database Layer
└── schema.prisma               # Data models for Users, Projects, and Progress
public/                          # Static Assets (Images, SVG, Robots.txt)
```

## ⚙️ Codebase Architecture

StackForge implements a **Layered Architecture** to ensure scalability and maintainability:

1.  **Data Layer (`/data`, `/prisma`)**: Defines the static content and the database schema.
2.  **State Layer (`/context`)**: Provides global accessibility to user-specific data (XP, Bookmarks) via React Context.
3.  **Business Logic Layer (`/app/api`)**: Handles server-side operations, AI integrations, and database mutations.
4.  **Presentation Layer (`/components`, `/app`)**: A strictly typed UI layer consuming state and API data.

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

# Auth Providers (Required for Login)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Setup
Since this project uses a rapid prototyping workflow, we use `db push` instead of formal migrations:
```bash
# Generate Prisma client
npx prisma generate

# Sync schema directly to the database
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
