"use client";

import React, { useState } from "react";
import { useUserAvatar } from "@/hooks/useUserAvatar";

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fallbackInitials?: string;
}

const sizeClasses = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-11 h-11 text-base",
  xl: "w-16 h-16 text-xl",
};

export function Avatar({ src, alt, size = "md", className = "", fallbackInitials }: AvatarProps) {
  const resolved = useUserAvatar();
  const [imageError, setImageError] = useState(false);

  const activeSrc = src !== undefined ? src : resolved.imageUrl;
  const initials = fallbackInitials || resolved.initials;
  const activeAlt = alt || resolved.displayName;

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  if (activeSrc && !imageError) {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-muted border border-border/80 shrink-0 ${sizeClass} ${className}`}
      >
        <img
          src={activeSrc}
          alt={activeAlt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary font-bold uppercase shrink-0 select-none ${sizeClass} ${className}`}
      aria-label={activeAlt}
    >
      {initials}
    </div>
  );
}
