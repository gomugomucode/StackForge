# UI Fix Task List

## Priority P0: Critical Blockers

### 1. Restore Hero Section
- **File:** `src/components/home/hero/HeroVisual.tsx` & `src/utils/icons.ts`
- **Reason:** Fix runtime crash caused by outdated `lucide-react` icons.
- **Task:** 
    - Update `lucide-react` to latest stable version.
    - Verify all icons used in `HeroVisual` are correctly exported.
- **Effort:** Low
- **Risk:** Low

### 2. Repair Theme System (Design Tokens)
- **File:** `src/app/globals.css`
- **Reason:** Light mode is broken because "surface" tokens aren't defined.
- **Task:**
    - Define `surface-750`, `surface-600`, `text-text-primary`, etc., as CSS variables in `globals.css`.
    - Map these variables to both `:root` and `.dark` blocks.
    - Ensure `primary` and `accent` colors are unified.
- **Effort:** Medium
- **Risk:** Low

## Priority P1: Layout & Component Regressions

### 3. Fix Button Implementation
- **File:** `src/components/ui/Button.tsx`
- **Reason:** `asChild` prop is used but not implemented, leading to invalid HTML and styling bugs.
- **Task:**
    - Implement the `Slot` pattern from `@radix-ui/react-slot`.
    - Fix hardcoded colors in `variants` to use theme tokens.
- **Effort:** Medium
- **Risk:** Medium (affects all buttons)

### 4. Implement Missing Design Utilities
- **File:** `src/app/globals.css`
- **Reason:** `gradient-border` and `glow-purple` are used in components but not defined in CSS.
- **Task:**
    - Create the `.gradient-border` and `.glow-X` classes using CSS radial-gradients and animations.
- **Effort:** Medium
- **Risk:** Low

### 5. Unify Landing Page Tokens
- **Files:** `src/components/home/**/*`
- **Reason:** Components are using a mix of `text-primary` and `text-accent-purple`.
- **Task:**
    - Standardize all components to use the unified theme tokens.
- **Effort:** Medium
- **Risk:** Low

## Priority P2: Visual Polish & UX

### 6. Standardize Spacing & Typography
- **Files:** `src/app/page.tsx` and section components.
- **Reason:** Inconsistent vertical rhythm (mix of `py-20` and `py-24`).
- **Task:**
    - Standardize section padding and margins.
- **Effort:** Low
- **Risk:** Low

### 7. Responsive Audit
- **Files:** `FeatureBento`, `HeroSection`.
- **Reason:** Ensure bento grid and hero visual scale correctly on mobile.
- **Task:**
    - Test across breakpoints and fix overflow issues.
- **Effort:** Low
- **Risk:** Low
