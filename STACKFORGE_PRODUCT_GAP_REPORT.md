# 🕵️‍♂️ STACKFORGE COMPREHENSIVE PRODUCT GAP & END-TO-END QA AUDIT REPORT

**Date:** July 26, 2026  
**Auditor Roles:** Senior QA Engineer, Product Manager, UX Researcher, Principal Software Engineer  
**Scope:** Complete End-to-End User Journey Audit (`/` $\rightarrow$ `/auth/signup` $\rightarrow$ `/onboarding` $\rightarrow$ `/dashboard` $\rightarrow$ `/roadmaps` $\rightarrow$ `/learn` $\rightarrow$ `/profile` $\rightarrow$ logout)  
**Status:** Bug Report & Gap Analysis (Zero code fixes applied)  

---

## Executive Summary

This document presents a comprehensive, multi-role product evaluation of StackForge from the perspective of a first-time user. While the underlying core architecture (Prisma ORM, PostgreSQL persistence, Supabase SSR Auth, dynamic dashboard APIs) is strong, the end-to-end user journey suffers from UX friction, broken navigation hooks, missing empty/error states, mocked challenge evaluation, and unhandled loading boundaries.

### Summary Metrics

- **Total Issues Discovered**: 28
- **P0 Critical (Showstoppers / Broken Journeys)**: 4
- **P1 High Priority (Severe UX / Functional Gaps)**: 8
- **P2 Medium Priority (Visual / State Friction)**: 11
- **P3 Low Priority (Polish & Edge Cases)**: 5

---

## 1. End-to-End User Journey Step-by-Step Audit

---

### Step 1: Landing Page (`/`)
- **UI**: Modern dark mode hero with glassmorphic cards and Framer Motion micro-interactions.
- **UX**: Strong initial impression; primary CTA buttons ("Explore Roadmaps", "Get Started") clearly positioned.
- **API Calls & DB Writes**: Pure SSR static composition; 0 API calls or DB operations.
- **Loading / Error States**: Fast static render; no loading indicator needed.
- **Mobile Responsiveness**: Excellent; grid items collapse to single columns smoothly.
- **Accessibility**: Missing explicit `aria-label` attributes on icon-only interactive controls.
- **Issues Found**:
  - 🟡 **P2 (Design Consistency)**: Hero CTA buttons use static hover classes instead of unified `Button` variant tokens.
  - 🟢 **P3 (Accessibility)**: Social footer links lack screen-reader accessible text.

---

### Step 2: Signup (`/auth/signup`)
- **UI**: Clean sign-up form modal backed by `SignupForm.tsx`.
- **UX**: Clear input fields for Email, Password, and Full Name.
- **API Calls & DB Writes**: Direct call to Supabase Auth `signUp()`. Triggers PostgreSQL `User` creation upon successful authentication.
- **Loading / Error States**: Basic button inline loading state (`isSubmitting`); generic error text.
- **Edge Cases**: Weak password validation error messages are uninformative ("Auth error").
- **Issues Found**:
  - 🟡 **P1 (Error Handling)**: Supabase auth errors (e.g. `User already registered`) return raw string messages instead of localized user-friendly alerts.
  - 🟡 **P2 (UX)**: Password strength indicator is missing.

---

### Step 3: Email Verification
- **UI & UX**: Default Supabase redirect flow.
- **API Calls & DB Writes**: Supabase token verification callback.
- **Issues Found**:
  - 🔴 **P0 (Broken Flow)**: If email confirmation is enabled in Supabase, the app does not show a "Check your email" confirmation screen; it attempts to auto-redirect to `/onboarding`, causing a session race condition.

---

### Step 4: Onboarding (`/onboarding`)
- **UI**: Multi-step wizard (Step 1: Level, Step 2: Technologies, Step 3: Goals).
- **UX**: Clean modal layout with step indicators.
- **API Calls & DB Writes**: ⚠️ **CRITICAL GAP**: Clicking selections does NOT write user preferences to PostgreSQL `Profile` or Supabase metadata!
- **Issues Found**:
  - 🔴 **P0 (Broken Button Navigation)**: In Step 3, clicking any goal option executes `onClick={() => setStep(2)}`, which **redirects the user BACK to Step 2** instead of completing onboarding!
  - 🔴 **P0 (Missing API/DB Write)**: Onboarding choices (skill level, technology interests, career goals) are lost when navigating away; no API payload is sent to `/api/user/profile`.

