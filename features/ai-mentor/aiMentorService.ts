import type { MentorMode, MentorMessage, QuizQuestion, RoadmapStep } from '@/lib/core/types/phase5'

// ─── AI mentor response generator ────────────────────────────────────────────
// This is a structured mock AI — production can swap in a real LLM API call here.

let msgCounter = 0
function genId() { return `msg-${++msgCounter}-${Date.now()}` }

interface AIMentorRequest {
  mode: MentorMode
  topic: string
  techId: string
}

const TECH_CONTEXTS: Record<string, string> = {
  javascript: 'JavaScript — the language of the web',
  typescript: 'TypeScript — statically typed JavaScript',
  react: 'React — declarative UI library by Meta',
  python: 'Python — high-level general-purpose language',
  nodejs: 'Node.js — JavaScript runtime for the server',
  docker: 'Docker — containerization platform',
  aws: 'AWS — Amazon Web Services cloud platform',
  git: 'Git — distributed version control system',
}

function generateExplanation(topic: string, techId: string): MentorMessage {
  const tech = TECH_CONTEXTS[techId] ?? techId
  const examples = getExamplesFor(topic, techId)
  return {
    id: genId(),
    role: 'assistant',
    mode: 'explain',
    timestamp: new Date().toISOString(),
    content: `## ${topic} in ${tech}\n\n**${topic}** is a core concept in ${tech} that enables developers to write more efficient, maintainable code.\n\n### Key Points\n- It establishes a clear contract between components\n- It enables reusability and composition\n- It helps prevent common runtime errors\n- Modern applications rely heavily on this pattern\n\n### When to Use\nUse **${topic}** when you need to:\n1. Manage shared state across multiple components\n2. Enforce a consistent API across your codebase\n3. Abstract complex implementation details\n\n### Common Mistakes\n- Over-engineering simple use cases\n- Ignoring edge cases and error boundaries\n- Not considering performance implications at scale`,
    suggestions: [
      `Show me a code example of ${topic}`,
      `Quiz me on ${topic}`,
      `What are the best practices for ${topic}?`,
      `Compare ${topic} with alternatives`,
    ],
    ...(examples && { content: `## ${topic}\n\n${examples}` }),
  }
}

function getExamplesFor(topic: string, techId: string): string | null {
  const topicLower = topic.toLowerCase()
  if (topicLower.includes('closure') || topicLower.includes('closures')) {
    return `**Closures** are functions that "close over" variables from their outer scope.\n\n\`\`\`javascript\nfunction counter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count,\n  };\n}\n\nconst myCounter = counter();\nmyCounter.increment(); // 1\nmyCounter.increment(); // 2\nconsole.log(myCounter.getCount()); // 2\n\`\`\`\n\n**Why it works**: The inner functions retain access to \`count\` even after \`counter()\` returns.`
  }
  if (topicLower.includes('hook') || topicLower.includes('usestate')) {
    return `**React Hooks** allow function components to use state and lifecycle features.\n\n\`\`\`jsx\nimport { useState, useEffect } from 'react';\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  \n  useEffect(() => {\n    const interval = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n    return () => clearInterval(interval); // cleanup\n  }, []); // runs once\n  \n  return <div>Time: {seconds}s</div>;\n}\n\`\`\`\n\n**Key rule**: Never call hooks inside loops, conditions, or nested functions.`
  }
  if (topicLower.includes('promise') || topicLower.includes('async')) {
    return `**Promises** represent eventual completion (or failure) of an async operation.\n\n\`\`\`javascript\nasync function fetchUser(id) {\n  try {\n    const response = await fetch(\`/api/users/\${id}\`);\n    if (!response.ok) throw new Error('User not found');\n    return await response.json();\n  } catch (error) {\n    console.error('Failed to fetch user:', error);\n    throw error;\n  }\n}\n\n// Usage\nfetchUser(42)\n  .then(user => console.log(user.name))\n  .catch(err => console.error(err));\n\`\`\`\n\n**async/await** is syntactic sugar over Promises — same power, cleaner syntax.`
  }
  return null
}

