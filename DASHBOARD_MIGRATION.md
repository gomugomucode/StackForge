# DASHBOARD MIGRATION PLAN

## 1. Overview

We will migrate the dashboard by incorporating design patterns and component structures from the whoami repository's home page sections, while preserving the existing data-driven functionality of StackForge's dashboard.

## 2. Reusable Patterns from whoami

- **Card Design**: Each section (About, Education, etc.) uses a card-like layout with background, padding, rounded corners, and shadow effects.
- **Animations**: Uses framer-motion for hover effects and entrance animations.
- **Gradient Accents**: Uses gradient borders and backgrounds for visual interest.
- **Responsive Grid**: Uses CSS grid to layout sections, adapting from 1 column on mobile to multiple columns on desktop.
- **Icon Usage**: Uses react-icons for visual cues.
- **Typography**: Consistent heading and paragraph styles.

## 3. Mapping to StackForge Dashboard

- **Whoami About** → StackForge Welcome Section: Redesign welcome section using card design and animations from whoami's About.
- **Whoami Education** → StackForge Learning Progress: Use education timeline design to show course progress or roadmap milestones.
- **Whoami Certifications** → StackForge Certificates: Enhance certificate cards with whoami's certification card style.
- **Whoami Skills** → New Skill Overview: Add section visualizing skill distribution or XP by category using skills section design.
- **Whoami Portfolio** → Project Showcase: Add section showcasing featured projects or recent project submissions.
- **Whoami Services** → Course Catalog: Use services section to highlight available roadmaps or courses.

## 4. Implementation Steps

1. Extract card component patterns from whoami's sections (common card structure in About, Education, etc.).
2. Adapt card component to use StackForge's design system (colors, spacing) from DESIGN_SYSTEM_MIGRATION.md.
3. Redesign each dashboard section using the adapted card component.
4. Add framer-motion animations for hover and entrance effects as seen in whoami.
5. Ensure responsive layout using CSS grid or flexbox per whoami's responsive patterns.
6. Update dashboard to use new styled components while maintaining existing data fetching and state management.

## 5. Components to Create or Modify

- `DashboardCard`: Reusable card component based on whoami's section cards.
- `AnimatedHeading`: For section titles with gradient text and underline animation.
- `GradientBorder`: Wrapper for adding animated gradient borders.
- Redesign existing sections: Welcome, Stats, Learning Progress, Continue Learning, Activity Feed, Recommendations, Certificates.

## 6. Expected Outcome

A dashboard that maintains current data-driven functionality but with a refreshed, premium look and feel inspired by whoami's design.
