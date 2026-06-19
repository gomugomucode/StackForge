"use client";

import { useParams } from "next/navigation";
import { roadmaps } from "@/data/roadmaps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { FileText, Download, Search } from "lucide-react";

export default function RoadmapCheatsheetPage() {
  const params = useParams();
  const roadmap = roadmaps.find((r) => r.slug === params.slug);

  if (!roadmap) return <div className="text-center py-20">Roadmap not found</div>;

  const items = [
    { topic: "Core Concepts", summary: "Fundamental building blocks", syntax: "Basic usage", example: "console.log('Hello');", notes: "Essential for all levels." },
    { topic: "Advanced Patterns", summary: "Scaling and Architecture", syntax: "Complex structures", example: "const a = () => {};", notes: "Used in production systems." },
    { topic: "Performance Tips", summary: "Optimizing for speed", syntax: "N/A", example: "useMemo(() => { ... }, [])", notes: "Crucial for UX." },
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-wider text-xs">
            <FileText className="w-4 h-4" /> Cheatsheet
          </div>
          <h1 className="text-4xl font-black tracking-tight">{roadmap.title} Quick Reference</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Search className="w-4 h-4" /> Search
          </Button>
          <Button variant="primary" className="gap-2">
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item, i) => (
          <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-4 hover:border-blue-500/50 transition-all">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{item.topic}</h3>
              <span className="text-xs font-medium px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600">Topic {i+1}</span>
            </div>
            <p className="text-muted-foreground">{item.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 font-mono text-xs">
                <p className="text-muted-foreground mb-1 uppercase font-bold">Syntax</p>
                <pre>{item.syntax}</pre>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 font-mono text-xs">
                <p className="text-muted-foreground mb-1 uppercase font-bold">Example</p>
                <pre>{item.example}</pre>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 text-xs italic">
              Note: {item.notes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
