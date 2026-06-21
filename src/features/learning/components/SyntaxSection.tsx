import React from 'react';
import { Code2, Terminal } from 'lucide-react';

interface SyntaxSectionProps {
  title: string;
  syntax: string;
  declaration?: string;
}

export function SyntaxSection({ title, syntax, declaration }: SyntaxSectionProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Code2 className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border overflow-hidden bg-zinc-900">
          <div className="px-4 py-2 border-b border-border bg-zinc-800 text-xs font-mono text-zinc-400 flex justify-between items-center">
            <span>Syntax Reference</span>
            <span className="text-zinc-500">.js</span>
          </div>
          <div className="p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap">
            {syntax}
          </div>
        </div>
        <div className="rounded-xl border border-border overflow-hidden bg-zinc-900">
          <div className="px-4 py-2 border-b border-border bg-zinc-800 text-xs font-mono text-zinc-400 flex justify-between items-center">
            <span>Declaration Example</span>
            <span className="text-zinc-500">.js</span>
          </div>
          <div className="p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap">
            {declaration}
          </div>
        </div>
      </div>
    </div>
  );
}
