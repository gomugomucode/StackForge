# ⚒️ STACKFORGE MASTER STATE & ENGINEERING BACKLOG

**Last Updated:** July 26, 2026  
**Document Version:** 3.0.0  
**Status:** Single Source of Truth (SSOT)  

---

## 1. System Architecture Snapshot

StackForge is a modern developer learning platform built with a **Feature-Driven App Router Architecture**:

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4.0, Framer Motion, Lucide React icons.
- **Backend / API**: Next.js API Routes (`/src/app/api`), Supabase Auth (`@supabase/ssr`), Prisma ORM 5.22.
- **Database**: PostgreSQL (Prisma Singleton pattern at `src/lib/prisma.ts`).
- **Authentication**: Supabase Auth (Session management via SSR cookies, legacy `src/auth.ts` shim maintained for backward compatibility).

---

## 2. Feature Inventory by Domain

| Domain | Status | Verified Features | Missing / Pending Features |
| :--- | :---: | :--- | :--- |
| **1. Authentication** | 🟡 PARTIAL | Supabase SSR cookie auth, middleware route guarding, login/signup UI shell. | OAuth provider callback edge cases, session refresh error boundary. |
| **2. Learning Engine** | 🟢 COMPLETE | Topic page layout (`TopicPage.tsx`), concept cards, code examples, topic completion triggering XP & progress. | Mini-projects mapped to individual topics. |
| **3. Roadmaps** | 🟢 COMPLETE | Graph node unlock logic (`useTopicProgress`), roadmap catalog (`/roadmaps`), 100% completion cert trigger. | Visual DAG custom layout editor. |
| **4. Dashboard** | 🟢 COMPLETE | Dynamic `/api/user/dashboard` data, user stats badge, activity feed, active roadmap progress cards. | Interactive goal-setting widget. |
| **5. Profile** | 🟡 PARTIAL | User XP stats badge, streak tracking, level badge in navbar & dashboard. | Dedicated public user profile page (`/profile/[username]`). |
| **6. Gamification** | 🟢 COMPLETE | Atomic XP transactions (`XpTransaction`), daily streak engine (`StreakTracking`), level scaling logic. | Special double-XP event flags, badge collection UI. |
| **7. Quizzes** | 🟢 COMPLETE | Server-side quiz answer evaluation, `QuizAttempt` logging, XP rewards on passing. | `/quizzes` top-level aggregator page. |
| **8. Challenges** | 🟡 PARTIAL | `ChallengeProgress` DB logging, hints reveal UI, challenge cards. | **Real code evaluation** (currently mocks solution evaluation). |
| **9. Projects** | 🟢 COMPLETE | `Project` requirements display, `ProjectSubmission` modal, project submission review system. | In-browser project repository workspace. |
| **10. Articles & MDX** | 🟡 PARTIAL | Article list page (`/blog`), MDX rendering setup for `closures.mdx` and `react-server-components.mdx`. | MDX content files for 80% of items listed in `src/data/articles.ts`. |
| **11. Search System** | 🟢 COMPLETE | Instant search modal (`CommandMenu`), client-side resource filter. | Fuzzy server-side search indexing over DB topics. |
| **12. Bookmarks** | 🟢 COMPLETE | DB-synced `Bookmark` model, global `BookmarkContext`, toggle saved items across app. | Folder categorization for saved bookmarks. |
| **13. Cheatsheets** | 🟢 COMPLETE | `CheatSheet` model, quick reference UI, Markdown & PDF export (`exportService.ts`). | Interactive code snippet copy-paste playground. |
| **14. Interview Hub** | 🟢 COMPLETE | `InterviewQuestion` model, expert answer toggle reveal, category filtering. | Voice-based mock interview simulator. |
| **15. Certificates** | 🟢 COMPLETE | `Certification` model, unique nanoid code generator, public verification page (`/verify/[code]`). | Social sharing meta-image generator (OG Card for Certs). |
| **16. Community** | 🔴 NOT STARTED| `Circle` and `CircleMembership` models defined in Prisma schema. | Community circles UI, discussion forums, social feed. |
| **17. AI Tutor** | 🔴 NOT STARTED| `/api/ai/interview` route shell. | Interactive conversational AI mentor sidebar (`/tutor`). |
| **18. Sandbox** | 🟡 PARTIAL | `/api/sandbox/execute` route shell. | Real code runner integration (Judge0 / Piston execution container). |
| **19. Admin** | 🔴 NOT STARTED| None. | Admin CMS dashboard for managing roadmaps, topics, and users. |
| **20. Analytics** | 🟡 PARTIAL | `DailyActivity` and `XpTransaction` logging in database. | Integrated analytics reporting dashboard. |
| **21. Settings** | 🟡 PARTIAL | Protected `/settings` page route. | Password change, email preferences, profile avatar upload. |
| **22. Notifications**| 🔴 NOT STARTED| None. | In-app notification center, email digests. |
| **23. SEO** | 🟢 COMPLETE | Dynamic Next.js metadata, OpenGraph tags, `sitemap.ts`, `robots.txt`. | Structured JSON-LD course schema. |
| **24. Performance** | 🟢 COMPLETE | Server components, Prisma singleton, Framer Motion layout animations. | Edge caching strategy for dynamic API routes. |

