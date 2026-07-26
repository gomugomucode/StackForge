import React, { ReactNode } from "react";
import { Button } from "./Button";
import { tokens } from "@/lib/tokens";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  reason: string;
  benefit?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  reason,
  benefit,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`p-8 md:p-12 text-center border border-dashed border-[#E8E1D8] dark:border-[#383028] bg-white dark:bg-[#1C1814] ${tokens.radii.card} space-y-4 max-w-lg mx-auto ${className}`}
    >
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-[#2C241C] dark:text-white">{title}</h3>
        <p className="text-xs text-[#6C6257] dark:text-[#93887B] leading-relaxed">{reason}</p>
        {benefit && (
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">{benefit}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button to={primaryCtaHref} variant="primary" size="sm" className="w-full sm:w-auto">
          {primaryCtaLabel}
        </Button>
        {secondaryCtaLabel && secondaryCtaHref && (
          <Button to={secondaryCtaHref} variant="outline" size="sm" className="w-full sm:w-auto">
            {secondaryCtaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