---

### Step 5: Dashboard (`/dashboard`)
- **UI**: Bento-grid layout with progress cards, activity feed, user stats badge, and earned certificates.
- **UX**: Informative summary of learning status.
- **API Calls & DB Writes**: Calls aggregate endpoint `/api/user/dashboard` and `/api/user/stats`. Queries `RoadmapCompletion`, `XpTransaction`, and `Certification`.
- **Loading / Error States**: Pulse animations (`animate-pulse`) implemented.
- **Issues Found**:
  - 🟡 **P1 (Empty State)**: New users with zero completed topics see an empty activity feed without a helpful "Start your first lesson" callout.
  - 🟡 **P2 (Hydration)**: Slight layout shift when `UserStatsContext` populates XP after initial mount.

---

### Step 6: Choose Roadmap (`/roadmaps` & `/roadmaps/[slug]`)
- **UI**: Visual graph node map with locked/unlocked state badges.
- **UX**: Clear visual progression tree.
- **API Calls & DB Writes**: Fetches roadmap graph structure from `roadmaps.ts` SSOT and `TopicProgress` DB table.
- **Issues Found**:
  - 🟡 **P1 (Navbar Link Discrepancy)**: Navbar "Quizzes" link redirects to `/roadmaps` because there is no top-level `/quizzes` page.
  - 🟡 **P2 (Visual Clarity)**: Node status icons (locked vs unlocked) lack high-contrast indicators in high-brightness environments.

---

### Step 7: Learn Topic (`/learn/[technology]/[topic]`)
- **UI**: High-density learning page featuring Overview, Syntax Guide, Examples, Quizzes, Practices, and Cheatsheets.
- **UX**: Unified learning workspace.
- **API Calls & DB Writes**: Calls `/api/learning/topic/access` and reads `TopicContent`, `TopicExample`, `Quiz`, `Challenge`.
- **Issues Found**:
  - 🟡 **P1 (Missing Data)**: Some topics lack `visualExplanation` diagrams, leaving empty space in the Concept Cards component.

---

### Step 8: Read Lesson (`/roadmaps/[slug]/lesson/[lessonSlug]`)
- **UI**: Textual lesson layout with code snippets and resource links.
- **API Calls & DB Writes**: Queries `Lesson` and `Resource` tables.
- **Issues Found**:
  - 🟡 **P1 (TypeScript Error)**: Property `resources` does not exist on type `Lesson` in page component (handled with fallback, but causes runtime warning).

---

### Step 9: Practice (`PracticeSection.tsx`)
- **UI**: Interactive tabbed code viewer and practice prompt.
- **UX**: Clean tab navigation between Solution and Instructions.
- **API Calls & DB Writes**: Local component state.
- **Issues Found**:
  - 🟢 **P3 (UX)**: Code editor font size cannot be adjusted by the user.

---

### Step 10: Quiz (`QuizSection.tsx`)
- **UI**: Multiple-choice question card with explanation reveals.
- **UX**: Smooth question-by-question transition.
- **API Calls & DB Writes**: Submits payload to `/api/quiz/submit`. Server calculates score $\rightarrow$ inserts `QuizAttempt` row $\rightarrow$ triggers `addXP()`.
- **Loading / Error States**: Submitting button state handled.
- **Issues Found**:
  - 🟡 **P2 (Edge Case)**: Re-submitting a passed quiz awards full XP again instead of diminishing XP returns.

---

### Step 11: Challenge (`/api/learning/challenge/submit`)
- **UI**: Code input editor with "Submit Solution" button.
- **UX**: Responsive layout.
- **API Calls & DB Writes**: Submits payload to `/api/learning/challenge/submit` $\rightarrow$ updates `ChallengeProgress`.
- **Issues Found**:
  - 🔴 **P0 (Mocked Code Evaluation)**: Backend challenge evaluator does NOT execute code; it performs a string length check `solution.length > 5`, allowing invalid code to pass and award XP!

---

