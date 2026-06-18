'use client';

import React from 'react';
import { useUserStats } from '@/context/UserStatsContext';
import { useProgress } from '@/context/ProgressContext';
import { Trophy, Target, Flame, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { roadmaps } from '@/data/roadmaps';

export default function ProfilePage() {
  const { xp, level, streak, progressToNextLevel, isLoading: statsLoading } = useUserStats();
  const { completedNodes } = useProgress();

  if (statsLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card animate-pulse space-y-6">
          <div className="h-20 w-20 rounded-full bg-secondary mx-auto" />
          <div className="h-6 w-1/2 bg-secondary mx-auto rounded" />
          <div className="h-4 w-full bg-secondary rounded" />
        </div>
      </div>
    );
  }

  // Calculate completion percentage for each roadmap
  const roadmapProgress = roadmaps.map(roadmap => {
    const nodes = roadmap.nodes;
    const completed = nodes.filter(node => completedNodes.has(node.id)).length;
    const percentage = Math.round((completed / nodes.length) * 100);
    return { ...roadmap, completed, percentage };
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-background to-purple-500/10 border border-border p-8 md:p-12">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-muted-foreground" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg">
              <Trophy className="w-5 h-5" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">The Forge Profile</h1>
              <p className="text-muted-foreground">Forging a professional career, one node at a time.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard icon={<Trophy className="w-4 h-4" />} label="Level" value={`Lv.${level}`} color="text-primary" />
              <StatCard icon={<Target className="w-4 h-4" />} label="Total XP" value={xp.toLocaleString()} color="text-purple-500" />
              <StatCard icon={<Flame className="w-4 h-4" />} label="Streak" value={`${streak} Days`} color="text-orange-500" />
            </div>

            {/* XP Progress Bar */}
            <div className="max-w-md space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-muted-foreground">Progress to Level {level + 1}</span>
                <span className="text-primary">{progressToNextLevel}%</span>
              </div>
              <div className="h-3 w-full bg-secondary rounded-full overflow-hidden border border-border">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  className="h-full bg-gradient-to-r from-primary to-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Achievements & Learning */}
        <div className="lg:col-span-2 space-y-8">
          <SectionHeader 
            title="Completed Mastery" 
            description="Your progress across the technical landscapes." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmapProgress.map((roadmap) => (
              <motion.div 
                key={roadmap.id}
                whileHover={{ y: -2 }}
                className="p-6 rounded-2xl border border-border bg-card space-y-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-foreground">{roadmap.title}</h3>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-primary/10 text-primary">
                    {roadmap.percentage}%
                  </span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${roadmap.percentage}%` }} 
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{roadmap.completed}/{roadmap.nodes.length} Nodes Mastered</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs p-1">
                    Continue Learning
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Fast Facts */}
        <div className="space-y-8">
          <SectionHeader title="Milestones" />
          <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
            <AchievementRow 
              icon={<Award className="w-5 h-5 text-yellow-500" />} 
              title="The Initiate" 
              desc="First 5 nodes completed" 
              unlocked={completedNodes.size >= 5} 
            />
            <AchievementRow 
              icon={<Award className="w-5 h-5 text-purple-500" />} 
              title="Polyglot" 
              desc="Completed 3 different roadmaps" 
              unlocked={roadmapProgress.filter(r => r.percentage === 100).length >= 3} 
            />
            <AchievementRow 
              icon={<Award className="w-5 h-5 text-blue-500" />} 
              title="Consistent" 
              desc="7 Day Learning Streak" 
              unlocked={streak >= 7} 
            />
            <AchievementRow 
              icon={<Award className="w-5 h-5 text-green-500" />} 
              title="Master Architect" 
              desc="Reached Level 10" 
              unlocked={level >= 10} 
            />
          </div>
          
          <div className="p-6 rounded-2xl border border-border bg-primary text-primary-foreground relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-bold">Ready for a Challenge?</h3>
              <p className="text-sm text-primary-foreground/80">Test your knowledge in the Interview Hub and earn massive XP.</p>
              <Button variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-white/90">
                Enter the Hub
              </Button>
            </div>
            <Trophy className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12 group-hover:rotate-0 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="p-4 rounded-2xl border border-border bg-card flex items-center gap-4">
      <div className={`p-2 rounded-lg bg-secondary ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-lg font-black text-foreground">{value}</p>
      </div>
    </div>
  );
}

function AchievementRow({ icon, title, desc, unlocked }: { icon: React.ReactNode, title: string, desc: string, unlocked: boolean }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl transition-all ${unlocked ? 'bg-primary/5 border-primary/20' : 'bg-secondary/30 opacity-60'} border`}>
      <div className={`p-2 rounded-lg ${unlocked ? 'bg-background shadow-sm' : 'bg-secondary'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</span>
          {unlocked && <CheckCircle2 className="w-3 h-3 text-primary" />}
        </div>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
