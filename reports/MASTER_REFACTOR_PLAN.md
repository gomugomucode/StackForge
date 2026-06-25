# MASTER REFACTOR PLAN: STACKFORGE TRANSFORMATION
Version: 1.0
Priority: 🔴 CRITICAL
Goal: Transform a "Template Shell" into a "Premium LMS Product."

## 🗺️ High-Level Strategy
We are shifting from a **Content-Light** model (where the site acts as a directory) to a **Content-Heavy** model (where the site is the destination). The goal is to eliminate all "leakage" (external links) and provide a seamless, high-fidelity learning loop.

---

## 🔴 P0: CRITICAL FOUNDATIONS (Week 1)
*Immediate impact on brand trust and core functionality.*

### 1. Brand Alignment (The "Anti-CodeNova" Operation)
- **Problem:** Mixed branding (StackForge vs CodeNova).
- **Action:** Replace every instance of "CodeNova" with "StackForge" in:
  - `src/data/navigation.ts`
  - `src/data/founder.ts`
  - `src/components/about/FounderSection.tsx`
  - Any other string in the codebase.
- **Impact:** Professionalism and brand cohesion.

### 2. Navigation Overhaul
- **Problem:** Redundant top-level links and confusing resources structure.
- **Action:** Implement `NAVIGATION_ARCHITECTURE.md`.
  - Consolidate `Interview`, `Projects`, and `Tutor` into the `Resources` dropdown.
  - Simplify top-level nav to: `Learn`, `Roadmaps`, `Projects`, `Interview`, `Tutor`, `Community`.
- **Impact:** Reduced cognitive load, intuitive UX.

### 3. The "Core 9" Content Injection
- **Problem:** 85% of core topics are empty shells.
- **Action:** Generate and inject the full asset suite (Lesson $\rightarrow$ Cheatsheet $\rightarrow$ Quiz $\rightarrow$ Interview $\rightarrow$ Project $\rightarrow$ Tutor) for the 9 priority topics.
  - *Current Status:* `react-core` and `html-css` are complete.
  - *Pending:* 7 topics.
- **Impact:** Transformation from a skeleton to a functioning academy.

---

## 🟡 P1: PRODUCT ENHANCEMENT (Week 2-3)
*Improving the learning experience and retention.*

### 4. Dynamic Content Integration
- **Problem:** Home page "Featured Content" and "Popular Cheatsheets" are hardcoded.
- **Action:** Replace hardcoded arrays in `src/components/home` with API calls to the database (`/api/learning/search` or similar).
- **Impact:** The home page now reflects the actual content of the platform.

### 5. AI Tutor Evolution
- **Problem:** Tutor is a basic prompt-response.
- **Action:** Implement the `TUTOR_ROADMAP.md` visualization logic (Execution Timeline, Variable State, Memory View).
- **Impact:** Becomes a unique selling point (USP) that justifies the platform's "Premium" status.

### 6. Roadmap Export System
- **Problem:** Users can't take the learning path "offline."
- **Action:** Implement a PDF generator for roadmaps including milestones and checkpoints.
- **Impact:** High perceived value and utility.

---

## 🟢 P2: POLISHING & SCALE (Week 4+)
*Optimization and long-term growth.*

### 7. UI/UX Design System V2
- **Problem:** Subtle inconsistencies in spacing, typography, and color usage between pages.
- **Action:** Implement `DESIGN_SYSTEM_V2.md`. Standardize the `Card` and `SectionHeader` components across all pages.
- **Impact:** A "Pixel Perfect" a feeling of a single, cohesive product.

### 8. SEO & Content Expansion
- **Problem:** New roadmaps (AI, DevOps, etc.) are defined but not populated.
- **Action:** Execute the `CURRICULUM_MAP.json` expansion. Generate 100+ entries for every cheatsheet.
- **Impact:** Organic growth and authority in the dev-ed space.

---

## 🛠️ Implementation Order
1. **Identity Fix** $\rightarrow$ `src/data/navigation.ts` $\rightarrow$ `src/data/founder.ts`.
2. **Nav Refactor** $\rightarrow$ `src/components/layout/Navbar.tsx` $\rightarrow$ `src/data/navigation.ts`.
3. **Content Sprint** $\rightarrow$ Complete the "Core 9" asset generation.
4. **Dynamic Home** $\rightarrow$ Connect `HeroSection` and `FeaturedContent` to the DB.
5. **Tutor Upgrade** $\rightarrow$ Implement visualization logic.
6. **UI Polish** $\rightarrow$ Standardize the Design System.
