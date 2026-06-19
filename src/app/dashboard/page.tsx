"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserStats } from "@/context/UserStatsContext";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { roadmaps } from "@/data/roadmaps";
import { Trophy, Flame, BookOpen, Layout, ArrowRight } from "lucide-react";
import NextLink from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const { xp, level, streak } = useUserStats();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Welcome back, {user?.name || "Learner"}! 👋</h1>
            <p className="text-muted-foreground text-lg">You've made incredible progress this week.</p>
          </div>
          <Button variant="primary" className="gap-2" asChild>
            <NextLink href="/roadmaps">Explore Roadmaps <ArrowRight className="w-4 h-4" /></NextLink>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="font-bold">Current Level</span>
            </div>
            <div className="text-4xl font-black">Lv. {level}</div>
            <p className="text-sm text-muted-foreground">You're in the top 15% of learners.</p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-bold">Study Streak</span>
            </div>
            <div className="text-4xl font-black">{streak} Days</div>
            <p className="text-sm text-muted-foreground">Keep it up! You're on fire.</p>
          </div>
          <div className="p-6 rounded- la-2xl border border-border bg-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold">Total XP</span>
            </div>
            <div className="text-4xl font-black">{xp.toLocaleString()} XP</div>
            <p className="text-sm text-muted-foreground">Points earned through mastery.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            <SectionHeader title="Continue Learning" description="Pick up exactly where you left off." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmaps.slice(0, 2).map((roadmap) => (
                <div key={roadmap.slug} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${roadmap.color} flex items-center justify-center`}>
                        <Layout className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold">{roadmap.title}</h3>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <NextLink href={`/roadmaps/${roadmap.slug}`}>Resume</NextLink>
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Progress</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[45%]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <SectionHeader title="Recommended" />
            <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                <p className="text-sm font-bold">New Roadmap: AI Engineer</p>
                <p className="text-xs text-muted-foreground">Learn LLMs, PyTorch and Prompt Engineering.</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <NextLink href="/roadmaps/ai">Explore</NextLink>
                </Button>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-3">
                <p className="text-sm font-bold">Daily Challenge</p>
                <p className="text-xs text-muted-foreground">Solve a React performance puzzle today.</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <NextLink href="/interview">Start Quiz</NextLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
