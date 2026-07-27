"use client";

import * as React from "react";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  const roundedValue = Math.min(Math.max(0, value), 100);

  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}
    >
      <div
        className="absolute inset-0 transition-all duration-300 ease-out bg-primary rounded-full"
        style={{ 
          width: `${roundedValue}%`,
          transform: 'translateX(0)' 
        }}
      />
    </div>
  );
}
