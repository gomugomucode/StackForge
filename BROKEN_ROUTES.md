# BROKEN_ROUTES.md

## Route Audit Report

All core StackForge routes have been preserved during the UI migration. No routes were deleted or modified in a way that would break accessibility.

### Verified Routes:
- `/` $\rightarrow$ OK
- `/roadmaps` $\rightarrow$ OK
- `/roadmaps/[slug]` $\rightarrow$ OK
- `/learn/[technology]/[topic]` $\rightarrow$ OK
- `/cheatsheets` $\rightarrow$ OK
- `/projects` $\rightarrow$ OK
- `/interview` $\rightarrow$ OK
- `/tutor` $\rightarrow$ OK
- `/community` $\rightarrow$ OK
- `/dashboard` $\rightarrow$ OK
- `/resources` $\rightarrow$ OK

### Issues Found:
- **Quizzes**: The "Quizzes" link in the navbar currently points to `/roadmaps` because there is no top-level `/quizzes` page. 
    - *Recommended Fix*: Create a `/quizzes` landing page that aggregates all quizzes from various roadmaps.

**Status: 🟢 Healthy (except for intentional redirect for Quizzes)**
