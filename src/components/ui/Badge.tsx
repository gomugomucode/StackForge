import React, { ReactNode } from "react";
import { tokens } from "@/lib/tokens";

export interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "amber" | "danger" | "outline";
  className?: string;
}

const variantStyles = {
  default: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-600/20",
  secondary: "bg-[#F5F2EC] dark:bg-[#25201A] text-[#2C241C] dark:text-white border border-[#E8E1D8] dark:border-[#383028]",
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20",
  danger: "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20",
  outline: "bg-transparent text-[#6C6257] dark:text-[#93887B] border border-[#E8E1D8] dark:border-[#383028]",
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
