"use client";

import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { 
  Briefcase, Award, CheckCircle2, TrendingUp, DollarSign, 
  Building2, Target, ArrowRight, ShieldCheck, FileText, Code2, Sparkles 
} from "lucide-react";

export default function CareerModePage() {
  const [readiness, setReadiness] = useState({
    overallScore: 86,
    skillScore: 90,
    projectScore: 88,
    githubScore: 85,
    interviewScore: 80,
    resumeScore: 88,
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
          <Briefcase className="w-3.5 h-3.5" /> StackForge Career Acceleration Engine
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Career Mode & Hiring Diagnostics</h1>
        <p className="text-base text-muted-foreground">
          Real-time hiring probability, technical skill radar, ATS resume scoring, and recruiter conversion evidence.
        </p>
      </div>

      {/* Grid: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Overall Hiring Score</div>
          <div className="text-3xl font-extrabold text-primary flex items-center gap-2">
            {readiness.overallScore} <span className="text-xs text-emerald-400 font-semibold">/ 100</span>
          </div>
          <div className="text-[11px] text-muted-foreground">Candidate-ready for Tier 1 tech roles</div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ATS Resume Match</div>
          <div className="text-3xl font-extrabold text-foreground flex items-center gap-2">
            {readiness.resumeScore}%
          </div>
          <div className="text-[11px] text-muted-foreground">Strict keyword match & technical depth</div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Project Architecture</div>
          <div className="text-3xl font-extrabold text-foreground flex items-center gap-2">
            {readiness.projectScore}%
          </div>
          <div className="text-[11px] text-muted-foreground">Verified multi-dimensional code reviews</div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">GitHub Evidence</div>
          <div className="text-3xl font-extrabold text-foreground flex items-center gap-2">
            {readiness.githubScore}%
          </div>
          <div className="text-[11px] text-muted-foreground">Commit frequency & open source activity</div>
        </div>
      </div>

      {/* Middle Section: Skill Radar & Target Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skill Radar */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" /> Technical Skill Radar & Competency
          </h2>
          <div className="space-y-4">
            {[
              { skill: "React 19 & Next.js 15 App Router", pct: 92, status: "Mastery" },
              { skill: "TypeScript Strict Generics", pct: 88, status: "Advanced" },
              { skill: "PostgreSQL & Prisma Database Schema", pct: 85, status: "Advanced" },
              { skill: "System Design & Webhook Queues", pct: 78, status: "Intermediate" },
              { skill: "WebSockets & CRDT Real-time Sync", pct: 82, status: "Advanced" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-foreground">{item.skill}</span>
                  <span className="text-primary font-bold">{item.pct}% ({item.status})</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Companies & Salary */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-500" /> Target Companies
          </h2>
          <div className="space-y-3">
            {["Vercel", "Supabase", "Linear", "Stripe", "Airbnb"].map((comp, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-secondary/50 border border-border/60 flex items-center justify-between text-xs font-bold text-foreground">
                <span>{comp}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  90%+ Match
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border/40 space-y-2">
            <div className="text-xs font-bold text-muted-foreground flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Estimated Market Value
            </div>
            <div className="text-2xl font-extrabold text-foreground">$135,000 - $165,000 / yr</div>
            <div className="text-[11px] text-muted-foreground">Based on Senior Full-Stack Engineer market benchmarks</div>
          </div>
        </div>
      </div>

      {/* Recruiter Callout */}
      <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Recruiter-Verified Profile Active
          </h3>
          <p className="text-xs text-muted-foreground">Your verified evidence profile is available for employer review.</p>
        </div>
        <NextLink
          href="/p/developer"
          className="px-5 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
        >
          View Public Profile <ArrowRight className="w-4 h-4" />
        </NextLink>
      </div>
    </div>
  );
}
