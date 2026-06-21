# STACKFORGE ACADEMY — AUTH FLOW AUDIT

**Audit date:** 2026-06-21
**Auditor:** Senior Supabase Engineer / Security Architect
**Scope:** Authentication, session management, profile & stats creation, protected routes, authorization, RLS, navbar state.
**Verdict:** **NOT production-ready.** Multiple critical defects below.

---

## 1. Files Inspected

### Auth core
- `src/components/AuthProvider.tsx` — client Supabase provider
- `src/features/auth/hooks/useAuth.ts` — wrapper hook (CRITICAL BUG)
- `src/features/auth/hooks/useAuthRedirect.ts` — uses `next-auth/react` (mismatched)
- `src/features/auth/hooks/useCurrentUser.ts` — wrapper over useAuth
- `src/features/auth/components/AuthGuard.tsx` — protected-route guard
- `src/features/auth/components/ProtectedRoute.tsx` — wraps AuthGuard
- `src/features/auth/components/LoginForm.tsx` — real Supabase email login
- `src/features/auth/components/RegisterForm.tsx` — real Supabase signup (via useAuth)
- `src/features/auth/components/SignupForm.tsx` — **MOCK signup (console.log only)**
- `src/features/auth/components/OAuthButtons.tsx` — NextAuth OAuth (mismatched)
- `src/features/auth/components/SocialLoginButtons.tsx` — Supabase OAuth (correct)
- `src/features/auth/components/UserMenu.tsx` — uses NextAuth `authService.logout()`
- `src/features/auth/services/authService.ts` — uses NextAuth (`signIn/signOut` from `next-auth/react`)
- `src/features/auth/services/userService.ts` — Prisma profile helpers (server only)
- `src/features/auth/pages/AuthPage.tsx` — combined Login/Register tabs (not used in routing)
- `src/features/auth/types/auth.types.ts` — type defs

### Pages
- `src/app/login/page.tsx` — renders `<LoginForm />`
- `src/app/signup/page.tsx` — renders `<SignupForm />` (the MOCK one!)
- `src/app/dashboard/page.tsx` — wraps `<ProtectedRoute>` ✓
- `src/app/profile/page.tsx` — **NOT wrapped** in `<ProtectedRoute>`
- `src/app/profile/achievements|bookmarks|progress/page.tsx` — all wrapped ✓
- `src/app/settings/page.tsx` — wrapped ✓
- `src/app/cert/[id]/page.tsx` — public certificate viewer (acceptable)

