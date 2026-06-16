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

function TechHubInner() {
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

  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      {isLoading ? (
        <PageLoadingSpinner />
      ) : !data ? (
        <div className="py-24 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Technology Not Found</h2>
          <p className="text-text-secondary mb-6">
            We couldn’t find a learning path for &quot;{technology}&quot;.
          </p>
          <Link href="/roadmaps" className="text-accent-purple font-semibold hover:underline">
            Go back to Roadmaps
          </Link>
        </div>
      ) : (
        <>
          <SEOHead
            title={`Complete ${data.roadmap.overview.title} Roadmap & Study Guide`}
            description={`Master ${data.roadmap.overview.title} with StackForge structured learning path, study notes, interview preparations, cheat sheets, and downloadable roadmap PDFs.`}
          />
          {/* Header and content omitted for brevity */}
          <AIAssistant techTitle={data.roadmap.overview.title} qaPairs={data.resources.aiQA} />
          <MobileTabBar activeTab={activeTab} onChangeTab={setTab} />
          {fullscreenCode && (
            <div className="code-overlay animate-fadeIn">
              {/* Overlay content omitted */}
            </div>
          )}
        </>
      )}
    </Suspense>
  );
}
// Wrapper to satisfy Suspense requirement for useSearchParams
export default function TechHubPage() {
  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <TechHubInner />
    </Suspense>
  );
}
