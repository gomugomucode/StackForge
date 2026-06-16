# UI Audit Report - StackForge Restoration

## Objective
Restore the UI/UX to match StackHub (https://stackhub-ruddy.vercel.app/) while maintaining Next.js 15, Auth.js, and Prisma functionality.

## Current UI Problems

### 1. Spacing & Layout
- **Hero Section**: `HubHeader` uses `pt-20 pb-16`. Needs to be `py-20`.
- **Global Layout**: General use of `max-w-7xl mx-auto px-4` is present but inconsistent across all sub-pages.
- **Section Spacing**: Some sections have tighter padding than the required `py-20`.

### 2. Typography
- **Theme Tokens**: Heavy reliance on custom tokens like `text-text-primary` and `text-text-secondary`.
- **Heading**: Hero heading uses `text-text-primary` instead of specific color/gradient requirements.
- **Subtitle**: Uses `text-text-secondary` instead of `text-gray-400`.
- **Body/Descriptions**: Inconsistent use of gray shades; needs standardization to `text-gray-300` (body) and `text-gray-400` (descriptions).

### 3. Hero Section (HubHeader)
- **Glow Effects**: Only one indigo glow present. Missing the second violet glow.
- **Gradient**: Heading gradient is `from-indigo-400 to-purple-400`. Needs `from-indigo-500 to-violet-600`.
- **Search Bar**: 
  - Contains a gradient glow backdrop that is NOT in StackHub.
  - Uses `text-text-primary` and `text-text-muted` instead of `text-white` and `text-gray-400`.
  - Focus states use `focus:ring-0` and `bg-transparent` instead of `focus:border-indigo-500` and `focus:bg-white/10`.

### 4. Navbar
- **Styling**: Uses a "glassy" pill-based navigation. StackHub is cleaner, transparent with white text and a backdrop blur.
- **Layout**: Center navigation and right-aligned auth actions need to be strictly enforced.
- **Tokens**: Again, uses `text-text-primary` etc.

### 5. AI Mentor Panel
- **Visibility**: The floating trigger exists and the slide-over works.
- **Refinement**: Needs to be strictly `w-[420px]` on desktop and full width on mobile.
- **Interaction**: Needs verification of backdrop overlay, escape key support, and click-outside to close.

### 6. Cards (General)
- **Consistency**: `QuickAccess` cards are close (`bg-white/5 border-white/10`), but we need to audit all other cards (roadmap, tutorial, cheatsheet, project) to ensure the hover effect (`-translate-y-1`) and border transition (`hover:border-indigo-500/50`) are applied globally.

### 7. Dark/Light Mode
- **Implementation**: `ThemeProvider` and `ThemeToggle` are functional.
- **Visuals**: The `globals.css` has a complex palette. We need to simplify this to ensure the "dark" look matches the deep blacks/dark grays of StackHub.

## Summary of Required Changes
- Remove theme tokens (`text-text-primary` etc.) and replace with standard Tailwind colors (`text-white`, `text-gray-400`, etc.).
- Update `HubHeader` typography, gradients, and search bar styling.
- Simplify `Navbar` to match StackHub's transparent/blurred look.
- Standardize all card styles.
- Refine AI Mentor panel dimensions and behavior.
- Clean up `globals.css` theme variables.
