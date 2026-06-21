"use client";

import React from "react";
import { TopicHero } from "../components/TopicHero";
import { LearningSection } from "../components/LearningSection";
import { SyntaxSection } from "../components/SyntaxSection";
import { ExampleSection } from "../components/ExampleSection";
import { PracticeSection } from "../components/PracticeSection";
import { QuizSection } from "../components/QuizSection";
import { InterviewSection } from "../components/InterviewSection";
import { CheatsheetSection } from "../components/CheatsheetSection";
import { useTopicProgress } from "../hooks/useTopicProgress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { 
  Topic, 
  TopicContent, 
  TopicExample, 
  Challenge, 
  Quiz, 
  InterviewQuestion 
} from "@/features/content/types";

interface TopicPageProps {
  topic: Topic;
  content: TopicContent;
  examples: TopicExample[];
  challenges: Challenge[];
  quizzes: Quiz[];
  interviews: InterviewQuestion[];
}

export function TopicPage({ 
  topic, 
  content, 
  examples, 
  challenges, 
  quizzes, 
  interviews 
}: TopicPageProps) {
  const { progress, markAsCompleted } = useTopicProgress(topic.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <TopicHero topic={topic} />

      <div className="grid gap-12">
        <LearningSection 
          overview={content.overview} 
          explanation={content.explanation}
        />

        <SyntaxSection 
          syntax={content.syntax} 
        />

        <div className="space-y-8">
          <h4 className="text-xl font-semibold text-foreground">Practical Examples</h4>
          <div className="grid gap-6">
            {examples.map((example) => (
              <ExampleSection 
                key={example.id} 
                example={example} 
              />
            ))}
          </div>
        </div>

        <PracticeSection 
          challenges={challenges} 
        />

        <QuizSection 
          quizzes={quizzes} 
        />

        <InterviewSection 
          questions={interviews} 
        />

        <CheatsheetSection 
          title={`${topic.title} Cheatsheet`} 
          content={content.overview + "\n\n" + content.explanation} 
          topicSlug={topic.slug} 
        />
      </div>

      <div className="flex justify-center pt-12">
        <Button 
          onClick={() => markAsCompleted(topic.id)}
          disabled={progress.completed}
          className={cn(
            "px-8 py-6 rounded-full text-lg font-bold transition-all",
            progress.completed 
              ? "bg-green-500/20 text-green-500 cursor-not-allowed" 
              : "bg-primary text-white hover:scale-105 active:scale-95"
          )}
        >
          {progress.completed ? "Topic Completed ✓" : "Mark Topic as Completed"}
        </Button>
      </div>
    </div>
  );
}
