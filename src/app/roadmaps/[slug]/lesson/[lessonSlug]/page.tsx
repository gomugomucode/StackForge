"use client";

import { useParams } from "next/navigation";
import { roadmaps } from "@/data/roadmaps";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import NextLink from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, AlertCircle, Code, ExternalLink, CheckCircle } from "lucide-react";

export default function LessonPage() {
  const params = useParams();
  const roadmap = roadmaps.find((r) => r.slug === params.slug);
  
  if (!roadmap) return <div className="text-center py-20">Roadmap not found</div>;

  // Find the lesson across all modules
  let currentLesson = null;
  let prevLesson = null;
  let nextLesson = null;
  let moduleTitle = "";

  for (const module of roadmap.modules) {
    const idx = module.lessons.findIndex(l => l.slug === params.lessonSlug);
    if (idx !== -1) {
      currentLesson = module.lessons[idx];
      moduleTitle = module.title;
      prevLesson = idx > 0 ? module.lessons[idx - 1] : null;
      nextLesson = idx < module.lessons.length - 1 ? module.lessons[idx + 1] : null;
      break;
    }
  }

  if (!currentLesson) return <div className="text-center py-20">Lesson not found</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
      {/* Navigation Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <NextLink href={`/roadmaps/${roadmap.slug}`} className="hover:text-primary transition-colors">Roadmaps</NextLink>
        <span>/</span>
        <NextLink href={`/roadmaps/${roadmap.slug}`} className="hover:text-primary transition-colors">{roadmap.title}</NextLink>
        <span>/</span>
        <span className="text-foreground font-medium">{moduleTitle}</span>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight">{currentLesson.title}</h1>
          <p className="text-xl text-muted-foreground">{currentLesson.description}</p>
        </div>

        {/* Lesson Content Sections */}
        <div className="space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
              <BookOpen className="w-4 h-4" /> What is it?
            </div>
            <p className="text-lg leading-relaxed">{currentLesson.whatIsIt}</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
              <Target className="w-4 h-4" /> Why it Matters
            </div>
            <p className="text-lg leading-relaxed">{currentLesson.whyItMatters}</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
              <Code className="w-4 h-4" /> Syntax & Declaration
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-border font-mono text-sm">
                <p className="text-muted-foreground mb-2 text-xs uppercase">Syntax</p>
                <pre className="whitespace-pre-wrap">{currentLesson.syntax}</pre>
              </div>
              <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-border font-mono text-sm">
                <p className="text-muted-foreground mb-2 text-xs uppercase">Declaration</p>
                <pre className="whitespace-pre-wrap">{currentLesson.declaration}</pre>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
              <Code className="w-4 h-4" /> Example Implementation
            </div>
            <div className="p-6 rounded-xl bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto border border-gray-700 shadow-2xl">
              <pre className="whitespace-pre-wrap">{currentLesson.example}</pre>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-xs">
              <AlertCircle className="w-4 h-4" /> Common Mistakes
            </div>
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-800 dark:text-red-300">
              <p>{currentLesson.commonMistakes}</p>
            </div>
          </section>

          <section className="space-y-4 p-6 rounded-2xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
              <Target className="w-4 h-4" /> Practice Task
            </div>
            <p className="text-lg font-medium">{currentLesson.practiceTask}</p>
            <Button variant="primary" className="gap-2" asChild>
              <NextLink href="/projects/sandbox">Open Playground <ExternalLink className="w-4 h-4" /></NextLink>
            </Button>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase tracking-wider text-xs">
              <BookOpen className="w-4 h-4" /> Additional Resources
            </div>
            <div className="flex flex-wrap gap-2">
              {currentLesson.resources.map(res => (
                <Button key={res} variant="outline" size="sm" className="text-xs">
                  {res}
                </Button>
              ))}
            </div>
          </section>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-12 border-t border-border">
          {prevLesson ? (
            <Button variant="outline" className="gap-2" asChild>
              <NextLink href={`/roadmaps/${roadmap.slug}/lesson/${prevLesson.slug}`}>
                <ChevronLeft className="w-4 h-4" /> Previous Lesson
              </NextLink>
            </Button>
          ) : <div />}
          
          <Button variant="primary" className="gap-2" asChild>
            <NextLink href={`/roadmaps/${roadmap.slug}/quiz`}>
              Take Module Quiz <CheckCircle className="w-4 h-4" />
            </NextLink>
          </Button>

          {nextLesson ? (
            <Button variant="outline" className="gap-2" asChild>
              <NextLink href={`/roadmaps/${roadmap.slug}/lesson/${nextLesson.slug}`}>
                Next Lesson <ChevronRight className="w-4 h-4" />
              </NextLink>
            </Button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

function Target({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
