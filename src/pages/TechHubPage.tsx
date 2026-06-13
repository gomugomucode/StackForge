import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import {
  Briefcase,
  TrendingUp,
  Coins,
  Download,
  CheckCircle,
  Circle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  ChevronRight,
  Sparkles,
  Bookmark,
  Award,
  Maximize2,
  X
} from 'lucide-react'
import { getTechData } from '../data/db'
import type { FullTechData } from '../data/db'
import { printTechRoadmapPdf } from '../utils/printPdf'
import { SEOHead } from '../components/ui/SEOHead'
import { Card } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { PageLoadingSpinner } from '../components/ui/PageLoadingSpinner'

// New V2 Sub-Components
import { ResourcesTab } from '../components/tech/ResourcesTab'
import { LearningPathTab } from '../components/tech/LearningPathTab'
import { SkillTreeTab } from '../components/tech/SkillTreeTab'
import { AIAssistant } from '../components/tech/AIAssistant'
import { MobileTabBar } from '../components/tech/MobileTabBar'
import { ChapterQuiz } from '../components/tech/ChapterQuiz'
import { useAchievementToast } from '../components/ui/AchievementContext'

// V2 Progress Hooks
import { 
  recordVisit, 
  isBookmarked, 
  toggleBookmark, 
  recordPdfDownload,
  getQuizScore,
} from '../hooks/useProgress'
import { checkAchievements } from '../data/achievements'
import { getAllTechnologies } from '../data/db'

const MOBILE_TAB_ORDER = ['overview', 'roadmap', 'notes', 'resources', 'projects', 'interviews', 'cheatsheets']

