"use client";

import React from "react";
import { CheckCircle2, ArrowRight, AlertCircle, BookOpen, Target, Code } from "lucide-react";
import { Card } from "@/components/ui/SectionHeader";

export function TopicSummary({ title, keyConcepts, thingsToRemember, bestPractices }: any) {
  return (
    <div className="p-8 rounded-3xl bg-card border border-border space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold">Topic Summary: {title}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Target className="w-4 h-4" /> Key Concepts
          </h4>
          <ul className="space-y-2">
            {keyConcepts.map((concept: string, i: number) => (
              <li key={i} className="text-foreground flex items-start gap-2 text-sm">
                <span className="text-primary">•</span> {concept}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Things To Remember
          </h4>
          <ul className="space-y-2">
            {thingsToRemember.map((item: string, i: number) => (
              <li key={i} className="text-foreground flex items-start gap-2 text-sm">
                <span className="text-yellow-500">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
        <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
          <Code className="w-4 h-4" /> Golden Rule
        </h4>
        <p className="text-sm italic text-muted-foreground">
          "{bestPractices[0] || "Apply these concepts consistently in real-world projects to achieve mastery."}"
        </p>
      </div>
    </div>
  );
}
