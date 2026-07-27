"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserStats } from "@/context/UserStatsContext";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        
        {/* 1. HERO & PRIMARY ACTION ABOVE THE FOLD */}
        <Card variant="default" padding="lg" className="relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <Badge variant="primary">
                <Sparkles className="w-3.5 h-3.5" /> Workspace Hub
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                {timeGreeting}, <span className="text-primary">{displayName}</span> 👋
              </h1>
              <p className="text-sm text-muted-foreground leading-normal">
                {dashboardData.resumeLearning 
                  ? `Active Track: ${dashboardData.resumeLearning.roadmapTitle}. ${streakMessage}`
                  : streakMessage}
              </p>
            </div>

            {/* SINGLE PRIMARY CTA ABOVE THE FOLD */}
            {dashboardData.resumeLearning ? (
              <div className="w-full lg:w-96 p-4 rounded-lg bg-secondary/80 border border-border/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-primary uppercase tracking-wider">
                    {dashboardData.resumeLearning.roadmapTitle}
                  </span>
                  <span className="font-bold text-amber-500 flex items-center gap-1">
                    ⚡ +{dashboardData.resumeLearning.xpReward} XP
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground truncate">
                    {dashboardData.resumeLearning.lessonTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    ~{dashboardData.resumeLearning.hoursRemaining * 18 || 18} mins remaining
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="text-primary font-bold">{dashboardData.resumeLearning.completionPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300" 
                      style={{ width: `${dashboardData.resumeLearning.completionPercentage}%` }} 
                    />
                  </div>
                </div>

                <Button 
                  to={`/roadmaps/${dashboardData.resumeLearning.roadmapSlug}/lesson/${dashboardData.resumeLearning.lessonSlug}`}
                  variant="primary" 
                  size="md" 
                  className="w-full"
                >
                  <span>Resume Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="w-full lg:w-80 p-4 rounded-lg bg-secondary/80 border border-border/60 text-center space-y-3">
                <p className="text-xs text-muted-foreground">Select a learning track to begin your engineering journey.</p>
                <Button to="/roadmaps" variant="primary" size="md" className="w-full">
                  Browse Roadmaps
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* 2. TODAY'S MISSION & AI RECOMMENDATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Mission */}
          <Card variant="default" padding="md" className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4.5 h-4.5 text-primary" />
                <h3 className="font-bold text-base text-foreground">Today's Mission</h3>
              </div>
              <Badge variant="warning">+450 XP REWARD</Badge>
            </div>

            <p className="text-xs text-muted-foreground">Complete daily activities to build streak momentum and level up.</p>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Mission Progress</span>
                <span className="text-primary font-bold">1 / 3 Tasks</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/3 transition-all duration-300" />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/40 flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">✓ Finish React Hooks Overview</span>
                <span className="text-primary font-bold text-[10px]">COMPLETED</span>
              </div>
              <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/40 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">○ Solve Lexical Closure Challenge</span>
                <Link href="/challenges" className="text-primary font-bold text-[10px] hover:underline">Start →</Link>
              </div>
              <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/40 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">○ Submit Portfolio Project Draft</span>
                <Link href="/projects" className="text-primary font-bold text-[10px] hover:underline">Submit →</Link>
              </div>
            </div>
          </Card>

          {/* AI Recommendation */}
          <Card variant="default" padding="md" className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4.5 h-4.5 text-primary" />
                <h3 className="font-bold text-base text-foreground">AI Mentor Recommendation</h3>
              </div>
              <Badge variant="info">INTELLIGENT GUIDE</Badge>
            </div>

            <div className="p-3 rounded-lg bg-secondary/60 border border-border/40 space-y-1.5">
              <p className="text-xs text-foreground leading-normal font-medium">
                💡 We recommend focusing on <strong className="text-primary">React Hooks & Closures</strong> next based on your recent activity.
              </p>
              <p className="text-[11px] text-muted-foreground">
                Estimated time: ~18 minutes. Mastering this will unlock advanced React pattern challenges.
              </p>
            </div>

            <div>
              <Button to="/tutor" variant="outline" size="md" className="w-full gap-2">
                <Bot className="w-4 h-4 text-primary" />
                <span>Start Session with AI Mentor</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* 3. RESUME LEARNING TRACK & PROGRESS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Leveling & Habits */}
          <Card variant="default" padding="md" className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <Flame className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Habit Engine</h3>
                <p className="text-xs text-muted-foreground">Consistency is your superpower</p>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-secondary/60 border border-border/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                  🔥 {streak} Day Learning Streak
                </span>
                <span className="text-[10px] text-emerald-500 font-bold uppercase">ACTIVE</span>
              </div>
              <p className="text-xs text-muted-foreground leading-normal">
                Complete today's mission to preserve your streak momentum.
              </p>
            </div>

            <div className="space-y-2 border-t border-border/40 pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Level {level} Engineer</span>
                <span className="text-primary font-bold">{xpNeeded} XP to Lv. {level + 1}</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300" 
                  style={{ width: `${progressToNextLevel}%` }} 
                />
              </div>
            </div>
          </Card>

          {/* Center Column: Progress Overview */}
          <Card variant="default" padding="md" className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Layout className="w-4 h-4 text-primary" /> Learning Progress
              </h3>
              <Button to="/profile" variant="ghost" size="sm" className="text-xs">Details</Button>
            </div>
            <ProgressOverview />
          </Card>

          {/* Right Column: Leaderboard */}
          <Card variant="default" padding="md" className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" /> Leaderboard
              </h3>
              <span className="text-xs text-muted-foreground">Global</span>
            </div>
            <div className="space-y-2">
              {isLoading ? (
                <div className="h-20 bg-muted animate-pulse rounded-lg" />
              ) : leaderboard.length > 0 ? (
                leaderboard.slice(0, 4).map((u) => (
                  <div key={u.rank} className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-secondary transition-colors">
                    <div className="flex items-center gap-2">
                      <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        u.rank === 1 ? 'bg-amber-500 text-black' :
                        u.rank === 2 ? 'bg-muted text-foreground' :
                        u.rank === 3 ? 'bg-amber-700 text-white' : 'bg-secondary text-muted-foreground'
                      }`}>
                        {u.rank}
                      </span>
                      <span className="font-semibold truncate max-w-[80px] text-foreground">{u.name}</span>
                    </div>
                    <span className="font-bold text-primary">{u.xp} XP</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground text-center py-2">No top users yet.</p>
              )}
            </div>
          </Card>
        </div>

        {/* 4. PROJECTS, CERTIFICATES & ACTIVITY LOG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Projects */}
          <Card variant="default" padding="md" className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-primary" /> Projects
              </h3>
              <Button to="/projects" variant="ghost" size="sm" className="text-xs">Browse</Button>
            </div>
            {dashboardData.projectSubmissions.length > 0 ? (
              <div className="space-y-2">
                {dashboardData.projectSubmissions.map((sub) => (
                  <div key={sub.id} className="p-2.5 rounded-lg bg-secondary/60 border border-border/40 text-xs flex items-center justify-between">
                    <span className="font-medium text-foreground truncate">{sub.title}</span>
                    <a href={sub.repoUrl} target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline text-[11px]">Repo ↗</a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-2">No projects submitted yet.</p>
            )}
          </Card>

          {/* Certificates */}
          <Card variant="default" padding="md" className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" /> Certificates
              </h3>
              <Badge variant="success">VERIFIED</Badge>
            </div>
            {dashboardData.certificates.length > 0 ? (
              <div className="space-y-2">
                {dashboardData.certificates.slice(0, 2).map((cert) => (
                  <div key={cert.id} className="p-2.5 rounded-lg bg-secondary/60 border border-border/40 text-xs flex items-center justify-between">
                    <span className="font-medium text-foreground truncate">{cert.roadmapName}</span>
                    <Link href={`/verify/${cert.id}`} className="text-primary font-bold hover:underline text-[11px]">Verify ↗</Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-2">Finish a roadmap to claim your verified certificate.</p>
            )}
          </Card>

          {/* Activity Log */}
          <Card variant="default" padding="md" className="lg:col-span-4 space-y-3">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Activity Log
            </h3>
            <div className="max-h-[140px] overflow-y-auto">
              <ActivityFeed />
            </div>
          </Card>
        </div>

      </div>
    </ProtectedRoute>
  );
}
