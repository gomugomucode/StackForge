# BROKEN & INCOMPLETE ROUTES

## Content-Dependent Broken Routes
Because `src/data/content` is mostly empty, the following routes are effectively "broken" (will render empty states or 404s):
- `/learn/[technology]/[topic]` (except for Git topics)
- `/roadmaps/[slug]/lesson/[lessonSlug]` (most roadmaps lack associated lessons)
- `/roadmaps/[slug]/quiz`
- `/roadmaps/[slug]/cheatsheet`

## Logic Errors
- `/roadmaps` is used as a target for the `Quizzes` nav link, which is logically incorrect (it should lead to a quiz center or a specific roadmap's quiz).

## Missing Pages
- The `Community` page (`/community`) is listed as "broken" in the master prompt.
- The `AI Tutor` (`/tutor`) is mostly mock implementation.
- Project `sandbox` (`/projects/sandbox/[id]`) needs implementation.

## External Redirects (To be Internalized)
- `Resources` $\rightarrow$ `Official Docs` $\rightarrow$ `https://react.dev`
- `Resources` $\rightarrow$ `External References` $\rightarrow$ `https://developer.mozilla.org`
