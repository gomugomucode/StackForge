import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Flame, 
  Clock, 
  Target, 
  Download, 
  Edit2, 
  Check, 
  ChevronRight, 
  Award, 
  Bookmark, 
  Compass,
  ArrowRight
} from 'lucide-react'
import { getAllTechnologies, getTechMetadata } from '../data/db'
import { 
  getStreak, 
  getThisWeekMinutes, 
  getWeeklyGoalHours, 
  setWeeklyGoalHours, 
  getUserName, 
  setUserName,
  getRecentVisits,
  getPdfDownloads,
  getAllTechProgress
} from '../hooks/useProgress'
import { SEOHead } from '../components/ui/SEOHead'
import { AchievementsPanel } from '../components/dashboard/AchievementsPanel'

export function DashboardPage() {
  const [name, setName] = useState(getUserName())
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(name)
  const [goalHours, setGoalHours] = useState(getWeeklyGoalHours())
  const [isEditingGoal, setIsEditingGoal] = useState(false)
  const [tempGoal, setTempGoal] = useState(goalHours)

  const streak = getStreak()
  const weeklyMinutes = getThisWeekMinutes()
  const recentVisits = getRecentVisits()
  const pdfDownloads = getPdfDownloads()

  // Generate techMap for progress computations
  const techMap = useMemo(() => {
    const map: Record<string, string[]> = {}
    getAllTechnologies().forEach(id => {
      const meta = getTechMetadata(id)
      if (meta) {
        map[id] = meta.topicNames
      }
    })
    return map
  }, [])


  const progressSummary = useMemo(() => {
    return getAllTechProgress(techMap)
  }, [techMap])

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim())
      setName(tempName.trim())
      setIsEditingName(false)
    }
  }

  const handleSaveGoal = () => {
    const hours = Number(tempGoal)
    if (!isNaN(hours) && hours > 0) {
      setWeeklyGoalHours(hours)
      setGoalHours(hours)
      setIsEditingGoal(false)
    }
  }

  const weeklyGoalMinutes = goalHours * 60
  const weeklyProgressPercent = Math.min(
    Math.round((weeklyMinutes / weeklyGoalMinutes) * 100),
    100
  )

  return (
    <div className="space-y-8 py-6 select-text">
      <SEOHead 
        title="Learning Dashboard — StackForge"
        description="Track your learning roadmap progress, set goals, monitor active streaks, and manage study certificates."
      />

      {/* Hero Welcome Banner */}
      <div className="glass p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-border/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-purple/10 blur-3xl rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent-cyan/15 blur-3xl rounded-full -ml-20 -mb-20" />
        
        <div className="space-y-3 z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-purple bg-accent-purple/10 px-2.5 py-1 rounded-md">
            Welcome back
          </span>
          <div className="flex items-center gap-3">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={30}
                  className="px-3 py-1.5 bg-background border border-border/40 rounded-xl text-lg font-bold text-text-primary focus:outline-none focus:border-accent-purple"
                />
                <button
                  onClick={handleSaveName}
                  className="p-2 bg-accent-purple text-white rounded-xl hover:bg-accent-purple/90 transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                  {name ? `Developer, ${name}` : 'Welcome, Developer'}
                </h1>
                <button
                  onClick={() => {
                    setTempName(name)
                    setIsEditingName(true)
                  }}
                  className="p-1 rounded-lg hover:bg-border/20 text-text-secondary hover:text-text-primary transition-colors"
                  title="Edit Name"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-text-secondary max-w-md">
            This dashboard displays your offline progress stored locally. Finish roadmaps to download certificates.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="flex gap-4 z-10">
          {/* Streak */}
          <div className="p-4 bg-background-card/50 border border-border/10 rounded-2xl flex items-center gap-3 min-w-[130px]">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Flame className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="text-[10px] text-text-secondary uppercase tracking-wider block">Active Streak</span>
              <span className="text-xl font-black text-text-primary">{streak} Days</span>
            </div>
          </div>
          {/* Study time this week */}
          <div className="p-4 bg-background-card/50 border border-border/10 rounded-2xl flex items-center gap-3 min-w-[130px]">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-text-secondary uppercase tracking-wider block">This Week</span>
              <span className="text-xl font-black text-text-primary">{weeklyMinutes}m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <AchievementsPanel />

      {/* Main Grid: Goals & Tech Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Weekly Goal & Info (1/3) */}
        <div className="space-y-6">
          
          {/* Weekly Goal Card */}
          <div className="glass p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-text-primary flex items-center gap-1.5">
                <Target className="w-5 h-5 text-accent-purple" /> Study Goal
              </h3>
              
              {isEditingGoal ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={tempGoal}
                    onChange={(e) => setTempGoal(Number(e.target.value))}
                    min={1}
                    max={100}
                    className="w-16 px-2 py-1 bg-background border border-border/30 rounded-lg text-xs font-bold text-center"
                  />
                  <button
                    onClick={handleSaveGoal}
                    className="p-1.5 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setTempGoal(goalHours)
                    setIsEditingGoal(true)
                  }}
                  className="text-xs text-accent-purple flex items-center gap-1 hover:underline font-semibold"
                >
                  Edit Goal
                </button>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Progress: {weeklyMinutes}m spent</span>
                <span className="text-text-primary font-bold">{goalHours}h target</span>
              </div>
              <div className="w-full h-3 bg-border/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan transition-all duration-300"
                  style={{ width: `${weeklyProgressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-text-secondary text-center">
                {weeklyProgressPercent === 100 
                  ? "🎉 Weekly study target accomplished!" 
                  : `You are at ${weeklyProgressPercent}% of your weekly goal.`}
              </p>
            </div>
          </div>

          {/* Recent Visits */}
          <div className="glass p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-text-primary flex items-center gap-1.5">
              <Compass className="w-5 h-5 text-accent-cyan" /> Recently Viewed
            </h3>
            {recentVisits.length > 0 ? (
              <div className="space-y-2">
                {recentVisits.map((v, i) => (
                  <Link
                    key={i}
                    to={`/learn/${v.techId}?tab=${v.tab}`}
                    className="flex justify-between items-center p-3 bg-background-card/30 hover:bg-background-card/60 border border-border/10 hover:border-accent-purple/20 rounded-xl transition-all duration-200"
                  >
                    <div>
                      <span className="text-xs font-bold text-text-primary capitalize">{v.techId}</span>
                      <span className="text-[10px] text-text-secondary block capitalize">{v.tab} Tab</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-secondary text-center py-4">No recent visits yet. Start exploring technology roadmaps!</p>
            )}
          </div>

          {/* PDF Downloads */}
          <div className="glass p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-text-primary flex items-center gap-1.5">
              <Download className="w-5 h-5 text-accent-emerald" /> Export History
            </h3>
            {pdfDownloads.length > 0 ? (
              <div className="space-y-2">
                {pdfDownloads.map((d, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 bg-background-card/30 border border-border/10 rounded-xl"
                  >
                    <div>
                      <span className="text-xs font-bold text-text-primary">{d.techTitle}</span>
                      <span className="text-[9px] text-text-secondary block">
                        {new Date(d.downloadedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-[10px] bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 px-2 py-0.5 rounded-full font-bold uppercase">
                      PDF
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-secondary text-center py-4">No PDF roadmaps exported yet.</p>
            )}
          </div>

        </div>

        {/* Right Column: Tech Academies & Progress Cards (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-text-primary">Academy Progress</h2>
            <Link 
              to="/roadmaps" 
              className="text-xs font-bold text-accent-purple hover:underline flex items-center gap-1"
            >
              All Technologies <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {progressSummary.map(tech => {
              const techMeta = getTechMetadata(tech.techId)
              if (!techMeta) return null

              const title = techMeta.title
              const isCertified = tech.percent === 100

              return (
                <div
                  key={tech.techId}
                  className="glass-card p-5 rounded-2xl border border-border/20 hover:border-accent-purple/30 transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-text-primary group-hover:text-accent-purple transition-colors capitalize">
                          {title}
                        </h3>
                        <span className="text-[10px] text-text-secondary">
                          {techMeta.description.slice(0, 50)}...
                        </span>
                      </div>
                      
                      {isCertified && (
                        <Link 
                          to={`/certificate/${tech.techId}`}
                          className="text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 p-1.5 rounded-lg hover:scale-105 transition-transform"
                          title="View Study Certificate"
                        >
                          <Award className="w-4 h-4" />
                        </Link>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-text-secondary font-medium">
                          {tech.completedCount} / {tech.totalTopics} Topics
                        </span>
                        <span className="font-bold text-text-primary">{tech.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-border/20 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            isCertified ? 'bg-accent-emerald' : 'bg-accent-purple'
                          }`}
                          style={{ width: `${tech.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-border/10 flex justify-between items-center text-xs">
                    <Link
                      to={`/learn/${tech.techId}`}
                      className="text-text-secondary hover:text-text-primary font-medium flex items-center gap-0.5"
                    >
                      Study Roadmap <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    {isCertified ? (
                      <Link
                        to={`/certificate/${tech.techId}`}
                        className="text-accent-emerald hover:underline font-bold flex items-center gap-0.5"
                      >
                        Claim Certificate <Award className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="text-[10px] text-text-secondary italic">
                        {tech.totalTopics - tech.completedCount} left to cert
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Bookmarks Call to Action */}
          <div className="glass p-5 rounded-2xl flex justify-between items-center border border-accent-purple/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-text-primary">Study Bookmarks</h4>
                <p className="text-xs text-text-secondary">Access bookmarked topics, cheatsheets, and interview questions.</p>
              </div>
            </div>
            <Link
              to="/bookmarks"
              className="px-4 py-2 bg-accent-purple hover:bg-accent-purple/95 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-accent-purple/10"
            >
              Open Bookmarks
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}
