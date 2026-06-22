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
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Welcome Section - Full Width */}
          <div className="col-span-1 md:col-span-12 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-purple-500/10 border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight">Welcome back, {displayName}! 👋</h1>
              <p className="text-muted-foreground text-lg">Your learning journey is progressing beautifully. Keep the momentum going!</p>
            </div>
            <Button variant="primary" size="lg" className="gap-2 rounded-full px-8" asChild>
              <NextLink href="/roadmaps">Explore Roadmaps <ArrowRight className="w-4 h-4" /></NextLink>
            </Button>
          </div>

          {/* Stats Bento Row */}
          <div className="col-span-1 md:col-span-4 p-6 rounded-3xl border border-border bg-card space-y-4 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 group-hover:scale-110 transition-transform">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="font-bold text-muted-foreground">Current Level</span>
            </div>
            <div className="text-5xl font-black">Lv. {level}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-2/3" />
              </div>
              <span>66% to Lv. {level + 1}</span>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-4 p-6 rounded-3xl border border-border bg-card space-y-4 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 group-hover:scale-110 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-bold text-muted-foreground">Study Streak</span>
            </div>
            <div className="text-5xl font-black">{streak} Days</div>
            <p className="text-sm text-muted-foreground">Consistency is the key to mastery.</p>
          </div>

          <div className="col-span-1 md:col-span-4 p-6 rounded-3xl border border-border bg-card space-y-4 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-muted-foreground">Total XP</span>
            </div>
            <div className="text-5xl font-black">{xp.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Points earned through your efforts.</p>
          </div>

          {/* Main Learning Hub - Large */}
          <div className="col-span-1 md:col-span-8 space-y-6">
            <div className="p-8 rounded-3xl border border-border bg-card space-y-8">
              <div className="flex items-center justify-between">
                <SectionHeader title="Learning Progress" description="Your overall mastery across all roadmaps." />
                <Button variant="ghost" size="sm" asChild>
                  <NextLink href="/profile/progress">View Details <ArrowRight className="w-4 h-4 ml-1" /></NextLink>
                </Button>
              </div>
              <ProgressOverview />
            </div>
            
            <div className="p-8 rounded-3xl border border-border bg-card space-y-6">
              <SectionHeader title="Continue Learning" description="Pick up exactly where you left off." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                  <div className="col-span-2 space-y-4">
                    <div className="h-32 animate-pulse bg-card rounded-2xl border border-border" />
                    <div className="h-32 animate-pulse bg-card rounded-2xl border border-border" />
                  </div>
                ) : dashboardData.activeRoadmaps.length > 0 ? (
                  dashboardData.activeRoadmaps.slice(0, 2).map((roadmap) => (
                    <div key={roadmap.id} className="p-6 rounded-2xl border border-border bg-black/20 hover:border-primary/50 transition-all group space-y-4">
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
                        <div className="flex justify-between text-xs font-medium text-muted-foreground">
                          <span>Progress</span>
                          <span>{roadmap.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
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

          {/* Sidebar Activity Feed - Medium */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl border border-border bg-card h-full">
              <SectionHeader title="Recent Activity" />
              <ActivityFeed />
            </div>
          </div>

          {/* Bottom Row: Recommendations & Certificates */}
          <div className="col-span-1 md:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl border border-border bg-card space-y-6">
              <SectionHeader title="Recommended For You" />
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-3 hover:bg-primary/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">AI Engineering</p>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <p className="text-xs text-muted-foreground">Master LLMs, RAG and PyTorch for the modern era.</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <NextLink href="/roadmaps/ai">Explore Path</NextLink>
                  </Button>
                </div>
                <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 space-y-3 hover:bg-purple-500/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold group-hover:text-purple-400 transition-colors">Daily Challenge</p>
                    <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <p className="text-xs text-muted-foreground">Solve today's architectural puzzle and earn bonus XP.</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <NextLink href="/interview">Start Challenge</NextLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl border border-border bg-card space-y-6">
              <SectionHeader title="Your Certifications" />
              {isLoading ? (
                <div className="h-48 animate-pulse bg-card rounded-xl border border-border" />
              ) : dashboardData.certificates.length > 0 ? (
                <div className="grid gap-3">
                  {dashboardData.certificates.map(cert => (
                    <div key={cert.id} className="p-4 rounded-2xl border border-border bg-black/20 flex items-center gap-3 hover:border-primary/30 transition-all group">
                      <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{cert.roadmapName}</p>
                        <p className="text-[10px] text-muted-foreground">{new Date(cert.issuedAt).toLocaleDateString()}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <NextLink href={`/verify/${cert.id}`}>
                          <ArrowRight className="w-4 h-4" />
                        </NextLink>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
                  <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold">No certifications yet</p>
                    <p className="text-xs text-muted-foreground">Complete a roadmap to earn your first professional certificate.</p>
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
