import { useState, useEffect, useCallback } from 'react'
import type { MentorMode, MentorMessage, QuizQuestion } from './types'
import { getMentorResponse, getWelcomeMessage } from './aiMentorService'
import { useProgress } from '../@/lib/core/context/ProgressContext'

export function useMentorChat(techId: string, initialMode: MentorMode = 'explain') {
  const { addXP } = useProgress()
  const [mode, setModeState] = useState<MentorMode>(initialMode)
  const [messages, setMessages] = useState<MentorMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [answeredQuizzes, setAnsweredQuizzes] = useState<Record<string, { selected: string; isCorrect: boolean }>>({})
  const [xpEarnedInSession, setXpEarnedInSession] = useState(0)

  // Load chat history or initialize welcome message
  useEffect(() => {
    const cacheKey = `stackforge_mentor_chat_${techId}_${mode}`
    const cached = localStorage.getItem(cacheKey)

    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        setMessages(parsed.messages || [])
        setAnsweredQuizzes(parsed.answeredQuizzes || {})
        setXpEarnedInSession(parsed.xpEarnedInSession || 0)
        return
      } catch (e) {
        console.error('Failed to parse cached chat history', e)
      }
    }

    // Initialize with welcome message
    const welcome = getWelcomeMessage(mode, techId)
    setMessages([welcome])
    setAnsweredQuizzes({})
    setXpEarnedInSession(0)
  }, [techId, mode])

  // Save chat history helper
  const saveToCache = useCallback((
    newMessages: MentorMessage[],
    newQuizzes = answeredQuizzes,
    newXp = xpEarnedInSession
  ) => {
    const cacheKey = `stackforge_mentor_chat_${techId}_${mode}`
    localStorage.setItem(cacheKey, JSON.stringify({
      messages: newMessages,
      answeredQuizzes: newQuizzes,
      xpEarnedInSession: newXp
    }))
  }, [techId, mode, answeredQuizzes, xpEarnedInSession])

  const setMode = useCallback((newMode: MentorMode) => {
    setModeState(newMode)
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMsg: MentorMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      mode,
      timestamp: new Date().toISOString(),
    }

    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    saveToCache(updatedMessages)
    setIsLoading(true)

    try {
      const activeQuizMessage = messages.slice().reverse().find(m => m.mode === 'quiz' && m.quiz && m.quiz.length > 0)
      const topic = activeQuizMessage ? 'Quiz Follow-up' : content

      const response = await getMentorResponse(
        { mode, topic, techId },
        content
      )

      const finalMessages = [...updatedMessages, response]
      setMessages(finalMessages)
      saveToCache(finalMessages)
    } catch (error) {
      console.error('Failed to get mentor response:', error)
      const errorMsg: MentorMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "❌ Sorry, I encountered an issue connection. Let's try again.",
        mode,
        timestamp: new Date().toISOString(),
      }
      const finalMessages = [...updatedMessages, errorMsg]
      setMessages(finalMessages)
      saveToCache(finalMessages)
    } finally {
      setIsLoading(false)
    }
  }, [messages, mode, techId, isLoading, saveToCache])

  const submitQuizAnswer = useCallback((question: QuizQuestion, selectedOption: string) => {
    if (answeredQuizzes[question.id]) return // Already answered

    const isCorrect = question.answer === selectedOption
    const newQuizzes = {
      ...answeredQuizzes,
      [question.id]: { selected: selectedOption, isCorrect }
    }
    setAnsweredQuizzes(newQuizzes)

    let addedSessionXP = 0
    if (isCorrect) {
      addXP(question.xp)
      addedSessionXP = question.xp
      setXpEarnedInSession(prev => prev + question.xp)
    }

    // Insert a system message with feedback
    const feedbackMsg: MentorMessage = {
      id: `feedback-${Date.now()}`,
      role: 'assistant',
      content: isCorrect
        ? `✅ **Correct!** +${question.xp} XP earned.\n\n*Explanation*: ${question.explanation}`
        : `❌ **Incorrect.** The correct answer was: *${question.answer}*.\n\n*Explanation*: ${question.explanation}`,
      mode: 'quiz',
      timestamp: new Date().toISOString(),
    }

    const updatedMessages = [...messages, feedbackMsg]
    setMessages(updatedMessages)
    saveToCache(updatedMessages, newQuizzes, xpEarnedInSession + addedSessionXP)
  }, [messages, answeredQuizzes, addXP, xpEarnedInSession, saveToCache])

  const clearHistory = useCallback(() => {
    const welcome = getWelcomeMessage(mode, techId)
    setMessages([welcome])
    setAnsweredQuizzes({})
    setXpEarnedInSession(0)
    const cacheKey = `stackforge_mentor_chat_${techId}_${mode}`
    localStorage.removeItem(cacheKey)
  }, [mode, techId])

  return {
    messages,
    isLoading,
    mode,
    setMode,
    sendMessage,
    submitQuizAnswer,
    answeredQuizzes,
    xpEarnedInSession,
    clearHistory
  }
}
