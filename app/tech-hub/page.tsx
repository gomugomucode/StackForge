// app/tech-hub/page.tsx
"use client";

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic';

// React and Next.js hooks
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Animation library
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

// Icon set
import { TrendingUp, Coins, Download, Sparkles, Award, Copy, Check, X } from 'lucide-react';

// Data fetching utilities
import { getTechData } from '@/lib/data/db';
import type { FullTechData } from '@/lib/data/db';
import { printTechRoadmapPdf } from '@/lib/core/utils/printPdf';

// UI components & utilities
import { SEOHead } from '@/components/ui/SEOHead';
import { Card } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { PageLoadingSpinner } from '@/components/ui/PageLoadingSpinner';
import { useAchievementToast } from '@/components/ui/AchievementContext';

// Feature tabs & sub‑components
import { ResourcesTab } from '@/components/tech/ResourcesTab';
import { LearningPathTab } from '@/components/tech/LearningPathTab';
import { SkillTreeTab } from '@/components/tech/SkillTreeTab';
import { OverviewTab } from '@/components/tech/OverviewTab';
import { NotesTab } from '@/components/tech/NotesTab';
import { ProjectsTab } from '@/components/tech/ProjectsTab';
import { InterviewsTab } from '@/components/tech/InterviewsTab';
import { AIAssistant } from '@/components/tech/AIAssistant';
import { MobileTabBar } from '@/components/tech/MobileTabBar';
import RoadmapVisualizer from '@/features/learning-paths/RoadmapVisualizer';
import CheatsheetViewer from '@/features/cheatsheet-viewer/CheatsheetViewer';

// Analytics & achievement hooks
import { recordVisit, recordPdfDownload } from '@/lib/core/hooks/useProgress';
import { checkAchievements } from '@/lib/data/achievements';
import { getAllTechnologies } from '@/lib/data/db';

// Order of tabs for mobile swipe navigation
const MOBILE_TAB_ORDER = ['overview', 'roadmap', 'notes', 'resources', 'projects', 'interviews', 'cheatsheets'];

export default function TechHubPage() {
  // URL parameters
  const params = useParams();
  const technology = (params.technology as string) || '';
  const searchParams = useSearchParams();
  const router = useRouter();
  const techKey = technology.toLowerCase();

  // State management
  const [data, setData] = useState<FullTechData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const activeTab = searchParams.get('tab') || 'overview';
  const [activeChapterId, setActiveChapterId] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [fullscreenCode, setFullscreenCode] = useState<string | null>(null);
  const [quizScoreVersion, setQuizScoreVersion] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const { showAchievement } = useAchievementToast();

  // Data fetching
  useEffect(() => {
    let cancelled = false;
    getTechData(techKey)
      .then(res => {
        if (!cancelled) {
          setData(res ?? null);
          if (res && res.notes.length > 0) setActiveChapterId(res.notes[0].id);
          else setActiveChapterId('');
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null);
          setActiveChapterId('');
          setIsLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [techKey]);

  // Analytics – record page visits
  useEffect(() => {
    if (data) recordVisit(techKey, data.roadmap.overview.title, activeTab);
  }, [techKey, data, activeTab]);

  // Persist completed topics in local storage
  const [completedTopics] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const stored = localStorage.getItem(`stackforge-completed-${techKey}`);
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`stackforge-completed-${techKey}`, JSON.stringify(completedTopics));
    }
  }, [completedTopics, techKey]);

  const setTab = useCallback((tabName: string) => {
    router.push(`?tab=${tabName}`);
  }, [router]);

  // Mobile swipe handling for tabs
  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 80) return;
    const currentIndex = MOBILE_TAB_ORDER.indexOf(activeTab);
    if (info.offset.x < 0 && currentIndex < MOBILE_TAB_ORDER.length - 1) {
      setSlideDirection(-1);
      setTab(MOBILE_TAB_ORDER[currentIndex + 1]);
    } else if (info.offset.x > 0 && currentIndex > 0) {
      setSlideDirection(1);
      setTab(MOBILE_TAB_ORDER[currentIndex - 1]);
    }
  }, [activeTab, setTab]);

  const triggerAchievementCheck = useCallback(() => {
    const unlocked = checkAchievements(getAllTechnologies());
    unlocked.forEach(a => showAchievement(a));
  }, [showAchievement]);

  // Loading / error UI
  if (isLoading) return <PageLoadingSpinner />;

  if (!data) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Technology Not Found</h2>
        <p className="text-text-secondary mb-6">
          We couldn’t find a learning path for "{technology}".
        </p>
        <Link href="/roadmaps" className="text-accent-purple font-semibold hover:underline">
          Go back to Roadmaps
        </Link>
      </div>
    );
  }

  // Main rendering logic (header, tabs, content omitted for brevity)
  const techTitle = data.roadmap.overview.title;
  const { overview, phases } = data.roadmap;
  const totalTopics = phases.reduce((a, p) => a + p.topics.length, 0);
  const completedCount = Object.keys(completedTopics).filter(
    key => completedTopics[key] && phases.some(p => p.topics.some(t => t.name === key))
  ).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };
  const activeChapter = data.notes.find(ch => ch.id === activeChapterId) || data.notes[0];
  const activeChapterIndex = data.notes.findIndex(ch => ch.id === activeChapter?.id);
  const notesProgressPct = data.notes.length > 0 ? Math.round(((activeChapterIndex + 1) / data.notes.length) * 100) : 0;

  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <>
        <SEOHead
          title={`Complete ${techTitle} Roadmap & Study Guide`}
          description={`Master ${techTitle} with StackForge structured learning path, study notes, interview preparations, cheat sheets, and downloadable roadmap PDFs.`}
        />
        {/* Header and stats would be rendered here */}
        <div className={`relative py-12 md:py-16 overflow-hidden bg-surface-950/40 border-b border-black/[0.06] dark:border-white/[0.06] ${readingMode ? 'hidden' : ''}`}>
          {/* Header content omitted for brevity */}
        </div>
        {/* Tab navigation */}
        <div className={`sticky top-16 z-30 md:top-[4.5rem] bg-surface-900/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06] ${readingMode ? 'hidden' : 'hidden md:block'}`}>
          {/* Navigation buttons omitted for brevity */}
        </div>
        {/* Tab panels – original JSX would be placed here */}
        <AIAssistant techTitle={techTitle} qaPairs={data.resources.aiQA} />
        <MobileTabBar activeTab={activeTab} onChangeTab={setTab} />
        {fullscreenCode && (
          <div className="code-overlay animate-fadeIn">
            <div className="flex justify-between items-center mb-4 border-b border-white/[0.08] pb-3">
              <span className="text-sm font-bold text-text-primary">Full‑Screen Code Block</span>
              <div className="flex items-center gap-2">
                <button onClick={() => handleCopy(fullscreenCode)} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1.5 cursor-pointer font-semibold">
                  {copiedText === fullscreenCode ? <Check className="w-3.5 h-3.5 text-accent-emerald" /> : <Copy className="w-3.5 h-3.5" />} Copy Code
                </button>
                <button onClick={() => setFullscreenCode(null)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white cursor-pointer">
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
    </Suspense>
  );
}


