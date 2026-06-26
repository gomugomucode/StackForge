# DUPLICATE CONTENT & REDUNDANCY

## Architectural Redundancy
- **Learning Units**: The system tracks learning in two ways:
  1. `Roadmap` $\rightarrow$ `Module` $\rightarrow$ `Lesson`
  2. `Topic` $\rightarrow$ `TopicContent`
  - *Impact*: This causes duplication in database queries, API endpoints, and UI rendering logic.

## Route Duplication
- `/learn/[technology]/[topic]` vs `/roadmaps/[slug]/lesson/[lessonSlug]`. Both serve a similar purpose (displaying a learning unit).
- `/cheatsheets` vs `/roadmaps/[slug]/cheatsheet`.

## Navigation Redundancy
- The `navLinks` array in `src/data/navigation.ts` contains:
  - `Quizzes` $\rightarrow$ `/roadmaps`
  - `Resources` $\rightarrow$ `Roadmaps` $\rightarrow$ `/roadmaps`
  - `Resources` $\rightarrow$ `Tutorials` $\rightarrow$ `/learn`
  - `Resources` $\rightarrow$ `Cheatsheets` $\rightarrow$ `/cheatsheets`
  - This creates a confusing UX where multiple menu items lead to the same place or overlapping paths.

## Data Duplication
- `src/data/navigation.ts` and `src/data/resources.ts` likely share overlapping resource definitions.
