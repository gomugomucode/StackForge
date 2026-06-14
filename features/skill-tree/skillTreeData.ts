import type { SkillTreeData } from '@/lib/core/types/phase5'

export const SKILL_TREES: Record<string, SkillTreeData> = {
  javascript: {
    techId: 'javascript',
    techName: 'JavaScript',
    nodes: [
      { id: 'js-basics', label: 'JS Basics', description: 'Variables, data types, operators, and control flow.', category: 'Foundation', xpRequired: 0, prerequisites: [], resources: [{ label: 'MDN JS Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' }], position: { x: 400, y: 50 }, level: 1 },
      { id: 'js-functions', label: 'Functions', description: 'Function declarations, expressions, arrow functions, and closures.', category: 'Foundation', xpRequired: 100, prerequisites: ['js-basics'], resources: [], position: { x: 200, y: 200 }, level: 2 },
      { id: 'js-arrays', label: 'Arrays & Objects', description: 'Array methods (map, filter, reduce), object destructuring, spread.', category: 'Foundation', xpRequired: 100, prerequisites: ['js-basics'], resources: [], position: { x: 600, y: 200 }, level: 2 },
      { id: 'js-dom', label: 'DOM Manipulation', description: 'querySelector, events, createElement, dynamic UIs.', category: 'Browser', xpRequired: 200, prerequisites: ['js-functions', 'js-arrays'], resources: [], position: { x: 200, y: 380 }, level: 3 },
      { id: 'js-async', label: 'Async / Promises', description: 'Callbacks, Promises, async/await, event loop.', category: 'Advanced', xpRequired: 200, prerequisites: ['js-functions'], resources: [], position: { x: 600, y: 380 }, level: 3 },
      { id: 'js-es6', label: 'ES6+ Modules', description: 'import/export, template literals, optional chaining, nullish coalescing.', category: 'Advanced', xpRequired: 300, prerequisites: ['js-arrays', 'js-functions'], resources: [], position: { x: 400, y: 380 }, level: 3 },
      { id: 'js-fetch', label: 'Fetch & APIs', description: 'HTTP requests, JSON handling, REST APIs.', category: 'Browser', xpRequired: 400, prerequisites: ['js-async'], resources: [], position: { x: 700, y: 540 }, level: 4 },
      { id: 'js-oop', label: 'OOP & Classes', description: 'Prototypes, classes, inheritance, encapsulation.', category: 'Advanced', xpRequired: 400, prerequisites: ['js-functions', 'js-es6'], resources: [], position: { x: 400, y: 540 }, level: 4 },
      { id: 'js-testing', label: 'Testing', description: 'Jest, unit testing, mocking, TDD.', category: 'Expert', xpRequired: 600, prerequisites: ['js-oop', 'js-async'], resources: [], position: { x: 300, y: 700 }, level: 5 },
      { id: 'js-perf', label: 'Performance', description: 'Memory management, debounce/throttle, lazy loading.', category: 'Expert', xpRequired: 700, prerequisites: ['js-async', 'js-dom'], resources: [], position: { x: 550, y: 700 }, level: 5 },
      { id: 'js-patterns', label: 'Design Patterns', description: 'Module, Observer, Factory, Singleton patterns.', category: 'Expert', xpRequired: 800, prerequisites: ['js-oop', 'js-testing'], resources: [], position: { x: 400, y: 860 }, level: 6 },
    ],
    edges: [
      { id: 'e1', source: 'js-basics', target: 'js-functions' },
      { id: 'e2', source: 'js-basics', target: 'js-arrays' },
      { id: 'e3', source: 'js-functions', target: 'js-dom' },
      { id: 'e4', source: 'js-arrays', target: 'js-dom' },
      { id: 'e5', source: 'js-functions', target: 'js-async' },
      { id: 'e6', source: 'js-arrays', target: 'js-es6' },
      { id: 'e7', source: 'js-functions', target: 'js-es6' },
      { id: 'e8', source: 'js-async', target: 'js-fetch' },
      { id: 'e9', source: 'js-functions', target: 'js-oop' },
      { id: 'e10', source: 'js-es6', target: 'js-oop' },
      { id: 'e11', source: 'js-oop', target: 'js-testing' },
      { id: 'e12', source: 'js-async', target: 'js-testing' },
      { id: 'e13', source: 'js-async', target: 'js-perf' },
      { id: 'e14', source: 'js-dom', target: 'js-perf' },
      { id: 'e15', source: 'js-oop', target: 'js-patterns' },
      { id: 'e16', source: 'js-testing', target: 'js-patterns' },
    ],
  },
  react: {
    techId: 'react',
    techName: 'React',
    nodes: [
      { id: 'r-jsx', label: 'JSX & Elements', description: 'JSX syntax, React.createElement, rendering.', category: 'Foundation', xpRequired: 0, prerequisites: [], resources: [], position: { x: 400, y: 50 }, level: 1 },
      { id: 'r-components', label: 'Components', description: 'Function components, props, composition.', category: 'Foundation', xpRequired: 100, prerequisites: ['r-jsx'], resources: [], position: { x: 400, y: 200 }, level: 2 },
      { id: 'r-state', label: 'useState', description: 'Local state management, updater functions.', category: 'Hooks', xpRequired: 200, prerequisites: ['r-components'], resources: [], position: { x: 200, y: 380 }, level: 3 },
      { id: 'r-effect', label: 'useEffect', description: 'Side effects, subscriptions, cleanup.', category: 'Hooks', xpRequired: 200, prerequisites: ['r-components'], resources: [], position: { x: 600, y: 380 }, level: 3 },
      { id: 'r-context', label: 'Context API', description: 'Global state, Provider pattern, useContext.', category: 'State', xpRequired: 400, prerequisites: ['r-state', 'r-effect'], resources: [], position: { x: 200, y: 540 }, level: 4 },
      { id: 'r-memo', label: 'Performance', description: 'React.memo, useMemo, useCallback optimization.', category: 'Performance', xpRequired: 400, prerequisites: ['r-state', 'r-effect'], resources: [], position: { x: 600, y: 540 }, level: 4 },
      { id: 'r-router', label: 'React Router', description: 'BrowserRouter, Route, Link, useParams.', category: 'Ecosystem', xpRequired: 300, prerequisites: ['r-components'], resources: [], position: { x: 400, y: 540 }, level: 4 },
      { id: 'r-forms', label: 'Forms & Validation', description: 'Controlled inputs, react-hook-form, Zod.', category: 'Patterns', xpRequired: 500, prerequisites: ['r-state'], resources: [], position: { x: 100, y: 700 }, level: 5 },
      { id: 'r-testing', label: 'Testing', description: 'React Testing Library, Jest, user-event.', category: 'Quality', xpRequired: 600, prerequisites: ['r-context', 'r-memo'], resources: [], position: { x: 400, y: 700 }, level: 5 },
      { id: 'r-patterns', label: 'Advanced Patterns', description: 'Compound components, render props, custom hooks.', category: 'Expert', xpRequired: 800, prerequisites: ['r-testing', 'r-forms'], resources: [], position: { x: 400, y: 860 }, level: 6 },
    ],
    edges: [
      { id: 'e1', source: 'r-jsx', target: 'r-components' },
      { id: 'e2', source: 'r-components', target: 'r-state' },
      { id: 'e3', source: 'r-components', target: 'r-effect' },
      { id: 'e4', source: 'r-state', target: 'r-context' },
      { id: 'e5', source: 'r-effect', target: 'r-context' },
      { id: 'e6', source: 'r-state', target: 'r-memo' },
      { id: 'e7', source: 'r-effect', target: 'r-memo' },
      { id: 'e8', source: 'r-components', target: 'r-router' },
      { id: 'e9', source: 'r-state', target: 'r-forms' },
      { id: 'e10', source: 'r-context', target: 'r-testing' },
      { id: 'e11', source: 'r-memo', target: 'r-testing' },
      { id: 'e12', source: 'r-forms', target: 'r-patterns' },
      { id: 'e13', source: 'r-testing', target: 'r-patterns' },
    ],
  },
  typescript: {
    techId: 'typescript',
    techName: 'TypeScript',
    nodes: [
      { id: 'ts-types', label: 'Basic Types', description: 'string, number, boolean, array, tuple, enum.', category: 'Foundation', xpRequired: 0, prerequisites: [], resources: [], position: { x: 400, y: 50 }, level: 1 },
      { id: 'ts-interfaces', label: 'Interfaces', description: 'Interface declarations, optional properties, readonly.', category: 'Foundation', xpRequired: 100, prerequisites: ['ts-types'], resources: [], position: { x: 200, y: 220 }, level: 2 },
      { id: 'ts-functions', label: 'Function Types', description: 'Type annotations, overloads, rest params.', category: 'Foundation', xpRequired: 100, prerequisites: ['ts-types'], resources: [], position: { x: 600, y: 220 }, level: 2 },
      { id: 'ts-generics', label: 'Generics', description: 'Generic functions, classes, constraints.', category: 'Advanced', xpRequired: 300, prerequisites: ['ts-interfaces', 'ts-functions'], resources: [], position: { x: 400, y: 400 }, level: 3 },
      { id: 'ts-utility', label: 'Utility Types', description: 'Partial, Required, Pick, Omit, Record, Readonly.', category: 'Advanced', xpRequired: 400, prerequisites: ['ts-generics'], resources: [], position: { x: 200, y: 580 }, level: 4 },
      { id: 'ts-narrowing', label: 'Type Narrowing', description: 'typeof, instanceof, discriminated unions, type guards.', category: 'Advanced', xpRequired: 400, prerequisites: ['ts-generics'], resources: [], position: { x: 600, y: 580 }, level: 4 },
      { id: 'ts-decorators', label: 'Decorators', description: 'Class, method, property decorators.', category: 'Expert', xpRequired: 700, prerequisites: ['ts-utility', 'ts-narrowing'], resources: [], position: { x: 400, y: 760 }, level: 5 },
    ],
    edges: [
      { id: 'e1', source: 'ts-types', target: 'ts-interfaces' },
      { id: 'e2', source: 'ts-types', target: 'ts-functions' },
      { id: 'e3', source: 'ts-interfaces', target: 'ts-generics' },
      { id: 'e4', source: 'ts-functions', target: 'ts-generics' },
      { id: 'e5', source: 'ts-generics', target: 'ts-utility' },
      { id: 'e6', source: 'ts-generics', target: 'ts-narrowing' },
      { id: 'e7', source: 'ts-utility', target: 'ts-decorators' },
      { id: 'e8', source: 'ts-narrowing', target: 'ts-decorators' },
    ],
  },
}

export function getSkillTree(techId: string): SkillTreeData | null {
  return SKILL_TREES[techId] ?? null
}

export const SUPPORTED_SKILL_TREES = Object.keys(SKILL_TREES)
