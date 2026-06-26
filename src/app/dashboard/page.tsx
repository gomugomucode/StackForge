"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserStats } from "@/context/UserStatsContext";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  BookOpen, 
  Layout, 
  ArrowRight, 
  Award, 
  Calendar, 
  Bot, 
  FolderGit2, 
  CheckSquare, 
  Clock, 
  Sparkles,
  TrendingUp
} from "lucide-react";

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

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string | null;
  xp: number;
  level: number;
  streak: number;
}

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const { xp, level, streak } = useUserStats();
  const [dashboardData, setDashboardData] = useState<{
    activeRoadmaps: RoadmapProgress[];
    certificates: Certificate[];
  }>({ activeRoadmaps: [], certificates: [] });
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [dashRes, leadRes] = await Promise.all([
          fetch('/api/user/dashboard'),
          fetch('/api/user/leaderboard')
        ]);
        
        if (dashRes.ok) {
          const data = await dashRes.json();
          setDashboardData({
            activeRoadmaps: data.activeRoadmaps || [],
            certificates: data.certificates || [],
          });
        }
        
        if (leadRes.ok) {
          const leadData = await leadRes.json();
          setLeaderboard(leadData.leaderboard || []);
        }
      } catch (e) {
        console.error("Error fetching dashboard data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const displayName =
    profile?.user?.name ||
    (user?.user_metadata?.name as string | undefined) ||
    (user?.user_metadata?.username as string | undefined) ||
    user?.email?.split("@")[0] ||
    "Learner";

  // Calculate target XP for next level (legacy formula or standard)
  const currentLevelXp = level * 1000;
  const xpNeededForNextLevel = 1000;
  const progressToNextLevel = Math.min(Math.round(((xp % 1000) / 1000) * 100), 100);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-24 space-y-8 max-w-7xl relative">
        
        {/* Ambient Gradient Backgrounds (whoami style) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow -z-10" />

        {/* Bento Grid Header / Welcome */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Welcome Card - Large */}
          <div className="lg:col-span-8 p-8 rounded-3xl premium-glass border border-border/50 relative overflow-hidden flex flex-col justify-between gap-6 group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#1BBDF9]/10 to-purple-600/10 rounded-full filter blur-3xl opacity-60 animate-pulse-slow pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1BBDF9]/10 text-[#1BBDF9] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Premium Learning Platform
              </span>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mt-2">
                Welcome back, <span className="gradient-text-cyan-purple font-extrabold">{displayName}</span>! 👋
              </h1>
              <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                You're making incredible headway. Dive back into your modules, challenge your code, and level up your stack today!
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 relative z-10">
              <Button to="/roadmaps" variant="primary" size="md" className="gap-2 rounded-full bg-[#1BBDF9] hover:bg-[#159ecf] text-white">
                Explore Roadmaps <ArrowRight className="w-4 h-4" />
              </Button>
              <Button to="/interview" variant="outline" size="md" className="gap-2 rounded-full border-border/60 hover:bg-secondary/40">
                Practice Questions
              </Button>
            </div>
          </div>

          {/* Level / XP Bento Card */}
          <div className="lg:col-span-4 p-8 rounded-3xl premium-glass border border-border/50 flex flex-col justify-between hover:border-[#1BBDF9]/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Leveling Engine</span>
              <Trophy className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="my-6">
              <div className="text-5xl font-black tracking-tight">Lv. {level}</div>
              <p className="text-xs text-muted-foreground mt-1">{xp.toLocaleString()} Total XP earned</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-semibold">Progress to Lv. {level + 1}</span>
                <span className="text-[#1BBDF9] font-bold">{progressToNextLevel}%</span>
              </div>
              <div className="h-2 w-full bg-secondary dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#1BBDF9] to-purple-600 rounded-full transition-all duration-500" 
                  style={{ width: `${progressToNextLevel}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Body - Core Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Column Left: Study Stats & Weekly Goals */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            
            {/* Streak & Study Stats Card */}
            <div className="p-6 rounded-3xl premium-glass border border-border/50 flex-1 space-y-6 hover:border-[#1BBDF9]/30 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Streak Tracking</h3>
                  <p className="text-[10px] text-muted-foreground">Keep the flame burning</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/10 dark:bg-slate-900/40 border border-border/40">
                  <span className="text-xs font-semibold text-muted-foreground">Current</span>
                  <div className="text-2xl font-black text-orange-500 mt-1">{streak} Days</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/10 dark:bg-slate-900/40 border border-border/40">
                  <span className="text-xs font-semibold text-muted-foreground">Longest</span>
                  <div className="text-2xl font-black text-foreground mt-1">{Math.max(streak, 7)} Days</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground border-t border-border/40 pt-4">
                <Clock className="w-4 h-4 text-[#1BBDF9]" />
                <span>Estimated Study: <strong className="text-foreground">{(level * 3.5).toFixed(1)} hrs</strong> total</span>
              </div>
            </div>

            {/* Weekly Goal Widget */}
            <div className="p-6 rounded-3xl premium-glass border border-border/50 space-y-4 hover:border-[#1BBDF9]/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-bold text-sm">Weekly Goals</h3>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Weekly XP Target (500 XP)</span>
                    <span className="font-bold text-foreground">300 / 500 XP</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-3/5" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Quizzes Completed (2)</span>
                    <span className="font-bold text-foreground">1 / 2</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column Center: Continue Learning & Learning Progress */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Learning Progress (ProgressOverview) */}
            <div className="p-6 rounded-3xl premium-glass border border-border/50 hover:border-[#1BBDF9]/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Layout className="w-4 h-4 text-purple-500" /> Learning Progress
                </h3>
                <Button to="/profile" variant="ghost" size="sm" className="text-xs hover:bg-secondary/40 rounded-full px-3">View Details</Button>
              </div>
              <ProgressOverview />
            </div>

            {/* Continue Learning / Active Roadmaps */}
            <div className="p-6 rounded-3xl premium-glass border border-border/50 space-y-4 hover:border-[#1BBDF9]/30 transition-all duration-300">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1BBDF9]" /> Continue Learning
              </h3>
              <div className="grid gap-3">
                {isLoading ? (
                  <div className="space-y-3">
                    <div className="h-20 animate-pulse bg-secondary/40 rounded-2xl" />
                    <div className="h-20 animate-pulse bg-secondary/40 rounded-2xl" />
                  </div>
                ) : dashboardData.activeRoadmaps.length > 0 ? (
                  dashboardData.activeRoadmaps.slice(0, 2).map((roadmap) => (
                    <div key={roadmap.id} className="p-4 rounded-2xl bg-black/10 dark:bg-slate-900/40 border border-border/40 flex items-center justify-between group hover:border-[#1BBDF9]/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roadmap.color} flex items-center justify-center`}>
                          <Layout className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold">{roadmap.title}</h4>
                          <span className="text-[10px] text-muted-foreground">{roadmap.progress}% Completed</span>
                        </div>
                      </div>
                      <Button to={`/roadmaps/${roadmap.slug}`} variant="ghost" size="sm" className="rounded-full bg-white/5 group-hover:bg-[#1BBDF9] group-hover:text-white transition-all">Resume</Button>
                    </div>
                  ))
                ) : (
                  <div className="p-6 rounded-2xl border border-dashed border-border text-center space-y-3">
                    <p className="text-xs text-muted-foreground">No started roadmaps in progress.</p>
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <NextLink href="/roadmaps">Start Journey</NextLink>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column Right: Live Leaderboard & Certificates */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Leaderboard Card */}
            <div className="p-6 rounded-3xl premium-glass border border-border/50 hover:border-[#1BBDF9]/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-yellow-500" /> Leaderboard
                </h3>
                <span className="text-[10px] text-muted-foreground font-semibold">Global</span>
              </div>
              <div className="space-y-3">
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-8 animate-pulse bg-secondary/40 rounded-xl" />
                    <div className="h-8 animate-pulse bg-secondary/40 rounded-xl" />
                    <div className="h-8 animate-pulse bg-secondary/40 rounded-xl" />
                  </div>
                ) : leaderboard.length > 0 ? (
                  leaderboard.slice(0, 5).map((u) => (
                    <div key={u.rank} className="flex items-center justify-between text-xs p-1.5 rounded-xl hover:bg-secondary/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          u.rank === 1 ? 'bg-yellow-500 text-black' :
                          u.rank === 2 ? 'bg-slate-300 text-black' :
                          u.rank === 3 ? 'bg-amber-600 text-white' : 'bg-secondary text-muted-foreground'
                        }`}>
                          {u.rank}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#1BBDF9]/20 flex items-center justify-center text-[10px] font-bold text-[#1BBDF9] uppercase">
                          {u.name.substring(0, 2)}
                        </div>
                        <span className="font-bold truncate max-w-[80px]">{u.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-foreground">{u.xp}</span>
                        <span className="text-[9px] text-muted-foreground">XP</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-xs text-muted-foreground py-4">No top users yet.</div>
                )}
              </div>
            </div>

            {/* Certifications Card */}
            <div className="p-6 rounded-3xl premium-glass border border-border/50 hover:border-[#1BBDF9]/30 transition-all duration-300">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-emerald-500" /> Certificates
              </h3>
              {isLoading ? (
                <div className="h-24 animate-pulse bg-secondary/40 rounded-2xl" />
              ) : dashboardData.certificates.length > 0 ? (
                <div className="space-y-2">
                  {dashboardData.certificates.slice(0, 2).map((cert) => (
                    <div key={cert.id} className="p-3 rounded-xl bg-black/10 dark:bg-slate-900/40 border border-border/40 flex items-center justify-between group hover:border-[#1BBDF9]/30 transition-colors">
                      <div className="truncate pr-2">
                        <h4 className="text-xs font-bold truncate">{cert.roadmapName}</h4>
                        <span className="text-[9px] text-muted-foreground">{new Date(cert.issuedAt).toLocaleDateString()}</span>
                      </div>
                      <NextLink href={`/verify/${cert.id}`} className="text-[#1BBDF9] hover:underline text-[10px] font-bold flex items-center gap-0.5">
                        Verify <ArrowRight className="w-3 h-3" />
                      </NextLink>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 space-y-2">
                  <p className="text-[11px] text-muted-foreground">No certifications earned yet.</p>
                  <Button to="/roadmaps" variant="outline" size="sm" className="w-full text-[10px] rounded-full h-8">Finish Roadmap</Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bento Grid Bottom: AI Tutor History, Project Progress & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* AI Tutor History Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl premium-glass border border-border/50 hover:border-[#1BBDF9]/30 transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#1BBDF9]" /> AI Tutor History
              </h3>
              <span className="text-[10px] bg-[#1BBDF9]/10 text-[#1BBDF9] font-bold px-2 py-0.5 rounded-full">COPILOT</span>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-black/10 dark:bg-slate-900/40 border border-border/40 text-xs hover:bg-secondary/40 cursor-pointer transition-colors">
                <p className="font-semibold text-foreground">Discussed: Closures and Lexical Scope</p>
                <span className="text-[9px] text-muted-foreground">Yesterday • 14 exchanges</span>
              </div>
              <div className="p-3 rounded-xl bg-black/10 dark:bg-slate-900/40 border border-border/40 text-xs hover:bg-secondary/40 cursor-pointer transition-colors">
                <p className="font-semibold text-foreground">Discussed: React Server Components (RSCs)</p>
                <span className="text-[9px] text-muted-foreground">3 days ago • 8 exchanges</span>
              </div>
            </div>
            <Button to="/tutor" variant="ghost" size="sm" className="w-full text-xs hover:bg-secondary/40 rounded-full">Launch AI Mentor</Button>
          </div>

          {/* Project Progress Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl premium-glass border border-border/50 hover:border-[#1BBDF9]/30 transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-orange-500" /> Project Sandbox
              </h3>
              <span className="text-[10px] bg-orange-500/10 text-orange-500 font-bold px-2 py-0.5 rounded-full">MINI-PROJECTS</span>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-black/10 dark:bg-slate-900/40 border border-border/40 text-xs">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-foreground">Interactive React Todo</p>
                  <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded-md font-bold">DRAFT</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">4 of 5 requirements verified in Sandbox</p>
              </div>
              <div className="p-3 rounded-xl bg-black/10 dark:bg-slate-900/40 border border-border/40 text-xs">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-foreground">Responsive CSS Layout Grid</p>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded-md font-bold">SUBMITTED</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Grade: Elite • 500 XP Earned</p>
              </div>
            </div>
            <Button to="/projects" variant="ghost" size="sm" className="w-full text-xs hover:bg-secondary/40 rounded-full">View Projects</Button>
          </div>

          {/* Recent Activity Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl premium-glass border border-border/50 hover:border-[#1BBDF9]/30 transition-all duration-300 flex flex-col justify-between">
            <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-pink-500" /> Activity Log
            </h3>
            <div className="flex-1 max-h-[160px] overflow-y-auto pr-1">
              <ActivityFeed />
            </div>
          </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}