### Step 12: Mini Project (`ProjectGuide.tsx` & `/projects`)
- **UI**: Project requirements card, tech stack badges, and `ProjectSubmission` modal.
- **UX**: Modal form allows submitting GitHub repo URL and live demo URL.
- **API Calls & DB Writes**: Calls `/api/projects/submit` $\rightarrow$ creates `ProjectSubmission` DB record.
- **Issues Found**:
  - 🟡 **P1 (Validation)**: GitHub repository URL field accepts invalid string URLs (e.g. `http://foo`) without regex validation.

---

### Step 13: Progress Update & DB Persistence
- **UI**: "Mark Topic as Completed" button on topic page.
- **API Calls & DB Writes**: POST `/api/learning/topic/complete`. Atomically:
  1. Upserts `TopicProgress` (completed = true).
  2. Recalculates `RoadmapCompletion` percentage.
  3. Creates `XpTransaction` (+50 XP).
  4. Updates `Profile` total XP & level.
- **Issues Found**:
  - 🟢 **P3 (Performance)**: Triggering topic completion performs 4 sequential DB queries; should be consolidated into a single Prisma `$transaction`.

---

### Step 14: Dashboard Refresh
- **UI**: Dashboard re-renders with updated completion bar, streak count, and activity log.
- **UX**: Real-time feedback loop.
- **Issues Found**:
  - 🟡 **P2 (State Sync)**: Navbar XP badge requires a page refresh or Context trigger to reflect newly earned XP if navigated client-side without router revalidation.

---

### Step 15: Certificate (`/verify/[code]`)
- **UI**: Official certificate verification document layout.
- **UX**: Publicly shareable link with verification code.
- **API Calls & DB Writes**: Queries `Certification` table by nanoid `verificationCode`.
- **Issues Found**:
  - 🟡 **P2 (Missing Social Sharing)**: No OpenGraph image generator for certificate verification pages when sharing on LinkedIn/Twitter.

---

### Step 16: Profile (`/profile`)
- **UI**: User profile header, achievements grid, bookmarks list, and recent activity timeline.
- **API Calls & DB Writes**: Aggregates `User`, `Profile`, `Bookmark`, `Achievement`, `XpTransaction`.
- **Issues Found**:
  - 🟡 **P1 (Missing Public Profile)**: Profile is strictly private (`/profile`); navigating to `/profile/username` returns a 404.

---

### Step 17: Logout
- **UI**: Logout button in UserMenu dropdown.
- **API Calls & DB Writes**: Calls Supabase `auth.signOut()` and clears SSR cookies.
- **Issues Found**:
  - 🟢 **P3 (UX)**: Redirect after logout sends user to `/` without a confirmation toast message ("Successfully logged out").

---

## 2. Master Classified Bug Matrix

