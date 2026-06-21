"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  const roundedValue = Math.min(Math.max(0, value), 100);

  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
    >
      <div
        className="absolute inset-0 transition-all duration-500 ease-out bg-primary"
        style={{ 
          width: `${roundedValue}%`,
          transform: 'translateX(0)' 
        }}
      />
    </div>
  );
}
