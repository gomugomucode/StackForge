import { useState, useRef, useEffect } from 'react'
import { Sparkles, X, Send, Bot, User, HelpCircle } from 'lucide-react'
import type { AIQAPair } from '@/lib/data/resources/types'

interface AIAssistantProps {
  techTitle: string
  qaPairs: AIQAPair[]
}

interface Message {
  id: string
  sender: 'ai' | 'user'
  text: string
  timestamp: Date
}

export function AIAssistant({ techTitle, qaPairs }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize chat history on first open
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: `Hi! I'm your offline **${techTitle} Study Guide**. Ask me about core concepts, definitions, or code syntax, and I will search my local knowledge database!`,
          timestamp: new Date()
        }
      ])
    }
  }, [messages.length, techTitle])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const findLocalAnswer = (query: string): string => {
    const cleanQuery = query.toLowerCase().trim()
    
    // Find matching QA pair based on keywords
    const matched = qaPairs.find(qa => 
      qa.keywords.some(keyword => cleanQuery.includes(keyword.toLowerCase()))
    )

    if (matched) {
      return matched.answer
    }

    // Secondary search: substring matching in question or keywords
    const secondaryMatched = qaPairs.find(qa =>
      qa.question.toLowerCase().includes(cleanQuery) ||
      qa.keywords.some(keyword => keyword.toLowerCase().includes(cleanQuery))
    )

    if (secondaryMatched) {
      return secondaryMatched.answer
    }

    return `I am currently running in offline Mode. I couldn't find a direct match for your question.
    
Try asking about these key topics: **${qaPairs.flatMap(q => q.keywords).slice(0, 5).join(', ')}**.`
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue
    if (!text.trim()) return

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    if (!textToSend) {
      setInputValue('')
    }

    // Simulate AI response delay
    setTimeout(() => {
      const answer = findLocalAnswer(text)
      const aiMessage: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: answer,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 450)
  }

  // Get quick suggestions (first 3 questions)
  const suggestions = qaPairs.slice(0, 3).map(qa => qa.question)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-accent-purple to-accent-cyan hover:from-accent-purple/90 hover:to-accent-cyan/90 text-white rounded-full shadow-lg shadow-accent-purple/20 hover:scale-105 active:scale-95 transition-all duration-200 font-semibold text-sm group"
        >
          <Sparkles className="w-5 h-5 animate-pulse group-hover:rotate-12 transition-transform" />
          <span>Ask Study AI</span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[500px] bg-background-card/90 backdrop-blur-xl border border-border/40 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-accent-purple/20 to-accent-cyan/20 border-b border-border/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-primary">Study AI: {techTitle}</h3>
                <span className="text-[10px] text-text-secondary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-ping" /> Local Offline Assistant
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-border/20 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 select-text">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-accent-purple text-white rounded-br-none'
                      : 'bg-background border border-border/10 text-text-primary rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`text-[8px] block mt-1 text-right ${
                    msg.sender === 'user' ? 'text-white/60' : 'text-text-secondary'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple flex-shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer */}
          <div className="p-3 border-t border-border/10 space-y-2 bg-background-card/50">
            {/* Quick Suggestions (show only if fewer than 3 user messages sent to keep chat clear) */}
            {messages.filter(m => m.sender === 'user').length < 2 && suggestions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] text-text-secondary font-medium flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" /> Quick Questions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(sug)}
                      className="text-[10px] bg-background border border-border/10 text-text-secondary hover:text-accent-purple hover:border-accent-purple/30 px-2 py-1 rounded-lg transition-all text-left truncate max-w-full"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about closures, VPC, container etc..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3 py-2 bg-background border border-border/20 rounded-xl text-xs focus:outline-none focus:border-accent-purple/50 text-text-primary"
              />
              <button
                type="submit"
                className="p-2 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-xl transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  )
}
