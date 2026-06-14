import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SEOHead } from '../components/ui/SEOHead'
import { ModeSelector } from '../features/ai-mentor/ModeSelector'
import { ChatBubble } from '../features/ai-mentor/ChatBubble'
import { useMentorChat } from '../features/ai-mentor/useMentorChat'
import { Send, ArrowLeft, Trash2, Cpu, Sparkles } from 'lucide-react'

const SUPPORTED_TECHS: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  python: 'Python',
  nodejs: 'Node.js',
  docker: 'Docker',
  aws: 'AWS',
  git: 'Git',
}

export function AIMentorPage() {
  const { technology = 'javascript' } = useParams<{ technology: string }>()
  const techName = SUPPORTED_TECHS[technology] ?? 'JavaScript'

  const {
    messages,
    isLoading,
    mode,
    setMode,
    sendMessage,
    submitQuizAnswer,
    answeredQuizzes,
    xpEarnedInSession,
    clearHistory,
  } = useMentorChat(technology, 'explain')

  const [inputVal, setInputVal] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = () => {
    if (!inputVal.trim() || isLoading) return
    sendMessage(inputVal)
    setInputVal('')
  }

  const handleSuggestClick = (suggestion: string) => {
    if (isLoading) return
    sendMessage(suggestion)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Extract suggestions from last assistant message
  const activeSuggestions: string[] = (() => {
    if (isLoading) return []
    // Get last assistant message
    const lastMsg = [...messages].reverse().find(m => m.role === 'assistant')
    if (lastMsg && lastMsg.suggestions) {
      return Array.isArray(lastMsg.suggestions) ? lastMsg.suggestions : []
    }
    return []
  })()

  return (
    <>
      <SEOHead
        title={`AI Coding Mentor - Learn ${techName} | StackForge Academy`}
        description={`Interactive AI learning mentor for ${techName}. Ask explanations, practice multiple choice quizzes, build learning paths, and run mock interviews.`}
      />

      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col">
        {/* Navigation & Header */}
        <header className="border-b border-[#21262d] bg-[#161b22]/70 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to={`/learn/${technology}`}
                className="p-2 hover:bg-white/[0.05] rounded-xl text-[#8b949e] hover:text-white transition-colors"
                title={`Back to ${techName} Hub`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <span>AI Mentor</span>
                  <span className="w-1.5 h-1.5 bg-accent-purple rounded-full animate-pulse" />
                  <span className="text-[10px] uppercase bg-accent-purple/10 px-2 py-0.5 rounded border border-accent-purple/20 text-accent-purple font-semibold">
                    {techName}
                  </span>
                </h1>
                <p className="text-[10px] text-[#8b949e] hidden sm:block">
                  Your customized co-pilot for technical mastery
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#21262d] hover:bg-red-500/10 hover:text-red-400 border border-white/[0.06] hover:border-red-500/20 rounded-xl text-[10px] text-[#8b949e] font-semibold transition-all duration-300"
                title="Clear chat history for this mode"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Chat</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col gap-6 w-full">
          {/* Mode Selector Panel */}
          <ModeSelector
            currentMode={mode}
            onChangeMode={setMode}
            xpEarned={xpEarnedInSession}
          />

          {/* Chat Panel */}
          <div className="flex-1 bg-[#161b22] border border-white/[0.05] rounded-3xl flex flex-col overflow-hidden h-[600px] shadow-2xl relative">
            {/* Top decorative glass overlay */}
            <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#161b22] to-transparent z-10 pointer-events-none" />

            {/* Chat History Panel */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-2 scrollbar-thin scrollbar-thumb-white/[0.05] scrollbar-track-transparent">
              {messages.map(msg => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  answeredQuizzes={answeredQuizzes}
                  onSubmitQuizAnswer={submitQuizAnswer}
                />
              ))}

              {isLoading && (
                <div className="flex w-full gap-3.5 my-4 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple">
                    <Cpu className="w-4 h-4 animate-[spin_4s_linear_infinite]" />
                  </div>
                  <div className="bg-[#161b22] border border-white/[0.04] rounded-2xl rounded-tl-none px-4.5 py-3.5 flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* suggestions and input panel */}
            <div className="p-4 bg-[#0d1117]/50 border-t border-white/[0.05] space-y-3">
              {/* Suggestion Chips */}
              {activeSuggestions.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
                  {activeSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestClick(s)}
                      disabled={isLoading}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#161b22] hover:bg-[#1f242c] border border-white/[0.06] hover:border-white/10 rounded-xl text-[10px] text-white/80 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-3 h-3 text-accent-purple" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Message Input Form */}
              <div className="flex items-center gap-2.5">
                <textarea
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask me anything about ${techName} or type your answer...`}
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 bg-[#161b22] border border-white/[0.06] focus:border-white/12 focus:ring-1 focus:ring-white/10 rounded-2xl py-3 px-4 text-xs text-white placeholder-[#8b949e] outline-none resize-none max-h-24 scrollbar-none disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputVal.trim() || isLoading}
                  className="p-3 bg-accent-purple hover:bg-accent-purple-hover text-white rounded-2xl transition-all duration-200 shadow-lg shadow-accent-purple/10 disabled:opacity-50 disabled:bg-[#161b22] disabled:border-white/[0.05] disabled:text-[#8b949e] disabled:shadow-none flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