### API routes
- `src/app/api/auth/init/route.ts` — creates/upserts Profile in Prisma from Supabase userId
- `src/app/api/auth/register/route.ts` — bcrypt-based Prisma user registration (DUPLICATE auth path)
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth handler (parallel to Supabase)
- `src/app/api/user/profile/route.ts` — **GET /api/user/profile?id=…` accepts arbitrary `userId` query — no session check**
- `src/app/api/user/stats/route.ts` — uses NextAuth `auth()`
- `src/app/api/bookmarks/route.ts` — uses NextAuth `auth()` + correct `userId: session.user.id` filter
- `src/app/api/progress/route.ts` — uses **NON-EXISTENT** `prisma.userProgress` model (will throw at runtime)
- `src/app/api/certifications/route.ts` — same `prisma.userProgress` reference (will throw)
- `src/app/api/reviews/route.ts` — uses NextAuth `auth()`
- `src/app/api/circles/route.ts`, `circles/me/route.ts` — uses NextAuth `auth()`
- `src/app/api/quiz/[id]/route.ts`, `quiz/submit/route.ts` — need review

### Libraries
- `src/lib/supabase.ts` — public anon client (correct)
- `src/lib/prisma.ts` — Prisma singleton (server only)
- `src/lib/gamification.ts` — XP/level math
- `src/lib/access-control.ts` — plan limits (not auth)

### Schema
- `prisma/schema.prisma` — defines `User`, `Profile` (xp/streak/level/totalHours), `Account`, `Session`, `Progress`, `Bookmark`, `Certification`, `Achievement`, `QuizAttempt`. **NO `user_stats` table**; `Profile` carries the XP/streak/level columns. The spec's "user_stats" maps cleanly to the existing `Profile` model.

---

## 2. Critical Findings

### 🔴 C-1 — `useAuth` hook reads non-existent fields (BLOCKING)
`src/features/auth/hooks/useAuth.ts` destructures `status: isLoading` and `isAuthenticated` from `useSupabaseAuth()`, but `AuthProvider` does **not** export those. Every consumer (`UserMenu`, `Navbar`, `AuthGuard`, `ProtectedRoute`, dashboard, etc.) gets `isAuthenticated = undefined` → falsy. Net effect:

- `UserMenu` always returns `null` (no menu ever shown).
- `Navbar` `UserStatsBadge` is never rendered.
- `AuthGuard` immediately redirects to `/login` because `!isAuthenticated`.
- Every protected page bounces to `/login` even when the user IS signed in.

**This is the root cause of the "dummy login" symptom.**

### 🔴 C-2 — `SignupForm.tsx` is pure mock
`handleSubmit` only does `console.log("Signing up with:", name, email, password)`. The `/signup` route renders this file. Real signup never happens via this path; only `RegisterForm.tsx` (used by `AuthPage`, not by `/signup`) calls `signUp`.

### 🔴 C-3 — Two parallel auth systems
`LoginForm` and `RegisterForm` use Supabase Auth. `OAuthButtons` (rendered by `SignupForm` and by some surfaces) uses **NextAuth** `signIn("google")`/`signIn("github")`. `authService.logout()` calls NextAuth's `signOut`. This means:
- Supabase email users sign in via Supabase, but `authService.logout()` signs them out of NextAuth (no-op for Supabase session) → they remain "logged in" until manual `supabase.auth.signOut()`.
- NextAuth OAuth users get a NextAuth cookie but no Supabase session → the client `AuthProvider` sees no session → `isAuthenticated` is `false` → UI broken.
- Two `useAuth` consumers exist (`useSupabaseAuth()` from provider vs. `useSession()` from NextAuth).

### 🔴 C-4 — Server-side session validation is not Supabase-aware
All API routes use `await auth()` from `src/auth.ts`, which returns NextAuth's session. Since Supabase email/OAuth users do NOT have a NextAuth session, every API call from a Supabase user returns 401 → context providers fail to load profile/XP → user appears "not logged in" on the dashboard despite having a Supabase session.

### 🔴 C-5 — `/api/user/profile` accepts arbitrary `userId`
`GET /api/user/profile?id=<anything>` returns any user's profile with no auth check or ownership verification.

### 🔴 C-6 — `prisma.userProgress` does not exist
`/api/progress` and `/api/certifications` query `prisma.userProgress.findMany(...)`. The schema has `model Progress { lessonId ... }`, not `userProgress` with `nodeId`. These endpoints throw 500 at runtime.

### 🟠 H-1 — Real secrets in `.env`
`.env` is gitignored (good) but was committed previously and is sitting on disk with:
- Supabase DB password
- Supabase anon key (public, but pasted alongside)
- GitHub OAuth client secret
- Google OAuth client secret
- `NEXTAUTH_SECRET`

These should be rotated. (Documented in remediation report; values NOT reproduced here.)

### 🟠 H-2 — Signup flow does not enforce password policy
`RegisterForm` only requires `password.length >= 8` and equal to `confirmPassword`. No upper/lower/digit/special-character check. Spec requires strong policy.

### 🟠 H-3 — No OAuth callback route
`SocialLoginButtons` redirects to `${origin}/auth/callback`, but `src/app/auth/callback` does not exist. OAuth login flow ends at a 404.

### 🟠 H-4 — No `from` location preservation
`LoginForm` does `router.push('/dashboard')` unconditionally. Users clicking a protected link lose their intended destination after auth.

### 🟠 H-5 — `/profile` is unprotected
Anyone can view `/profile`, which renders `ProfileHeader`, `ProfileStats`, etc., that read from `useAuth()` / `useUserStats()`. Without a guard the page renders empty/zero-state rather than redirecting.

### 🟡 M-1 — `UserStatsContext` fetches on mount without auth awareness
Calls `/api/user/stats` on every page load. For Supabase users this 401s silently, leaving default 0/1/0 — not visually broken, but XP/streak shown to anon visitors via `<UserStatsBadge>` would be hidden only because of the `isAuthenticated` check, which is currently broken (see C-1).

### 🟡 M-2 — `localStorage` is used as a fallback in `ProgressContext` and `BookmarkContext`
Spec explicitly forbids this. Server-side Prisma is the source of truth; local fallbacks hide auth failures.

### 🟡 M-3 — No RLS at Supabase layer
The Supabase project is used only as a Postgres host via Prisma. There are no Postgres RLS policies. Authorization is enforced at the API layer by `where: { userId: session.user.id }`, which is acceptable **only if every query goes through authenticated routes**. The unauthenticated `/api/user/profile` (C-5) breaks this assumption.

### 🟡 M-4 — Profile auto-creation is best-effort
`/api/auth/init` is called client-side after signup/login. If it fails (network, error), the user has no `Profile` row → dashboard reads 0 XP forever. There is no server-side trigger or webhook fallback.

### 🟡 M-5 — `NEXTAUTH_URL=http://localhost:3000`
Hard-coded to localhost; will break OAuth callbacks in production.

