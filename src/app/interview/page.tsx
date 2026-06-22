"use client";

import React, { useState } from "react";
import { interviewCategories } from "@/data/interviews";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import NextLink from "next/link";
import { 
  Search, 
  Trophy, 
  Building2, 
  BarChart3, 
  ArrowRight, 
  Filter, 
  BookOpen 
} from "lucide-react";

export default function InterviewHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const companies = ["Google", "Meta", "Amazon", "Microsoft", "Netflix"];

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* HERO SECTION */}
      <div className="relative p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-purple-500/10 border border-border overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
            <Trophy className="w-4 h-4" /> Career Accelerator
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">
            Master the <span className="gradient-text">Technical Interview</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Stop guessing what companies ask. Access curated interview questions, 
            detailed answers, and FAANG-level patterns for every technology in your roadmap.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <NextLink href="/roadmaps">Start a Roadmap <ArrowRight className="w-4 h-4" /></NextLink>
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              Mock Interview <BookOpen className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
      </div>

      {/* FILTERS & SEARCH */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-card border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search questions, patterns or companies..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center gap-2 mr-4 text-muted-foreground text-xs font-bold uppercase tracking-wider">
            <Filter className="w-3 h-3" /> Difficulty
          </div>
          {difficulties.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedDifficulty === d 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* CATEGORIES COLUMN */}
        <div className="lg:col-span-1 space-y-8">
          <SectionHeader 
            title="Technologies" 
            description="Browse questions by domain" 
            align="left"
          />
          <div className="flex flex-col gap-3">
            {interviewCategories.map(cat => (
              <NextLink 
                key={cat.id} 
                href={`/interview/${cat.slug}`}
                className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/50 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{cat.title}</h4>
                    <p className="text-xs text-muted-foreground">{cat.questions.length} Questions</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </NextLink>
            ))}
          </div>
        </div>

        {/* TRENDING / COMPANY COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          <SectionHeader 
            title="Company Patterns" 
            description="Focus on the high-frequency questions asked by top tech companies." 
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map(company => (
              <div key={company} className="p-6 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-secondary text-muted-foreground group-hover:text-primary transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">{company}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Explore common patterns, system design questions, and behavioral cues for {company} interviews.
                </p>
                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                  <NextLink href={`/interview/search?company=${company}`}>
                    View {company} Questions <ArrowRight className="w-3 h-3" />
                  </NextLink>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
