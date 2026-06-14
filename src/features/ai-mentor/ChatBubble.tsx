import type { MentorMessage, QuizQuestion } from './types'
import { MarkdownRenderer } from './MarkdownRenderer'
import { QuizCard } from './QuizCard'
import { RoadmapSuggestion } from './RoadmapSuggestion'
import { Bot, User } from 'lucide-react'

interface ChatBubbleProps {
  message: MentorMessage
  answeredQuizzes: Record<string, { selected: string; isCorrect: boolean }>
  onSubmitQuizAnswer: (question: QuizQuestion, selectedOption: string) => void
}

export function ChatBubble({ message, answeredQuizzes, onSubmitQuizAnswer }: ChatBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex w-full gap-3.5 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Mentor Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple self-start">
          <Bot className="w-4 h-4" />
        </div>
      )}

      {/* Bubble Box */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4.5 py-3.5 text-xs shadow-md border ${
          isUser
            ? 'bg-[#1f242c] border-white/[0.06] rounded-tr-none text-white'
            : 'bg-[#161b22] border-white/[0.04] rounded-tl-none text-[#c9d1d9]'
        }`}
      >
        {/* Render text content */}
        <MarkdownRenderer content={message.content} />

        {/* Render quizzes if available */}
        {message.quiz && message.quiz.length > 0 && (
          <div className="space-y-3 pt-2">
            {message.quiz.map(q => (
              <QuizCard
                key={q.id}
                question={q}
                answeredState={answeredQuizzes[q.id]}
                onSubmitAnswer={selected => onSubmitQuizAnswer(q, selected)}
              />
            ))}
          </div>
        )}

        {/* Render roadmap steps if available */}
        {message.roadmap && message.roadmap.length > 0 && (
          <RoadmapSuggestion roadmap={message.roadmap} />
        )}

        {/* Time footer decoration */}
        <div className="mt-2 text-[9px] text-[#6e7681] text-right">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 self-start">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  )
}
