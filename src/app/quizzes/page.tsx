import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HelpCircle, BrainCircuit, Sparkles, CheckCircle2, ArrowRight, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

export default async function QuizzesPage() {
  let dbQuizzes: any[] = [];
  try {
    dbQuizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
        topic: {
          select: { title: true, slug: true },
        },
      },
      take: 20,
    });
  } catch (error) {
    console.warn("[Quizzes Page] DB query error, utilizing default quiz inventory:", error);
  }

  const quizzes = dbQuizzes.length > 0
    ? dbQuizzes.map((q) => ({
        id: q.id,
        title: q.title,
        description: q.description || `Interactive quiz on ${q.topic?.title || "software development"}.`,
        difficulty: q.difficulty || "Intermediate",
        category: q.topic?.title || "Fullstack",
        questionCount: q._count?.questions || 8,
        xpReward: 150,
        slug: q.topic?.slug || "frontend",
      }))
    : DEFAULT_QUIZZES;

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#15120F] text-[#2C241C] dark:text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4" />
            <span>Interactive Assessment Engine</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#2C241C] dark:text-white">
            Developer Knowledge Checks
          </h1>
          <p className="text-[#6C6257] dark:text-[#93887B] text-base sm:text-lg">
            Validate your theoretical mastery, identify knowledge gaps, and earn XP with interactive developer quizzes.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-[#1C1814] border border-[#E8E1D8] dark:border-[#383028] rounded-2xl p-6 shadow-[0_1px_3px_rgba(44,36,28,0.04)]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 dark:text-emerald-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#6C6257] dark:text-[#93887B] font-medium">Available Quizzes</p>
              <p className="text-2xl font-bold text-[#2C241C] dark:text-white">{quizzes.length}+ Modules</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 dark:text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#6C6257] dark:text-[#93887B] font-medium">Instant Feedback</p>
              <p className="text-2xl font-bold text-[#2C241C] dark:text-white">Server-side Eval</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#6C6257] dark:text-[#93887B] font-medium">Gamified Rewards</p>
              <p className="text-2xl font-bold text-[#2C241C] dark:text-white">+100-200 XP</p>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#1C1814] border border-[#E8E1D8] dark:border-[#383028] hover:border-emerald-600/40 shadow-[0_1px_3px_rgba(44,36,28,0.04)] hover:shadow-[0_4px_16px_rgba(5,150,105,0.08)] transition-all duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5F2EC] dark:bg-[#25201A] text-[#2C241C] dark:text-white border border-[#E8E1D8] dark:border-[#383028]">
                    {quiz.category}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      quiz.difficulty === "Beginner"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                        : quiz.difficulty === "Intermediate"
                        ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                        : "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20"
                    }`}
                  >
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#2C241C] dark:text-white group-hover:text-emerald-600 transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-xs text-[#6C6257] dark:text-[#93887B] line-clamp-3 leading-relaxed">
                  {quiz.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#E8E1D8] dark:border-[#383028] flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#6C6257] dark:text-[#93887B]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {quiz.questionCount} Questions
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    +{quiz.xpReward} XP
                  </span>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="py-1.5 px-3 text-xs rounded-xl border-[#E8E1D8] dark:border-[#383028] bg-transparent hover:bg-[#F5F2EC] dark:hover:bg-[#25201A] text-[#2C241C] dark:text-white transition-all gap-1.5"
                >
                  <Link href={`/roadmaps/${quiz.slug}`}>
                    <span>Start Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
