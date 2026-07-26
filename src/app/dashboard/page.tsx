"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

interface ResumeLearningItem {
  roadmapSlug: string;
  roadmapTitle: string;
  moduleTitle: string;
  moduleSlug: string;
  lessonTitle: string;
  lessonSlug: string;
  completionPercentage: number;
  hoursRemaining: number;
  xpReward: number;
}

interface ProjectSubmissionItem {
  id: string;
  title: string;
  repoUrl: string;
  submittedAt: string;
}

interface TutorSessionItem {
  id: string;
  topic: string;
  messageCount: number;
  updatedAt: string;
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
    resumeLearning: ResumeLearningItem | null;
    activeRoadmaps: RoadmapProgress[];
    certificates: Certificate[];
    projectSubmissions: ProjectSubmissionItem[];
    tutorSessions: TutorSessionItem[];
  }>({ resumeLearning: null, activeRoadmaps: [], certificates: [], projectSubmissions: [], tutorSessions: [] });
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
            resumeLearning: data.resumeLearning || null,
            activeRoadmaps: data.activeRoadmaps || [],
            certificates: data.certificates || [],
            projectSubmissions: data.projectSubmissions || [],
            tutorSessions: data.tutorSessions || [],
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

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const streakMessage = streak >= 3 
    ? `You've maintained your streak for ${streak} days. Let's make it ${streak + 1} today!` 
    : "Stay consistent today to build your engineering momentum.";

  const progressToNextLevel = Math.min(Math.round(((xp % 1000) / 1000) * 100), 100);
  const xpNeeded = 1000 - (xp % 1000);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-24 space-y-8 max-w-7xl relative">
        
        {/* Ambient Gradient Backgrounds */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow -z-10" />

        {/* 1. SINGLE-MISSION PERSONALIZED HERO CARD */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 group hover:border-blue-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-full filter blur-3xl opacity-60 pointer-events-none" />
          
          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Workspace Hub
            </span>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              {timeGreeting}, <span className="text-blue-600 dark:text-blue-400 font-extrabold">{displayName}</span> 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {dashboardData.resumeLearning 
                ? `You're in the middle of ${dashboardData.resumeLearning.roadmapTitle}. ${streakMessage}`
                : streakMessage}
            </p>
          </div>

          {/* Primary Action Card Focus */}
          {dashboardData.resumeLearning ? (
            <div className="w-full lg:w-96 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative z-10 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Continue {dashboardData.resumeLearning.roadmapTitle}
                </span>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                  ⚡ +{dashboardData.resumeLearning.xpReward} XP
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                  {dashboardData.resumeLearning.lessonTitle}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  ~{dashboardData.resumeLearning.hoursRemaining * 18 || 18} mins estimated
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Track Completion</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{dashboardData.resumeLearning.completionPercentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                    style={{ width: `${dashboardData.resumeLearning.completionPercentage}%` }} 
                  />
                </div>
              </div>

              <Button 
                to={`/roadmaps/${dashboardData.resumeLearning.roadmapSlug}/lesson/${dashboardData.resumeLearning.lessonSlug}`}
                variant="primary" 
                size="sm" 
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2"
              >
                <span>Resume Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="w-full lg:w-80 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-3 relative z-10">
              <p className="text-xs text-slate-500 dark:text-slate-400">Select a learning track to begin your developer journey.</p>
              <Button to="/roadmaps" variant="primary" size="sm" className="w-full rounded-full bg-blue-600 text-white">
                Browse Roadmaps
              </Button>
            </div>
          )}
        </div>

        {/* 2. TODAY'S MISSION & AI MENTOR INTELLIGENCE BANNER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Today's Mission Card */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Today's Mission</h3>
              </div>
              <span className="text-xs bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold px-2.5 py-1 rounded-full">
                +450 XP REWARD
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">Complete 3 daily activities to keep your streak active and level up.</p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Mission Progress</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">1 / 3 Tasks</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-1/3 transition-all duration-500" />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-900 dark:text-white font-medium">✓ Finish React Hooks Overview</span>
                <span className="text-[10px] text-blue-600 font-bold">COMPLETED</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">○ Solve Lexical Closure Challenge</span>
                <Link href="/challenges" className="text-[10px] text-blue-600 font-bold hover:underline">Start →</Link>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">○ Submit Portfolio Project Draft</span>
                <Link href="/projects" className="text-[10px] text-blue-600 font-bold hover:underline">Submit →</Link>
              </div>
            </div>
          </div>

          {/* AI Mentor Intelligence Banner */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bot className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">AI Mentor Recommendation</h3>
              </div>
              <span className="text-xs bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold px-2.5 py-1 rounded-full uppercase">
                INTELLIGENT GUIDE
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-xs text-slate-900 dark:text-white leading-relaxed font-medium">
                💡 Based on your recent quizzes and progress, we recommend focusing on <strong className="text-blue-600 dark:text-blue-400">React Hooks & Closures</strong> next.
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Estimated completion time: ~18 minutes. Mastering this will unlock advanced React pattern challenges.
              </p>
            </div>

            <div className="pt-2">
              <Button to="/tutor" variant="primary" size="sm" className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white gap-2 font-semibold">
                <Bot className="w-4 h-4" />
                <span>Start Session with AI Mentor</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bento Grid Body - Core Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Column Left: Study Stats & Weekly Goals */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            
            {/* Streak & Progression Motivation Card */}
            <div className="p-6 rounded-3xl premium-glass border border-border/50 flex-1 space-y-6 hover:border-[#1BBDF9]/30 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Habit Engine</h3>
                  <p className="text-[10px] text-muted-foreground">Consistency is your superpower</p>
                </div>
              </div>
              
              <div className="p-4 rounded-2xl bg-black/10 dark:bg-slate-900/40 border border-border/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                    🔥 {streak} Day Learning Streak
                  </span>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase">ACTIVE TODAY</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Complete today's mission to preserve your streak momentum and boost your global developer ranking.
                </p>
              </div>

              {/* Leveling & Unlocks */}
              <div className="space-y-3 border-t border-border/40 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Level {level} Engineer</span>
                  <span className="text-[10px] text-[#1BBDF9] font-bold">{xpNeeded} XP to Lv. {level + 1}</span>
                </div>
                <div className="h-2 w-full bg-secondary dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#1BBDF9] to-purple-600 rounded-full transition-all duration-500" 
                    style={{ width: `${progressToNextLevel}%` }} 
                  />
                </div>
                
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Unlocks at Level {level + 1}:</span>
                  <ul className="text-[11px] text-muted-foreground space-y-0.5">
                    <li className="flex items-center gap-1.5 text-foreground">✓ Advanced React Patterns Sandbox</li>
                    <li className="flex items-center gap-1.5 text-foreground">✓ Verified Credentials Badge</li>
                    <li className="flex items-center gap-1.5 text-foreground">✓ Priority AI Tutor Code Reviews</li>
                  </ul>
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

            {/* Resume Learning / Active Roadmap Focus */}
            <div className="p-6 rounded-3xl premium-glass border border-border/50 space-y-4 hover:border-[#1BBDF9]/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#1BBDF9]" /> Resume Learning
                </h3>
                {dashboardData.resumeLearning && (
                  <span className="text-[10px] bg-[#1BBDF9]/10 text-[#1BBDF9] font-bold px-2 py-0.5 rounded-full uppercase">
                    {dashboardData.resumeLearning.roadmapTitle}
                  </span>
                )}
              </div>

              {isLoading ? (
                <div className="h-28 animate-pulse bg-secondary/40 rounded-2xl" />
              ) : dashboardData.resumeLearning ? (
                <div className="p-5 rounded-2xl bg-black/10 dark:bg-slate-900/40 border border-border/40 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {dashboardData.resumeLearning.moduleTitle}
                      </span>
                      <h4 className="text-base font-extrabold text-foreground">
                        {dashboardData.resumeLearning.lessonTitle}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-500 flex items-center gap-1 justify-end">
                        ⚡ +{dashboardData.resumeLearning.xpReward} XP
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        ~{dashboardData.resumeLearning.hoursRemaining}h remaining
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground font-semibold">Track Progress</span>
                      <span className="text-[#1BBDF9] font-bold">{dashboardData.resumeLearning.completionPercentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#1BBDF9] to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${dashboardData.resumeLearning.completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <Button
                    to={`/roadmaps/${dashboardData.resumeLearning.roadmapSlug}/lesson/${dashboardData.resumeLearning.lessonSlug}`}
                    variant="primary"
                    size="sm"
                    className="w-full rounded-full bg-[#1BBDF9] hover:bg-[#159ecf] text-white font-semibold gap-2 mt-2"
                  >
                    <span>Resume Next Lesson</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-border/60 text-center space-y-3">
                  <p className="text-xs text-muted-foreground">You haven't started a roadmap yet. Choose a learning track to begin your developer journey.</p>
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <Link href="/roadmaps">Browse Roadmaps</Link>
                  </Button>
                </div>
              )}
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
            <div className="p-6 rounded-3xl premium-glass border border-border/50 hover:border-[#1BBDF9]/30 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-500" /> Certificates
                </h3>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full uppercase">
                  VERIFIED
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground">
                Publicly verifiable credentials that prove your fullstack code mastery to recruiters.
              </p>

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
                      <Link href={`/verify/${cert.id}`} className="text-[#1BBDF9] hover:underline text-[10px] font-bold flex items-center gap-0.5">
                        Verify <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3 space-y-2 border border-dashed border-border/60 rounded-xl p-3">
                  <p className="text-[11px] text-muted-foreground">No certifications earned yet. Finish a roadmap to claim your credential.</p>
                  <Button to="/roadmaps" variant="outline" size="sm" className="w-full text-[10px] rounded-full h-8">Browse Roadmaps</Button>
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
            
            {isLoading ? (
              <div className="h-24 animate-pulse bg-secondary/40 rounded-2xl" />
            ) : dashboardData.tutorSessions.length > 0 ? (
              <div className="space-y-2">
                {dashboardData.tutorSessions.map((ts) => (
                  <div key={ts.id} className="p-3 rounded-xl bg-black/10 dark:bg-slate-900/40 border border-border/40 text-xs hover:bg-secondary/40 cursor-pointer transition-colors">
                    <p className="font-semibold text-foreground">Discussed: {ts.topic}</p>
                    <span className="text-[9px] text-muted-foreground">{new Date(ts.updatedAt).toLocaleDateString()} • {ts.messageCount} exchanges</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-dashed border-border/60 text-center space-y-2">
                <p className="text-[11px] text-muted-foreground">No tutor sessions yet. Ask AI Tutor for code explanations or debugging help.</p>
              </div>
            )}
            
            <Button to="/tutor" variant="ghost" size="sm" className="w-full text-xs hover:bg-secondary/40 rounded-full">Launch AI Mentor</Button>
          </div>

          {/* Project Progress Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl premium-glass border border-border/50 hover:border-[#1BBDF9]/30 transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-orange-500" /> Project Submissions
              </h3>
              <span className="text-[10px] bg-orange-500/10 text-orange-500 font-bold px-2 py-0.5 rounded-full">PORTFOLIO</span>
            </div>
            
            {isLoading ? (
              <div className="h-24 animate-pulse bg-secondary/40 rounded-2xl" />
            ) : dashboardData.projectSubmissions.length > 0 ? (
              <div className="space-y-2">
                {dashboardData.projectSubmissions.map((sub) => (
                  <div key={sub.id} className="p-3 rounded-xl bg-black/10 dark:bg-slate-900/40 border border-border/40 text-xs flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{sub.title}</p>
                      <span className="text-[9px] text-muted-foreground">Submitted {new Date(sub.submittedAt).toLocaleDateString()}</span>
                    </div>
                    <a 
                      href={sub.repoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#1BBDF9] hover:underline text-[10px] font-bold"
                    >
                      Repo ↗
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-dashed border-border/60 text-center space-y-2">
                <p className="text-[11px] text-muted-foreground">No projects submitted yet. Build fullstack apps in the portfolio sandbox.</p>
                <Button to="/projects" variant="outline" size="sm" className="w-full text-[10px] rounded-full h-8">
                  Browse Projects
                </Button>
              </div>
            )}
            
            <Button to="/projects" variant="ghost" size="sm" className="w-full text-xs hover:bg-secondary/40 rounded-full">Explore All Projects</Button>
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
