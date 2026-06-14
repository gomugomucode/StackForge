import type { QuizQuestion } from './types'
import { Check, X, Award } from 'lucide-react'

interface QuizCardProps {
  question: QuizQuestion
  answeredState?: { selected: string; isCorrect: boolean }
  onSubmitAnswer: (selectedOption: string) => void
}

export function QuizCard({ question, answeredState, onSubmitAnswer }: QuizCardProps) {
  const isAnswered = !!answeredState

  return (
    <div className="w-full bg-[#161b22] border border-white/[0.06] rounded-2xl p-5 space-y-4 my-4 overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
      {/* Quiz header decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-purple/10 to-transparent pointer-events-none rounded-bl-full" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold px-2.5 py-1 bg-accent-purple/10 border border-accent-purple/20 rounded-full text-accent-purple">
          Knowledge Check
        </span>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
          <Award className="w-3.5 h-3.5" />
          <span>+{question.xp} XP</span>
        </div>
      </div>

      <p className="text-sm font-bold text-white leading-relaxed whitespace-pre-wrap">
        {question.question}
      </p>

      <div className="space-y-2.5 pt-1">
        {question.options.map(option => {
          const isSelected = answeredState?.selected === option
          const isCorrectOption = question.answer === option
          const showCorrectStatus = isAnswered && isCorrectOption
          const showIncorrectStatus = isAnswered && isSelected && !answeredState.isCorrect

          let optionStyle = 'border-white/[0.06] hover:bg-[#1f242c] hover:border-white/10 text-[#c9d1d9]'
          if (isAnswered) {
            optionStyle = 'opacity-65 border-white/[0.04] cursor-default'
            if (showCorrectStatus) {
              optionStyle = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 cursor-default ring-1 ring-emerald-500/20'
            } else if (showIncorrectStatus) {
              optionStyle = 'border-red-500/30 bg-red-500/10 text-red-400 cursor-default ring-1 ring-red-500/20'
            }
          }

          return (
            <button
              key={option}
              disabled={isAnswered}
              onClick={() => onSubmitAnswer(option)}
              className={`w-full flex items-center justify-between p-3.5 bg-[#0d1117] border rounded-xl text-left text-xs transition-all duration-200 ${optionStyle}`}
            >
              <span className="flex-1 pr-3">{option}</span>
              {isAnswered && (
                <span className="flex-shrink-0">
                  {showCorrectStatus && (
                    <span className="flex items-center justify-center w-5 h-5 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </span>
                  )}
                  {showIncorrectStatus && (
                    <span className="flex items-center justify-center w-5 h-5 bg-red-500/20 border border-red-500/40 rounded-full">
                      <X className="w-3 h-3 text-red-400" />
                    </span>
                  )}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
