import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HelpCircle, BrainCircuit, Sparkles, CheckCircle2, ArrowRight, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { tokens } from "@/lib/tokens";

export const metadata = {
  title: "Quizzes & Knowledge Checks | StackForge",
  description: "Test your skills with interactive developer quizzes, conceptual knowledge checks, and instant answer evaluations across JavaScript, Python, React, and DevOps.",
};

const DEFAULT_QUIZZES = [
  {
    id: "quiz-js-fundamentals",
    title: "JavaScript Engine & Async Mechanics",
    description: "Test your understanding of the Event Loop, Promises, Closures, and Execution Contexts.",
    difficulty: "Intermediate",
    category: "JavaScript",
    questionCount: 10,
    xpReward: 150,
    slug: "javascript",
  },
  {
    id: "quiz-react-hooks",
    title: "React Server Components & State Synchronization",
    description: "Evaluate your mastery over React 19 hooks, hydration rules, useMemo optimization, and RSC boundaries.",
    difficulty: "Advanced",
    category: "React",
    questionCount: 12,
    xpReward: 200,
    slug: "react",
  },
  {
    id: "quiz-python-mastery",
    title: "Python Data Structures & Memory Model",
    description: "Deep dive into list comprehensions, generators, decorators, and Python object reference semantics.",
    difficulty: "Beginner",
    category: "Python",
    questionCount: 8,
    xpReward: 100,
    slug: "python",
  },
  {
    id: "quiz-typescript-generics",
    title: "TypeScript Type System & Conditional Types",
    description: "Verify your ability to write type-safe generics, utility types, and infer expressions.",
    difficulty: "Advanced",
    category: "TypeScript",
    questionCount: 10,
    xpReward: 180,
    slug: "typescript",
  },
  {
    id: "quiz-devops-containers",
    title: "Docker Containerization & Kubernetes Basics",
    description: "Challenge your knowledge on Dockerfiles, multi-stage builds, volume management, and container networking.",
    difficulty: "Intermediate",
    category: "DevOps",
    questionCount: 10,
    xpReward: 160,
    slug: "devops",
  },
  {
    id: "quiz-sql-databases",
    title: "SQL Indexing, Joins & Query Optimization",
    description: "Master relational query performance, ACID transactions, B-Tree indexes, and complex JOINs.",
    difficulty: "Intermediate",
    category: "PostgreSQL",
    questionCount: 10,
    xpReward: 150,
    slug: "sql",
  },
];

async function getQuizzesData() {
  try {
    const dbQuizzes = await prisma.quiz.findMany({
      take: 12,
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        type: true,
      },
    });

    if (!dbQuizzes || dbQuizzes.length === 0) {
      return DEFAULT_QUIZZES;
    }

    return dbQuizzes.map((q: { id: string; title: string; description: string | null; difficulty: string | null; type: string | null }) => ({
      id: q.id,
      title: q.title,
      description: q.description || "Master core concepts with instant validation.",
      difficulty: q.difficulty || "Intermediate",
      category: q.type || "General",
      questionCount: 10,
      xpReward: 150,
      slug: "javascript",
    }));
  } catch (error) {
    console.error("Error fetching quizzes data from database:", error);
    return DEFAULT_QUIZZES;
  }
}

export default async function QuizzesPage() {
  const quizzes = await getQuizzesData();

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-secondary border border-border p-8 sm:p-12">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              Interactive Skill Checks
            </div>

            <h1 className={tokens.typography.display}>
              Validate Your Knowledge with Targeted Quizzes
            </h1>

            <p className={tokens.typography.bodyLarge}>
              Short, high-density quizzes designed to test your mental model of key software concepts. Earn XP, track progress, and solidify your understanding before building projects.
            </p>
          </div>

          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="md" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <p className={tokens.typography.caption}>Available Quizzes</p>
              <p className="text-2xl font-bold text-foreground">{quizzes.length}+ Modules</p>
            </div>
          </Card>

          <Card padding="md" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className={tokens.typography.caption}>Instant Feedback</p>
              <p className="text-2xl font-bold text-foreground">Server-side Eval</p>
            </div>
          </Card>

          <Card padding="md" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className={tokens.typography.caption}>Gamified Rewards</p>
              <p className="text-2xl font-bold text-foreground">+100-200 XP</p>
            </div>
          </Card>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz: typeof DEFAULT_QUIZZES[number]) => (
            <Card key={quiz.id} variant="interactive" padding="lg" className="flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {quiz.category}
                  </Badge>
                  <Badge variant={
                    quiz.difficulty === "Beginner" ? "success" : 
                    quiz.difficulty === "Intermediate" ? "secondary" : 
                    "danger"
                  }>
                    {quiz.difficulty}
                  </Badge>
                </div>

                <h3 className={`${tokens.typography.h3} group-hover:text-primary transition-colors`}>
                  {quiz.title}
                </h3>
                <p className={`${tokens.typography.body} line-clamp-3`}>
                  {quiz.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    {quiz.questionCount} Questions
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    +{quiz.xpReward} XP
                  </span>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  <Link href={`/roadmaps/${quiz.slug}`}>
                    <span>Start Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
