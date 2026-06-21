# UI Regression Report - StackForge Academy

## Executive Summary
The platform is experiencing a severe UI regression characterized by missing key sections (Hero), broken theme transitions, and a degraded visual appearance. The root cause is a combination of a **design token mismatch**, **outdated library dependencies (lucide-react)**, and **incomplete component implementations**.

## Root Cause Analysis

### 1. Missing Hero Section
- **Severity:** P0 (Critical)
- **File Path:** `src/components/home/hero/HeroVisual.tsx`
- **Root Cause:** Runtime crash caused by importing icons (`Code2`, `BrainCircuit`) from `lucide-react@1.18.0` that do not exist in that version. In React, rendering an `undefined` component throws a fatal error, crashing the entire `HeroSection` and preventing it from mounting.
- **Impact:** Homepage is missing its most critical visual element.

### 2. Design Token Mismatch (Broken Layouts/Styling)
- **Severity:** P0 (Critical)
- **File Path:** `src/components/ui/Button.tsx`, `src/components/about/FounderSection.tsx`, `src/components/layout/Footer.tsx`
- **Root Cause:** A "Split Design System". 
    - **System A (Modern):** Defined in `globals.css` using CSS variables (`--color-primary`, `--background`).
    - **System B (Legacy/Hardcoded):** Used in components as hardcoded Tailwind classes (`bg-surface-750`, `text-accent-purple`, `border-surface-600`).
- **Impact:** Since System B is not defined in the Tailwind config or CSS, these components render with no colors or default browser styles, leading to a "broken" look.

### 3. Theme System Failure
- **Severity:** P0 (Critical)
- **File Path:** `src/app/globals.css`, `src/components/theme-provider.tsx`
- **Root Cause:** The theme toggle only updates the `.dark` class on the HTML element. However, since most components use the "System B" hardcoded colors (e.g., `bg-surface-750`), they do not respond to theme changes. Only components using System A (the CSS variables) are theme-aware.
- **Impact:** Light/Dark mode toggle appears to do nothing for most of the UI.

### 4. Component Implementation Gaps
- **Severity:** P1 (High)
- **File Path:** `src/components/ui/Button.tsx`
- **Root Cause:** Components are being used with props (`asChild`) that are not implemented in the actual component code.
- **Impact:** Incorrect HTML nesting (`<button><a>...</a></button>`), which can cause accessibility issues and unexpected styling behavior.

## Summary Table

| Issue | Severity | Root Cause | Fix |
| :--- | :--- | :--- | :--- |
| Hero Missing | P0 | Invalid Lucide Icons | Update `lucide-react` or use existing icons |
| Degraded Visuals | P0 | Token Mismatch | Migrate all "surface-X" classes to CSS variables |
| Theme Broken | P0 | Hardcoded Colors | Implement theme-aware tokens for all components |
| Button Bug | P1 | Missing `asChild` | Implement Slot pattern for Button |
