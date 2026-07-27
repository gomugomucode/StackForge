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
  default: `bg-card text-card-foreground border border-border shadow-xs`,
  subtle: `bg-secondary text-secondary-foreground border border-border/60`,
  elevated: `bg-popover text-popover-foreground border border-border shadow-md`,
  interactive:
    `bg-card text-card-foreground border border-border shadow-xs hover:border-primary/50 hover:shadow-sm transition-all duration-150 ease-out cursor-pointer`,
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

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`space-y-1.5 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold tracking-tight text-foreground ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs leading-normal text-muted-foreground ${className}`}>{children}</p>;
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`pt-3 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`pt-4 flex items-center justify-between border-t border-border/40 mt-4 ${className}`}>{children}</div>;
}
