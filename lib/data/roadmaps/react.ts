import type { RoadmapData } from '../types'

export const reactRoadmap: RoadmapData = {
  overview: {
    title: 'React',
    description: 'The most popular UI library for web development. Learn components, state management, and modern patterns.',
    whatIsIt: 'React is an open-source, front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of developers.',
    whyLearnIt: 'React makes it easy to create interactive, dynamic web applications. It uses a virtual DOM to optimize rendering and can be extended to mobile (React Native) or server-side (Next.js).',
    careerOpportunities: 'React Developer, Frontend Engineer, UI Developer, Next.js Developer.',
    salaryInfo: '$75,000 - $140,000 per year.',
    industryDemand: 'Very High. Most job descriptions for modern frontend developers require React experience.',
  },
  phases: [
    {
      title: 'Phase 1 - Core Foundations',
      description: 'Understand the basic model of React components and JSX.',
      topics: [
        { name: 'JSX Syntax', description: 'Mixing HTML and JavaScript variables, expressions, and rendering attributes.' },
        { name: 'Components', description: 'Functional components, props passing, lists rendering, and conditional rendering.' },
        { name: 'State Management (useState)', description: 'Tracking component data, updating state triggers re-renders.' },
        { name: 'Handling Events', description: 'onClick, onChange, onSubmit event bindings and custom event arguments.' },
      ],
    },
    {
      title: 'Phase 2 - React Lifecycle & Side Effects',
      description: 'Synchronize your application with external systems and components lifecycle.',
      topics: [
        { name: 'useEffect Hook', description: 'Triggering side effects, api fetches, event listeners, and cleanup functions.' },
        { name: 'Conditional Rendering & Styling', description: 'Ternary operators, logical AND, dynamic inline styles, and Tailwind classes.' },
        { name: 'Forms in React', description: 'Controlled components, handling input fields, select elements, and multi-input state.' },
      ],
    },
    {
      title: 'Phase 3 - Advanced Hooks & Context',
      description: 'Optimize performance and prevent prop drilling with built-in APIs.',
      topics: [
        { name: 'useRef Hook', description: 'Accessing direct DOM nodes, persisting mutable values without triggering re-renders.' },
        { name: 'useMemo & useCallback', description: 'Optimizing rendering performance, memoizing computed calculations, and callback functions.' },
        { name: 'Context API (useContext)', description: 'Sharing global configurations, themes, or user authentication without prop drilling.' },
        { name: 'Custom Hooks', description: 'Extracting stateful component logic into reusable standalone functions (e.g. useFetch).' },
      ],
    },
    {
      title: 'Phase 4 - Ecosystem & Frameworks',
      description: 'Build complete applications using standard libraries and routing.',
      topics: [
        { name: 'React Router', description: 'Client-side routing, navigation, path variables, nested routes, and active links.' },
        { name: 'Global State (Redux / Zustand)', description: 'State containers for complex data flows, actions, reducers, and selectors.' },
        { name: 'Next.js Framework', description: 'Server-side rendering, routing structure, fetching optimizations, and SEO rendering.' },
      ],
    },
  ],
}
