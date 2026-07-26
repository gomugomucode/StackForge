/**
 * STACKFORGE SEMANTIC DESIGN SYSTEM TOKENS
 * Single source of truth for semantic design parameters.
 * Eliminates hardcoded hex/color utilities across Light & Dark themes.
 */

export const tokens = {
  // 1. SEMANTIC ROLES & CONTAINER CLASSES
  colors: {
    canvas: "bg-background text-foreground",
    surface: "bg-secondary text-secondary-foreground",
    card: "bg-card text-card-foreground",
    cardElevated: "bg-popover text-popover-foreground",

    // Borders
    border: "border-border",
    borderMuted: "border-border/60",
    borderHover: "hover:border-primary/40",

    // Semantic Text Roles
    textPrimary: "text-foreground",
    textSecondary: "text-muted-foreground",
    textMuted: "text-muted-foreground/80",

    // Brand Accent & Feedback Roles
    primary: "bg-primary text-primary-foreground",
    primaryText: "text-primary",
    primaryHover: "hover:bg-primary/90",
    primaryLight: "bg-primary/10 text-primary",

    success: "text-emerald-500 dark:text-emerald-400",
    successLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",

    warning: "text-amber-500 dark:text-amber-400",
    warningLight: "bg-amber-500/10 text-amber-600 dark:text-amber-400",

    danger: "text-destructive",
    dangerLight: "bg-destructive/10 text-destructive",
  },

  // 2. TYPOGRAPHY SCALE (Semantic Text Tokens)
  typography: {
    display: "text-4xl sm:text-5xl font-black tracking-tight text-foreground",
    h1: "text-3xl font-extrabold tracking-tight text-foreground",
    h2: "text-2xl font-bold tracking-tight text-foreground",
    h3: "text-xl font-bold text-foreground",
    bodyLarge: "text-base leading-relaxed text-muted-foreground",
    body: "text-sm leading-relaxed text-muted-foreground",
    caption: "text-xs font-medium text-muted-foreground",
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
    card: "shadow-sm",
    elevated: "shadow-md",
    hover: "shadow-lg",
  },

  // 6. MOTION & TRANSITIONS
  motion: {
    hover: "transition-all duration-150 ease-out",
    page: "transition-all duration-200 ease-out",
    drawer: "transition-all duration-250 ease-in-out",
  },
} as const;
