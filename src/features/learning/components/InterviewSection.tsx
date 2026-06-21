"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface InterviewQuestion {
  question: string;
  answer: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  companyFrequency: number;
  tags: string[];
}

interface InterviewSectionProps {
  questions: InterviewQuestion[];
}

export function InterviewSection({ questions }: InterviewSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Interview Preparation</h3>
      </div>

      <div className="grid gap-4">
        {questions.map((q, index) => (
          <div 
            key={index} 
            className="border border-border bg-card rounded-xl overflow-hidden transition-all hover:border-primary/50"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between group"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                    q.difficulty === "beginner" ? "bg-green-500/10 text-green-500" : 
                    q.difficulty === "intermediate" ? "bg-yellow-500/10 text-yellow-500" : 
                    "bg-red-500/10 text-red-500"
                  )}>
                    {q.difficulty}
                  </span>
                  {q.companyFrequency > 0 && (
                    <span className="text-xs text-muted-foreground">
                      Seen in {q.companyFrequency} companies
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {q.question}
                </span>
              </div>
              {openIndex === index ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-6 pt-2 border-t border-border bg-secondary/20">
                <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed">
                  {q.answer}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {q.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 text-[10px] font-medium border border-zinc-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
