"use client";
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Bookmark
} from 'lucide-react';
import { useProgress } from '@/lib/core/context/ProgressContext';
import { useAchievements } from '@/lib/core/context/AchievementContext';
import { SEOHead } from '@/components/ui/SEOHead';
import { Button } from '@/components/ui/Button';

const StatCard = ({ icon: Icon, label, value, color, trend }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20 ${color}`} />
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-white/5 ${color.replace('bg-', 'text-')} border border-white/10`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </div>
    {trend && <div className="mt-3 text-xs text-emerald-400 flex items-center gap-1">
      <Star size={12} /> {trend}
    </div>}
  </motion.div>
);

export function DashboardPage() {
  const { progress } = useProgress();
  const { unlockedAchievements } = useAchievements();

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead 
        title="Student Dashboard | StackForge Academy" 
        description="Track your learning progress, achievements, and bookmarks." 
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Welcome back, <span className="text-indigo-500">Scholar</span> 👋
            </h1>
            <p className="text-gray-400 mt-2">You've earned <span className="text-white font-bold">{progress.xp} XP</span>. Keep the streak alive!</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Bookmark size={18} /> Bookmarks
            </Button>
            <Button variant="primary" className="gap-2">
              Continue Learning <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={Flame} 
            label="Current Streak" 
            value={`${progress.streak.current} Days`} 
            color="bg-orange-500" 
            trend="Best: 12 Days"
          />
          <StatCard 
            icon={Clock} 
            label="Learning Time" 
            value={`${progress.totalLearningHours.toFixed(1)} Hours`} 
            color="bg-blue-500" 
          />
          <StatCard 
            icon={CheckCircle} 
            label="Completed" 
            value={Object.keys(progress.completedContent).length} 
            color="bg-emerald-500" 
          />
          <StatCard 
            icon={Trophy} 
            label="Academic Level" 
            value={`Lvl ${progress.level}`} 
            color="bg-purple-500" 
            trend={`${1000 - (progress.xp % 1000)} XP to Lvl ${progress.level + 1}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Journey */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="text-indigo-500" /> Active Progress
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-indigo-500/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">Modern React Patterns</h4>
                      <p className="text-sm text-gray-400">Module 3: Advanced Hooks & Compound Components</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-indigo-500">65% Completed</span>
                    <div className="w-32 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: '65%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-emerald-500/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">System Design Fundamentals</h4>
                      <p className="text-sm text-gray-400">Module 1: Scalability & Load Balancing</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-500">20% Completed</span>
                    <div className="w-32 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '20%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="text-yellow-500" /> Badges
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {unlockedAchievements.length > 0 ? (
                unlockedAchievements.slice(0, 6).map((ach: any) => (
                  <div 
                    key={ach.id} 
                    title={ach.description}
                    className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 group hover:bg-indigo-500/10 transition-all cursor-help"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                      <Trophy size={20} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-10 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                  No badges unlocked yet. Start learning!
                </div>
              )}
            </div>
            <Button variant="outline" className="w-full group">
              View All Achievements <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
