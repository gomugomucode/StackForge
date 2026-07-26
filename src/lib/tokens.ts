/**
 * STACKFORGE DESIGN SYSTEM TOKENS
 * Single source of truth for design parameters:
 * Crisp Modern Light Theme (Vercel / Linear Aesthetic: Slate & Electric Blue)
 */

export const tokens = {
  // 1. COLOR PALETTE & SEMANTIC ROLES
  colors: {
    // Canvas & Surface
    canvas: "#FAFAFA",       // Crisp slate light background
    subtle: "#F8FAFC",       // Secondary light surface / sidebars / inputs
    card: "#FFFFFF",         // Pure white card surface
    cardElevated: "#FFFFFF", // Floating popovers / hovered cards

    // Borders
    border: "#E2E8F0",       // Crisp 1px slate border
    borderDark: "#334155",   // Dark mode border
    borderHover: "rgba(37, 99, 235, 0.4)", // Electric Blue hover glow

    // Typography Colors
    textPrimary: "#0F172A",  // Slate 900 high contrast primary
    textSecondary: "#475569",// Slate 600 secondary
    textMuted: "#64748B",    // Slate 500 muted text

    // Accents & Feedback
    primary: "#2563EB",      // Vercel Electric Blue
    primaryHover: "#1D4ED8",
    primaryLight: "rgba(37, 99, 235, 0.08)",
    successGreen: "#10B981",
    successLight: "rgba(16, 185, 129, 0.1)",
    warningAmber: "#F59E0B",
    warningLight: "rgba(245, 158, 11, 0.1)",
    dangerRed: "#EF4444",
    dangerLight: "rgba(239, 68, 68, 0.1)",
  },

  // 2. TYPOGRAPHY SCALE
  typography: {
    display: "text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white",
    h1: "text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white",
    h2: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white",
    h3: "text-xl font-bold text-slate-900 dark:text-white",
    bodyLarge: "text-base leading-relaxed text-slate-600 dark:text-slate-300",
    body: "text-sm leading-relaxed text-slate-600 dark:text-slate-400",
    caption: "text-xs font-medium text-slate-500 dark:text-slate-400",
    badge: "text-[10px] font-bold uppercase tracking-wider",
  },

  // 3. 8PX SPACING SYSTEM GRID
  spacing: {
    px4: "4px",
    px8: "8px",
    px12: "12px",
    px16: "16px",
    px24: "24px",
    px32: "32px",
    px40: "40px",
    px48: "48px",
    px64: "64px",
    px80: "80px",
    px96: "96px",
  },

  // 4. RADII TOKENS
  radii: {
    sm: "rounded-lg",    // 8px
    md: "rounded-xl",    // 12px
    card: "rounded-2xl",  // 16px
    hero: "rounded-3xl",  // 24px
    pill: "rounded-full", // 9999px
  },

  // 5. SHADOWS & ELEVATION
  shadows: {
    card: "shadow-[0_1px_3px_rgba(15,23,42,0.06)]",
    elevated: "shadow-[0_4px_16px_rgba(15,23,42,0.08)]",
    hover: "shadow-[0_4px_20px_rgba(37,99,235,0.12)]",
  },

  // 6. MOTION & TRANSITIONS
  motion: {
    hover: "transition-all duration-150 ease-out",
    page: "transition-all duration-200 ease-out",
    drawer: "transition-all duration-250 ease-in-out",
  },
} as const;
