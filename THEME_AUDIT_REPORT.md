# Theme System Audit Report

## System Architecture
The current theme system is a hybrid of two incompatible approaches:
1. **Modern CSS Variables:** Defined in `globals.css` using `--background`, `--foreground`, etc., and mapped to Tailwind v4 `@theme`.
2. **Legacy Hardcoded Tokens:** Components using classes like `bg-surface-750`, `text-text-primary`, and `accent-purple`.

## Audit Findings

### 1. Dark Mode Verification
- **Mechanism:** `next-themes` adds the `.dark` class to the `<html>` tag.
- **Status:** Partially Working.
- **Observation:** Components using `bg-background` and `text-foreground` switch correctly. Components using `bg-surface-750` remain static regardless of the theme.

### 2. Light Mode Verification
- **Mechanism:** Absence of `.dark` class.
- **Status:** Broken (Visually).
- **Observation:** The "light mode" is essentially "unstyled mode" for many components. Since `bg-surface-750` doesn't exist in the Tailwind config, it defaults to no background, making the site look like plain HTML.

### 3. Theme Persistence & Logic
- **Persistence:** Works via `localStorage` (handled by `next-themes`).
- **Preference:** `prefers-color-scheme` is handled by `next-themes`.
- **Logical Flow:** `ThemeProvider` $\rightarrow$ `html` class $\rightarrow$ `globals.css` variables $\rightarrow$ Tailwind utilities.

## Critical Failures

| Issue | Root Cause | Impact |
| :--- | :--- | :--- |
| **Missing Variables** | `surface-750`, `surface-600`, `text-primary` (legacy) are not defined in `globals.css`. | Components appear unstyled or transparent. |
| **Token Divergence** | `Button.tsx` uses `accent-purple` but `globals.css` defines `--color-primary` as Violet. | Inconsistent branding and color palettes. |
| **Hardcoded Colors** | Use of `bg-zinc-950` in `HeroVisual.tsx` instead of `bg-card`. | Hero visual doesn't adapt to light mode (stays dark). |

## Recommendations
1. **Unify Token System:** Delete all `surface-X` and `text-X` references. Replace them with the standard `background`, `foreground`, `muted`, `primary`, `secondary`, `accent`, `card` tokens.
2. **Complete the Theme Map:** Ensure every custom color used in the original design is mapped to a CSS variable in both `:root` and `.dark` blocks.
3. **Audit Components:** Every file in `src/components/ui` must be checked for hardcoded colors.