function generateQuiz(topic: string, techId: string): MentorMessage {
  const quizBank: Record<string, QuizQuestion[]> = {
    closures: [
      { id: '1', question: 'What is a closure in JavaScript?', options: ['A function that returns a value', 'A function that has access to its outer scope even after the outer function returns', 'A class with private methods', 'A special type of async function'], answer: 'A function that has access to its outer scope even after the outer function returns', explanation: 'Closures "close over" their lexical environment, preserving access to variables from the enclosing scope.', xp: 50 },
      { id: '2', question: 'What will this code output?\n```js\nconst fns = [];\nfor (var i = 0; i < 3; i++) { fns.push(() => i); }\nconsole.log(fns[0](), fns[1]());\n```', options: ['0 1', '2 2', '3 3', 'undefined undefined'], answer: '3 3', explanation: 'Because `var` is function-scoped, all closures share the same `i`. By the time they\'re called, the loop has completed and `i === 3`. Fix: use `let` instead.', xp: 75 },
    ],
    promises: [
      { id: '1', question: 'What does `Promise.all()` return?', options: ['The first resolved promise', 'A promise that resolves when all promises resolve', 'A promise that resolves when any promise resolves', 'An array of settled results'], answer: 'A promise that resolves when all promises resolve', explanation: 'Promise.all() takes an iterable of Promises and returns a single Promise that resolves with an array of all resolved values, OR rejects immediately if any input promise rejects.', xp: 50 },
      { id: '2', question: 'What is the difference between `async/await` and Promises?', options: ['async/await is faster', 'They are completely different mechanisms', 'async/await is syntactic sugar over Promises', 'Promises work only in Node.js'], answer: 'async/await is syntactic sugar over Promises', explanation: 'async/await does not replace Promises — it provides cleaner syntax for the same underlying mechanism. async functions always return a Promise.', xp: 50 },
    ],
  }

  const topicKey = topic.toLowerCase().replace(/\s+/g, '')
  let quiz = quizBank[topicKey]

  if (!quiz) {
    quiz = [
      { id: '1', question: `Which of the following best describes ${topic} in ${techId}?`, options: ['It is a runtime optimization technique', 'It is a core language feature for state management', 'It is a design pattern for code organization', 'It is a third-party library'], answer: 'It is a core language feature for state management', explanation: `${topic} is a fundamental concept that directly impacts how you structure and organize code in ${techId}.`, xp: 50 },
      { id: '2', question: `What is the primary benefit of ${topic}?`, options: ['Faster execution speed', 'Improved code maintainability and reusability', 'Smaller bundle size', 'Built-in security features'], answer: 'Improved code maintainability and reusability', explanation: `${topic} mainly improves developer experience through better organization, making code easier to maintain and reuse.`, xp: 50 },
      { id: '3', question: `When should you avoid using ${topic}?`, options: ['In large applications', 'When it adds complexity without clear benefit', 'In modern JavaScript', 'When working with TypeScript'], answer: 'When it adds complexity without clear benefit', explanation: `Over-engineering is a common mistake. Use ${topic} when it solves a real problem, not just because it can.`, xp: 75 },
    ]
  }

  return {
    id: genId(),
    role: 'assistant',
    mode: 'quiz',
    timestamp: new Date().toISOString(),
    content: `I've prepared a quiz on **${topic}**. Answer each question to earn XP! 🎯`,
    quiz,
  }
}

function generateCoachingPlan(techId: string): MentorMessage {
  const plans: Record<string, RoadmapStep[]> = {
    javascript: [
      { step: 'Week 1–2: Foundations', detail: 'Master variables, data types, control flow, and functions.', xp: 200, duration: '2 weeks', resources: ['javascript.info', 'MDN Web Docs'] },
      { step: 'Week 3–4: Arrays & Objects', detail: 'Learn array methods (map, filter, reduce), destructuring, and the spread operator.', xp: 250, duration: '2 weeks', resources: ['javascript.info/array-methods'] },
      { step: 'Week 5–6: Async JavaScript', detail: 'Deep-dive into Promises, async/await, and the event loop.', xp: 300, duration: '2 weeks', resources: ['MDN Promise guide'] },
      { step: 'Week 7–8: DOM & Events', detail: 'Manipulate the DOM, handle events, build interactive UIs.', xp: 300, duration: '2 weeks', resources: ['javascript.info/document'] },
      { step: 'Month 3: Advanced Concepts', detail: 'Closures, prototypes, classes, modules, performance optimization.', xp: 500, duration: '4 weeks', resources: ['You Don\'t Know JS (book)'] },
    ],
    react: [
      { step: 'Week 1: JSX & Components', detail: 'Understand component-based architecture, JSX syntax, and props.', xp: 150, duration: '1 week', resources: ['react.dev'] },
      { step: 'Week 2–3: State & Effects', detail: 'useState, useEffect, event handling, and controlled forms.', xp: 250, duration: '2 weeks', resources: ['react.dev/learn'] },
      { step: 'Week 4–5: Routing & Data', detail: 'React Router v6, fetching data, loading/error states.', xp: 300, duration: '2 weeks', resources: ['reactrouter.com'] },
      { step: 'Week 6–8: Advanced Patterns', detail: 'Context, custom hooks, React.memo, performance profiling.', xp: 400, duration: '3 weeks', resources: ['react.dev/reference'] },
    ],
  }

  const plan = plans[techId] ?? plans.javascript

  return {
    id: genId(),
    role: 'assistant',
    mode: 'coach',
    timestamp: new Date().toISOString(),
    content: `## Your Personalized ${TECH_CONTEXTS[techId] ?? techId} Roadmap\n\nBased on your current skill level, here's your optimized learning path. Follow each step sequentially for best results. 🚀`,
    roadmap: plan,
  }
}

