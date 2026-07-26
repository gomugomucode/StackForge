import React, { ReactNode } from "react";
import { tokens } from "@/lib/tokens";

export interface CardProps {
  children: ReactNode;
  variant?: "default" | "subtle" | "elevated" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm`,
  subtle: `bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800`,
  elevated: `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md`,
  interactive:
    `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all duration-200 cursor-pointer`,
};

const paddingStyles = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  variant = "default",
  padding = "md",
  className = "",
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`${tokens.radii.card} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
