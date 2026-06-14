import type { MentorMode } from './types'
import { BookOpen, HelpCircle, Compass, Briefcase, Zap } from 'lucide-react'

interface ModeSelectorProps {
  currentMode: MentorMode
  onChangeMode: (mode: MentorMode) => void
  xpEarned: number
}

interface ModeOption {
  id: MentorMode
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const MODES: ModeOption[] = [
  {
    id: 'explain',
    label: 'AI Explainer',
    description: 'Ask any questions & see interactive code examples.',
    icon: BookOpen,
    color: 'border-accent-purple/20 hover:border-accent-purple/50 text-accent-purple',
  },
  {
    id: 'quiz',
    label: 'Interactive Quiz',
    description: 'Test your understanding on topics & earn bonus XP.',
    icon: HelpCircle,
    color: 'border-accent-cyan/20 hover:border-accent-cyan/50 text-accent-cyan',
  },
  {
    id: 'coach',
    label: 'Career Coach',
    description: 'Get custom step-by-step roadmaps for your career.',
    icon: Compass,
    color: 'border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400',
  },
  {
    id: 'interview',
    label: 'Mock Interview',
    description: 'Practice real technical interview questions with feedback.',
    icon: Briefcase,
    color: 'border-amber-500/20 hover:border-amber-500/50 text-amber-400',
  },
]

export function ModeSelector({ currentMode, onChangeMode, xpEarned }: ModeSelectorProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#8b949e]">Select Mentor Mode</h3>
        {xpEarned > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">
            <Zap className="w-3.5 h-3.5 fill-emerald-400/20 animate-pulse" />
            <span>+{xpEarned} XP in Session</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MODES.map(mode => {
          const Icon = mode.icon
          const isActive = currentMode === mode.id

          return (
            <button
              key={mode.id}
              onClick={() => onChangeMode(mode.id)}
              className={`flex flex-col items-start p-4 bg-[#161b22] border rounded-2xl text-left transition-all duration-300 relative group overflow-hidden ${
                isActive
                  ? 'border-white/[0.15] ring-2 ring-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)]'
                  : 'border-white/[0.04] opacity-70 hover:opacity-100 hover:bg-[#1f242c]'
              }`}
            >
              {/* Highlight gradient background on active/hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  isActive ? 'opacity-100' : ''
                }`}
              />

              <div className={`p-2.5 bg-white/[0.04] rounded-xl mb-3 ${mode.color}`}>
                <Icon className="w-5 h-5" />
              </div>

              <h4 className="text-sm font-bold text-white mb-1">{mode.label}</h4>
              <p className="text-xs text-[#8b949e] leading-snug">{mode.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
