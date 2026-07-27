import React from 'react';
import { Code2 } from 'lucide-react';

interface SyntaxSectionProps {
  title: string;
  syntax: string;
  declaration?: string;
}

export function SyntaxSection({ title, syntax, declaration }: SyntaxSectionProps) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center gap-2">
        <Code2 className="w-4.5 h-4.5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border overflow-hidden bg-muted/80">
          <div className="px-3 py-1.5 border-b border-border bg-muted text-xs font-mono text-muted-foreground flex justify-between items-center">
            <span>Syntax Reference</span>
            <span className="text-[10px]">.js</span>
          </div>
          <div className="p-3.5 font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed">
            {syntax}
          </div>
        </div>
        {declaration && (
          <div className="rounded-lg border border-border overflow-hidden bg-muted/80">
            <div className="px-3 py-1.5 border-b border-border bg-muted text-xs font-mono text-muted-foreground flex justify-between items-center">
              <span>Declaration Example</span>
              <span className="text-[10px]">.js</span>
            </div>
            <div className="p-3.5 font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed">
              {declaration}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