---

## 3. Domain Deep-Dives

### Domain: Authentication & Security
- **Current Status**: 🟡 PARTIAL
- **Completed Work**: Supabase SSR client integration (`@supabase/ssr`), protected routes enforced via Next.js `middleware.ts`, login/signup UI screens.
- **Missing Work**: Full session error boundaries, OAuth callback edge case handling, user profile settings update.
- **Technical Debt**: Legacy `src/auth.ts` NextAuth shim should be migrated to pure `getSupabaseServerUser()` calls.
- **Dependencies**: Supabase Project API keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- **Estimated Effort**: 3 Days
- **Priority**: P0

### Domain: Learning & Roadmap Engine
- **Current Status**: 🟢 COMPLETE
- **Completed Work**: Hierarchical roadmap navigation, interactive topic pages (`TopicPage.tsx`), sequential node unlocking (`useTopicProgress`), automated progress tracking.
- **Missing Work**: Topic-level mini-projects.
- **Technical Debt**: None.
- **Dependencies**: Prisma ORM, PostgreSQL.
- **Estimated Effort**: 2 Days
- **Priority**: P1

### Domain: Challenges & Code Sandbox
- **Current Status**: 🟡 PARTIAL
- **Completed Work**: Challenge UI editor, hint reveal accordion, `ChallengeProgress` DB persistence.
- **Missing Work**: Real containerized code execution environment.
- **Technical Debt**: Mock solution string evaluation in `/api/learning/challenge/submit`.
- **Dependencies**: Judge0 or Piston API service integration.
- **Estimated Effort**: 5 Days
- **Priority**: P0

### Domain: Articles & MDX Content
- **Current Status**: 🟡 PARTIAL
- **Completed Work**: MDX compiler setup, article reader layout (`/blog/[slug]`), sample MDX articles (`closures.mdx`).
- **Missing Work**: 15+ missing `.mdx` content files referenced in `src/data/articles.ts`.
- **Technical Debt**: `src/data/articles.ts` lists dead links for missing MDX files.
- **Dependencies**: MDX content creation.
- **Estimated Effort**: 7 Days
- **Priority**: P1

---

## 4. Master Engineering Backlog

```mermaid
gantt
    title StackForge Backlog Execution Order
    dateFormat  YYYY-MM-DD
    section P0: Critical Infrastructure
    TASK-P0-1: Real Code Execution Runner       :active, p0_1, 2026-08-01, 5d
    TASK-P0-2: Cleanup Legacy NextAuth Shim      :p0_2, 2026-08-06, 2d
    section P1: High Priority
    TASK-P1-1: Populate Missing MDX Articles    :p1_1, 2026-08-08, 7d
    TASK-P1-2: Top-level /quizzes Page          :p1_2, 2026-08-15, 2d
    section P2: Medium Priority
    TASK-P2-1: AI Tutor Integration            :p2_1, 2026-08-17, 7d
    TASK-P2-2: Community Circles UI              :p2_2, 2026-08-24, 7d
    section P3: Future Work
    TASK-P3-1: Stripe Subscription Gating       :p3_1, 2026-08-31, 5d
```

### P0 (Critical)

#### TASK-P0-1: Real Code Execution Engine Integration
- **Description**: Replace mock challenge string validation with a real code execution service (Judge0 or Piston API) in `/api/sandbox/execute` and `/api/learning/challenge/submit`.
- **Files Involved**: `src/app/api/sandbox/execute/route.ts`, `src/app/api/learning/challenge/submit/route.ts`, `src/features/learning/components/PracticeSection.tsx`.
- **Dependencies**: Judge0 / Piston API credentials.
- **Difficulty**: Medium
- **Estimated Hours**: 32 Hours
- **Business Impact**: High (Enables true interactive coding experience).
- **Risk**: Medium (External service latency).
- **Acceptance Criteria**:
  1. Submitting JavaScript/Python code executes against standard output / test cases.
  2. Errors and stack traces display cleanly in editor output console.
  3. `ChallengeProgress` records completion only when test cases pass.

