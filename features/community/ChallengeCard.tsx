import { useState } from 'react'
import type { Challenge } from './types'
import { Award, Calendar, Check, Loader2, Sparkles } from 'lucide-react'

interface ChallengeCardProps {
  challenge: Challenge
  onSubmit: (challengeId: string, xpReward: number) => void
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  medium: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  hard: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
}

export function ChallengeCard({ challenge, onSubmit }: ChallengeCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmitted = !!challenge.has_submitted

  const handleMockSubmit = async () => {
    if (isSubmitted || isSubmitting) return

    setIsSubmitting(true)
    // Mock run tests delay
    await new Promise(r => setTimeout(r, 1500))
    onSubmit(challenge.id, challenge.xp_reward)
    setIsSubmitting(false)
    alert(`🎉 Challenge complete! You earned +${challenge.xp_reward} XP!`)
  }

  // Calculate days remaining
  const daysRemaining = Math.max(
    0,
    Math.ceil((new Date(challenge.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  )

  return (
    <div
      className={`bg-[#161b22] border rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all duration-300 ${
        isSubmitted
          ? 'border-emerald-500/20 hover:border-emerald-500/35 bg-[#161b22]/90 shadow-md shadow-emerald-500/[0.01]'
          : 'border-white/[0.05] hover:border-white/10 shadow-sm'
      }`}
    >
      <div className="space-y-3">
        {/* Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[9px] uppercase font-black px-2 py-0.2 border rounded ${
                DIFFICULTY_COLORS[challenge.difficulty] || 'bg-white/5 border-white/10'
              }`}
            >
              {challenge.difficulty}
            </span>
            <span className="text-[9px] font-bold px-2 py-0.2 rounded bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
              {challenge.tech_label}
            </span>
          </div>

          <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-400">
            <Award className="w-3.5 h-3.5" />
            <span>+{challenge.xp_reward} XP</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h4 className="text-xs font-extrabold text-white leading-snug">{challenge.title}</h4>
          <p className="text-[10px] text-[#8b949e] leading-relaxed">
            {challenge.description}
          </p>
        </div>
      </div>

      {/* Footer Details & Submit */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[9px] text-[#6e7681]">
            <Calendar className="w-3 h-3" />
            <span>
              {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Ends today'}
            </span>
          </div>
          <p className="text-[9px] text-[#8b949e]">
            {challenge.submission_count} submissions
          </p>
        </div>

        <button
          onClick={handleMockSubmit}
          disabled={isSubmitted || isSubmitting}
          className={`flex items-center gap-1 py-1.5 px-3.5 text-[9px] font-bold rounded-xl transition-all duration-200 ${
            isSubmitted
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-default'
              : isSubmitting
              ? 'bg-[#21262d] border border-white/[0.06] text-[#8b949e] cursor-wait'
              : 'bg-[#21262d] hover:bg-[#2c333f] border border-white/[0.06] text-white'
          }`}
        >
          {isSubmitted ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Completed</span>
            </>
          ) : isSubmitting ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin text-accent-cyan" />
              <span>Running tests...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-accent-cyan" />
              <span>Submit Solution</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
