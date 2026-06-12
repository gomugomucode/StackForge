import type { InterviewQuestion } from '../types'

export const javascriptInterviews: InterviewQuestion[] = [
  {
    question: 'What is the difference between null and undefined?',
    answer: 'undefined represents the default state of a declared variable that has not yet been assigned any value. null is an assignment value representing the intentional absence of any object value.',
    level: 'Beginner',
  },
  {
    question: 'What is a closure in JavaScript?',
    answer: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function\'s scope even after the outer function has returned.',
    level: 'Intermediate',
  },
  {
    question: 'Explain the Event Loop and differences between Microtasks and Macrotasks.',
    answer: 'The event loop continuously checks the call stack. If the stack is empty, it processes pending microtasks (Promises, process.nextTick, MutationObserver) until the microtask queue is entirely cleared, and then dequeues one macrotask (setTimeout, setInterval, setImmediate, IO operations, UI rendering). Microtasks always execute before the next macrotask starts.',
    level: 'Advanced',
  },
]
