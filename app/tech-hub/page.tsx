"use client";

import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import {
  TrendingUp,
  Coins,
  Download,
  Sparkles,
  Award,
  Copy,
  Check,
  X
} from 'lucide-react'
import { getTechData } from '@/lib/data/db'
import type { FullTechData } from '@/lib/data/db'
import { printTechRoadmapPdf } from '@/lib/core/utils/printPdf'
import { SEOHead } from '@/components/ui/SEOHead'
import { Card } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { PageLoadingSpinner } from '@/components/ui/PageLoadingSpinner'

// New V2 Sub-Components
import { ResourcesTab } from '@/components/tech/ResourcesTab'
import { LearningPathTab } from '@/components/tech/LearningPathTab'
import { SkillTreeTab } from '@/components/tech/SkillTreeTab'
import { AIAssistant } from '@/components/tech/AIAssistant'
import { MobileTabBar } from '@/components/tech/MobileTabBar'
import { useAchievementToast } from '@/components/ui/AchievementContext'
import RoadmapVisualizer from '@/features/learning-paths/RoadmapVisualizer';
import CheatsheetViewer from '@/features/cheatsheet-viewer/CheatsheetViewer';

// New Extracted Tab Components
import { OverviewTab } from '@/components/tech/OverviewTab'
import { NotesTab } from '@/components/tech/NotesTab'
import { ProjectsTab } from '@/components/tech/ProjectsTab'
import { InterviewsTab } from '@/components/tech/InterviewsTab'

// V2 Progress Hooks
import { 
  recordVisit, 
  recordPdfDownload
} from '@/lib/core/hooks/useProgress'
import { checkAchievements } from '@/lib/data/achievements'
import { getAllTechnologies } from '@/lib/data/db'

const MOBILE_TAB_ORDER = ['overview', 'roadmap', 'notes', 'resources', 'projects', 'interviews', 'cheatsheets']