function generateInterviewPractice(topic: string, techId: string): MentorMessage {
  const questions: Record<string, string[]> = {
    javascript: [
      'Explain the difference between `var`, `let`, and `const`.',
      'What is the event loop and how does it work?',
      'How does prototypal inheritance work in JavaScript?',
      'What is the difference between `==` and `===`?',
      'Explain closures and give a practical use case.',
    ],
    react: [
      'What is the difference between controlled and uncontrolled components?',
      'How does React\'s reconciliation algorithm work?',
      'When would you use useCallback vs useMemo?',
      'Explain the concept of lifting state up.',
      'How do you prevent unnecessary re-renders?',
    ],
  }

  const q = questions[techId]?.[Math.floor(Math.random() * (questions[techId]?.length ?? 0))]
    ?? `Explain how ${topic} works and give a real-world example.`

  return {
    id: genId(),
    role: 'assistant',
    mode: 'interview',
    timestamp: new Date().toISOString(),
    content: `## Mock Interview — ${TECH_CONTEXTS[techId] ?? techId}\n\n👨‍💼 **Interviewer**: "${q}"\n\nTake your time to think through your answer. Consider:\n- Core concept definition\n- How it works under the hood\n- A concrete code example\n- Edge cases or common pitfalls\n\nWhen ready, type your answer and I'll provide feedback!`,
    suggestions: [
      'I\'m ready with my answer',
      'Give me a hint',
      'Ask me a different question',
      'Show me a model answer',
    ],
  }
}

// ─── Main service function ────────────────────────────────────────────────────

export async function getMentorResponse(request: AIMentorRequest, userMessage: string): Promise<MentorMessage> {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 800 + Math.random() * 700))

  const topic = userMessage.replace(/^(explain|quiz me on|teach me|what is|how does|tell me about)\s+/i, '').trim() || request.topic

  switch (request.mode) {
    case 'explain': return generateExplanation(topic, request.techId)
    case 'quiz': return generateQuiz(topic, request.techId)
    case 'coach': return generateCoachingPlan(request.techId)
    case 'interview': return generateInterviewPractice(topic, request.techId)
    default: return generateExplanation(topic, request.techId)
  }
}

export function getWelcomeMessage(mode: MentorMode, techId: string): MentorMessage {
  const tech = TECH_CONTEXTS[techId] ?? techId
  const messages: Record<MentorMode, string> = {
    explain: `👋 Hi! I'm your **AI Mentor** for **${tech}**.\n\nAsk me to explain any concept — closures, async/await, hooks, design patterns — and I'll break it down with examples and code snippets.\n\n**Try**: "Explain closures" or "How does useEffect work?"`,
    quiz: `🎯 Ready to test your ${tech} knowledge?\n\nTell me a topic and I'll generate a quiz with multiple-choice questions and explanations. Earn XP for correct answers!\n\n**Try**: "Quiz me on Promises" or "Quiz me on React hooks"`,
    coach: `🗺️ Let me build your personalized **${tech}** learning roadmap.\n\nI'll analyze the standard learning path and create a week-by-week plan with resources, XP goals, and milestones.\n\n**Try**: "Build my roadmap" or "What should I learn first?"`,
    interview: `💼 Let's do a **mock interview** for ${tech} positions.\n\nI'll ask you real interview questions and provide detailed feedback on your answers. Great for interview prep!\n\n**Try**: "Start the interview" or "Ask me a senior-level question"`,
  }

  return {
    id: genId(),
    role: 'assistant',
    mode,
    timestamp: new Date().toISOString(),
    content: messages[mode],
    suggestions: {
      explain: ['Explain closures', 'Explain async/await', 'Explain the event loop', 'What is hoisting?'],
      quiz: ['Quiz me on closures', 'Quiz me on Promises', 'Quiz me on ES6 features', 'Test my JavaScript knowledge'],
      coach: ['Build my roadmap', 'What should I learn first?', 'Create a 3-month plan', 'Show advanced topics'],
      interview: ['Start the interview', 'Ask me a senior question', 'Give me a system design question', 'Test my fundamentals'],
    }[mode],
  }
}
