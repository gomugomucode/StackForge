/**
 * STACKFORGE SEMANTIC DESIGN SYSTEM V6 TOKENS
 * Single source of truth for semantic product design parameters.
 * Consumes CSS semantic variables. Zero hardcoded hex/Tailwind gray classes.
 */

export const tokens = {
  // 1. SURFACE ELEVATION LEVELS
  elevation: {
    level0: "bg-background text-foreground", // Canvas
    level1: "bg-card text-card-foreground border border-border shadow-xs rounded-xl", // Card
    level2: "bg-popover text-popover-foreground border border-border shadow-md rounded-xl", // Floating Nav/Popovers
    level3: "bg-popover text-popover-foreground border border-border shadow-2xl rounded-2xl", // Modals & Command Palette
  },

  // 2. COLOR ROLES
  colors: {
    canvas: "bg-background text-foreground",
    card: "bg-card text-card-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    muted: "bg-muted text-muted-foreground",

    // Borders & Dividers
    border: "border-border",
    borderMuted: "border-border/60",
    borderHover: "hover:border-primary/50",
    divider: "border-border/40",

    // Text Roles
    textPrimary: "text-foreground",
    textSecondary: "text-muted-foreground",
    textMuted: "text-muted-foreground/70",

    // Warm Emerald Primary Accent
    primary: "bg-primary text-primary-foreground",
    primaryText: "text-primary",
    primaryHover: "hover:bg-primary/90",
    primaryLight: "bg-primary/10 text-primary",

    // Feedback States
    success: "text-emerald-600 dark:text-emerald-400",
    successLight: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",

    warning: "text-amber-600 dark:text-amber-400",
    warningLight: "bg-amber-500/10 text-amber-600 dark:text-amber-400",

    danger: "text-destructive",
    dangerLight: "bg-destructive/10 text-destructive",

    info: "text-primary",
    infoLight: "bg-primary/10 text-primary",
  },

  // 3. TYPOGRAPHY SCALE
  typography: {
    display: "text-3xl md:text-4xl font-bold tracking-tight text-foreground",
    h1: "text-2xl font-bold tracking-tight text-foreground",
    h2: "text-xl font-semibold tracking-tight text-foreground",
    h3: "text-lg font-semibold text-foreground",
    h4: "text-base font-medium text-foreground",
    bodyLarge: "text-sm leading-relaxed text-muted-foreground",
    body: "text-xs leading-normal text-muted-foreground",
    small: "text-[11px] leading-normal text-muted-foreground",
    caption: "text-[10px] font-medium tracking-wide text-muted-foreground",
    badge: "text-[10px] font-bold uppercase tracking-wider",
    mono: "font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded-md",
  },

  // 4. LAYOUT CONSTRAINTS
  layout: {
    maxWidth: "max-w-7xl mx-auto",
    gutters: "px-4 sm:px-6 lg:px-8",
    sectionSpacing: "space-y-6 lg:space-y-8",
  },

  // 5. RADII TOKENS (3 STANDARD LEVELS)
  radii: {
    sm: "rounded-md",     // 6px (Badges)
    md: "rounded-lg",     // 8px (Inputs, Buttons)
    card: "rounded-xl",   // 12px (Cards, Popovers)
    modal: "rounded-2xl", // 16px (Modals)
    pill: "rounded-full", // Pill shapes
  },

  // 6. MOTION TOKENS
  motion: {
    hover: "transition-all duration-150 ease-out",
    page: "transition-all duration-150 ease-out",
    modal: "transition-all duration-150 ease-out",
  },
} as const;
