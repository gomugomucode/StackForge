import React, { HTMLAttributes } from "react";
import { tokens } from "@/lib/tokens";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800 ${tokens.radii.md} ${className}`}
      {...props}
    />
  );
}
