# UI_MIGRATION_PLAN.md

## Design System Migration Strategy

This document outlines which UI elements from the `whoami` repository will be integrated into StackForge Academy.

### 1. Global Styles & Theme
| Element | Status | Action |
| :--- | :--- | :--- |
| **CSS Variable System** | **ADAPT** | Port the `--primary-color`, `--bg-color` structure to `globals.css`. |
| **Glassmorphism (Premium Glass)** | **KEEP** | Use the `backdrop-blur-lg` + `border-white/30` pattern for all cards and panels. |
| **Animated Backgrounds** | **KEEP** | Implement the floating, pulsing gradient circles on Home, Dashboard, and Topic pages. |
| **Theme Transition** | **ADAPT** | Use the `transition: background-color 0.3s ease` logic for smoother mode switching. |

### 2. Layout Components
| Element | Status | Action |
| :--- | :--- | :--- |
| **Navbar Wrapper** | **ADAPT** | Keep the fixed-position, scroll-aware shadow logic. |
| **Mobile Menu Overlay** | **KEEP** | Port the full-screen slide-in menu with `backdrop-blur`. |
| **Container System** | **KEEP** | Standardize on `container mx-auto px-4 sm:px-6`. |
| **Footer** | **ADAPT** | Simplify `whoami` footer and merge with StackForge's professional links. |

### 3. UI Components
| Element | Status | Action |
| :--- | :--- | :--- |
| **Hero/Banner** | **ADAPT** | Reuse the text-gradient and focal-point scaling for the Landing Page. |
| **Skills Grid** | **ADAPT** | Transform the "Skills" card into "Roadmap" or "Course" cards. |
| **Proficiency Bars** | **ADAPT** | Convert skill percentage bars into Learning Progress bars for the Dashboard. |
| **Certification Cards** | **ADAPT** | Reuse the visual style of `Certifications.jsx` for the `/cert` verification pages. |
| **Portfolio Grid** | **ADAPT** | Use this layout for the `/projects` gallery. |
| **Interaction Ripples** | **ADAPT** | Add scale-animations to primary buttons. |

### 4. Items to Reject (DO NOT MIGRATE)
- **Business Logic**: Any JavaScript functions related to portfolio data fetching or static JSON mapping.
- **Content**: All personal text, names, bios, and images.
- **Portfolio Logic**: Filtering by category in the portfolio section.
- **Contact Forms**: The specific implementation of the "Contact Me" section (use StackForge's existing contact/community methods).
- **Static JSON Files**: `Skill.json`, `Portfolio.json`, `Banner.json`.

---

## Implementation Phases

1. **Foundation**: Update `globals.css` with the new color system and Glassmorphism classes.
2. **Navigation**: Redesign `Navbar.tsx` incorporating the Mega Menu and refined links.
3. **Dashboard**: Refactor `app/dashboard/page.tsx` using the Grid layout patterns and Progress bars.
4. **Content Pages**: Apply Glassmorphism and ambient backgrounds to Topic and Roadmap pages.
5. **Micro-interactions**: Integrate `framer-motion` for hover scales and transitions globally.
