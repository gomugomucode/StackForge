"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserStats } from "@/context/UserStatsContext";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Trophy, Flame, BookOpen, Layout, ArrowRight, Award } from "lucide-react";
import NextLink from "next/link";
import { ActivityFeed } from "@/features/profile/ActivityFeed";
import { ProgressOverview } from "@/features/profile/ProgressOverview";

interface RoadmapProgress {
  id: string;
  title: string;
  progress: number;
  slug: string;
  color: string;
}

interface Certificate {
  id: string;
  roadmapName: string;
  issuedAt: string;
}

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const { xp, level, streak } = useUserStats();
  const [dashboardData, setDashboardData] = useState<{
    activeRoadmaps: RoadmapProgress[];
    certificates: Certificate[];
  }>({ activeRoadmaps: [], certificates: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch('/api/user/dashboard');
        if (res.ok) {
          const data = await res.json();
          setDashboardData({
            activeRoadmaps: data.activeRoadmaps,
            certificates: data.certificates,
          });
        }
      } catch (e) {
        console.error("Error fetching dashboard data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const displayName =
    profile?.user?.name ||
    (user?.user_metadata?.name as string | undefined) ||
    (user?.user_metadata?.username as string | undefined) ||
    user?.email?.split("@")[0] ||
    "Learner";

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Welcome back, {displayName}! 👋</h1>
            <p className="text-muted-foreground text-lg">Your learning journey is progressing beautifully.</p>
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
            <p className="text-sm text-muted-foreground">Mastery in progress.</p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-bold">Study Streak</span>
            </div>
            <div className="text-4xl font-black">{streak} Days</div>
            <p className="text-sm text-muted-foreground">Consistency is the key to mastery.</p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold">Total XP</span>
            </div>
            <div className="text-4xl font-black">{xp.toLocaleString()} XP</div>
            <p className="text-sm text-muted-foreground">Points earned through your efforts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Progress & Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProgressOverview />
              <ActivityFeed />
            </div>

            <div className="space-y-6">
              <SectionHeader title="Continue Learning" description="Pick up exactly where you left off." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                  <div className="col-span-2 space-y-4">
                    <div className="h-32 animate-pulse bg-card rounded-2xl border border-border" />
                    <div className="h-32 animate-pulse bg-card rounded-2xl border border-border" />
                  </div>
                ) : dashboardData.activeRoadmaps.length > 0 ? (
                  dashboardData.activeRoadmaps.slice(0, 2).map((roadmap) => (
                    <div key={roadmap.id} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group space-y-4">
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
                          <span>{roadmap.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${roadmap.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 p-8 rounded-2xl border border-dashed border-border text-center space-y-3">
                    <p className="text-muted-foreground">You haven't started any roadmaps yet.</p>
                    <Button variant="outline" size="sm" asChild>
                      <NextLink href="/roadmaps">Start Your Journey</NextLink>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Recommendations & Achievements */}
          <div className="space-y-8">
            <div className="space-y-6">
              <SectionHeader title="Recommended" />
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                  <p className="text-sm font-bold">AI Engineering</p>
                  <p className="text-xs text-muted-foreground">Master LLMs and PyTorch.</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <NextLink href="/roadmaps/ai">Explore</NextLink>
                  </Button>
                </div>
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-3">
                  <p className="text-sm font-bold">Daily Challenge</p>
                  <p className="text-xs text-muted-foreground">Solve today's puzzle.</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <NextLink href="/interview">Start Quiz</NextLink>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeader title="Certificates" />
              {isLoading ? (
                <div className="h-48 animate-pulse bg-card rounded-xl border border-border" />
              ) : dashboardData.certificates.length > 0 ? (
                <div className="grid gap-3">
                  {dashboardData.certificates.map(cert => (
                    <div key={cert.id} className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{cert.roadmapName}</p>
                        <p className="text-[10px] text-muted-foreground">{new Date(cert.issuedAt).toLocaleDateString()}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="p-1">
                        <NextLink href={`/verify/${cert.id}`}>
                          <ArrowRight className="w-4 h-4" />
                        </NextLink>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-border bg-card flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
                  <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold">No certificates yet</p>
                    <p className="text-xs text-muted-foreground">Complete a roadmap to earn your first professional certification.</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <NextLink href="/roadmaps">View Roadmaps</NextLink>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
