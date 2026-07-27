"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface InterviewQuestion {
  question: string;
  answer: string;
  hint?: string;
  followUp?: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "faang";
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
    <section className="space-y-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <MessageSquare className="w-4.5 h-4.5" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Interview Preparation</h3>
      </div>

      <div className="grid gap-3">
        {questions.map((q, index) => (
          <Card 
            key={index} 
            variant="default"
            padding="none"
            className="overflow-hidden transition-all hover:border-primary/50"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-5 py-3.5 text-left flex items-center justify-between group"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      q.difficulty === "beginner" ? "success" : 
                      q.difficulty === "intermediate" ? "warning" : 
                      q.difficulty === "faang" ? "info" : 
                      "danger"
                    }
                  >
                    {q.difficulty}
                  </Badge>
                  {q.companyFrequency > 0 && (
                    <span className="text-[11px] text-muted-foreground">
                      Seen in {q.companyFrequency} companies
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {q.question}
                </span>
              </div>
              {openIndex === index ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
            
            {openIndex === index && (
              <div className="px-5 pb-5 pt-3 border-t border-border/60 bg-secondary/30 space-y-3">
                <div className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {q.answer}
                </div>
                
                {q.hint && (
                  <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs">
                    <strong>💡 Hint:</strong> {q.hint}
                  </div>
                )}
                
                {q.followUp && (
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs">
                    <strong>🔄 Follow-up:</strong> {q.followUp}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {q.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
