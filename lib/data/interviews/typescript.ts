import type { InterviewQuestion } from '../types'

export const typescriptInterviews: InterviewQuestion[] = [
  {
    question: 'What is static typing and how does it help?',
    answer: 'Static typing verifies variable types at compilation time rather than runtime. It catches spelling errors, type mismatches, and structural errors immediately inside the IDE code editor before code execution.',
    level: 'Beginner',
  },
  {
    question: 'What is the difference between an interface and a type alias?',
    answer: 'Interfaces describe object structures and support declaration merging (repeating the interface declaration appends new fields) and class implementations. Types represent any valid TS structure (unions, primitives, tuples) but cannot be merged or implemented directly by classes if they contain unions.',
    level: 'Intermediate',
  },
  {
    question: 'What is the "unknown" type and how does it differ from "any"?',
    answer: 'Both accept any value type. However, "any" turns off type-checking completely, letting you call properties or methods arbitrarily. "unknown" is type-safe; TypeScript forces you to run runtime checks (type guards or assertions) before invoking properties on an unknown variable.',
    level: 'Advanced',
  },
]
