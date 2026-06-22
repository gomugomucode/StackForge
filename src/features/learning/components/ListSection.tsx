import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ListSectionProps {
  title: string;
  items: string[];
  type: 'best-practice' | 'common-mistake';
}

export function ListSection({ title, items, type }: ListSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-foreground">{title}</h4>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div 
            key={index} 
            className={cn(
              "p-4 rounded-xl border transition-colors",
              type === 'best-practice' 
                ? "bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-400" 
                : "bg-red-500/5 border-red-500/20 text-red-700 dark:text-red-400"
            )}
          >
            <div className="flex gap-3">
              {type === 'best-practice' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 shrink-0" />
              )}
              <p className="text-sm leading-relaxed">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
