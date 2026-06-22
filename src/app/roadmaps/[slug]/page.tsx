"use client";

import { useParams } from "next/navigation";
import { roadmaps } from "@/data/roadmaps";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  BookOpen, 
  Target, 
  Download, 
  FileText, 
  Briefcase, 
  Zap, 
  Clock, 
  Trophy, 
  GradCap, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import { RoadmapCanvas } from "@/components/roadmaps/RoadmapCanvas";
import { ResourceCard } from "@/features/resources/components/ResourceCard";
import { resourceService } from "@/features/resources/services/resourceService";
import { projects } from "@/data/projects";
import { interviewCategories } from "@/data/interviews";
import { useEffect, useState } from "react";
import { Resource } from "@/features/resources/types/resource";
import { exportRoadmapToPDF } from "@/features/roadmaps/export/roadmapExport";

export default function RoadmapPage() {
  const params = useParams();
  const roadmap = roadmaps.find((r) => r.slug === params.slug);
  const [roadmapResources, setRoadmapResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (roadmap) {
      resourceService.getResourcesByTechnology(roadmap.slug).then(setRoadmapResources);
    }
  }, [roadmap]);

  if (!roadmap) {
    return <div className="container mx-auto px-4 py-20 text-center">Roadmap not found</div>;
  }

  // Find interview questions for this roadmap's technology
  const relevantInterviews = interviewCategories.find(cat => cat.slug === roadmap.slug);

  return (
    <div className="container mx-auto px-4 py-12 space-y-24">
      {/* 1. HERO SECTION */}
      <div className="relative p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-purple-500/10 border border-border overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-wider text-sm">
            <span className="px-2 py-1 rounded bg-primary/10">{roadmap.category}</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight">{roadmap.title}</h1>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            {roadmap.overview}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase">
                <Clock className="w-3 h-3" /> Estimated Time
              </div>
              <p className="text-lg font-bold">~6 Months</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase">
                <Zap className="w-3 h-3" /> Difficulty
              </div>
              <p className="text-lg font-bold">Intermediate</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase">
                <GradCap className="w-3 h-3" /> Career Outcome
              </div>
              <p className="text-lg font-bold">SDE-1 / Frontend</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase">
                <Trophy className="w-3 h-3" /> Avg. Salary
              </div>
              <p className="text-lg font-bold">$80k - $140k</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
      </div>

      {/* 2. LEARNING JOURNEY (ROADMAP CANVAS) */}
      <div className="space-y-8">
        <SectionHeader 
          title="The Learning Path" 
          description="A curated sequence of topics designed to take you from zero to hero. Complete each node to unlock the next." 
        />
        <RoadmapCanvas roadmap={roadmap} />
      </div>

      {/* 3. CURATED RESOURCES */}
      <div className="space-y-8">
        <SectionHeader 
          title="Curated Resources" 
          description="The best official docs, books, and practice platforms for this specific path." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapResources.length > 0 ? (
            roadmapResources.map(res => <ResourceCard key={res.id} resource={res} />)
          ) : (
            <div className="col-span-full p-12 rounded-3xl border border-dashed border-border text-center space-y-3">
              <p className="text-muted-foreground">No specific resources curated for this path yet. Check the global resources tab.</p>
              <Button variant="outline" asChild>
                <NextLink href="/resources">View All Resources</NextLink>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 4. HANDS-ON PROJECTS */}
      <div className="space-y-8">
        <SectionHeader 
          title="Capstone Projects" 
          description="Build these real-world applications to prove your skills to employers." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.filter(p => p.category.toLowerCase().includes(roadmap.slug.toLowerCase()) || roadmap.slug === 'fullstack').map(project => (
            <div key={project.id} className="p-6 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all space-y-4">
              <div className="flex justify-between items-center">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                  {project.difficulty}
                </span>
 la</div>
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-primary/5 text-primary border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                <NextLink href={`/projects/${project.slug}`}>View Requirements <ArrowRight className="w-3 h-3" /></NextLink>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. INTERVIEW PREP */}
      <div className="space-y-8">
        <SectionHeader 
          title="Interview Preparation" 
          description="Commonly asked questions in technical rounds for this roadmap." 
        />
        {relevantInterviews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relevantInterviews.questions.slice(0, 6).map((q, i) => (
              <div key={q.id} className="p-6 rounded-2xl border border-border bg-card space-y-4 hover:bg-secondary/50 transition-colors group">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                    <Target className="w-3 h-3" /> {q.difficulty}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">{q.id}</span>
                </div>
                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{q.question}</h4>
                <div className="p-4 rounded-xl bg-black/20 border border-border text-sm text-muted-foreground italic leading-relaxed">
                  {q.answer.substring(0, 150)}...
                </div>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:bg-transparent" asChild>
                  <NextLink href={`/interview/${relevantInterviews.slug}`}>View Full Answer <ArrowRight className="w-3 h-3 ml-1" /></NextLink>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl border border-dashed border-border text-center">
            <p className="text-muted-foreground">Interview questions for this path are being curated.</p>
          </div>
        )}
      </div>

      {/* 6. CHEATSHEET SUMMARY & EXPORT */}
      <div className="relative p-12 rounded-3xl bg-primary/5 border border-primary/20 space-y-8 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-wider text-sm">
              <FileText className="w-4 h-4" /> Quick Revision
            </div>
            <h2 className="text-3xl font-black">Master the Path on the Go</h2>
            <p className="text-muted-foreground">
              Get a condensed summary of all key concepts, syntax patterns, and interview tips for the {roadmap.title} roadmap.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" className="gap-2" asChild>
                <NextLink href={`/roadmaps/${roadmap.slug}/cheatsheet`}>View Full Cheatsheet <BookOpen className="w-4 h-4" /></NextLink>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2" 
                onClick={() => exportRoadmapToPDF(roadmap)}
              >
                <Download className="w-4 h-4" /> Download Roadmap PDF
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="w-64 h-48 bg-gradient-to-br from-primary to-purple-600 rounded-2xl rotate-6 shadow-2xl flex items-center justify-center p-6 text-white text-center">
              <div className="space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
                <p className="font-bold text-xl">{roadmap.title}</p>
                <p className="text-xs opacity-80">Full Certification Roadmap</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />
      </div>
    </div>
  );
}
