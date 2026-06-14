import type { TechResourceData } from './types'

export const reactResourceData: TechResourceData = {
  sections: [
    {
      id: 'official-docs',
      title: 'Official Documentation',
      description: 'The React team\'s official learning resources.',
      icon: 'BookOpen',
      resources: [
        { title: 'React Official Docs (react.dev)', url: 'https://react.dev', description: 'The new, fully rewritten React documentation with interactive examples, detailed guides, and API references.', type: 'free', difficulty: 'Beginner', badge: 'Official' },
        { title: 'React API Reference', url: 'https://react.dev/reference/react', description: 'Complete API reference for all React hooks, components, and top-level exports.', type: 'free', difficulty: 'Intermediate', badge: 'Official' },
        { title: 'React GitHub', url: 'https://github.com/facebook/react', description: 'React\'s source code and issue tracker. Read RFCs to understand upcoming changes and core team decisions.', type: 'free', difficulty: 'Advanced' },
      ],
    },
    {
      id: 'books',
      title: 'Books',
      description: 'The best texts for mastering React development.',
      icon: 'Library',
      resources: [
        { title: 'Learning React', url: 'https://www.oreilly.com/library/view/learning-react-2nd/9781492051718/', description: 'Modern React with Hooks — functional components, state management, and performance from O\'Reilly.', type: 'paid', difficulty: 'Beginner', badge: 'Must Read', author: 'Alex Banks & Eve Porcello', estimatedHours: 30 },
        { title: 'The Road to React', url: 'https://www.roadtoreact.com/', description: 'Free/paid book by Robin Wieruch. Builds a real Hacker News client step by step with modern React.', type: 'freemium', difficulty: 'Beginner', badge: 'Best Rated', author: 'Robin Wieruch', estimatedHours: 20 },
        { title: 'React Design Patterns', url: 'https://www.packtpub.com/product/react-design-patterns-and-best-practices/9781800560444', description: 'Advanced patterns: compound components, render props, HOCs, custom hooks, and performance optimization.', type: 'paid', difficulty: 'Advanced', estimatedHours: 25 },
      ],
    },
    {
      id: 'video-courses',
      title: 'Video Courses',
      description: 'Top-rated React video learning paths.',
      icon: 'PlayCircle',
      resources: [
        { title: 'React — The Complete Guide', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', description: 'Maximilian Schwarzmüller\'s comprehensive React course — hooks, Router, Redux, Next.js, TypeScript. 68 hours.', type: 'paid', difficulty: 'Beginner', badge: 'Best Rated', author: 'Maximilian Schwarzmüller', estimatedHours: 68 },
        { title: 'Epic React by Kent C. Dodds', url: 'https://epicreact.dev/', description: 'Deep-dive React workshop series by the creator of Testing Library. Advanced hooks, patterns, and performance.', type: 'paid', difficulty: 'Advanced', badge: 'Community Pick', author: 'Kent C. Dodds', estimatedHours: 40 },
        { title: 'React Tutorial — freeCodeCamp', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/', description: 'Free Front End Development Libraries certification including React and Redux.', type: 'free', difficulty: 'Beginner', badge: 'Free', estimatedHours: 50 },
        { title: 'Scrimba React Course', url: 'https://scrimba.com/learn/learnreact', description: 'Interactive coding environment — code alongside the instructor inside the video. Great for hands-on learners.', type: 'freemium', difficulty: 'Beginner', badge: 'Community Pick', estimatedHours: 20 },
      ],
    },
    {
      id: 'practice',
      title: 'Practice Platforms',
      description: 'Build and practice React with real projects.',
      icon: 'Code2',
      resources: [
        { title: 'GreatFrontend', url: 'https://www.greatfrontend.com/', description: 'Frontend interview preparation with React-specific UI coding challenges evaluated by ex-Meta/Google engineers.', type: 'freemium', difficulty: 'Intermediate', badge: 'Community Pick' },
        { title: 'Frontend Mentor', url: 'https://www.frontendmentor.io/', description: 'Real-world project challenges with professional Figma designs. Build a portfolio by solving design-to-code challenges.', type: 'freemium', difficulty: 'Beginner', badge: 'Best Rated' },
        { title: 'CodeSandbox', url: 'https://codesandbox.io/', description: 'Browser-based React IDE — prototype and share React components instantly without local setup.', type: 'freemium', difficulty: 'Beginner' },
        { title: 'Stackblitz', url: 'https://stackblitz.com/', description: 'Online IDE with instant React + Vite environments. Full Node.js runtime in the browser.', type: 'freemium', difficulty: 'Beginner' },
      ],
    },
    {
      id: 'github',
      title: 'GitHub Repositories',
      description: 'Essential React open-source resources.',
      icon: 'Github',
      resources: [
        { title: 'Awesome React', url: 'https://github.com/enaqx/awesome-react', description: 'The ultimate curated list of React tools, libraries, articles, and community resources.', type: 'free', difficulty: 'Beginner', badge: 'Community Pick' },
        { title: 'React Patterns', url: 'https://reactpatterns.com/', description: 'Common React patterns — component composition, render props, HOCs, and hooks patterns documented clearly.', type: 'free', difficulty: 'Intermediate', badge: 'Must Read' },
        { title: 'Bulletproof React', url: 'https://github.com/alan2207/bulletproof-react', description: 'A scalable and production-ready React application architecture guide with real code examples.', type: 'free', difficulty: 'Advanced', badge: 'Best Rated' },
        { title: 'React Use', url: 'https://github.com/streamich/react-use', description: 'Essential collection of 100+ production-ready React hooks for common use cases.', type: 'free', difficulty: 'Intermediate' },
      ],
    },
    {
      id: 'tools',
      title: 'Developer Tools',
      description: 'The React developer toolchain.',
      icon: 'Wrench',
      resources: [
        { title: 'React DevTools', url: 'https://react.dev/learn/react-developer-tools', description: 'Official browser extension for inspecting React component trees, props, state, and profiling performance.', type: 'free', difficulty: 'Beginner', badge: 'Official' },
        { title: 'Vite + React', url: 'https://vitejs.dev/guide/', description: 'The fastest way to scaffold a new React project with HMR, TypeScript, and production optimization.', type: 'free', difficulty: 'Beginner', badge: 'Best Rated' },
        { title: 'TanStack Query', url: 'https://tanstack.com/query/latest', description: 'The standard for server state management in React — data fetching, caching, and synchronization.', type: 'free', difficulty: 'Intermediate' },
        { title: 'Storybook', url: 'https://storybook.js.org/', description: 'Build and document UI components in isolation. The industry standard for component development workflow.', type: 'free', difficulty: 'Intermediate' },
      ],
    },
    {
      id: 'community',
      title: 'Community & Forums',
      description: 'React community hubs and newsletters.',
      icon: 'Users',
      resources: [
        { title: 'Reactiflux Discord', url: 'https://www.reactiflux.com/', description: 'The largest React Discord community — 200k+ members with direct access to React core team members.', type: 'free', difficulty: 'Beginner', badge: 'Community Pick' },
        { title: 'r/reactjs', url: 'https://www.reddit.com/r/reactjs/', description: 'Active React subreddit for news, questions, project showcases, and weekly discussion threads.', type: 'free', difficulty: 'Beginner' },
        { title: 'This Week in React', url: 'https://thisweekinreact.com/', description: 'Weekly newsletter by Sébastien Lorber covering the latest React news, libraries, articles, and trends.', type: 'free', difficulty: 'Intermediate' },
        { title: 'React Status', url: 'https://react.statuscode.com/', description: 'Weekly email newsletter covering React and React Native news, tutorials, and community links.', type: 'free', difficulty: 'Beginner' },
      ],
    },
  ],

  learningPath: {
    totalWeeks: 7,
    totalHours: 100,
    level: 'Intermediate',
    description: 'A 7-week path for developers with JavaScript fundamentals, covering React from hooks to production-ready architecture.',
    weeks: [
      { week: 1, title: 'React Fundamentals', description: 'Understand JSX, component composition, and React\'s rendering model.', topics: ['JSX Syntax & Expressions', 'Functional Components', 'Props & Children', 'Conditional Rendering', 'Lists & Keys'], estimatedHours: 12, milestoneProject: 'Build a card-based profile page' },
      { week: 2, title: 'State & Events', description: 'Master controlled state and event handling in React.', topics: ['useState Hook', 'Event Handlers', 'Forms & Controlled Inputs', 'Lifting State Up', 'Two-way Data Binding'], estimatedHours: 14, milestoneProject: 'Build an interactive quiz app' },
      { week: 3, title: 'Side Effects & Data Fetching', description: 'Connect to APIs and manage lifecycle with useEffect.', topics: ['useEffect Hook & Cleanup', 'Dependency Arrays', 'Fetching with fetch/axios', 'Loading & Error States', 'Custom Hooks Intro'], estimatedHours: 14, milestoneProject: 'Build a GitHub user search app' },
      { week: 4, title: 'Advanced Hooks', description: 'Deep-dive into React\'s hook ecosystem for complex scenarios.', topics: ['useReducer for complex state', 'useContext & Context API', 'useMemo & useCallback', 'useRef for DOM access', 'Custom Hooks patterns'], estimatedHours: 16, milestoneProject: 'Build a theme-aware todo manager' },
      { week: 5, title: 'Routing & Navigation', description: 'Build multi-page SPAs with React Router v6.', topics: ['React Router v6 Setup', 'Route Params & Nested Routes', 'Programmatic Navigation', 'Protected Routes (auth guards)', 'Loaders & Error Boundaries'], estimatedHours: 12, milestoneProject: 'Build a multi-page portfolio site with routes' },
      { week: 6, title: 'State Management at Scale', description: 'Manage global state for large applications.', topics: ['Context + useReducer Pattern', 'Zustand State Manager', 'TanStack Query for server state', 'Optimistic Updates', 'Code Splitting with lazy()'], estimatedHours: 16, milestoneProject: 'Add global state to your todo manager with Zustand' },
      { week: 7, title: 'Performance & Production', description: 'Optimize, test, and deploy production React apps.', topics: ['React.memo & Profiler', 'Virtualization with react-window', 'Component Testing with Testing Library', 'Vite Build Configuration', 'Deploying to Vercel/Netlify'], estimatedHours: 16, milestoneProject: 'Build and deploy a full e-commerce product page' },
    ],
  },

  skillTree: [
    { id: 'react-core', name: 'Core Concepts', description: 'React\'s fundamental building blocks.', level: 'category', children: [
      { id: 'react-jsx', name: 'JSX', description: 'JavaScript XML — React\'s template syntax compiled by Babel.', level: 'topic', codeExample: `// JSX is syntactic sugar for React.createElement
const Card = ({ title, children }) => (
  <div className="card">
    <h2>{title}</h2>
    <div>{children}</div>
  </div>
)

// Expressions inside {}
const name = "World"
const el = <p>Hello, {name.toUpperCase()}!</p>` },
      { id: 'react-hooks', name: 'Hooks', description: 'useState, useEffect, useContext and the rules of hooks.', level: 'topic', codeExample: `import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id) // cleanup
  }, []) // empty array = run once on mount

  return <div>Seconds: {seconds}</div>
}` },
      { id: 'react-state', name: 'State & Props', description: 'Unidirectional data flow from parent to child via props, local state with useState.', level: 'topic', codeExample: `// Props flow down
function Parent() {
  const [count, setCount] = useState(0)
  return <Child count={count} onIncrement={() => setCount(c => c + 1)} />
}

// Child receives read-only props
function Child({ count, onIncrement }) {
  return <button onClick={onIncrement}>Count: {count}</button>
}` },
    ]},
    { id: 'react-patterns', name: 'Patterns', description: 'Reusable design patterns for scalable React code.', level: 'category', children: [
      { id: 'react-custom-hooks', name: 'Custom Hooks', description: 'Extracting stateful logic into reusable functions prefixed with "use".', level: 'topic', codeExample: `function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

// Usage
const { data, loading } = useFetch('/api/users')` },
      { id: 'react-composition', name: 'Component Composition', description: 'Building complex UIs by composing simple components together.', level: 'topic', codeExample: `// Compound component pattern
function Tabs({ children }) {
  const [active, setActive] = useState(0)
  return <div>{React.Children.map(children, (child, i) =>
    React.cloneElement(child, { isActive: i === active, onClick: () => setActive(i) })
  )}</div>
}

function Tab({ label, isActive, onClick }) {
  return <button className={isActive ? 'active' : ''} onClick={onClick}>{label}</button>
}` },
    ]},
    { id: 'react-perf', name: 'Performance', description: 'Techniques for keeping React apps fast at scale.', level: 'category', children: [
      { id: 'react-memo', name: 'Memoization', description: 'React.memo, useMemo, and useCallback to prevent unnecessary re-renders.', level: 'topic', codeExample: `// React.memo — skip re-render if props unchanged
const ExpensiveList = React.memo(({ items }) => {
  return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>
})

// useMemo — cache expensive computation
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items] // only recalculate when items changes
)` },
    ]},
  ],

  aiQA: [
    { keywords: ['useeffect', 'effect', 'side effect'], question: 'How does useEffect work?', answer: 'useEffect runs after render by default. The dependency array controls when it re-runs: `[]` = once on mount, `[dep]` = when dep changes, no array = every render. Return a cleanup function to cancel subscriptions or timers. Example: `useEffect(() => { const id = setInterval(fn, 1000); return () => clearInterval(id) }, [])` ' },
    { keywords: ['usestate', 'state', 'useState'], question: 'How does useState work?', answer: '`useState(initialValue)` returns `[state, setState]`. Calling `setState(newValue)` schedules a re-render with the new value. Use the function form `setState(prev => prev + 1)` when new state depends on old state — it avoids stale closures. State is preserved between renders and reset when the component unmounts.' },
    { keywords: ['key', 'keys', 'list'], question: 'Why do React lists need keys?', answer: 'Keys help React identify which items changed, were added, or removed during reconciliation. Without them, React may incorrectly reorder or reuse DOM nodes causing bugs. Keys must be unique among siblings — use stable IDs, not array indexes (indexes cause issues when items are reordered). `<li key={item.id}>{item.name}</li>`' },
    { keywords: ['virtual dom', 'reconciliation'], question: 'What is the Virtual DOM?', answer: 'React keeps a lightweight JavaScript representation of the DOM (the virtual DOM). On each render, it compares the new virtual tree to the previous one (diffing), then batch-applies only the actual changes to the real DOM. This minimizes expensive DOM operations. React 18\'s concurrent features extend this with time-sliced rendering.' },
    { keywords: ['context', 'usecontext'], question: 'What is React Context?', answer: 'Context provides a way to pass data through the component tree without prop drilling. Create with `React.createContext(defaultValue)`, provide via `<Context.Provider value={data}>`, and consume with `useContext(Context)`. Best for infrequently updated data like themes, auth, or locale — heavy updates can cause performance issues.' },
    { keywords: ['hook rules', 'rules of hooks'], question: 'What are the Rules of Hooks?', answer: 'Two rules: 1) Only call hooks at the top level — never inside loops, conditions, or nested functions. 2) Only call hooks from React function components or custom hooks. These ensure hook state is consistently maintained across renders. The ESLint plugin `eslint-plugin-react-hooks` enforces these automatically.' },
    { keywords: ['memo', 'usememo', 'usecallback', 'performance'], question: 'When should I use useMemo and useCallback?', answer: 'Use `useMemo` to cache expensive computations: `useMemo(() => heavyCalc(data), [data])`. Use `useCallback` to memoize functions passed as props to avoid re-renders of child components: `useCallback(() => handleClick(id), [id])`. Don\'t overuse — memoization has overhead. Profile first with React DevTools.' },
    { keywords: ['controlled', 'uncontrolled', 'form'], question: 'What is a controlled component?', answer: 'A controlled component\'s value is driven by React state — `<input value={state} onChange={e => setState(e.target.value)} />`. React fully controls the input. An uncontrolled component stores its own state internally, accessed via `ref`. Prefer controlled components for form validation and data submission.' },
    { keywords: ['ref', 'useref'], question: 'What is useRef used for?', answer: 'useRef returns a mutable `{ current: value }` object that persists across renders without causing re-renders. Two main uses: 1) DOM access: `const inputRef = useRef(); inputRef.current.focus()`. 2) Storing mutable values that shouldn\'t trigger re-renders — like timer IDs or previous values.' },
    { keywords: ['error boundary', 'errorboundary'], question: 'What are Error Boundaries?', answer: 'Error boundaries are class components that catch JavaScript errors in their child tree and display a fallback UI instead of crashing. They catch render errors, lifecycle errors, and constructor errors. Use the `react-error-boundary` library for a modern hook-based API. They do NOT catch errors in event handlers (use try/catch there).' },
  ],
}