export default function TechHubPage() {
  const params = useParams()
  const technology = (params.technology as string) || ''
  const searchParams = useSearchParams()
  const router = useRouter()
  const techKey = technology.toLowerCase()
  
  const [data, setData] = useState<FullTechData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const activeTab = searchParams.get('tab') || 'overview'
  const [activeChapterId, setActiveChapterId] = useState<string>('')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [readingMode, setReadingMode] = useState(false)
  const [fullscreenCode, setFullscreenCode] = useState<string | null>(null)
  const [quizScoreVersion, setQuizScoreVersion] = useState(0)
  const [slideDirection, setSlideDirection] = useState(0)
  const { showAchievement } = useAchievementToast()

  useEffect(() => {
    let cancelled = false
    getTechData(techKey)
      .then((res) => {
        if (!cancelled) {
          setData(res || null)
          if (res && res.notes.length > 0) {
            setActiveChapterId(res.notes[0].id)
          } else {
            setActiveChapterId('')
          }
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null)
          setActiveChapterId('')
          setIsLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [techKey])

  useEffect(() => {
    if (data) {
      recordVisit(techKey, data.roadmap.overview.title, activeTab)
    }
  }, [techKey, data, activeTab])

  const [completedTopics] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {}
    try {
      const stored = localStorage.getItem(`stackforge-completed-${techKey}`)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`stackforge-completed-${techKey}`, JSON.stringify(completedTopics))
    }
  }, [completedTopics, techKey])

  const setTab = useCallback((tabName: string) => {
    router.push(`?tab=${tabName}`)
  }, [router])

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
        <Link href="/roadmaps" className="text-accent-purple font-semibold hover:underline">
          Go back to Roadmaps
        </Link>
      </div>
    )
  }

  const techTitle = data.roadmap.overview.title
  const { overview, phases } = data.roadmap

  const totalTopics = phases.reduce((acc, phase) => acc + phase.topics.length, 0)
  const completedCount = Object.keys(completedTopics).filter(
    (key) => completedTopics[key] && phases.some(p => p.topics.some(t => t.name === key))
  ).length
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const activeChapter = data.notes.find((ch) => ch.id === activeChapterId) || data.notes[0]
  const activeChapterIndex = data.notes.findIndex((ch) => ch.id === activeChapter?.id)
  const notesProgressPct = data.notes.length > 0
    ? Math.round(((activeChapterIndex + 1) / data.notes.length) * 100)
    : 0

  return (
    <>
      <SEOHead
        title={`Complete ${techTitle} Roadmap & Study Guide`}
        description={`Master ${techTitle} with StackForge structured learning path, study notes, interview preparations, cheat sheets, and downloadable roadmap PDFs.`}
      />

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
                  <div className="text-sm font-bold text-text-primary">{overview.salaryInfo.split(',')[0]}C</div>
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

      <div className={`sticky top-16 z-30 md:top-[4.5rem] bg-surface-900/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06] ${readingMode ? 'hidden' : 'hidden md:block'}`}>
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

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 md:pb-10 ${readingMode ? 'pt-4' : ''}`}>
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
                href={`/certificate/${techKey}`}
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
        {activeTab === 'overview' && (
          <OverviewTab
            techTitle={techTitle}
            data={data}
            onDownloadPdf={() => {
              printTechRoadmapPdf(techKey, data)
              recordPdfDownload(techKey, data.roadmap.overview.title)
            }}
          />
        )}
        {activeTab === 'roadmap' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Syllabus Path</h2>
                <p className="text-text-secondary text-sm">Visual progression of your learning journey.</p>
              </div>
              <Button onClick={() => { printTechRoadmapPdf(techKey, data); recordPdfDownload(techKey, data.roadmap.overview.title); }} variant="outline" size="sm" className="gap-2 shrink-0">
                <Download className="w-4 h-4" /> Print PDF
              </Button>
            </div>
            <RoadmapVisualizer 
              nodes={phases.flatMap(phase => 
                phase.topics.map(topic => ({
                  id: topic.name.toLowerCase().replace(/\s+/g, '-'),
                  title: topic.name,
                  description: topic.description || '',
                  status: completedTopics[topic.name] ? 'completed' : (phase.topics[0].name === topic.name ? 'current' : 'locked'),
                  links: topic.resources || [],
                  dependencies: [],
                }))
              )}
            />
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
        {activeTab === 'notes' && (
          <NotesTab
            techKey={techKey}
            techTitle={techTitle}
            data={data}
            readingMode={readingMode}
            setReadingMode={setReadingMode}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            activeChapterId={activeChapterId}
            setActiveChapterId={setActiveChapterId}
            setFullscreenCode={setFullscreenCode}
            copiedText={copiedText}
            setQuizScoreVersion={setQuizScoreVersion}
            triggerAchievementCheck={triggerAchievementCheck}
            handleCopy={handleCopy}
          />
        )}
        {activeTab === 'resources' && (
          <ResourcesTab techId={techKey} techTitle={techTitle} resourcesData={data.resources} />
        )}
        {activeTab === 'learning-path' && (
          <LearningPathTab techId={techKey} learningPath={data.resources.learningPath} />
        )}
        {activeTab === 'skill-tree' && (
          <SkillTreeTab techId={techKey} skillTree={data.resources.skillTree} />
        )}
        {activeTab === 'cheatsheets' && (
          <CheatsheetViewer 
            cheatsheet={{
              id: techKey,
              title: `${techTitle} Cheat Sheet`,
              description: `Quick reference for ${techTitle} commands and syntax.`,
              category: 'Web Development',
              level: 'Intermediate',
              thumbnail: '', 
              tags: [],
              lastUpdated: '2023',
              duration: 'Quick Ref',
              type: 'cheatsheet',
              items: data.cheatsheet.map((item, idx) => ({
                id: `cs-${idx}`,
                title: item.command,
                code: item.example || item.command,
                description: item.description,
                category: item.category
              }))
            }} 
          />
        )}
        {activeTab === 'projects' && (
          <ProjectsTab data={data} />
        )}
        {activeTab === 'interviews' && (
          <InterviewsTab techKey={techKey} data={data} />
        )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AIAssistant techTitle={techTitle} qaPairs={data.resources.aiQA} />
      <MobileTabBar activeTab={activeTab} onChangeTab={setTab} />

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
          <pre className="flex-1 bg-black/40 rounded-xl p-5 overflow-x-auto font-mono text-sm leading-relaxed text-[#cbd5e1] border border-white/[0.05]">
            <code>{fullscreenCode}</code>
          </pre>
        </div>
      )}
    </>
  )
}
