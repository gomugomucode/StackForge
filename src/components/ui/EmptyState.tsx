import React, { ReactNode } from "react";
import { Button } from "./Button";
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
  title = "No Items Found",
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
      className={`p-6 sm:p-8 text-center border border-dashed border-border bg-card rounded-xl space-y-4 max-w-md mx-auto ${className}`}
    >
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground leading-normal">{reason}</p>
        {benefit && (
          <p className="text-xs text-primary font-medium pt-1">{benefit}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {primaryCtaLabel && (
          primaryCtaHref ? (
            <Button asChild size="md" variant="primary">
              <Link href={primaryCtaHref}>{primaryCtaLabel}</Link>
            </Button>
          ) : (
            <Button size="md" variant="primary" onClick={onPrimaryClick}>
              {primaryCtaLabel}
            </Button>
          )
        )}
        {secondaryCtaLabel && secondaryCtaHref && (
          <Button asChild size="md" variant="outline">
            <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
