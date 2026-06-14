import { useState } from 'react'
import { Bookmark, ChevronDown, ChevronUp } from 'lucide-react'
import { isBookmarked, toggleBookmark } from '@/lib/core/hooks/useProgress'
import type { FullTechData } from '@/lib/data/db'

interface InterviewsTabProps {
  techKey: string
  data: FullTechData
}

export function InterviewsTab({ techKey, data }: InterviewsTabProps) {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null)

  return (
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
  )
}
