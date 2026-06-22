"use client";

import React from "react";
import { Download, FileText, Print, Code } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { exportToPDF, exportToMarkdown } from "@/features/cheatsheets/exportService";

import { TopicCheatsheet } from "@/features/content/types";

interface CheatsheetSectionProps {
  title: string;
  cheatsheet?: TopicCheatsheet;
  topicSlug: string;
}

export function CheatsheetSection({ title, cheatsheet, topicSlug }: CheatsheetSectionProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const content = formatCheatsheet(cheatsheet);
    await exportToPDF(title, content);
  };

  const handleDownloadMD = async () => {
    const content = formatCheatsheet(cheatsheet);
    await exportToMarkdown(title, content);
  };

  function formatCheatsheet(cs?: TopicCheatsheet): string {
    if (!cs) return "No cheatsheet available";
    return `
# ${title} Cheatsheet

## Summary
${cs.summary}

## Syntax
${cs.syntax.join('\\n')}

## Examples
${cs.examples.join('\\n')}

## Common Mistakes
${cs.commonMistakes.join('\\n')}

## Interview Tips
${cs.interviewTips.join('\\n')}
    `.trim();
  }

  if (!cheatsheet) return null;

  return (
    <section className="space-y-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Quick Reference</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadMD} 
            className="gap-2 text-xs"
          >
            <Code className="w-3.5 h-3.5" /> Markdown
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadPDF} 
            className="gap-2 text-xs"
          >
            <Download className="w-3.5 h-3.5" /> PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrint} 
            className="gap-2 text-xs"
          >
            <Print className="w-3.5 h-3.5" /> Print
          </Button>
        </div>
      </div>

      <div className="border border-border bg-card rounded-xl p-6 space-y-6">
        <div className="prose prose-invert max-w-none text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{cheatsheet.summary}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-primary">Syntax</h5>
            <ul className="space-y-2">
              {cheatsheet.syntax.map((item, i) => (
                <li key={i} className="text-xs font-mono bg-muted p-2 rounded border border-border">{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-primary">Interview Tips</h5>
            <ul className="space-y-2">
              {cheatsheet.interviewTips.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
