# PROJECT AUDIT - StackForge Production Rebuild

## Architecture Overview

### Folder Structure
The project uses a Next.js 15 App Router architecture. 
- `src/app`: Contains all application routes.
- `src/components`: UI components, split by feature and global layout.
- `src/data`: Hardcoded data files (prototype state).
- `src/features`: Domain-driven logic split into auth, certifications, content, curriculum, gamification, learning, profile, quiz, resources, and roadmaps.
- `src/lib`: Core utilities, Prisma client, and Supabase config.
- `prisma`: Database schema and seeding scripts.

### Routes
- **Learning**: `/learn/[technology]/[topic]` and `/roadmaps/[slug]/lesson/[lessonSlug]`. (Severe Duplication)
- **Resources**: `/cheatsheets`, `/projects`, `/interview`, `/resources`.
- **User**: `/dashboard`, `/profile`, `/settings`.
- **Community**: `/community`.
- **Auth**: `/auth/login`, `/auth/signup`, `/verify/[code]`.
- **Tools**: `/tools/[tool-name]`.

### APIs
- API routes are well-structured under `src/app/api`, covering AI, auth, bookmarks, certifications, circles, learning, progress, projects, quiz, and user stats.

### Database Models
- **Core**: `User`, `Profile`.
- **Learning Content**: `Roadmap` $\rightarrow$ `Module` $\rightarrow$ `Lesson` AND `Topic` $\rightarrow$ `TopicContent`. (Severe Redundancy)
- **Engagement**: `Achievement`, `QuizAttempt`, `ProjectSubmission`, `Review`.
- **Community**: `Circle`, `CircleMembership`.
- **Gamification**: `XpTransaction`, `DailyActivity`, `StreakTracking`.

### State Management
- React Context used for `BookmarkContext`, `ProgressContext`, and `UserStatsContext`.
- NextAuth for session management.

---

## Detection & Issues

### Duplicate Pages & Logic
- **Curriculum Duplication**: The platform implements two parallel learning systems: a Topic-based system (`/learn/...`) and a Roadmap-based system (`/roadmaps/...`). This leads to duplicate logic in the UI and database.
- **Navigation**: `src/data/navigation.ts` contains multiple links to the same destination (e.g., Quizzes $\rightarrow$ /roadmaps, Resources $\rightarrow$ /roadmaps).

### Dead Routes & Missing Content
- **Curriculum Gap**: `src/data/content` is nearly empty. Only `git` has populated data. All other technologies (React, Node, Python, etc.) are empty folders.
- **Dead Routes**: Most routes under `/learn` and `/roadmaps` will either be empty or error out due to missing data in the prototype files.

### Unused Components & Files
- **Foreign Project**: The `/whoami` directory is a separate Vite portfolio project and does not belong in the StackForge repository.
- **Duplicate Components**: Some components in `src/components/home` overlap with `src/features/learning/components`.

### Hardcoded Content & Placeholders
- While "Lorem Ipsum" is not present, the reliance on `src/data/*.ts` files instead of the database for the main curriculum indicates a prototype stage.
- Navigation and resource links are hardcoded.

### External Links
- The `Resources` dropdown in the navbar links directly to `react.dev` and `developer.mozilla.org` instead of internal curated content.

### Database Instability
- The schema allows for `Topic` and `Lesson` to coexist as separate entities with similar properties, which will lead to data drift and inconsistency.
- Missing `Circle` table issues mentioned in the Master Prompt (P1001 errors).

---

## Critical Recommendations
1. **Unify Curriculum**: Merge `Topic` and `Lesson` into a single `LearningUnit` model.
2. **Purge `whoami`**: Remove the extraneous portfolio project.
3. **Consolidate Navigation**: Move to a single source of truth in `src/data/navigation.ts`.
4. **Populate Content**: Transition from hardcoded `.ts` files to database-driven content.
5. **Internalize Resources**: Replace external links with internally hosted guides and articles.
