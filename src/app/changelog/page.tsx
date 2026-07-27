"use client";

import React from "react";
import { Sparkles, ShieldCheck, Zap, GitBranch, Terminal, Award } from "lucide-react";

export default function ChangelogPage() {
  const releases = [
    {
      version: "v11.0.0",
      date: "July 2026",
      title: "Market Readiness & Product Validation",
      tag: "Major Release",
      highlights: [
        "Purged all mock data across AI Tutor, Sandbox runner, and project evaluations.",
        "Integrated Spaced Repetition knowledge decay algorithm (Ebbinghaus curve).",
        "Added multi-dimensional GitHub project analysis with CI/CD and security audit.",
        "Launched in-app Notification Center and global Cmd+K search.",
      ],
    },
    {
      version: "v10.0.0",
      date: "July 2026",
      title: "Production Infrastructure & Observability",
      tag: "Platform Upgrade",
      highlights: [
        "Prisma ORM schema extensions for CMS content versioning and audit logs.",
        "Server-side RBAC role enforcement and token bucket API rate-limiting.",
        "Public recruiter proof-of-work profile pages (/p/[username]).",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 max-w-4xl mx-auto space-y-10">
      <div className="space-y-3 text-center md:text-left border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-xs font-semibold text-sky-400">
          <Sparkles className="w-3.5 h-3.5" /> StackForge Release Notes
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Platform Changelog</h1>
        <p className="text-base text-slate-400">
          Track continuous feature improvements, security enhancements, and content releases.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {releases.map((rel, idx) => (
          <div key={idx} className="relative pl-10 space-y-3">
            <div className="absolute left-2 top-1.5 w-4 h-4 bg-sky-500 rounded-full ring-4 ring-slate-950" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm font-bold text-sky-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                {rel.version}
              </span>
              <span className="text-xs text-slate-500">{rel.date}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                {rel.tag}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">{rel.title}</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {rel.highlights.map((h, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2">
                  <span className="text-sky-400 mt-1">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
