import React from 'react';
import { Play, Terminal } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface ExampleSectionProps {
  title: string;
  code: string;
  output: string;
  explanation: string;
}

export function ExampleSection({ title, code, output, explanation }: ExampleSectionProps) {
  return (
    <Card variant="default" padding="md" className="mb-6 space-y-4">
      <div className="flex items-center gap-2">
        <Play className="w-4.5 h-4.5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-3">
        <div className="rounded-lg border border-border overflow-hidden bg-muted/80">
          <div className="px-3 py-1.5 border-b border-border bg-muted text-xs font-mono text-muted-foreground flex items-center justify-between">
            <span>Implementation</span>
            <span className="text-[10px]">.js</span>
          </div>
          <div className="p-3.5 font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed">
            {code}
          </div>
        </div>
        
        <div className="rounded-lg border border-border overflow-hidden bg-muted">
          <div className="px-3 py-1.5 border-b border-border bg-muted text-xs font-mono text-muted-foreground flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>Console Output</span>
          </div>
          <div className="p-3.5 font-mono text-xs text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap leading-relaxed">
            {output}
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-secondary/60 border border-border/40 text-xs text-muted-foreground leading-normal">
          <span className="font-semibold text-foreground block mb-1">Explanation:</span>
          {explanation}
        </div>
      </div>
    </Card>
  );
}
