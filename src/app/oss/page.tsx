"use client";

import React from "react";
import { GitBranch, ExternalLink, Sparkles, Award, Star, Code2 } from "lucide-react";
import { openSourceOpportunities } from "@/data/openSourceHub";

export default function OpenSourceHubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
          <GitBranch className="w-3.5 h-3.5" /> StackForge Open Source Hub
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Open Source & Hackathon Discovery</h1>
        <p className="text-base text-muted-foreground">
          Discover verified Good First Issues, global hackathons, and open-source mentorship opportunities to build your engineering portfolio.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {openSourceOpportunities.map((item) => (
          <div key={item.id} className="p-6 rounded-2xl border border-border bg-card space-y-4 hover:border-primary/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full">
                  {item.type.replace(/_/g, " ")}
                </span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {item.stars.toLocaleString()}
                </span>
              </div>

              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h2>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> Repository: <span className="text-foreground">{item.repository}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.labels.map((lbl, idx) => (
                  <span key={idx} className="text-[10px] bg-secondary text-muted-foreground border border-border px-2 py-0.5 rounded-md">
                    {lbl}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/40">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                View Opportunity <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