### 🟢 L-1 — `Navbar` shows "Start Learning" → `/login` when anon (correct after C-1 fix)
The condition `isAuthenticated ? "/#weekly-challenge" : "/login"` already handles this once `useAuth` works.

### 🟢 L-2 — LoginForm uses `supabase.auth.signInWithPassword` correctly
This is the one piece that genuinely works.

---

## 3. Spec Compliance Matrix

| Step | Requirement | Status |
|---|---|---|
| 2 | Login flow uses real Supabase Auth | ⚠️ works only after C-1 fix; no `from` preservation |
| 3 | `signInWithPassword` + error handling | ⚠️ errors are `console.error`d, not surfaced to UI |
| 4 | `signUp` with name/username/email/password | ❌ `SignupForm` is mock; `RegisterForm` lacks password policy |
| 5 | OAuth (Google/GitHub) via `signInWithOAuth` | ⚠️ `SocialLoginButtons` correct; `OAuthButtons` uses NextAuth |
| 6 | `/auth/callback` page | ❌ missing |
| 7 | Auto-create profile on first login | ⚠️ client-triggered, no server guarantee |
| 8 | `user_stats` (xp/streak/level) created | ⚠️ exists as `Profile` columns; only via init endpoint |
| 9 | Navbar hides XP/streak/level when logged out | ⚠️ gated correctly **in code**, blocked by C-1 |
| 10 | Protect `/dashboard /profile /bookmarks /achievements /certificates /settings` | ❌ `/profile` unprotected |
| 11 | Session persistence on refresh | ⚠️ Supabase client handles it, but API routes can't read it |
| 12 | All user queries `.eq("user_id", session.user.id)` | ⚠️ mostly yes; `/api/user/profile` and `prisma.userProgress` queries broken |
| 13 | RLS policies | ❌ none |

---

## 4. Root-cause Summary

The "any email/password works" symptom is the visible tip. The actual causes are:

1. **C-1** breaks `useAuth().isAuthenticated` for everyone, so client-side navigation after a successful Supabase login bounces users back to `/login`. They never see the dashboard, so from their perspective "login did nothing."
2. **C-4** means even after a successful Supabase login the dashboard's data calls 401.
3. **C-6** means `/api/progress` and `/api/certifications` 500.

Fixing C-1 + C-4 alone will surface real Supabase auth. The remaining items harden the system.
