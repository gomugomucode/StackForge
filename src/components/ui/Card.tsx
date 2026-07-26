import React, { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  variant?: "default" | "subtle" | "elevated" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: "bg-white border border-[#E8E1D8] shadow-[0_1px_3px_rgba(44,36,28,0.04)]",
  subtle: "bg-[#F5F2EC] border border-[#E8E1D8]/60",
  elevated: "bg-[#FFFDFC] border border-[#E8E1D8] shadow-[0_4px_12px_rgba(44,36,28,0.06)]",
  interactive:
    "bg-white border border-[#E8E1D8] shadow-[0_1px_3px_rgba(44,36,28,0.04)] hover:border-emerald-600/40 hover:shadow-[0_4px_16px_rgba(5,150,105,0.08)] transition-all duration-200 cursor-pointer",
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
      className={`rounded-2xl ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
