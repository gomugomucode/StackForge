import type { RoadmapData } from '../types'

export const javascriptRoadmap: RoadmapData = {
  overview: {
    title: 'JavaScript',
    description: 'The programming language of the Web. Master interactive frontend UI development and backend systems with Node.js.',
    whatIsIt: 'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles.',
    whyLearnIt: 'JavaScript is essential for front-end web development, enabling interactive webpages. It is also widely used for backend (Node.js), mobile app development (React Native), and desktop apps (Electron).',
    careerOpportunities: 'Frontend Developer, Full-Stack Engineer, JavaScript Developer, Node.js Backend Developer.',
    salaryInfo: '$70,000 - $135,000 per year, depending on experience and location.',
    industryDemand: 'Extremely High. Over 98% of all websites use JavaScript as a client-side programming language.',
  },
  phases: [
    {
      title: 'Phase 1 - Fundamentals',
      description: 'Master the building blocks of JavaScript logic and data structures.',
      topics: [
        { name: 'Variables', description: 'Understand var, let, and const declarations, scoping, and hoisting behavior.', resources: ['MDN: let & const', 'JavaScript.info: Variables'] },
        { name: 'Data Types', description: 'Primitive types (String, Number, Boolean, Null, Undefined, Symbol, BigInt) vs Objects.', resources: ['MDN: Data Structures'] },
        { name: 'Operators', description: 'Arithmetic, logical, comparison, ternary, and nullish coalescing operators.', resources: ['JavaScript.info: Operators'] },
        { name: 'Loops & Conditionals', description: 'Control flows using if-else, switch, for, while, and do-while loops.', resources: ['MDN: Control Flow'] },
        { name: 'Functions', description: 'Declaration, function expressions, arrow functions, parameter defaults, and rest parameters.', resources: ['JavaScript.info: Functions'] },
        { name: 'Arrays & Methods', description: 'Creating arrays, push, pop, shift, unshift, map, filter, reduce, find, and splice.', resources: ['MDN: Array Methods'] },
        { name: 'Objects & Key-value pairs', description: 'Object literals, dot and bracket notation, methods, this keyword, and object destructuring.', resources: ['JavaScript.info: Objects'] },
      ],
    },
    {
      title: 'Phase 2 - Intermediate',
      description: 'Interact with the browser environment and learn asynchronous JavaScript.',
      topics: [
        { name: 'DOM Manipulation', description: 'Selecting elements, changing styles, appending/removing nodes, and class manipulation.', resources: ['MDN: Document Object Model'] },
        { name: 'Browser Events', description: 'Click, input, keydown, submit events, event listeners, bubbling, capturing, and delegation.', resources: ['JavaScript.info: Browser Events'] },
        { name: 'Fetch API & AJAX', description: 'Making HTTP requests, parsing JSON response data, handling request headers and response codes.', resources: ['MDN: Fetch API'] },
        { name: 'ES6+ Features', description: 'Spread/rest operators, template literals, destructuring, modules import/export, and optional chaining.', resources: ['JavaScript.info: Modern Features'] },
        { name: 'Promises & Async/Await', description: 'Asynchronous states, then/catch syntax, promise chaining, and synchronous-looking try/catch async functions.', resources: ['MDN: Promises'] },
      ],
    },
    {
      title: 'Phase 3 - Advanced',
      description: 'Deep dive into language internals, engine mechanisms, and design patterns.',
      topics: [
        { name: 'Closures & Lexical Scope', description: 'How functions retain reference to outer scope variables even when executed outside.', resources: ['MDN: Closures'] },
        { name: 'Prototypes & Classes', description: 'Prototype chain, prototypal inheritance, constructor functions, ES6 classes, getters/setters.', resources: ['JavaScript.info: Prototypes'] },
        { name: 'Event Loop & Concurrency', description: 'Call stack, memory heap, callback queue, microtask queue, Web APIs, and browser rendering.', resources: ['JS Event Loop Explained'] },
        { name: 'Design Patterns', description: 'Module pattern, Singleton, Observer, Factory, and Pub/Sub in JavaScript.', resources: ['Learning JS Design Patterns'] },
      ],
    },
    {
      title: 'Phase 4 - Frameworks',
      description: 'Adopt modern industry frameworks for component-based frontend scaling.',
      topics: [
        { name: 'React', description: 'A declarative component library for UI building with state management.', resources: ['React Documentation'] },
        { name: 'Next.js', description: 'Production-ready framework for React, rendering server-side, static sites, and routing.', resources: ['Next.js docs'] },
        { name: 'Vue.js', description: 'Progressive framework focusing on reactivity, templates, and easy setup.', resources: ['Vue.js Guide'] },
      ],
    },
    {
      title: 'Phase 5 - Projects',
      description: 'Consolidate your learning by building responsive real-world web applications.',
      topics: [
        { name: 'Portfolio Website', description: 'Design a responsive, elegant portfolio to display your work, styled with CSS and animations.' },
        { name: 'Todo App with LocalStorage', description: 'Interactive checklist dashboard that saves user data locally between sessions.' },
        { name: 'Weather App (OpenWeatherMap API)', description: 'Search cities and render current temperature and forecasting data from an API.' },
        { name: 'E-commerce Platform', description: 'A full frontend cart, search filter, item detail pages, checkout page flow.' },
      ],
    },
  ],
}
