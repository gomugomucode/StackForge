import React from 'react'
import { BookOpen, ChevronDown, ChevronRight, CheckCircle, Bookmark, Maximize2, Copy, Check } from 'lucide-react'
import { Card } from '../ui/SectionHeader'
import { ChapterQuiz } from './ChapterQuiz'
import { isBookmarked, toggleBookmark, getQuizScore } from '@/lib/core/hooks/useProgress'
import type { FullTechData } from '@/lib/data/db'

interface NotesTabProps {
  techKey: string
  techTitle: string
  data: FullTechData
  readingMode: boolean
  setReadingMode: React.Dispatch<React.SetStateAction<boolean>>
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeChapterId: string
  setActiveChapterId: React.Dispatch<React.SetStateAction<string>>
  setFullscreenCode: React.Dispatch<React.SetStateAction<string | null>>
  copiedText: string | null
  setQuizScoreVersion: React.Dispatch<React.SetStateAction<number>>
  triggerAchievementCheck: () => void
  handleCopy: (text: string) => void
}

export function NotesTab({
  techKey,
  techTitle,
  data,
  readingMode,
  setReadingMode,
  sidebarOpen,
  setSidebarOpen,
  activeChapterId,
  setActiveChapterId,
  setFullscreenCode,
  copiedText,
  setQuizScoreVersion,
  triggerAchievementCheck,
  handleCopy
}: NotesTabProps) {

  const getChapterQuizPercent = (chapterId: string): number | null => {
    const score = getQuizScore(techKey, chapterId)
    if (!score || score.total === 0) return null
    return Math.round((score.score / score.total) * 100)
  }

  const activeChapter = data.notes.find((ch) => ch.id === activeChapterId) || data.notes[0]
  const activeChapterIndex = data.notes.findIndex((ch) => ch.id === activeChapter?.id)
  const notesProgressPct = data.notes.length > 0
    ? Math.round(((activeChapterIndex + 1) / data.notes.length) * 100)
    : 0

  return (
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
                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs text-text-secondary mb-1.5 font-medium">
                    <span className="bg-surface-850 px-2.5 py-1 rounded-lg border border-black/[0.04] dark:border-white/[0.04] text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      Notes Progress
                    </span>
                    <span className="font-bold text-accent-purple">
                      Chapter {activeChapterIndex + 1} of {data.notes.length} ({notesProgressPct}%)
                    </span>
                  </div>
                  <div className="w-full h-1 bg-surface-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan transition-all duration-300"
                      style={{ width: `${notesProgressPct}%` }}
                    />
                  </div>
                </div>
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
  )
}
