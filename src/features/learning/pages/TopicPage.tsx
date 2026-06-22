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
import { ProjectGuide } from "../components/ProjectGuide";
import { useTopicProgress } from "../hooks/useTopicProgress";
import { projectService } from "../services/projectService";
import { Project } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckCircle2 } from "lucide-react";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
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

      <div className="grid gap-16">
        <LearningSection 
          whatIsIt={content.whatIsIt} 
          whyItMatters={content.whyItMatters}
        />

        <div className="space-y-8">
          <SectionHeader title="Core Concepts & Syntax" description="The essential building blocks of this topic." />
          <SyntaxSection 
            title={`${topic.title} Syntax`}
            syntax={content.syntax} 
          />
          <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed p-6 rounded-2xl bg-card border border-border">
            {content.explanation}
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-xl font-semibold text-foreground">Practical Implementations</h4>
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
          <SectionHeader title="Apply Your Knowledge" description="Move from theory to practice with these challenges." />
          <div className="grid gap-6">
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

        <div className="space-y-8">
          <SectionHeader title="Mini Project" description="Build a real-world application implementing these concepts." />
          {(projectService.getProjectsForTopic(topic.id) as any[]).map(project => (
             <ProjectGuide 
                key={project.id}
                title={project.title}
                requirements={project.requirements || []}
                techStack={project.techStack || []}
                features={project.features || []}
                folderStructure={project.folderStructure || "No structure provided."}
                implementationGuide={project.implementationGuide || "Follow the requirements to build this project."}
                expectedOutput={project.expectedOutput || "A fully functional application meeting all requirements."}
             />
          ))}
        </div>

        <CheatsheetSection 
          title={`${topic.title} Cheatsheet`} 
          cheatsheet={content.cheatsheet} 
          topicSlug={topic.slug} 
        />

        <div className="p-8 rounded-3xl bg-card border border-border space-y-4">
          <h3 className="text-2xl font-bold">Topic Summary</h3>
          <p className="text-muted-foreground leading-relaxed">
            By completing this topic, you have mastered {topic.title}. You can now implement these patterns in real-world projects and handle common edge cases encountered in production.
          </p>
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" /> Ready for the next topic?
          </div>
        </div>

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
