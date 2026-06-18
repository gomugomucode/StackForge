export interface QuizGameTool {
  id: string
  title: string
  description: string
  type: 'quiz' | 'game' | 'tool'
  icon: string
  href: string
  questions?: number
}

export const quizGamesTools: QuizGameTool[] = [
  {
    id: 'python-quiz',
    title: 'Python Fundamentals Quiz',
    description: 'Test your Python basics with 25 quick-fire questions.',
    type: 'quiz',
    icon: 'HelpCircle',
    href: '/#weekly-challenge',
    questions: 25,
  },
  {
    id: 'js-quiz',
    title: 'JavaScript Essentials',
    description: 'Variables, closures, async — how well do you know JS?',
    type: 'quiz',
    icon: 'HelpCircle',
    href: '/#weekly-challenge',
    questions: 30,
  },
  {
    id: 'code-typing',
    title: 'Code Typing Challenge',
    description: 'Improve your typing speed with real code snippets.',
    type: 'game',
    icon: 'Keyboard',
    href: '/resources',
  },
  {
    id: 'memory-game',
    title: 'Syntax Memory Match',
    description: 'Match language keywords and syntax patterns in this brain teaser.',
    type: 'game',
    icon: 'Puzzle',
    href: '/resources',
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Beautify, validate, and minify JSON instantly in your browser.',
    type: 'tool',
    icon: 'Braces',
    href: '/resources',
  },
  {
    id: 'regex-tester',
    title: 'Regex Tester',
    description: 'Build and test regular expressions with live match highlighting.',
    type: 'tool',
    icon: 'Search',
    href: '/resources',
  },
]
