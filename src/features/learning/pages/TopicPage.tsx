"use client";

import React, { useEffect } from "react";
import { TopicHero } from "../components/TopicHero";

import { LearningSection } from "../components/LearningSection";
import { SyntaxSection } from "../components/SyntaxSection";
import { ExampleSection } from "../components/ExampleSection";
import { PracticeSection } from "../components/PracticeSection";
import { QuizSection } from "../components/QuizSection";
import { InterviewSection } from "../components/InterviewSection";
import { CheatsheetSection } from "../components/CheatsheetSection";
import { ResourcesSection } from "../components/ResourcesSection";
import { ListSection } from "../components/ListSection";
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
  const { progress, markTopicComplete, updateQuizScore, completeChallenge } = useTopicProgress(topic.id);

  useEffect(() => {
    async function logAccess() {
      try {
        await fetch('/api/learning/topic/access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topicId: topic.id })
        });
      } catch (e) {
        console.error("Error logging topic access:", e);
      }
    }
    logAccess();
  }, [topic.id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <TopicHero topic={topic} />

      <div className="grid gap-12">
        <LearningSection 
          whatIsIt={content.whatIsIt} 
          whyItMatters={content.whyItMatters}
        />

        <SyntaxSection 
          title={`${topic.title} Syntax`}
          syntax={content.syntax} 
        />

        <div className="space-y-8">
          <h4 className="text-xl font-semibold text-foreground">Practical Examples</h4>
          <div className="grid gap-6">
            {examples.map((example) => (
              <ExampleSection 
                key={example.id} 
                title={example.title}
                code={example.code}
                output={example.output}
                explanation={example.explanation}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ListSection 
            title="Best Practices"
            items={content.bestPractices}
            type="best-practice"
          />
          <ListSection 
            title="Common Mistakes"
            items={content.commonMistakes}
            type="common-mistake"
          />
        </div>

        <div className="space-y-8">
          <h4 className="text-xl font-semibold text-foreground">Practice Challenges</h4>
          {challenges.map((challenge) => (
            <PracticeSection 
              key={challenge.id}
              challengeId={challenge.id}
              title={challenge.title}
              description={challenge.description}
              hints={challenge.hints}
              expectedOutput={challenge.expectedOutput}
              solution={challenge.solution}
              onComplete={completeChallenge}
            />
          ))}
        </div>

        <div className="space-y-8">
          <h4 className="text-xl font-semibold text-foreground">Knowledge Check</h4>
          {quizzes.map((quiz) => (
            <QuizSection 
              key={quiz.id}
              quizId={quiz.id}
              title={quiz.title}
              questions={quiz.questions || []}
              onComplete={updateQuizScore}
            />
          ))}
        </div>

        <InterviewSection 
          questions={interviews} 
        />

        <CheatsheetSection 
          title={`${topic.title} Cheatsheet`} 
          cheatsheet={content.cheatsheet} 
          topicSlug={topic.slug} 
        />

        <ResourcesSection 
          resources={topic.resources || []} 
        />
      </div>

      <div className="flex justify-center pt-12">
        <Button 
          onClick={() => markTopicComplete(!progress.completed)}
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