export function TechHubPage() {
  const { technology } = useParams<{ technology: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const techKey = technology?.toLowerCase() || ''
  
  const [data, setData] = useState<FullTechData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // URL Tab handling
  const activeTab = searchParams.get('tab') || 'overview'

  // Notes active chapter state
  const [activeChapterId, setActiveChapterId] = useState<string>('')

  // Interview collapsed states
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null)

  // Cheatsheets search & filter states
  const [cheatsheetSearch, setCheatsheetSearch] = useState('')
  const [selectedCheatsheetCat, setSelectedCheatsheetCat] = useState('All')

  // Copy feedback state
  const [copiedText, setCopiedText] = useState<string | null>(null)

  // New V3 Mobile UX states
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [readingMode, setReadingMode] = useState(false)
  const [fullscreenCode, setFullscreenCode] = useState<string | null>(null)
  const [quizScoreVersion, setQuizScoreVersion] = useState(0)
  const [slideDirection, setSlideDirection] = useState(0)
  const { showAchievement } = useAchievementToast()

  // Load technology data asynchronously on mount/change
  useEffect(() => {
    setIsLoading(true)
    getTechData(techKey).then((res) => {
      setData(res || null)
      setIsLoading(false)
    }).catch(() => {
      setData(null)
      setIsLoading(false)
    })
  }, [techKey])

  // Record visit
  useEffect(() => {
    if (data) {
      recordVisit(techKey, data.roadmap.overview.title, activeTab)
    }
  }, [techKey, data, activeTab])

  // Roadmap Checklists state from LocalStorage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(`stackforge-completed-${techKey}`)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  // Set default chapter once data loads
  useEffect(() => {
    if (data && data.notes.length > 0) {
      setActiveChapterId(data.notes[0].id)
    }
  }, [techKey, data])

  // Save progress changes
  useEffect(() => {
    localStorage.setItem(`stackforge-completed-${techKey}`, JSON.stringify(completedTopics))
  }, [completedTopics, techKey])

  // Cheatsheet categories (must be before early returns)
  const cheatsheetCategories = useMemo(() => {
    if (!data) return ['All']
    const cats = new Set(data.cheatsheet.map((c) => c.category))
    return ['All', ...Array.from(cats)]
  }, [data])

  const filteredCheatsheet = useMemo(() => {
    if (!data) return []
    return data.cheatsheet.filter((item) => {
      const matchSearch =
        item.command.toLowerCase().includes(cheatsheetSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(cheatsheetSearch.toLowerCase())
      const matchCat = selectedCheatsheetCat === 'All' || item.category === selectedCheatsheetCat
      return matchSearch && matchCat
    })
  }, [data, cheatsheetSearch, selectedCheatsheetCat])

  const setTab = useCallback((tabName: string) => {
    setSearchParams({ tab: tabName })
  }, [setSearchParams])

  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 80) return
    const currentIndex = MOBILE_TAB_ORDER.indexOf(activeTab)
    if (info.offset.x < 0 && currentIndex < MOBILE_TAB_ORDER.length - 1) {
      setSlideDirection(-1)
      setTab(MOBILE_TAB_ORDER[currentIndex + 1])
    } else if (info.offset.x > 0 && currentIndex > 0) {
      setSlideDirection(1)
      setTab(MOBILE_TAB_ORDER[currentIndex - 1])
    }
  }, [activeTab, setTab])

  const triggerAchievementCheck = useCallback(() => {
    const unlocked = checkAchievements(getAllTechnologies())
    unlocked.forEach((a) => showAchievement(a))
  }, [showAchievement])

  if (isLoading) {
    return <PageLoadingSpinner />
  }

  if (!data) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Technology Not Found</h2>
        <p className="text-text-secondary mb-6">We couldn't find a learning path for "{technology}".</p>
        <Link to="/roadmaps" className="text-accent-purple font-semibold hover:underline">
          Go back to Roadmaps
        </Link>
      </div>
    )
  }

  const techTitle = data.roadmap.overview.title
  const { overview, phases } = data.roadmap

  // Calculate Roadmap Progress
  const totalTopics = phases.reduce((acc, phase) => acc + phase.topics.length, 0)
  const completedCount = Object.keys(completedTopics).filter(
    (key) => completedTopics[key] && phases.some(p => p.topics.some(t => t.name === key))
  ).length
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0

  const toggleTopic = (topicName: string) => {
    setCompletedTopics((prev) => {
      const next = { ...prev, [topicName]: !prev[topicName] }
      return next
    })
    setTimeout(triggerAchievementCheck, 0)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  // Get active chapter
  const activeChapter = data.notes.find((ch) => ch.id === activeChapterId) || data.notes[0]
  const activeChapterIndex = data.notes.findIndex((ch) => ch.id === activeChapter?.id)
  const notesProgressPct = data.notes.length > 0
    ? Math.round(((activeChapterIndex + 1) / data.notes.length) * 100)
    : 0

  void quizScoreVersion

  const getChapterQuizPercent = (chapterId: string): number | null => {
    const score = getQuizScore(techKey, chapterId)
    if (!score || score.total === 0) return null
    return Math.round((score.score / score.total) * 100)
  }

  return (
    <>
      <SEOHead
        title={`Complete ${techTitle} Roadmap & Study Guide`}
        description={`Master ${techTitle} with StackForge structured learning path, study notes, interview preparations, cheat sheets, and downloadable roadmap PDFs.`}
      />

      {/* Hero Header */}
      <div className={`relative py-12 md:py-16 overflow-hidden bg-surface-950/40 border-b border-black/[0.06] dark:border-white/[0.06] ${readingMode ? 'hidden' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-cyan/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-accent-purple/15 text-accent-purple border border-accent-purple/20 mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Learning Path
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
              Master <span className="gradient-text">{techTitle}</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              {overview.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl glass-card flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-accent-cyan" />
                <div>
                  <div className="text-xs text-text-muted">Jobs Demand</div>
                  <div className="text-sm font-bold text-text-primary">Very High</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl glass-card flex items-center gap-3">
                <Coins className="w-5 h-5 text-accent-emerald" />
                <div>
                  <div className="text-xs text-text-muted">Average Salary</div>
                  <div className="text-sm font-bold text-text-primary">{overview.salaryInfo.split(',')[0]}</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl glass-card flex items-center gap-3 col-span-2">
                <div className="w-full">
                  <div className="flex justify-between items-center text-xs text-text-muted mb-1.5">
                    <span>Syllabus Progress</span>
                    <span className="font-semibold text-accent-purple">{progressPercent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-purple to-accent-violet transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Selector Navigation */}
      <div className={`sticky top-16 md:top-[4.5rem] z-40 bg-surface-900/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06] ${readingMode ? 'hidden' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar py-3 gap-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'roadmap', label: 'Roadmap Timeline' },
              { id: 'notes', label: 'Study Notes' },
              { id: 'resources', label: 'Resources' },
              { id: 'learning-path', label: 'Learning Path' },
              { id: 'skill-tree', label: 'Skill Tree' },
              { id: 'cheatsheets', label: 'Cheat Sheet' },
              { id: 'projects', label: 'Hands-on Projects' },
              { id: 'interviews', label: 'Interview Prep' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20'
                    : 'glass text-text-secondary hover:text-text-primary hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky reading progress bar — Notes tab (mobile) */}
      {activeTab === 'notes' && data.notes.length > 0 && (
        <>
          <div
            className="reading-progress-bar md:hidden"
            style={{ width: `${notesProgressPct}%` }}
          />
          <div className="sticky top-16 z-30 md:hidden bg-surface-900/95 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06] px-4 py-2">
            <span className="text-xs font-bold text-text-secondary">
              Chapter {activeChapterIndex + 1} of {data.notes.length}
            </span>
          </div>
        </>
      )}

      {/* Tab Contents */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 md:pb-10 ${readingMode ? 'pt-4' : ''}`}>
        
        {/* Certificate Banner */}
        {progressPercent === 100 && (
          <div className="mb-6 max-w-4xl mx-auto">
            <div className="glass p-5 rounded-2xl border border-accent-emerald/30 bg-accent-emerald/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-emerald/10 flex items-center justify-center text-accent-emerald shrink-0">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary">Roadmap Fully Completed!</h4>
                  <p className="text-xs text-text-secondary">Congratulations! You have completed 100% of the syllabus. Claim your study certificate of completion now.</p>
                </div>
              </div>
              <Link
                to={`/certificate/${techKey}`}
                className="px-5 py-2.5 bg-accent-emerald hover:bg-accent-emerald/90 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-accent-emerald/15 shrink-0"
              >
                Claim Study Certificate
              </Link>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: slideDirection >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection >= 0 ? -40 : 40 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="touch-pan-y"
          >
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent-purple" /> What is {techTitle}?
              </h2>
              <p className="text-text-secondary leading-relaxed text-base">
                {overview.whatIsIt}
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-bold text-text-primary mb-3">Why Learn It?</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{overview.whyLearnIt}</p>
              </Card>

              <Card>
                <h3 className="text-lg font-bold text-text-primary mb-3">Career Path Opportunities</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{overview.careerOpportunities}</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent-emerald" /> Salary & Earnings
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-2">
                  A career specializing in {techTitle} yields premium compensations globally:
                </p>
                <div className="text-2xl font-extrabold text-accent-emerald">{overview.salaryInfo}</div>
              </Card>

              <Card>
                <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent-cyan" /> Market Demand
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-2">
                  How sought after is this technology by startups and enterprise sectors?
                </p>
                <div className="text-lg font-bold text-text-primary">{overview.industryDemand}</div>
              </Card>
            </div>

            {/* Bottom PDF Download Card */}
            <Card className="bg-gradient-to-r from-accent-purple/5 to-accent-violet/5 border-dashed border-accent-purple/30 text-center py-8">
              <h3 className="text-lg font-bold text-text-primary mb-2">Download Complete Reference Guide</h3>
              <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
                Get a beautifully formatted PDF containing the roadmap timeline, interview questions, projects, and tips.
              </p>
              <Button onClick={() => { printTechRoadmapPdf(techKey, data); recordPdfDownload(techKey, data.roadmap.overview.title); }} variant="primary" size="md" className="gap-2">
                <Download className="w-4 h-4" /> Download {techTitle} Roadmap PDF
              </Button>
            </Card>
          </div>
        )}

        {/* ROADMAP TIMELINE TAB */}
        {activeTab === 'roadmap' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Syllabus Path</h2>
                <p className="text-text-secondary text-sm">Check off topics as you learn to track your progress.</p>
              </div>
              <Button onClick={() => { printTechRoadmapPdf(techKey, data); recordPdfDownload(techKey, data.roadmap.overview.title); }} variant="outline" size="sm" className="gap-2 shrink-0">
                <Download className="w-4 h-4" /> Print PDF
              </Button>
            </div>

            {/* Interactive Timeline Layout */}
            <div className="relative border-l border-surface-800 pl-6 md:pl-8 space-y-12">
              {phases.map((phase, phaseIdx) => (
                <div key={phaseIdx} className="relative">
                  {/* Timeline bullet dot */}
                  <span className="absolute -left-[37px] md:-left-[45px] top-1.5 w-6 h-6 rounded-full bg-surface-900 border-2 border-accent-purple flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-purple" />
                  </span>

                  <div>
                    <h3 className="text-lg font-extrabold text-text-primary mb-1">{phase.title}</h3>
                    <p className="text-text-secondary text-sm mb-6">{phase.description}</p>

                    {/* Progress Cards */}
                    <div className="grid grid-cols-1 gap-4">
                      {phase.topics.map((topic, topicIdx) => {
                        const isCompleted = !!completedTopics[topic.name]
                        return (
                          <div
                            key={topicIdx}
                            onClick={() => toggleTopic(topic.name)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                              isCompleted
                                ? 'bg-accent-purple/5 border-accent-purple/30 text-text-primary'
                                : 'bg-surface-950/40 border-black/[0.05] dark:border-white/[0.05] hover:border-accent-purple/30 text-text-primary'
                            }`}
                          >
                            <button
                              type="button"
                              className="mt-0.5 text-accent-purple focus:outline-none shrink-0"
                              aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 fill-accent-purple text-white" />
                              ) : (
                                <Circle className="w-5 h-5 text-text-muted hover:text-accent-purple" />
                              )}
                            </button>
                            <div className="flex-1">
                              <h4 className={`font-semibold text-sm ${isCompleted ? 'line-through text-text-secondary' : ''}`}>
                                {topic.name}
                              </h4>
                              {topic.description && (
                                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                  {topic.description}
                                </p>
                              )}
                              {topic.resources && topic.resources.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {topic.resources.map((res, rIdx) => (
                                    <span
                                      key={rIdx}
                                      className="inline-flex items-center gap-0.5 text-[10px] font-medium bg-surface-800 text-text-secondary px-2 py-0.5 rounded border border-black/[0.05] dark:border-white/[0.05]"
                                    >
                                      {res}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom PDF Download Card */}
            <Card className="bg-gradient-to-r from-accent-purple/5 to-accent-violet/5 border-dashed border-accent-purple/30 text-center py-8 mt-12">
              <h3 className="text-lg font-bold text-text-primary mb-2">Printable Reference File</h3>
              <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
                Generate the dynamic syllabus to display on your workspace or share with your team.
              </p>
              <Button onClick={() => { printTechRoadmapPdf(techKey, data); recordPdfDownload(techKey, data.roadmap.overview.title); }} variant="primary" size="md" className="gap-2">
                <Download className="w-4 h-4" /> Download Roadmap PDF
              </Button>
            </Card>
          </div>
        )}

        {/* STUDY NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            
            {/* Collapsible Sidebar selector for Mobile (visible only on mobile and when not in reading mode) */}
            {!readingMode && (
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setSidebarOpen(prev => !prev)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-surface-950/40 text-text-primary font-semibold text-sm"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-accent-purple" />
                    {activeChapter?.title || 'Select Chapter'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {sidebarOpen && (
                  <div className="mt-2 p-2 rounded-2xl bg-surface-900 border border-black/[0.06] dark:border-white/[0.06] space-y-1 z-30 relative shadow-xl">
                    {data.notes.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setActiveChapterId(ch.id)
                          setSidebarOpen(false)
                        }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                          activeChapterId === ch.id
                            ? 'bg-accent-purple text-white'
                            : 'text-text-secondary hover:bg-surface-850 hover:text-text-primary'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate">{ch.title}</span>
                          {getChapterQuizPercent(ch.id) === 100 && (
                            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              
              {/* Chapters sidebar list (hidden on mobile and hidden in reading mode) */}
              <div className={`lg:col-span-1 space-y-2 ${readingMode ? 'hidden' : 'hidden lg:block'}`}>
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-muted px-2 mb-3">Syllabus Chapters</h3>
                {data.notes.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterId(ch.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                      activeChapterId === ch.id
                        ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'
                        : 'text-text-secondary hover:text-text-primary hover:bg-black/[0.02] dark:hover:bg-white/[0.02] border border-transparent'
                    }`}
                  >
                    <span className="truncate flex-1">{ch.title.split(': ')[1] || ch.title}</span>
                    <span className="flex items-center gap-1 shrink-0">
                      {(() => {
                        const pct = getChapterQuizPercent(ch.id)
                        if (pct === 100) return <CheckCircle className="w-4 h-4 text-accent-emerald" />
                        if (pct !== null) return <span className="text-[10px] font-bold text-text-muted">{pct}%</span>
                        return null
                      })()}
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeChapterId === ch.id ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Chapter Details display */}
              <div className={readingMode ? 'lg:col-span-4' : 'lg:col-span-3'}>
                {activeChapter ? (
                  <Card className="space-y-6">
                    {/* Chapter reading progress indicator */}
                    <div>
                      {(() => {
                        const activeIndex = data.notes.findIndex(ch => ch.id === activeChapter.id)
                        const totalNotes = data.notes.length
                        const pctRead = Math.round(((activeIndex + 1) / totalNotes) * 100)
                        return (
                          <div className="mb-4">
                            <div className="flex justify-between items-center text-xs text-text-secondary mb-1.5 font-medium">
                              <span className="bg-surface-850 px-2.5 py-1 rounded-lg border border-black/[0.04] dark:border-white/[0.04] text-[10px] font-bold text-text-muted uppercase tracking-wider">
                                Notes Progress
                              </span>
                              <span className="font-bold text-accent-purple">
                                Chapter {activeIndex + 1} of {totalNotes} ({pctRead}%)
                              </span>
                            </div>
                            <div className="w-full h-1 bg-surface-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan transition-all duration-300"
                                style={{ width: `${pctRead}%` }}
                              />
                            </div>
                          </div>
                        )
                      })()}
                    </div>

                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-text-primary">{activeChapter.title}</h2>
                        <div className="h-0.5 w-12 bg-accent-purple mt-2" />
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Reading mode toggle */}
                        <button
                          onClick={() => setReadingMode(prev => !prev)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            readingMode
                              ? 'bg-accent-purple/20 border-accent-purple/30 text-accent-purple'
                              : 'bg-transparent border-border/30 text-text-secondary hover:text-text-primary'
                          }`}
                          title={readingMode ? "Exit Reading Mode" : "Enter Reading Mode"}
                        >
                          <BookOpen className="w-4 h-4" />
                        </button>

                        {/* Bookmark note toggle */}
                        <button
                          onClick={() => {
                            toggleBookmark({
                              id: `${techKey}-note-${activeChapter.id}`,
                              type: 'note',
                              techId: techKey,
                              title: activeChapter.title,
                              subtitle: `${techTitle} Study Notes`,
                              savedAt: new Date().toISOString()
                            })
                            triggerAchievementCheck()
                          }}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isBookmarked(`${techKey}-note-${activeChapter.id}`)
                              ? 'bg-accent-purple/20 border-accent-purple/30 text-accent-purple'
                              : 'bg-transparent border-border/30 text-text-secondary hover:text-text-primary'
                          }`}
                          title="Bookmark Notes"
                        >
                          <Bookmark className="w-4 h-4" fill={isBookmarked(`${techKey}-note-${activeChapter.id}`) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    <p className="text-text-secondary leading-relaxed text-base whitespace-pre-line">
                      {activeChapter.content}
                    </p>

                    {/* Summary Box */}
                    {activeChapter.summary && (
                      <div className="p-4 rounded-xl bg-accent-purple/5 border border-accent-purple/20">
                        <div className="text-xs font-bold uppercase tracking-wider text-accent-purple mb-1">Key Takeaway</div>
                        <p className="text-text-secondary text-sm leading-relaxed">{activeChapter.summary}</p>
                      </div>
                    )}

                    {/* Code Editor Snippet Playground */}
                    {activeChapter.codeSnippet && (
                      <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
                        <div className="bg-surface-850 px-4 py-2 flex justify-between items-center border-b border-black/[0.06] dark:border-white/[0.06]">
                          <span className="text-xs font-mono text-text-muted capitalize">
                            {activeChapter.codeSnippet.language} Playground
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {/* Full-screen toggle button */}
                            <button
                              onClick={() => setFullscreenCode(activeChapter.codeSnippet!.code)}
                              className="p-1.5 rounded hover:bg-surface-800 text-text-muted hover:text-text-primary transition-all flex items-center gap-1.5 text-xs cursor-pointer"
                              title="Full Screen Code Examples"
                            >
                              <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
                            </button>

                            <button
                              onClick={() => handleCopy(activeChapter.codeSnippet!.code)}
                              className="p-1.5 rounded hover:bg-surface-800 text-text-muted hover:text-text-primary transition-all flex items-center gap-1 text-xs cursor-pointer"
                            >
                              {copiedText === activeChapter.codeSnippet.code ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-accent-emerald" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" /> Copy Code
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        <pre className="bg-surface-950 p-5 overflow-x-auto font-mono text-sm text-[#cbd5e1] leading-relaxed">
                          <code>{activeChapter.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}

                    {activeChapter.quizQuestions && activeChapter.quizQuestions.length > 0 && (
                      <ChapterQuiz
                        techId={techKey}
                        chapterId={activeChapter.id}
                        chapterTitle={activeChapter.title}
                        questions={activeChapter.quizQuestions}
                        onScoreSaved={() => setQuizScoreVersion((v) => v + 1)}
                      />
                    )}
                  </Card>
                ) : (
                  <div className="text-center py-12 text-text-secondary">Select a chapter on the sidebar to begin studying.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeTab === 'resources' && (
          <ResourcesTab techId={techKey} techTitle={techTitle} resourcesData={data.resources} />
        )}

        {/* LEARNING PATH TAB */}
        {activeTab === 'learning-path' && (
          <LearningPathTab techId={techKey} learningPath={data.resources.learningPath} />
        )}

        {/* SKILL TREE TAB */}
        {activeTab === 'skill-tree' && (
          <SkillTreeTab techId={techKey} skillTree={data.resources.skillTree} />
        )}

        {/* CHEATSHEETS TAB */}
        {activeTab === 'cheatsheets' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search commands or syntax..."
                  value={cheatsheetSearch}
                  onChange={(e) => setCheatsheetSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-950 border border-black/[0.06] dark:border-white/[0.06] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple/20"
                />
              </div>

              {/* Tag filters */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {cheatsheetCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCheatsheetCat(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCheatsheetCat === cat
                        ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/35'
                        : 'glass text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCheatsheet.map((item, idx) => (
                <Card key={idx} className="flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-purple bg-accent-purple/10 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <button
                        onClick={() => {
                          toggleBookmark({
                            id: `${techKey}-cheatsheet-${item.command.replace(/\s+/g, '-').toLowerCase()}`,
                            type: 'cheatsheet',
                            techId: techKey,
                            title: item.command,
                            subtitle: item.description,
                            savedAt: new Date().toISOString()
                          })
                        }}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isBookmarked(`${techKey}-cheatsheet-${item.command.replace(/\s+/g, '-').toLowerCase()}`)
                            ? 'bg-accent-purple/20 border-accent-purple/30 text-accent-purple'
                            : 'bg-transparent border-border/30 text-text-secondary hover:text-text-primary'
                        }`}
                        title="Bookmark Command"
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isBookmarked(`${techKey}-cheatsheet-${item.command.replace(/\s+/g, '-').toLowerCase()}`) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <h3 className="font-mono font-bold text-sm text-text-primary mb-2 bg-surface-850 p-2 rounded border border-black/[0.03] dark:border-white/[0.03]">
                      {item.command}
                    </h3>
                    <p className="text-text-secondary text-xs leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {item.example && (
                    <div className="relative mt-auto">
                      <pre className="bg-surface-950 p-3.5 rounded-lg font-mono text-xs text-[#94a3b8] overflow-x-auto">
                        {item.example}
                      </pre>
                      <button
                        onClick={() => handleCopy(item.example || '')}
                        className="absolute right-2.5 top-2.5 p-1 rounded bg-surface-900/60 hover:bg-surface-900 text-text-muted hover:text-text-primary transition-all"
                        title="Copy example"
                      >
                        {copiedText === item.example ? (
                          <Check className="w-3.5 h-3.5 text-accent-emerald" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </Card>
              ))}

              {filteredCheatsheet.length === 0 && (
                <div className="col-span-2 text-center py-12 text-text-secondary">
                  No matching cheatsheet items found.
                </div>
              )}
            </div>
            </div>
          )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-text-primary">Hands-on Learning Projects</h2>
              <p className="text-text-secondary text-sm mt-1">
                Nothing beats writing lines of code. Build these tasks incrementally to solidifying your expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {data.projects.map((proj, idx) => {
                const diffColors =
                  proj.difficulty === 'Beginner'
                    ? 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20'
                    : proj.difficulty === 'Intermediate'
                    ? 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20'
                    : 'text-accent-rose bg-accent-rose/10 border-accent-rose/20'

                return (
                  <Card key={idx} className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-purple" />
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${diffColors} mb-2`}>
                          {proj.difficulty}
                        </span>
                        <h3 className="text-xl font-bold text-text-primary">{proj.title}</h3>
                      </div>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {proj.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      <div>
                        <h4 className="font-bold text-xs uppercase text-text-muted tracking-wider mb-2">Key Skills Acquired</h4>
                        <div className="flex flex-wrap gap-2">
                          {proj.skillsLearned.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-xs bg-surface-850 text-text-secondary px-2.5 py-1 rounded-lg border border-black/[0.05] dark:border-white/[0.05]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs uppercase text-text-muted tracking-wider mb-2">Stack / Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {proj.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-xs bg-accent-purple/10 text-accent-purple px-2.5 py-1 rounded-lg border border-accent-purple/20 font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Source Code Folder Structure Tree */}
                    <div className="mb-6">
                      <h4 className="font-bold text-xs uppercase text-text-muted tracking-wider mb-2">Project Folder Blueprint</h4>
                      <pre className="bg-surface-950 p-4 rounded-xl font-mono text-xs text-[#94a3b8] overflow-x-auto border border-black/[0.05] dark:border-white/[0.05]">
                        {proj.sourceCodeStructure}
                      </pre>
                    </div>

                    {/* Step-by-Step Roadmap */}
                    <div>
                      <h4 className="font-bold text-xs uppercase text-text-muted tracking-wider mb-3">Development Roadmap Steps</h4>
                      <ol className="space-y-3">
                        {proj.developmentRoadmap.map((step, sIdx) => (
                          <li key={sIdx} className="flex gap-3 text-sm text-text-secondary">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-surface-800 text-accent-purple flex items-center justify-center font-mono font-bold text-xs">
                              {sIdx + 1}
                            </span>
                            <span className="pt-0.5 leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* INTERVIEWS TAB */}
        {activeTab === 'interviews' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-text-primary">Standard Interview Questions</h2>
              <p className="text-text-secondary text-sm mt-1">
                Prepare for technical exams and coding interview rounds with step-by-step conceptual explanations.
              </p>
            </div>

            <div className="space-y-4">
              {data.interviews.map((item, idx) => {
                const isOpen = openQuestionIndex === idx
                const levelColors =
                  item.level === 'Beginner'
                    ? 'text-accent-emerald bg-accent-emerald/10'
                    : item.level === 'Intermediate'
                    ? 'text-accent-cyan bg-accent-cyan/10'
                    : 'text-accent-rose bg-accent-rose/10'

                return (
                  <div
                    key={idx}
                    className="glass-card rounded-2xl overflow-hidden transition-colors border border-black/[0.06] dark:border-white/[0.06]"
                  >
                    <button
                      onClick={() => setOpenQuestionIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${levelColors}`}>
                          {item.level}
                        </span>
                        
                        <div
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark({
                              id: `${techKey}-interview-${idx}`,
                              type: 'interview',
                              techId: techKey,
                              title: item.question,
                              subtitle: item.answer,
                              savedAt: new Date().toISOString()
                            })
                          }}
                          className={`p-1 rounded bg-background border transition-all cursor-pointer ${
                            isBookmarked(`${techKey}-interview-${idx}`)
                              ? 'border-accent-purple text-accent-purple bg-accent-purple/10'
                              : 'border-border/30 text-text-secondary hover:text-text-primary'
                          }`}
                          title="Bookmark Question"
                        >
                          <Bookmark className="w-3 h-3" fill={isBookmarked(`${techKey}-interview-${idx}`) ? "currentColor" : "none"} />
                        </div>

                        <span className="font-bold text-text-primary text-sm md:text-base">
                          {item.question}
                        </span>
                      </div>
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-surface-800 flex items-center justify-center">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-text-secondary" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-text-secondary" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 text-text-secondary text-sm leading-relaxed border-t border-black/[0.04] dark:border-white/[0.04] pt-4 bg-surface-950/20">
                        <div className="font-semibold text-text-primary mb-1">Model Answer:</div>
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Floating local AI Study Guide Assistant */}
      <AIAssistant techTitle={techTitle} qaPairs={data.resources.aiQA} />

      {/* Mobile-friendly bottom tab bar */}
      <MobileTabBar activeTab={activeTab} onChangeTab={setTab} />

      {/* Full-screen Code Block Overlay */}
      {fullscreenCode && (
        <div className="code-overlay animate-fadeIn">
          <div className="flex justify-between items-center mb-4 border-b border-white/[0.08] pb-3">
            <span className="text-sm font-bold text-text-primary">Full-Screen Code Block</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(fullscreenCode)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1.5 cursor-pointer font-semibold"
              >
                {copiedText === fullscreenCode ? <Check className="w-3.5 h-3.5 text-accent-emerald" /> : <Copy className="w-3.5 h-3.5" />} Copy Code
              </button>
              <button
                onClick={() => setFullscreenCode(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <pre className="flex-1 bg-black/40 rounded-xl p-5 overflow-auto font-mono text-sm leading-relaxed text-[#cbd5e1] border border-white/[0.05]">
            <code>{fullscreenCode}</code>
          </pre>
        </div>
      )}
    </>
  )
}
