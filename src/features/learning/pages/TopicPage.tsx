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
import { VisualExplanation } from "../components/ConceptCards";
import { TopicSummary } from "../components/TopicSummary";
import { useTopicProgress } from "../hooks/useTopicProgress";
import { projectService } from "../services/projectService";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import NextLink from "next/link";
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

      <div className="grid gap-16">
        <LearningSection 
          whatIsIt={content.whatIsIt || content.overview} 
          whyItMatters={content.whyItMatters || "Essential for building scalable and maintainable applications."}
        />

        <div className="space-y-8">
          <SectionHeader title="Visual Concept Map" description="Quickly grasp the core architecture of this topic." />
          <VisualExplanation 
            concepts={[
              { title: "Core Mechanism", description: content.overview.substring(0, 100) + "...", iconType: "bulb" },
              { title: "Primary Goal", description: "Mastering this allows you to write more efficient and cleaner code.", iconType: "target" },
              { title: "Performance Impact", description: "Understanding this reduces runtime errors and improves execution speed.", iconType: "zap" },
            ]}
          />
        </div>

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
          <SectionHeader title="Practical Implementations" description="See how these concepts are applied in real-world scenarios." />
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
          <SectionHeader title="Knowledge Check" description="Verify your understanding with a quick quiz." />
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

        <div className="space-y-8">
          <SectionHeader title="Interview Preparation" description="Prepare for FAANG and technical screenings." />
          <InterviewSection 
            questions={interviews} 
          />
        </div>

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

        <div className="space-y-8">
          <SectionHeader title="Quick Reference" description="A concise cheatsheet for fast revision." />
          <CheatsheetSection 
            title={`${topic.title} Cheatsheet`} 
            cheatsheet={content.cheatsheet} 
            topicSlug={topic.slug} 
          />
        </div>

        <TopicSummary 
          title={topic.title}
          keyConcepts={content.bestPractices.slice(0, 3)} 
          thingsToRemember={content.commonMistakes.slice(0, 3)}
          bestPractices={content.bestPractices}
        />

        <div className="space-y-8">
          <SectionHeader title="Further Reading" description="Optional external resources for deep diving." />
          <ResourcesSection 
            resources={topic.resources || []} 
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 pt-12">
        <div className="flex items-center gap-4">
          {topic.nextTopics && topic.nextTopics.length > 0 && (
            <Button 
              variant="outline" 
              className="gap-2" 
              asChild
            >
              <NextLink href={`/learn/${topic.technology}/${topic.nextTopics[0]}`}>
                <ArrowLeft className="w-4 h-4" /> Previous Topic
              </NextLink>
            </Button>
          )}
          
          <Button 
            onClick={() => markTopicComplete(!progress.completed)}
            disabled={progress.completed}
            className={cn(
              "px-12 py-8 rounded-full text-xl font-bold transition-all",
              progress.completed 
                ? "bg-green-500/20 text-green-500 cursor-not-allowed" 
                : "bg-primary text-white hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
            )}
          >
            {progress.completed ? "Topic Completed ✓" : "Mark Topic as Completed"}
          </Button>

          {topic.nextTopics && topic.nextTopics.length > 0 && (
            <Button 
              variant="outline" 
              className="gap-2" 
              asChild
            >
              <NextLink href={`/learn/${topic.technology}/${topic.nextTopics[0]}`}>
                Next Topic <ArrowRight className="w-4 h-4" />
              </NextLink>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
