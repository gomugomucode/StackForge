import React from 'react';
import { Info, Lightbulb } from 'lucide-react';

interface LearningSectionProps {
  title: string;
  content: string;
  whyItMatters: string;
}

export function LearningSection({ title, content, whyItMatters }: LearningSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          {content}
        </div>
      </div>
      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Why it matters</h3>
        </div>
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          {whyItMatters}
        </p>
      </div>
    </div>
  );
}
