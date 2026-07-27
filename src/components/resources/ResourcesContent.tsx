"use client";

import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { 
  Sparkles, BookOpen, ExternalLink, Code2, Layers, 
  Award, FileText, ArrowRight, Star, TrendingUp, CheckCircle, ShieldCheck 
} from "lucide-react";
import { learningCollections } from "@/data/learningCollections";

export function ResourcesContent() {
  const [collections, setCollections] = useState(learningCollections);

  return (
    <div className="py-12 md:py-20 bg-background text-foreground space-y-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Developer Hub Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" /> StackForge Developer Operating System
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Developer Hub & Learning Engine</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Interconnected learning paths, quality-ranked documentation, live GitHub portfolio tools, and curated developer collections.
          </p>
        </div>

        {/* Section 1: Continue Learning & Recommended For You */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" /> Active Learning Node
              </h2>
              <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-medium">
                In Progress
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Full-Stack Next.js 15 & System Design</h3>
              <p className="text-sm text-muted-foreground">
                Connected Step: Lesson → Server Actions → Cheatsheet → Real-time Editor Project → Interview Practice
              </p>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <NextLink
                href="/learn/nextjs/overview"
                className="px-4 py-2 bg-primary text-primary-foreground font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
              >
                Resume Next Step <ArrowRight className="w-4 h-4" />
              </NextLink>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" /> Recommended For You
            </h2>
            <div className="space-y-3">
              <NextLink
                href="/projects/realtime-collab-editor"
                className="block p-3 rounded-xl bg-secondary/50 border border-border/60 hover:border-primary/50 transition-colors group"
              >
                <div className="text-xs font-bold group-hover:text-primary transition-colors">Real-time CRDT Editor Project</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Based on your recent React state diagnostic</div>
              </NextLink>

              <NextLink
                href="/interview"
                className="block p-3 rounded-xl bg-secondary/50 border border-border/60 hover:border-primary/50 transition-colors group"
              >
                <div className="text-xs font-bold group-hover:text-primary transition-colors">System Design Mock Interview</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Practice webhooks & queue architecture</div>
              </NextLink>
            </div>
          </div>
        </div>

        {/* Section 2: Curated Learning Collections */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" /> Curated Learning Collections
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Multi-asset learning tracks grouping lessons, articles, projects, and interview questions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((col) => (
              <div key={col.id} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all space-y-4 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{col.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{col.description}</p>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-foreground">{col.itemCount} Learning Assets</span>
                  <NextLink
                    href={`/collections/${col.slug}`}
                    className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    View Track <ArrowRight className="w-3.5 h-3.5" />
                  </NextLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Official Reference Documentation & GitHub Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Official Docs */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> Verified Official Documentation
            </h2>
            <div className="space-y-3">
              {[
                { name: "React 19 Official Documentation", url: "https://react.dev", tag: "Quality Score: 100" },
                { name: "Next.js 15 App Router & Server Actions", url: "https://nextjs.org/docs", tag: "Quality Score: 100" },
                { name: "TypeScript Handbook & Specs", url: "https://www.typescriptlang.org/docs/", tag: "Quality Score: 98" },
                { name: "MDN Web Docs Specifications", url: "https://developer.mozilla.org", tag: "Quality Score: 96" },
              ].map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-secondary/50 border border-border/60 flex items-center justify-between hover:border-primary/50 transition-all group"
                >
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {doc.name} <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {doc.tag}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* GitHub Open Source Projects */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" /> Featured Open-Source Projects
            </h2>
            <div className="space-y-3">
              {[
                { name: "vercel/next.js", stars: "141,152", lang: "TypeScript", url: "https://github.com/vercel/next.js" },
                { name: "facebook/react", stars: "228,400", lang: "JavaScript", url: "https://github.com/facebook/react" },
                { name: "prisma/prisma", stars: "39,800", lang: "TypeScript", url: "https://github.com/prisma/prisma" },
                { name: "supabase/supabase", stars: "73,200", lang: "TypeScript", url: "https://github.com/supabase/supabase" },
              ].map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-secondary/50 border border-border/60 flex items-center justify-between hover:border-primary/50 transition-all group"
                >
                  <div>
                    <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                      {repo.name} <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{repo.lang}</div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    ★ {repo.stars}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
