import { useState, useEffect } from 'react'
import { CheckCircle, Circle, Clock, CheckSquare, Award, ChevronDown, ChevronUp } from 'lucide-react'
import type { LearningPath, LearningWeek } from '../../data/resources/types'
import { getWeeksCompleted, toggleWeekComplete } from '../../core/hooks/useProgress'

interface LearningPathTabProps {
  techId: string
  learningPath: LearningPath
}

export function LearningPathTab({ techId, learningPath }: LearningPathTabProps) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({})

  // Initialize completed weeks from localStorage
  useEffect(() => {
    setCompletedWeeks(getWeeksCompleted(techId))
    
    // Auto-expand the first week, collapse the rest
    const initialExpanded: Record<number, boolean> = { 1: true }
    learningPath.weeks.forEach(w => {
      if (w.week !== 1) {
        initialExpanded[w.week] = false
      }
    })
    setExpandedWeeks(initialExpanded)
  }, [techId, learningPath])

  const handleToggleWeek = (weekNum: number) => {
    const updated = toggleWeekComplete(techId, weekNum)
    setCompletedWeeks(updated)
  }

  const toggleExpand = (weekNum: number) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }))
  }

  const progressPercent = learningPath.weeks.length > 0
    ? Math.round((completedWeeks.length / learningPath.weeks.length) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="glass p-6 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-purple bg-accent-purple/10 px-2.5 py-1 rounded-md">
              {learningPath.level} Path
            </span>
            <span className="text-xs font-bold text-text-secondary">•</span>
            <span className="text-xs text-text-secondary flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {learningPath.totalWeeks} Weeks (~{learningPath.totalHours} Hours)
            </span>
          </div>
          <h2 className="text-xl font-bold text-text-primary">Structured Curriculum</h2>
          <p className="text-sm text-text-secondary leading-relaxed">{learningPath.description}</p>
        </div>

        {/* Progress Circle or Bar */}
        <div className="w-full md:w-64 space-y-2 bg-background-card/45 p-4 rounded-xl border border-border/10">
          <div className="flex justify-between items-center text-xs">
            <span className="text-text-secondary font-medium">Path Completion</span>
            <span className="font-bold text-accent-purple">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-border/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-text-secondary pt-1">
            <span>{completedWeeks.length} of {learningPath.weeks.length} weeks done</span>
            {progressPercent === 100 && (
              <span className="text-accent-emerald flex items-center gap-0.5 font-bold">
                <Award className="w-3 h-3" /> Certified!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Weeks Timeline */}
      <div className="relative border-l-2 border-border/20 ml-4 pl-6 space-y-6 py-2">
        {learningPath.weeks.map((week: LearningWeek) => {
          const isDone = completedWeeks.includes(week.week)
          const isExpanded = expandedWeeks[week.week] ?? false

          return (
            <div key={week.week} className="relative group">
              {/* Timeline dot */}
              <button
                onClick={() => handleToggleWeek(week.week)}
                className={`absolute -left-[35px] top-1.5 p-1 rounded-full border-2 transition-all duration-300 ${
                  isDone
                    ? 'bg-accent-purple border-accent-purple text-white hover:bg-accent-purple/80'
                    : 'bg-background border-border/50 text-text-secondary hover:border-accent-purple'
                }`}
                title={isDone ? "Mark week in progress" : "Mark week completed"}
              >
                {isDone ? (
                  <CheckCircle className="w-4 h-4 fill-current text-background" />
                ) : (
                  <Circle className="w-4 h-4 fill-current text-transparent" />
                )}
              </button>

              {/* Main Box */}
              <div className="glass-card rounded-2xl overflow-hidden border border-border/20 hover:border-border/40 transition-colors duration-300">
                {/* Header */}
                <div
                  onClick={() => toggleExpand(week.week)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-accent-purple">WEEK {week.week}</span>
                    <h3 className="font-bold text-text-primary flex items-center gap-2">
                      {week.title}
                      {isDone && (
                        <span className="text-xs bg-accent-emerald/10 text-accent-emerald px-2 py-0.5 rounded-full font-medium">
                          Completed
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-secondary flex items-center gap-1 bg-border/20 px-2 py-1 rounded-lg">
                      <Clock className="w-3 h-3" /> {week.estimatedHours}h
                    </span>
                    <button className="p-1 rounded-lg hover:bg-border/20 text-text-secondary transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Body Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-border/10 space-y-4 bg-background-card/20 animate-fadeIn">
                    <p className="text-sm text-text-secondary leading-relaxed">{week.description}</p>

                    {/* Topics Checklist */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-accent-purple" /> Key Topics
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
                        {week.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-1.5 flex-shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Milestone Project */}
                    {week.milestoneProject && (
                      <div className="p-4 bg-accent-cyan/5 border border-accent-cyan/20 rounded-xl space-y-1.5">
                        <h4 className="text-xs font-bold text-accent-cyan uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-4 h-4" /> Milestone Project
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed font-medium">
                          {week.milestoneProject}
                        </p>
                      </div>
                    )}

                    {/* Action Mark Complete */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleWeek(week.week)
                        }}
                        className={`text-xs px-4 py-2 rounded-xl border font-semibold transition-all flex items-center gap-1.5 ${
                          isDone
                            ? 'bg-transparent border-border/40 text-text-secondary hover:text-text-primary hover:border-text-primary'
                            : 'bg-accent-purple border-accent-purple text-white hover:bg-accent-purple/90 shadow-md shadow-accent-purple/10'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        {isDone ? 'Mark Incomplete' : 'Complete Week'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
