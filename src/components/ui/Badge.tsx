import React, { ReactNode } from "react";
import { tokens } from "@/lib/tokens";

export interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "amber" | "danger" | "outline" | "success";
  className?: string;
}

const variantStyles = {
  default: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  secondary: "bg-secondary text-secondary-foreground border border-border",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  danger: "bg-destructive/10 text-destructive border border-destructive/20",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  outline: "bg-transparent text-muted-foreground border border-border",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${tokens.radii.pill} ${tokens.typography.badge} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
