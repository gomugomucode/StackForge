import { useState } from 'react'
import { CheckCircle, RotateCcw, HelpCircle } from 'lucide-react'
import type { QuizQuestion } from '../../data/types'
import { saveQuizScore } from '../../core/hooks/useProgress'
import { checkAchievements } from '../../data/achievements'
import { getAllTechnologies } from '../../data/db'
import { useAchievementToast } from '../ui/AchievementContext'

interface ChapterQuizProps {
  techId: string
  chapterId: string
  chapterTitle: string
  questions: QuizQuestion[]
  onScoreSaved?: () => void
}

export function ChapterQuiz({
  techId,
  chapterId,
  chapterTitle,
  questions,
  onScoreSaved,
}: ChapterQuizProps) {
  const { showAchievement } = useAchievementToast()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [isComplete, setIsComplete] = useState(false)
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 })

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const handleSelect = (optionIndex: number) => {
    if (isSubmitted) return
    setSelectedIndex(optionIndex)
  }

  const handleSubmit = () => {
    if (selectedIndex === null) return
    const updated = [...answers]
    updated[currentIndex] = selectedIndex
    setAnswers(updated)
    setIsSubmitted(true)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      const finalAnswers = [...answers]
      if (finalAnswers[currentIndex] === null && selectedIndex !== null) {
        finalAnswers[currentIndex] = selectedIndex
      }
      const score = finalAnswers.reduce<number>((acc, ans, idx) => {
        return acc + (ans === questions[idx].correctIndex ? 1 : 0)
      }, 0)

      const total = questions.length
      saveQuizScore(techId, chapterId, score, total)
      setFinalScore({ score, total })
      setIsComplete(true)
      onScoreSaved?.()

      const unlocked = checkAchievements(getAllTechnologies())
      unlocked.forEach((a) => showAchievement(a))
    } else {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setSelectedIndex(answers[nextIndex])
      setIsSubmitted(answers[nextIndex] !== null)
    }
  }

  const handleRetake = () => {
    setCurrentIndex(0)
    setSelectedIndex(null)
    setIsSubmitted(false)
    setAnswers(questions.map(() => null))
    setIsComplete(false)
    setFinalScore({ score: 0, total: 0 })
  }

  if (isComplete) {
    const pct = Math.round((finalScore.score / finalScore.total) * 100)
    const isPerfect = pct === 100

    return (
      <div className="mt-8 p-6 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-surface-950/40 space-y-4">
        <div className="text-center space-y-2">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl ${
            isPerfect ? 'bg-accent-emerald/15' : 'bg-accent-purple/15'
          }`}>
            {isPerfect ? '🏆' : '📝'}
          </div>
          <h3 className="text-lg font-bold text-text-primary">Quiz Complete!</h3>
          <p className="text-sm text-text-secondary">
            You scored <span className="font-bold text-accent-purple">{finalScore.score}/{finalScore.total}</span> ({pct}%) on {chapterTitle}
          </p>
        </div>

        <div className="w-full h-2 bg-surface-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isPerfect ? 'bg-accent-emerald' : 'bg-gradient-to-r from-accent-purple to-accent-cyan'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <button
          onClick={handleRetake}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06] text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-850 transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Re-take Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="mt-8 p-6 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-surface-950/40 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-accent-purple" />
          <h3 className="font-bold text-text-primary text-sm">Chapter Quiz</h3>
        </div>
        <span className="text-xs font-semibold text-text-muted">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="w-full h-1 bg-surface-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-purple transition-all duration-300"
          style={{ width: `${((currentIndex + (isSubmitted ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <p className="text-text-primary font-medium text-sm leading-relaxed">{currentQuestion.question}</p>

      <div className="space-y-2">
        {currentQuestion.options.map((option, idx) => {
          let stateClass = 'border-black/[0.06] dark:border-white/[0.06] hover:border-accent-purple/30 hover:bg-surface-850'
          if (isSubmitted) {
            if (idx === currentQuestion.correctIndex) {
              stateClass = 'border-accent-emerald/40 bg-accent-emerald/10 text-accent-emerald'
            } else if (idx === selectedIndex) {
              stateClass = 'border-accent-rose/40 bg-accent-rose/10 text-accent-rose'
            }
          } else if (idx === selectedIndex) {
            stateClass = 'border-accent-purple/40 bg-accent-purple/10 text-accent-purple'
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${stateClass}`}
            >
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                isSubmitted && idx === currentQuestion.correctIndex
                  ? 'bg-accent-emerald text-white'
                  : isSubmitted && idx === selectedIndex
                  ? 'bg-accent-rose text-white'
                  : idx === selectedIndex
                  ? 'bg-accent-purple text-white'
                  : 'bg-surface-800 text-text-muted'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
              {isSubmitted && idx === currentQuestion.correctIndex && (
                <CheckCircle className="w-4 h-4 ml-auto shrink-0" />
              )}
            </button>
          )
        })}
      </div>

      {isSubmitted && (
        <div className="p-4 rounded-xl bg-accent-purple/5 border border-accent-purple/20">
          <div className="text-xs font-bold uppercase tracking-wider text-accent-purple mb-1">Explanation</div>
          <p className="text-sm text-text-secondary leading-relaxed">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex gap-3">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIndex === null}
            className="flex-1 px-4 py-2.5 rounded-xl bg-accent-purple text-white text-sm font-bold hover:bg-accent-purple/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-2.5 rounded-xl bg-accent-purple text-white text-sm font-bold hover:bg-accent-purple/90 transition-all"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  )
}
