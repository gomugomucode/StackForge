# Design System Audit Report

## Component Audit

### 1. Buttons (`src/components/ui/Button.tsx`)
- **Consistency:** Poor. Uses a custom color system (`accent-purple`) that diverges from the global theme.
- **Functionality:** Missing `asChild` implementation.
- **Styling:** Relies on non-existent Tailwind classes (`bg-surface-750`).

### 2. Cards (`src/components/ui/SectionHeader.tsx`)
- **Consistency:** Mixed. Some use `bg-card` (correct), others use `bg-surface-750` (broken).
- **Visuals:** Missing `gradient-border` and `glow-purple` utilities in `globals.css`.
- **Responsiveness:** Generally good, but inconsistent padding in bento grids.

### 3. Navbar (`src/components/layout/Navbar.tsx`)
- **Consistency:** Good. Uses `bg-background/80 backdrop-blur-xl`.
- **Typography:** Consistent with the global font settings.

### 4. Hero (`src/components/home/hero/`)
- **Visuals:** High potential, but currently crashes.
- **Responsiveness:** Uses `md:text-7xl` and `hidden md:block`, which is correct.
- **Layout:** Uses a complex absolute positioning for background glows which might overlap with content if not careful.

## Global Design Issues

### 1. Inconsistent Spacing
- The landing page uses a mix of `py-20`, `py-24`, and `mb-12/16`. This creates an uneven rhythm.
- Standardize to a base-8 or base-4 spacing system.

### 2. Typography
- The use of `gradient-text` is inconsistently applied.
- Some headings use `tracking-tight`, others do not.

### 3. Color System Fragmentation
- **System A:** `--primary` (Violet) $\rightarrow$ `text-primary`.
- **System B:** `accent-purple` $\rightarrow$ `text-accent-purple`.
- This creates a "clashing" visual identity where two different purples are used.

## Summary of Regressions

| Element | Original Intent | Current State | Gap |
| :--- | :--- | :--- | :--- |
| **Hero** | Premium, high-impact visual | Not rendering | Total failure due to deps |
| **Theme** | Seamless Light/Dark transition | "Broken" Light mode | Token mismatch |
| **Bento Grid** | Glassmorphism/Glow effect | Flat/Unstyled | Missing CSS utilities |
| **Buttons** | Interactive, branded | Plain/Broken colors | Token mismatch |
