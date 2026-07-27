import React, { ReactNode } from "react";
import { tokens } from "@/lib/tokens";

export interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "warning" | "danger" | "outline" | "success" | "info";
  className?: string;
}

const variantStyles = {
  primary: "bg-primary/10 text-primary border border-primary/20",
  secondary: "bg-secondary text-secondary-foreground border border-border/60",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  danger: "bg-destructive/10 text-destructive border border-destructive/20",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
  outline: "bg-transparent text-muted-foreground border border-border",
};

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 ${tokens.radii.pill} ${tokens.typography.badge} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
