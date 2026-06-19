"use client";

import { useParams } from "next/navigation";
import { roadmaps } from "@/data/roadmaps";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "lucide-react"; // Not quite right, using next/link
import NextLink from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Target, Download, FileText } from "lucide-react";

export default function RoadmapPage() {
  const params = useParams();
  const roadmap = roadmaps.find((r) => r.slug === params.slug);

  if (!roadmap) {
    return <div className="container mx-auto px-4 py-20 text-center">Roadmap not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-purple-500/10 border border-border overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-wider text-sm">
            <span className="px-2 py-1 rounded bg-primary/10">{roadmap.category}</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight">{roadmap.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{roadmap.overview}</p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" size="lg" asChild>
              <NextLink href={`/roadmaps/${roadmap.slug}/modules`}>Start Learning</NextLink>
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Download className="w-4 h-4" /> Download PDF
            </Button>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content: Modules */}
        <div className="lg:col-span-2 space-y-8">
          <SectionHeader 
            title="Learning Path" 
            description="Master these modules in order to become an expert." 
          />
          
          <div className="space-y-6">
            {roadmap.modules.map((module, mIdx) => (
              <div key={module.slug} className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-border shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {mIdx + 1}
                  </div>
                  <h3 className="text-lg font-bold">{module.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{module.description}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 pl-11">
                  {module.lessons.map((lesson) => (
                    <NextLink 
                      key={lesson.slug} 
                      href={`/roadmaps/${roadmap.slug}/lesson/${lesson.slug}`}
                      className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-primary transition-colors" />
                        <span className="font-medium group-hover:text-primary transition-colors">{lesson.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </NextLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Resources & Tools */}
        <div className="space-y-8">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Roadmap Resources
            </h3>
            <div className="space-y-3">
              <NextLink 
                href={`/roadmaps/${roadmap.slug}/cheatsheet`}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Quick Cheatsheet</span>
              </NextLink>
              <NextLink 
                href={`/roadmaps/${roadmap.slug}/interview`}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <Target className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Interview Questions</span>
              </NextLink>
              <NextLink 
                href={`/roadmaps/${roadmap.slug}/quiz`}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <BookOpen className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Knowledge Quiz</span>
              </NextLink>
            </div>
            <Button variant="outline" className="w-full gap-2" asChild>

              <NextLink href={`/roadmaps/${roadmap.slug}/download`}>
                <Download className="w-4 h-4" /> Export as PDF
              </NextLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
