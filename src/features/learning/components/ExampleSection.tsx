import React from 'react';
import { Play, Terminal } from 'lucide-react';

interface ExampleSectionProps {
  title: string;
  code: string;
  output: string;
  explanation: string;
}

export function ExampleSection({ title, code, output, explanation }: ExampleSectionProps) {
  return (
    <div className="mb-8 p-6 rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 mb-4">
        <Play className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-4">
        <div className="rounded-xl border border-border overflow-hidden bg-zinc-900">
          <div className="px-4 py-2 border-b border-border bg-zinc-800 text-xs font-mono text-zinc-400">
            Implementation
          </div>
          <div className="p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap">
            {code}
          </div>
        </div>
        <div className="rounded-xl border border-border overflow-hidden bg-black">
          <div className="px-4 py-2 border-b border-border bg-zinc-900 text-xs font-mono text-zinc-400 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            Console Output
          </div>
          <div className="p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
            {output}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground block mb-1">Explanation:</span>
          {explanation}
        </div>
      </div>
    </div>
  );
}