| Bug ID | Severity | Category | Description | File Path |
| :--- | :---: | :--- | :--- | :--- |
| **BUG-01** | 🔴 **P0** | Incorrect Nav / Logic | Onboarding Step 3 goal click redirects BACK to Step 2 instead of completing flow. | `src/app/onboarding/page.tsx` |
| **BUG-02** | 🔴 **P0** | Missing API / DB Write | Onboarding selections (level, tech, goals) are never saved to database or user profile. | `src/app/onboarding/page.tsx` |
| **BUG-03** | 🔴 **P0** | Fake / Mock Logic | Challenge submission evaluator uses string length check (`> 5`) instead of real execution. | `src/app/api/learning/challenge/submit/route.ts` |
| **BUG-04** | 🔴 **P0** | Broken Journey | Email verification confirmation screen is missing; auto-redirect triggers session race. | `src/app/auth/signup/page.tsx` |
| **BUG-05** | 🟡 **P1** | Dead Route / Redirection| Navbar "Quizzes" button redirects to `/roadmaps` due to missing `/quizzes` page. | `src/components/layout/Navbar.tsx` |
| **BUG-06** | 🟡 **P1** | Missing Content | 80% of blog articles in `src/data/articles.ts` lack corresponding `.mdx` files in `/content`. | `content/*/*.mdx` |
| **BUG-07** | 🟡 **P1** | Missing Empty State | Dashboard activity feed renders blank box for brand new users without empty guidance. | `src/features/profile/ActivityFeed.tsx` |
| **BUG-08** | 🟡 **P1** | Input Validation | Project submission accepts invalid non-GitHub URLs without validation. | `src/components/projects/SubmitModal.tsx` |
| **BUG-09** | 🟡 **P1** | Error Handling | Supabase authentication errors display raw string dumps instead of user-friendly alerts. | `src/features/auth/components/LoginForm.tsx` |
| **BUG-10** | 🟡 **P1** | Missing Feature | Public user profiles (`/profile/[username]`) do not exist. | `src/app/profile/` |
| **BUG-11** | 🟡 **P1** | Data Type Warning | Property `resources` missing on `Lesson` type parameter in roadmap lesson page. | `src/app/roadmaps/[slug]/lesson/[lessonSlug]/page.tsx` |
| **BUG-12** | 🟡 **P1** | Community Feature Gap| `Circle` DB models exist, but `/community` has no interactive post/join capabilities. | `src/app/community/page.tsx` |
| **BUG-13** | 🟡 **P2** | Design Inconsistency | Hero CTA buttons use custom utility classes instead of core `Button` variant props. | `src/components/home/hero/hero-section.tsx` |
| **BUG-14** | 🟡 **P2** | Exploitable UX | Retaking a passed quiz awards full XP again without diminishing returns. | `src/app/api/quiz/submit/route.ts` |
| **BUG-15** | 🟡 **P2** | Missing SEO Meta | Certificate verification page lacks dynamic OpenGraph images for social media sharing. | `src/app/verify/[code]/page.tsx` |
| **BUG-16** | 🟡 **P2** | State Sync Friction | Navbar XP badge requires manual page refresh to update after completing a topic. | `src/components/layout/Navbar.tsx` |
| **BUG-17** | 🟡 **P2** | Visual Clarity | Node lock status in Roadmap Canvas lacks high-contrast background highlights. | `src/components/roadmaps/RoadmapCanvas.tsx` |
| **BUG-18** | 🟡 **P2** | Missing Password Check| Signup form lacks real-time password strength meter. | `src/features/auth/components/SignupForm.tsx` |
| **BUG-19** | 🟡 **P2** | Hydration Shift | Dashboard layout shifts during client-side hydration of `UserStatsContext`. | `src/app/dashboard/page.tsx` |
| **BUG-20** | 🟡 **P2** | Missing Loading State | PDF generation trigger in `CheatsheetSection` lacks visual spinner while generating. | `src/features/learning/components/CheatsheetSection.tsx` |
| **BUG-21** | 🟡 **P2** | Content Gap | Certain topics lack visual architecture diagrams in `TopicContent`. | `prisma/seed.ts` |
| **BUG-22** | 🟡 **P2** | Missing Filter | Cheatsheets index page lacks search by specific technology tags. | `src/app/cheatsheets/page.tsx` |
| **BUG-23** | 🟡 **P2** | Setting Limitation | Protected `/settings` page missing avatar upload functionality. | `src/app/settings/page.tsx` |
| **BUG-24** | 🟢 **P3** | Accessibility | Footer social icons lack `aria-label` text for screen readers. | `src/components/layout/Footer.tsx` |
| **BUG-25** | 🟢 **P3** | UX Polish | Missing logout confirmation toast message. | `src/features/auth/components/UserMenu.tsx` |
| **BUG-26** | 🟢 **P3** | Code Quality | Multiple DB queries during topic completion should be wrapped in single `$transaction`. | `src/app/api/learning/topic/complete/route.ts` |
| **BUG-27** | 🟢 **P3** | Editor Feature | Practice section code viewer lacks font size controls. | `src/features/learning/components/PracticeSection.tsx` |
| **BUG-28** | 🟢 **P3** | Unused Import | Vestigial NextAuth imports remain in legacy shim `src/auth.ts`. | `src/auth.ts` |

---

## 3. Product & UX Remediation Recommendations

1. **Fix Onboarding Loop (P0)**: Update `OnboardingPage.tsx` Step 3 to execute `completeOnboarding()`, sending a POST request to save user preferences before redirecting to `/dashboard`.
2. **Implement Real Code Execution (P0)**: Connect `/api/sandbox/execute` and `/api/learning/challenge/submit` to an execution runner container so challenge code is evaluated accurately.
3. **Build Dedicated `/quizzes` Page (P1)**: Create `src/app/quizzes/page.tsx` to list all available quizzes and eliminate the Navbar redirect to `/roadmaps`.
4. **Populate MDX Content (P1)**: Author missing `.mdx` content files in `/content` to fix dead article links.