#### TASK-P0-2: Clean up Legacy NextAuth Shim & Schema Artifacts
- **Description**: Remove vestigial `Account` and `Session` models from `schema.prisma` and replace legacy imports of `src/auth.ts` with canonical `getSupabaseServerUser()`.
- **Files Involved**: `prisma/schema.prisma`, `src/auth.ts`, `src/lib/supabase-server.ts`.
- **Dependencies**: Database migration check.
- **Difficulty**: Low
- **Estimated Hours**: 8 Hours
- **Business Impact**: Medium (Reduces database size and technical confusion).
- **Risk**: Low.
- **Acceptance Criteria**:
  1. No remaining imports of `src/auth.ts`.
  2. Database schema updated cleanly without breaking `User` relations.

---

### P1 (Important)

#### TASK-P1-1: Populate Missing MDX Articles Content Library
- **Description**: Author missing `.mdx` files in `/content` for all articles cataloged in `src/data/articles.ts`.
- **Files Involved**: `content/*/*.mdx`, `src/data/articles.ts`, `src/app/blog/[slug]/page.tsx`.
- **Dependencies**: Content creation.
- **Difficulty**: Low
- **Estimated Hours**: 40 Hours
- **Business Impact**: High (Fixes 404 dead links and boosts organic SEO).
- **Risk**: Low.
- **Acceptance Criteria**:
  1. Every article entry in `src/data/articles.ts` renders a valid, rich MDX page.
  2. Zero 404 errors on `/blog/*` routes.

#### TASK-P1-2: Dedicated Top-Level `/quizzes` Aggregator Page
- **Description**: Build a `/quizzes` landing page aggregating all quizzes across roadmaps.
- **Files Involved**: `src/app/quizzes/page.tsx`, `src/components/layout/Navbar.tsx`.
- **Dependencies**: `QuizSection` component.
- **Difficulty**: Low
- **Estimated Hours**: 12 Hours
- **Business Impact**: Medium (Fixes navbar redirect friction).
- **Risk**: Low.
- **Acceptance Criteria**:
  1. Clicking "Quizzes" in Navbar navigates to `/quizzes`.
  2. Page displays grid of available quizzes filtered by technology/roadmap.

---

### P2 (Enhancements)

#### TASK-P2-1: Conversational AI Coding Tutor (`/tutor`)
- **Description**: Connect `/api/ai/interview` to OpenAI/Gemini API to power the AI Tutor chat sidebar.
- **Files Involved**: `src/app/tutor/page.tsx`, `src/app/api/ai/interview/route.ts`, `src/features/ai/services/aiService.ts`.
- **Dependencies**: `OPENAI_API_KEY` or `GEMINI_API_KEY`.
- **Difficulty**: Medium
- **Estimated Hours**: 30 Hours
- **Business Impact**: High (Key platform differentiator).
- **Risk**: Low.
- **Acceptance Criteria**:
  1. Users can chat with AI Tutor regarding topic code snippets.
  2. Contextual answers provided based on active topic.

#### TASK-P2-2: Community Circles & Discussion Hub
- **Description**: Build UI for `Circle` and `CircleMembership` models.
- **Files Involved**: `src/app/community/page.tsx`, `src/app/api/circles/route.ts`.
- **Dependencies**: User profiles.
- **Difficulty**: Medium
- **Estimated Hours**: 35 Hours
- **Business Impact**: High (Drives social retention).
- **Risk**: Low.
- **Acceptance Criteria**:
  1. Users can join/leave circles based on technology.
  2. Activity feed shows recent circle member achievements.

---

### P3 (Future Roadmap)

#### TASK-P3-1: Stripe Subscription & Premium Gating
- **Description**: Gate advanced roadmaps and AI tools behind Stripe subscription plans (`FREE` vs `PRO`).
- **Files Involved**: `src/app/api/stripe/webhook/route.ts`, `src/features/auth/services/planService.ts`.
- **Dependencies**: Stripe API Keys.
- **Difficulty**: Medium
- **Estimated Hours**: 24 Hours
- **Business Impact**: High (Unlocks platform monetization).
- **Risk**: Medium (Payment flow testing).
- **Acceptance Criteria**:
  1. Pro users gain access to locked pro roadmaps and unlimited AI tutor queries.
  2. Stripe Webhook updates `User.plan` in database automatically.

---

## 5. Immediate Next Task

**Task**: **TASK-P0-1: Real Code Execution Engine Integration**  
**Action**: Implement real code execution for Python & JavaScript in `src/app/api/sandbox/execute/route.ts` and connect it to `PracticeSection.tsx`.
