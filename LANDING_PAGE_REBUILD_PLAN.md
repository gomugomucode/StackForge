# Landing Page Reconstruction Plan

## Ideal Structure & Hierarchy

The landing page will be reconstructed as a sequence of high-conversion sections, ensuring that the visual flow leads the user from "Awareness" to "Action".

### Section Hierarchy
1. **Hero (P0):** The value proposition. High-impact visual, clear CTA.
2. **Social Proof / Trust Bar (P2):** "Joined by 12k+ developers" (Integrated into Hero).
3. **Features Bento (P1):** "Everything you need to level up". 4-grid layout showing Roadmaps, CheatSheets, Projects, Interview Hub.
4. **Featured Content (P1):** Spotlight on the "Fullstack Mastery 2026" roadmap and a key project.
5. **Learning Paths (P1):** A horizontal scroll or grid of curated tracks (Frontend, Backend, etc.).
6. **Interview Prep (P2):** Interactive preview of common technical questions.
7. **CheatSheets Gallery (P2):** Grid of most popular cheat sheets.
8. **Community/Circles (P2):** Invitation to join learning circles.
9. **CTA / Newsletter (P1):** "Level Up Your Game" - Email capture.
10. **Footer (P2):** Standard links and social handles.

## Required Components & Files

### Components to Restore/Create
- `HeroSection` $\rightarrow$ Fix icons, unify tokens.
- `HeroVisual` $\rightarrow$ Fix crash, add light-mode support.
- `FeatureBento` $\rightarrow$ Implement `gradient-border` and `glow` utilities.
- `RoadmapCard` $\rightarrow$ Create a standardized card for learning paths.
- `InterviewPreview` $\rightarrow$ Component to show the "Q&A" style layout.
- `CheatSheetCard` $\rightarrow$ Component with file size and "View" action.

### Files Needed
- `src/app/page.tsx` (Composition root)
- `src/components/home/hero/` (Hero + Visual)
- `src/components/home/features/` (Bento Grid)
- `src/components/home/roadmaps/` (Learning Paths)
- `src/app/globals.css` (Required: All missing design tokens)

## Route Configuration
- Home: `/` (Static)
- Roadmaps: `/roadmaps`
- Cheatsheets: `/cheatsheets`
- Projects: `/projects`
- Interview: `/interview`

## Design Requirements
- **Glassmorphism:** All cards must use `bg-card/50 backdrop-blur-sm`.
- **Borders:** Use `border-border` with subtle `primary` glows on hover.
- **Typography:** Inter/Geist font, `tracking-tight` for headings.
- **Colors:** Unify all `accent-purple` and `surface-750` to use the `primary` and `background` theme tokens.
