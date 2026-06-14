import { useAnalytics } from '../features/analytics/useAnalytics'
import { XPGrowthChart } from '../features/analytics/XPGrowthChart'
import { LearningTimeChart } from '../features/analytics/LearningTimeChart'
import { CategoryMasteryRadar } from '../features/analytics/CategoryMasteryRadar'
import { CompletionHeatmap } from '../features/analytics/CompletionHeatmap'
import { SEOHead } from '../components/ui/SEOHead'
import { PageLoadingSpinner } from '../components/ui/PageLoadingSpinner'
import { Clock, Trophy, Flame, Award, ChevronUp, RefreshCw } from 'lucide-react'

export function AnalyticsPage() {
  const {
    xpGrowth,
    learningTime,
    categoryMastery,
    heatmapData,
    weeklyReport,
    isLoading,
    refreshAnalytics,
  } = useAnalytics()

  if (isLoading || !weeklyReport) {
    return <PageLoadingSpinner />
  }

  const totalHours = Math.round((weeklyReport.totalMinutes / 60) * 10) / 10
  const hoursGoal = 10
  const hoursPct = Math.min(100, Math.round((totalHours / hoursGoal) * 100))

  return (
    <>
      <SEOHead
        title="Learning Analytics Dashboard | StackForge Academy"
        description="Monitor your coding stats, view study hours trends, analyze technical domain mastery, and track streak metrics."
      />

      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-10 select-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#21262d] pb-6 flex-wrap gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-accent-purple uppercase tracking-widest block">
                Technical Audit & Stats
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Learning Analytics
              </h1>
              <p className="text-xs text-[#8b949e]">
                Personalized analytics measuring study persistence, curriculum mastery, and XP achievements.
              </p>
            </div>

            <button
              onClick={refreshAnalytics}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-[#161b22] hover:bg-[#1f242c] border border-white/[0.06] rounded-xl text-xs text-white font-bold transition-all duration-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Metrics</span>
            </button>
          </div>

          {/* Quick Summary Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* CARD 1: STUDY HOURS */}
            <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 flex items-start justify-between relative overflow-hidden group">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider block">
                  Learning Time
                </span>
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-2xl font-black text-white">{totalHours}</h3>
                  <span className="text-xs text-[#8b949e]">hours</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400">
                  <ChevronUp className="w-3 h-3" />
                  <span>+{weeklyReport.totalMinutes}m logged</span>
                </div>
              </div>
              <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-accent-cyan">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            {/* CARD 2: TOPICS MASTERED */}
            <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 flex items-start justify-between relative overflow-hidden group">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider block">
                  Syllabus Mastered
                </span>
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-2xl font-black text-white">{weeklyReport.topicsCompleted}</h3>
                  <span className="text-xs text-[#8b949e]">topics</span>
                </div>
                <p className="text-[9px] text-[#8b949e]">
                  Favorite: <span className="text-white font-bold">{weeklyReport.topTech}</span>
                </p>
              </div>
              <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
            </div>

            {/* CARD 3: STREAK */}
            <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 flex items-start justify-between relative overflow-hidden group">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider block">
                  Study Streak
                </span>
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-2xl font-black text-white">{weeklyReport.streakDays}</h3>
                  <span className="text-xs text-[#8b949e]">days</span>
                </div>
                <p className="text-[9px] text-[#8b949e]">Keep coding daily to unlock achievements!</p>
              </div>
              <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
            </div>

            {/* CARD 4: GOAL COMPLETE */}
            <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 flex items-start justify-between relative overflow-hidden group">
              <div className="space-y-3 flex-1">
                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider block">
                  Weekly Goal Progress
                </span>
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-2xl font-black text-white">{hoursPct}%</h3>
                  <span className="text-xs text-[#8b949e]">complete</span>
                </div>
                {/* Micro goal bar */}
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1.5 max-w-[120px]">
                  <div className="h-full bg-accent-purple rounded-full" style={{ width: `${hoursPct}%` }} />
                </div>
              </div>
              <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-accent-purple">
                <Award className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Charts Rows layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ROW 1 COLUMN 1: LINE CHART (2/3 width) */}
            <div className="lg:col-span-2">
              <XPGrowthChart data={xpGrowth} />
            </div>

            {/* ROW 1 COLUMN 2: RADAR CHART (1/3 width) */}
            <div>
              <CategoryMasteryRadar data={categoryMastery} />
            </div>

            {/* ROW 2 COLUMN 1: BAR CHART (1.5/3 width) */}
            <div className="lg:col-span-1">
              <LearningTimeChart data={learningTime} />
            </div>

            {/* ROW 2 COLUMN 2: HEATMAP GRID (1.5/3 width) */}
            <div className="lg:col-span-2">
              <CompletionHeatmap data={heatmapData} />
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
export default AnalyticsPage;
