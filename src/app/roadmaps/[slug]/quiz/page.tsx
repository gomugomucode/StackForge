"use client";

import { useParams } from "next/navigation";
import { roadmaps } from "@/data/roadmaps";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Trophy, BookOpen } from "lucide-react";

export default function RoadmapQuizPage() {
  const params = useParams();
  const roadmap = roadmaps.find((r) => r.slug === params.slug);

  if (!roadmap || !roadmap.finalExam) {
    return <div className="text-center py-20">Quiz not available for this roadmap</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto">
          <Trophy className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-4xl font-black tracking-tight">Final Certification Quiz</h1>
        <p className="text-muted-foreground text-lg">Prove your mastery of {roadmap.title} and earn your certificate.</p>
      </div>

      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-border shadow-xl space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm font-medium">
            <BookOpen className="w-4 h-4" /> {roadmap.finalExam.questions.length} Questions
          </div>
          <div className="text-sm font-bold text-primary">Passing Score: {roadmap.finalExam.passingScore}%</div>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-blue-800 dark:text-blue-300 text-sm">
            Once you start, you cannot pause the timer. Make sure you're ready!
          </div>
          
          <Button variant="primary" size="lg" className="w-full py-8 text-xl font-bold">
            Start Exam Now
          </Button>
        </div>
      </div>
    </div>
  );
}
