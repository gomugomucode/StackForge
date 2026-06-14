import type { TechResourceData } from './types'

export const javascriptResourceData: TechResourceData = {
  sections: [
    {
      id: 'official-docs',
      title: 'Official Documentation',
      description: 'Primary references maintained by standards bodies and core teams.',
      icon: 'BookOpen',
      resources: [
        {
          title: 'MDN Web Docs — JavaScript',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          description: 'The most comprehensive JavaScript reference on the web. Covers every API, method, and language feature with examples.',
          type: 'free',
          difficulty: 'Beginner',
          badge: 'Official',
          author: 'Mozilla',
        },
        {
          title: 'JavaScript.info',
          url: 'https://javascript.info',
          description: 'A modern JavaScript tutorial covering language fundamentals to advanced patterns, from the creators of the js.info guide.',
          type: 'free',
          difficulty: 'Beginner',
          badge: 'Best Rated',
        },
        {
          title: 'ECMAScript Specification',
          url: 'https://tc39.es/ecma262/',
          description: 'The official ECMAScript language specification. Essential for understanding how JS engines implement core semantics.',
          type: 'free',
          difficulty: 'Advanced',
          badge: 'Official',
        },
        {
          title: 'TC39 Proposals',
          url: 'https://github.com/tc39/proposals',
          description: 'Track upcoming JavaScript features at each proposal stage — from strawman ideas to Stage 4 finalized specs.',
          type: 'free',
          difficulty: 'Advanced',
        },
      ],
    },
    {
      id: 'books',
      title: 'Books',
      description: 'Must-read titles that stand the test of time for JS mastery.',
      icon: 'Library',
      resources: [
        {
          title: 'Eloquent JavaScript',
          url: 'https://eloquentjavascript.net/',
          description: 'A deep dive into programming and JavaScript fundamentals. Freely available online with interactive exercises.',
          type: 'free',
          difficulty: 'Beginner',
          badge: 'Must Read',
          author: 'Marijn Haverbeke',
          estimatedHours: 40,
        },
        {
          title: 'You Don\'t Know JS (Yet)',
          url: 'https://github.com/getify/You-Dont-Know-JS',
          description: 'A series of 6 books diving deep into JS core mechanisms: scope, closures, this, types, async, and ES6+.',
          type: 'free',
          difficulty: 'Intermediate',
          badge: 'Best Rated',
          author: 'Kyle Simpson',
          estimatedHours: 60,
        },
        {
          title: 'JavaScript: The Good Parts',
          url: 'https://www.oreilly.com/library/view/javascript-the-good/9780596517748/',
          description: 'Classic distillation of the best JavaScript patterns and idioms by the creator of JSON, Douglas Crockford.',
          type: 'paid',
          difficulty: 'Intermediate',
          badge: 'Must Read',
          author: 'Douglas Crockford',
          estimatedHours: 15,
        },
        {
          title: 'JavaScript Patterns',
          url: 'https://www.oreilly.com/library/view/javascript-patterns/9781449399115/',
          description: 'Solutions to common JavaScript coding problems with proven design patterns and best practices.',
          type: 'paid',
          difficulty: 'Advanced',
          author: 'Stoyan Stefanov',
          estimatedHours: 25,
        },
      ],
    },
    {
      id: 'video-courses',
      title: 'Video Courses',
      description: 'Structured video learning paths from beginner to expert level.',
      icon: 'PlayCircle',
      resources: [
        {
          title: 'The Complete JavaScript Course 2024',
          url: 'https://www.udemy.com/course/the-complete-javascript-course/',
          description: 'Jonas Schmedtmann\'s flagship JS course — 69 hours covering modern JS, OOP, async, and real-world projects.',
          type: 'paid',
          difficulty: 'Beginner',
          badge: 'Best Rated',
          author: 'Jonas Schmedtmann',
          estimatedHours: 69,
        },
        {
          title: 'JavaScript: Understanding the Weird Parts',
          url: 'https://www.udemy.com/course/understand-javascript/',
          description: 'Deep dive into closures, prototypes, the event loop, and execution contexts — trusted by 250k+ developers.',
          type: 'paid',
          difficulty: 'Intermediate',
          badge: 'Community Pick',
          author: 'Anthony Alicea',
          estimatedHours: 12,
        },
        {
          title: 'freeCodeCamp JavaScript Certification',
          url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
          description: 'Free 300-hour certification covering algorithms, data structures, OOP, and functional programming.',
          type: 'free',
          difficulty: 'Beginner',
          badge: 'Free',
          estimatedHours: 300,
        },
        {
          title: 'JavaScript30 — 30 Day Vanilla JS Challenge',
          url: 'https://javascript30.com/',
          description: 'Build 30 projects in 30 days using only vanilla JavaScript. No frameworks, no libraries — pure DOM mastery.',
          type: 'free',
          difficulty: 'Intermediate',
          badge: 'Community Pick',
          author: 'Wes Bos',
          estimatedHours: 15,
        },
      ],
    },
    {
      id: 'practice',
      title: 'Practice Platforms',
      description: 'Sharpen your JavaScript with coding challenges and exercises.',
      icon: 'Code2',
      resources: [
        {
          title: 'LeetCode',
          url: 'https://leetcode.com',
          description: 'The gold standard for interview prep. Thousands of algorithm problems with JS solutions and discussion boards.',
          type: 'freemium',
          difficulty: 'Intermediate',
          badge: 'Community Pick',
        },
        {
          title: 'Codewars',
          url: 'https://www.codewars.com',
          description: 'Kata-based challenges sorted by rank. Great for practicing functional JS and clean code skills.',
          type: 'free',
          difficulty: 'Beginner',
          badge: 'Best Rated',
        },
        {
          title: 'Exercism — JavaScript Track',
          url: 'https://exercism.org/tracks/javascript',
          description: '140+ exercises with mentor reviews. Excellent for getting genuine feedback on your code quality.',
          type: 'free',
          difficulty: 'Beginner',
        },
        {
          title: 'HackerRank JavaScript',
          url: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript',
          description: '10 Days of JavaScript challenge — structured daily exercises covering every core language feature.',
          type: 'free',
          difficulty: 'Beginner',
        },
      ],
    },
    {
      id: 'github',
      title: 'GitHub Repositories',
      description: 'Open-source projects and curated lists worth starring.',
      icon: 'Github',
      resources: [
        {
          title: 'Awesome JavaScript',
          url: 'https://github.com/sorrycc/awesome-javascript',
          description: 'A curated list of the best JavaScript libraries, frameworks, tools, and resources — 30k+ stars.',
          type: 'free',
          difficulty: 'Beginner',
          badge: 'Community Pick',
        },
        {
          title: 'JavaScript Algorithms & Data Structures',
          url: 'https://github.com/trekhleb/javascript-algorithms',
          description: 'Algorithms and data structures implemented in JavaScript with explanations and links to further readings.',
          type: 'free',
          difficulty: 'Intermediate',
          badge: 'Best Rated',
        },
        {
          title: 'Clean Code JavaScript',
          url: 'https://github.com/ryanmcdermott/clean-code-javascript',
          description: 'Software engineering principles adapted for JavaScript — readable, maintainable, and scalable code patterns.',
          type: 'free',
          difficulty: 'Intermediate',
        },
        {
          title: '33 JavaScript Concepts',
          url: 'https://github.com/leonardomso/33-js-concepts',
          description: '33 fundamental JavaScript concepts every developer should know — call stack, closures, promises, and more.',
          type: 'free',
          difficulty: 'Intermediate',
          badge: 'Must Read',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Developer Tools',
      description: 'Essential tools for productive JavaScript development.',
      icon: 'Wrench',
      resources: [
        {
          title: 'VS Code + Prettier + ESLint',
          url: 'https://code.visualstudio.com/',
          description: 'The definitive JS developer setup. VS Code with Prettier for formatting and ESLint for static analysis.',
          type: 'free',
          difficulty: 'Beginner',
          badge: 'Official',
        },
        {
          title: 'Vite',
          url: 'https://vitejs.dev/',
          description: 'Next-generation frontend tooling. Extremely fast dev server and optimized production builds for JS projects.',
          type: 'free',
          difficulty: 'Beginner',
        },
        {
          title: 'Quokka.js',
          url: 'https://quokkajs.com/',
          description: 'Live JavaScript playground inside VS Code — see evaluation results inline as you type.',
          type: 'freemium',
          difficulty: 'Beginner',
        },
        {
          title: 'Chrome DevTools',
          url: 'https://developer.chrome.com/docs/devtools/',
          description: 'The browser\'s built-in debugging suite. Master breakpoints, performance profiling, and network inspection.',
          type: 'free',
          difficulty: 'Beginner',
          badge: 'Official',
        },
      ],
    },
    {
      id: 'community',
      title: 'Community & Forums',
      description: 'Active communities to ask questions and stay current.',
      icon: 'Users',
      resources: [
        {
          title: 'r/javascript',
          url: 'https://www.reddit.com/r/javascript/',
          description: 'The largest JavaScript community on Reddit. News, discussions, project showcases, and weekly Q&A threads.',
          type: 'free',
          difficulty: 'Beginner',
        },
        {
          title: 'Stack Overflow — JavaScript',
          url: 'https://stackoverflow.com/questions/tagged/javascript',
          description: 'Millions of answered JavaScript questions. Almost every bug or concept you encounter has been discussed here.',
          type: 'free',
          difficulty: 'Beginner',
          badge: 'Community Pick',
        },
        {
          title: 'JavaScript Discord (Reactiflux)',
          url: 'https://www.reactiflux.com/',
          description: 'The largest React & JS Discord community with dedicated channels for help, jobs, and project feedback.',
          type: 'free',
          difficulty: 'Beginner',
        },
        {
          title: 'DEV Community — JavaScript',
          url: 'https://dev.to/t/javascript',
          description: 'Developer articles, tutorials, and project write-ups from the community. Great for staying current with trends.',
          type: 'free',
          difficulty: 'Beginner',
        },
      ],
    },
  ],

  learningPath: {
    totalWeeks: 8,
    totalHours: 120,
    level: 'Beginner',
    description: 'A structured 8-week path from JavaScript fundamentals to building real-world applications with modern ES2024+ syntax.',
    weeks: [
      {
        week: 1,
        title: 'Foundations & Syntax',
        description: 'Get comfortable with JS syntax, variables, types, and your dev environment.',
        topics: ['Variables: var, let, const', 'Data Types & Type Coercion', 'Operators & Expressions', 'Control Flow: if/else, switch', 'Loops: for, while, for..of'],
        estimatedHours: 12,
        milestoneProject: 'Build a number-guessing game in the browser console',
      },
      {
        week: 2,
        title: 'Functions & Scope',
        description: 'Master function declarations, expressions, arrow functions, and how JavaScript manages variable scope.',
        topics: ['Function Declarations vs Expressions', 'Arrow Functions', 'Default Parameters & Rest/Spread', 'Scope Chain & Lexical Scope', 'Closures & IIFE'],
        estimatedHours: 14,
        milestoneProject: 'Build a calculator using pure functions',
      },
      {
        week: 3,
        title: 'Arrays & Objects',
        description: 'Work with JavaScript\'s primary data structures and their powerful built-in methods.',
        topics: ['Array Methods: map, filter, reduce', 'Object Literals & Destructuring', 'Spread Operator', 'Optional Chaining & Nullish Coalescing', 'JSON & Serialization'],
        estimatedHours: 14,
        milestoneProject: 'Build a todo list with filtering and sorting',
      },
      {
        week: 4,
        title: 'DOM Manipulation',
        description: 'Control the browser\'s document tree to build interactive web pages.',
        topics: ['Selecting DOM Elements', 'Creating & Modifying Elements', 'Event Listeners', 'Event Delegation', 'Local Storage API'],
        estimatedHours: 16,
        milestoneProject: 'Build an interactive quote generator with local storage',
      },
      {
        week: 5,
        title: 'Asynchronous JavaScript',
        description: 'Learn how JavaScript handles time-based operations without blocking.',
        topics: ['Callbacks & Callback Hell', 'Promises & Promise Chains', 'Async/Await Syntax', 'Error Handling with try/catch', 'Fetch API & REST calls'],
        estimatedHours: 18,
        milestoneProject: 'Build a weather app using the OpenWeather API',
      },
      {
        week: 6,
        title: 'Object-Oriented JavaScript',
        description: 'Understand prototypes, classes, and how OOP works under JS\'s hood.',
        topics: ['Prototypal Inheritance', 'ES6 Classes', 'Getters & Setters', 'Static Methods', 'Mixins & Composition'],
        estimatedHours: 14,
        milestoneProject: 'Model a bank account system using classes',
      },
      {
        week: 7,
        title: 'Modern JS & Modules',
        description: 'Adopt the modern JavaScript ecosystem — modules, bundlers, and advanced features.',
        topics: ['ES Modules: import/export', 'Dynamic Imports', 'Map & Set', 'Symbol & WeakMap', 'Iterators & Generators'],
        estimatedHours: 14,
        milestoneProject: 'Refactor a multi-file app using ES modules',
      },
      {
        week: 8,
        title: 'Advanced Patterns & Capstone',
        description: 'Learn advanced design patterns and build a complete real-world project.',
        topics: ['Event Loop & Microtask Queue', 'Design Patterns: Observer, Factory, Singleton', 'Functional Programming Concepts', 'Performance & Memory', 'Code Quality: ESLint + Prettier'],
        estimatedHours: 18,
        milestoneProject: 'Build a full expense tracker app with charts and local data persistence',
      },
    ],
  },

  skillTree: [
    {
      id: 'js-foundations',
      name: 'Foundations',
      description: 'The core building blocks every JavaScript developer must master first.',
      level: 'category',
      children: [
        {
          id: 'js-variables',
          name: 'Variables & Types',
          description: 'Understanding var, let, const and JavaScript\'s dynamic type system.',
          level: 'topic',
          codeExample: `// Modern variable declarations
const name = 'StackForge' // Block-scoped, immutable binding
let count = 0             // Block-scoped, mutable

// Dynamic typing
let value = 42
value = 'now a string'    // Perfectly valid in JS

// Type checking
typeof value  // 'string'
typeof 42     // 'number'
typeof null   // 'object' (famous quirk!)`,
        },
        {
          id: 'js-functions',
          name: 'Functions',
          description: 'Function declarations, expressions, and arrow functions are the workhorses of JS.',
          level: 'topic',
          codeExample: `// Three ways to declare a function
function greet(name) { return \`Hello \${name}\` }
const greet2 = function(name) { return \`Hi \${name}\` }
const greet3 = (name) => \`Hey \${name}\`

// Higher-order function
const double = (fn) => (x) => fn(x) * 2
const doubleGreetLength = double(s => s.length)
doubleGreetLength('hello') // 10`,
        },
        {
          id: 'js-scope',
          name: 'Scope & Closures',
          description: 'How JavaScript resolves variable names and why closures are a superpower.',
          level: 'topic',
          codeExample: `// Closure — function remembers its outer scope
function makeCounter() {
  let count = 0
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  }
}
const counter = makeCounter()
counter.increment() // 1
counter.increment() // 2
counter.value()     // 2`,
        },
      ],
    },
    {
      id: 'js-data',
      name: 'Data Structures',
      description: 'Arrays, objects, Map, Set — the containers that hold your application state.',
      level: 'category',
      children: [
        {
          id: 'js-arrays',
          name: 'Arrays & Methods',
          description: 'Master map, filter, reduce, find, and other functional array operations.',
          level: 'topic',
          codeExample: `const nums = [1, 2, 3, 4, 5]
const evens = nums.filter(n => n % 2 === 0)    // [2, 4]
const doubled = nums.map(n => n * 2)            // [2, 4, 6, 8, 10]
const sum = nums.reduce((acc, n) => acc + n, 0) // 15

// Chaining
const result = nums
  .filter(n => n > 2)
  .map(n => n * 10)
  .reduce((a, b) => a + b, 0) // 120`,
        },
        {
          id: 'js-objects',
          name: 'Objects & Destructuring',
          description: 'Object literals, shorthand, computed keys, and destructuring syntax.',
          level: 'topic',
          codeExample: `const user = { name: 'Alice', age: 30, role: 'admin' }

// Destructuring with rename + default
const { name: userName, role = 'user' } = user

// Spread for immutable updates
const updated = { ...user, age: 31 }

// Optional chaining
const city = user?.address?.city ?? 'Unknown'`,
        },
        {
          id: 'js-mapset',
          name: 'Map & Set',
          description: 'ES6 collection types that solve common object and array limitations.',
          level: 'topic',
          codeExample: `// Set — unique values only
const tags = new Set(['js', 'css', 'js'])
tags.size // 2 (duplicate removed)

// Map — any key type, ordered insertion
const cache = new Map()
cache.set({ id: 1 }, 'user-data')
cache.has({ id: 1 }) // false — different reference!

// Proper Map usage with primitive keys
const scores = new Map([['Alice', 95], ['Bob', 87]])
scores.get('Alice') // 95`,
        },
      ],
    },
    {
      id: 'js-async',
      name: 'Async JavaScript',
      description: 'Mastering asynchronous code is what separates intermediate from senior JS developers.',
      level: 'category',
      children: [
        {
          id: 'js-promises',
          name: 'Promises',
          description: 'The fundamental unit of async JavaScript — representing a future value.',
          level: 'topic',
          codeExample: `const fetchUser = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'Alice' })
      else reject(new Error('Invalid ID'))
    }, 1000)
  })

// Chaining
fetchUser(1)
  .then(user => user.name)
  .then(name => console.log(name))
  .catch(err => console.error(err))`,
        },
        {
          id: 'js-asyncawait',
          name: 'Async/Await',
          description: 'Syntactic sugar over Promises — write async code that reads like synchronous code.',
          level: 'topic',
          codeExample: `async function getWeather(city) {
  try {
    const res = await fetch(\`/api/weather?city=\${city}\`)
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
    const data = await res.json()
    return data.temperature
  } catch (err) {
    console.error('Failed to fetch weather:', err)
    return null
  }
}`,
        },
        {
          id: 'js-eventloop',
          name: 'Event Loop',
          description: 'How JS handles concurrency using a single thread, call stack, and task queues.',
          level: 'topic',
          codeExample: `// Execution order — understand microtask vs macrotask
console.log('1 - sync')

setTimeout(() => console.log('4 - macrotask'), 0)

Promise.resolve()
  .then(() => console.log('2 - microtask'))
  .then(() => console.log('3 - microtask 2'))

// Output: 1, 2, 3, 4
// Microtasks (Promises) always run before macrotasks (setTimeout)`,
        },
      ],
    },
    {
      id: 'js-browser',
      name: 'Browser APIs',
      description: 'The rich set of APIs available in browser environments for building web UIs.',
      level: 'category',
      children: [
        {
          id: 'js-dom',
          name: 'DOM Manipulation',
          description: 'Selecting, creating, and modifying HTML elements through the Document Object Model.',
          level: 'topic',
          codeExample: `// Modern DOM APIs
const btn = document.querySelector('#submit-btn')
const list = document.getElementById('items')

// Creating elements
const li = document.createElement('li')
li.textContent = 'New Item'
li.classList.add('item', 'active')
list.appendChild(li)

// Event delegation — one listener for many elements
document.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    e.target.closest('.item').remove()
  }
})`,
        },
        {
          id: 'js-fetch',
          name: 'Fetch API',
          description: 'The modern way to make HTTP requests from the browser.',
          level: 'topic',
          codeExample: `// GET request
const data = await fetch('/api/users').then(r => r.json())

// POST with JSON body
const created = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'a@example.com' }),
}).then(r => r.json())`,
        },
        {
          id: 'js-storage',
          name: 'Web Storage',
          description: 'localStorage and sessionStorage for client-side data persistence.',
          level: 'topic',
          codeExample: `// localStorage — persists across sessions
localStorage.setItem('user', JSON.stringify({ id: 1 }))
const user = JSON.parse(localStorage.getItem('user'))
localStorage.removeItem('user')

// sessionStorage — cleared when tab closes
sessionStorage.setItem('cart', JSON.stringify([]))`,
        },
      ],
    },
  ],

  aiQA: [
    { keywords: ['closure', 'closures'], question: 'What is a closure?', answer: 'A closure is a function that retains access to its outer scope even after the outer function has returned. It "closes over" variables from its enclosing scope. Example: `function makeAdder(x) { return (y) => x + y }` — the inner arrow function closes over `x`.' },
    { keywords: ['var', 'let', 'const', 'difference'], question: 'What is the difference between var, let, and const?', answer: '`var` is function-scoped and hoisted. `let` is block-scoped and not initialized until declaration. `const` is block-scoped and cannot be reassigned (but the object it points to can be mutated). Always prefer `const`, use `let` when reassignment is needed, avoid `var` in modern JS.' },
    { keywords: ['hoisting', 'hoisted'], question: 'What is hoisting in JavaScript?', answer: 'Hoisting moves variable and function declarations to the top of their scope during compilation. `var` declarations are hoisted and initialized to `undefined`. Function declarations are fully hoisted. `let` and `const` are hoisted but not initialized — accessing them before declaration causes a ReferenceError (the Temporal Dead Zone).' },
    { keywords: ['promise', 'promises'], question: 'What is a Promise?', answer: 'A Promise represents a value that may not be available yet. It has three states: pending, fulfilled, or rejected. Use `.then()` for success handling, `.catch()` for errors, and `.finally()` for cleanup. Modern code typically uses `async/await` syntax over raw promise chains for readability.' },
    { keywords: ['async', 'await'], question: 'How does async/await work?', answer: '`async` marks a function as asynchronous and makes it return a Promise. `await` pauses execution inside an `async` function until a Promise resolves. It\'s syntactic sugar over Promises — the code runs asynchronously but reads synchronously. Always wrap `await` calls in try/catch for error handling.' },
    { keywords: ['event loop', 'eventloop', 'concurrency'], question: 'How does the JavaScript event loop work?', answer: 'JS is single-threaded but handles async via the event loop. The call stack runs synchronous code. When async operations complete, their callbacks go to the task queue (macrotasks: setTimeout, setInterval) or microtask queue (Promises). The event loop continuously checks: if the call stack is empty, process all microtasks first, then one macrotask.' },
    { keywords: ['prototype', 'prototypal', 'inheritance'], question: 'What is prototypal inheritance?', answer: 'JavaScript objects have a hidden `[[Prototype]]` link to another object. When you access a property, JS looks up the prototype chain until it finds it or reaches null. Classes in JS are syntactic sugar over prototype-based inheritance. You can inspect it via `Object.getPrototypeOf(obj)` or the `__proto__` property.' },
    { keywords: ['this', 'context'], question: 'How does `this` work in JavaScript?', answer: '`this` refers to the context in which a function is called, not where it\'s defined. In regular functions, `this` depends on the call site. In arrow functions, `this` is inherited from the enclosing lexical scope. In class methods, `this` refers to the instance. Use `.bind()`, `.call()`, or `.apply()` to explicitly set `this`.' },
    { keywords: ['spread', 'rest', 'destructuring'], question: 'What are spread and rest operators?', answer: 'Both use `...` syntax. **Spread** expands an iterable: `[...arr1, ...arr2]` or `{...obj1, ...obj2}`. **Rest** collects remaining elements into an array: `function sum(...nums) { return nums.reduce((a,b) => a+b, 0) }`. Destructuring with rest: `const [first, ...rest] = array`.' },
    { keywords: ['null', 'undefined', 'nullish'], question: 'What is the difference between null and undefined?', answer: '`undefined` means a variable has been declared but not assigned a value. `null` is an intentional absence of value, explicitly assigned. `typeof undefined` is `"undefined"`, `typeof null` is `"object"` (a famous bug). Use `??` (nullish coalescing) to provide defaults for both: `value ?? "default"` only falls back when value is `null` or `undefined`.' },
  ],
}
