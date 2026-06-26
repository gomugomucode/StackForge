# PROJECT_COMPARISON.md

## High-Level Architecture Comparison

| Feature | StackForge Academy (Target) | whoami Repository (Inspiration) | Comparison / Action |
| :--- | :--- | :--- | :--- |
| **Tech Stack** | Next.js (App Router), TypeScript, Prisma, PostgreSQL | React (Vite), JavaScript, CSS/Tailwind | **KEEP** StackForge stack. Reuse `whoami`'s CSS/Tailwind patterns. |
| **Core Purpose** | Learning Management System (LMS) | Personal Portfolio / Resume | **KEEP** StackForge purpose. Use `whoami` as a visual skin. |
| **Routing** | Multi-page (Dynamic routes for roadmaps, topics, etc.) | Single Page Application (Section-based anchors) | **KEEP** StackForge routing. Reuse `whoami`'s navigation interaction patterns. |
| **Auth** | Full User System (NextAuth, Supabase/PostgreSQL) | None / Static | **KEEP** StackForge Auth. Reuse `whoami`'s theme/profile presentation ideas. |
| **Data Model** | Relational (Roadmaps $\rightarrow$ Topics $\rightarrow$ Lessons) | Static JSON (Skills, Portfolio, Certs) | **KEEP** StackForge Prisma schema. |
| **State Mgmt** | Context API, Server Actions, Hooks | Context API (Theme), Local State | **KEEP** StackForge architecture. |

---

## UI/UX Component Comparison

| Element | StackForge Current | whoami Inspiration | Migration Strategy |
| :--- | :--- | :--- | :--- |
| **Navbar** | Functional, Modern, standard Next.js | Minimal, transition-heavy, a-link based | **ADAPT**: Use `whoami`'s hover effects and mobile slide-out, but keep StackForge's multi-page links. |
| **Dashboard** | Bento-grid style, Data-driven | No dedicated dashboard (Portfolio grid) | **ADAPT**: Treat `whoami`'s "Skills" and "Portfolio" grids as layout patterns for Dashboard widgets. |
| **Backgrounds** | Solid/Simple gradients | Dynamic, animated gradient circles, glassmorphism | **ADAPT**: Port the `animate-pulse` circles and glass-panel effects. |
| **Cards** | Standard Tailwind cards | Glassmorphism, hover-scale, gradient borders | **ADAPT**: Implement the "Premium Glass" look for all learning assets. |
| **Buttons** | Functional, varying sizes | High-contrast, scale-on-hover, ripple-like effects | **ADAPT**: Add micro-interactions and scale transitions. |
| **Theme** | Basic Dark/Light toggle | Comprehensive CSS Variable system | **ADAPT**: Use `whoami`'s variable structure for more fluid theme transitions. |

---

## Route & Page Mapping

| StackForge Route | whoami Equivalent (Pattern) | UI Strategy |
| :--- | :--- | :--- |
| `/` (Home) | `Banner.jsx` / `About.jsx` | Use `whoami`'s Hero visuals for the Home landing. |
| `/dashboard` | `Skills.jsx` / `Portfolio.jsx` | Use the grid layouts and "proficiency bars" for XP/Progress widgets. |
| `/roadmaps` | `Portfolio.jsx` | Use the card grid pattern for roadmap selection. |
| `/learn/...` | `About.jsx` / `Services.jsx` | Use the a-symmetric layout and glass panels for content delivery. |
| `/profile` | `Certifications.jsx` / `Education.jsx` | Reuse the timeline and certificate display patterns. |
| `/resources` | `Menu.jsx` (Navigation) | Implement the Mega Menu pattern from the `whoami` navigation. |
