"use client";

import { useParams } from "next/navigation";
import { roadmaps } from "@/data/roadmaps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Target, MessageCircle, Lightbulb } from "lucide-react";

export default function RoadmapInterviewPage() {
  const params = useParams();
  const roadmap = roadmaps.find((r) => r.slug === params.slug);

  if (!roadmap) return <div className="text-center py-20">Roadmap not found</div>;

  const levels = [
    { id: 'beginner', title: 'Beginner', desc: 'Core concepts and basic syntax', color: 'bg-green-500' },
    { id: 'intermediate', title: 'Intermediate', desc: 'Practical application and design patterns', color: 'bg-blue-500' },
    { id: 'advanced', title: 'Advanced', desc: 'Complex architecture and optimization', color: 'bg-purple-500' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
          <Target className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-4xl font-black tracking-tight">Interview Preparation</h1>
        <p className="text-muted-foreground text-lg">Master the most common questions for {roadmap.title}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((lvl) => (
          <div key={lvl.id} className="p-6 rounded-2xl border border-border bg-card space-y-4 hover:border-primary/50 transition-colors group">
            <div className={`w-3 h-3 rounded-full ${lvl.color} mb-4`} />
            <h3 className="text-xl font-bold">{lvl.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{lvl.desc}</p>
            <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-white transition-all">
              <MessageCircle className="w-4 h-4" /> View Questions
            </Button>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold">Pro Tip: Mock Interviews</h3>
        </div>
        <p className="text-muted-foreground">Don't just read the answers. Try to explain them out loud or use our AI Mock Interview tool to get real-time feedback.</p>
        <Button variant="primary" className="gap-2">
          Try AI Mock Interview
        </Button>
      </div>
    </div>
  );
}
