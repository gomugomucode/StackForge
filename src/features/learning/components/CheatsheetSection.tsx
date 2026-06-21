"use client";

import React from "react";
import { Download, FileText, Print, Code } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { exportToPDF, exportToMarkdown } from "@/features/cheatsheets/exportService";

interface CheatsheetSectionProps {
  title: string;
  content: string;
  topicSlug: string;
}

export function CheatsheetSection({ title, content, topicSlug }: CheatsheetSectionProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    await exportToPDF(title, content);
  };

  const handleDownloadMD = async () => {
    await exportToMarkdown(title, content);
  };

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

      <div className="border border-border bg-card rounded-xl p-6 overflow-auto">
        <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed">
          {content}
        </div>
      </div>
    </section>
  );
}
