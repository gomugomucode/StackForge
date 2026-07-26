import React, { ReactNode } from "react";
import { Button } from "./Button";
import { tokens } from "@/lib/tokens";
import Link from "next/link";

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  reason: string;
  benefit?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  onPrimaryClick?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export function EmptyState({
  icon,
  title = "No Data Found",
  reason,
  benefit,
  primaryCtaLabel,
  primaryCtaHref,
  onPrimaryClick,
  secondaryCtaLabel,
  secondaryCtaHref,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`p-8 md:p-12 text-center border border-dashed border-border bg-card ${tokens.radii.card} space-y-4 max-w-lg mx-auto ${className}`}
    >
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{reason}</p>
        {benefit && (
          <p className="text-xs text-primary font-medium">{benefit}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {primaryCtaLabel && (
          primaryCtaHref ? (
            <Button asChild size="sm" variant="primary">
              <Link href={primaryCtaHref}>{primaryCtaLabel}</Link>
            </Button>
          ) : (
            <Button size="sm" variant="primary" onClick={onPrimaryClick}>
              {primaryCtaLabel}
            </Button>
          )
        )}
        {secondaryCtaLabel && secondaryCtaHref && (
          <Button asChild size="sm" variant="outline">
            <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
