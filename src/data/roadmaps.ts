export interface Lesson {
  slug: string;
  title: string;
  description: string;
  whatIsIt: string;
  whyItMatters: string;
  syntax: string;
  declaration: string;
  example: string;
  commonMistakes: string;
  practiceTask: string;
  resources: string[];
  quizId?: string;
  cheatsheetSlug?: string;
  interviewSlug?: string;
}

export interface Module {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface FinalExam {
  questions: {
    question: string;
    options: string[];
    correctOption: number;
  }[];
  passingScore: number;
}

export interface Roadmap {
  slug: string;
  title: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  overview: string;
  modules: Module[];
  finalExam?: FinalExam;
}

export const roadmaps: Roadmap[] = [
  {
    slug: 'frontend',
    title: 'Frontend Developer',
    description: 'Master the art of building beautiful, performant user interfaces.',
    category: 'Web',
    color: 'from-violet-500/20 to-purple-600/10',
    icon: 'Palette',
    overview: 'This roadmap takes you from basic HTML to advanced Next.js and performance optimization. You will learn how to build accessible, responsive, and lightning-fast web applications.',
    modules: [
      {
        slug: 'foundations',
        title: 'The Foundations',
        description: 'Core technologies of the web.',
        lessons: [
          { 
            slug: 'html-css', 
            title: 'HTML & CSS', 
            description: 'The foundation of the web.', 
            whatIsIt: 'HTML (HyperText Markup Language) and CSS (Cascading Style Sheets) are the building blocks of any website.', 
            whyItMatters: 'Without them, the web would just be plain text. They allow us to structure content and style it for a great user experience.', 
            syntax: 'HTML uses tags like <div>, CSS uses selectors and declarations.', 
            declaration: 'Example: .container { display: flex; }', 
            example: '<div class="container">Hello World</div>', 
            commonMistakes: 'Using too many <div> tags instead of semantic elements like <main> or <section>.', 
            practiceTask: 'Build a responsive 3-column layout using CSS Grid.', 
            resources: ['MDN Web Docs', 'CSS-Tricks'] 
          },
          { 
            slug: 'js-basics', 
            title: 'JavaScript Essentials', 
            description: 'Core language mechanics.', 
            whatIsIt: 'JavaScript is a high-level, interpreted programming language that enables interactive web pages.', 
            whyItMatters: 'It allows you to create dynamic content, handle user events, and communicate with servers.', 
            syntax: 'Uses variables (let, const), functions, and objects.', 
            declaration: 'const add = (a, b) => a + b;', 
            example: 'document.querySelector(".btn").addEventListener("click", () => alert("Hi!"));', 
            commonMistakes: 'Confusing == and ===, or forgetting to handle async operations with await.', 
            practiceTask: 'Create a simple calculator that can add, subtract, multiply and divide.', 
            resources: ['JavaScript.info', 'Eloquent JavaScript'] 
          },
        ]
      },
      {
        slug: 'modern-frameworks',
        title: 'Modern Frameworks',
        description: 'Scaling UI development with React and Next.js.',
        lessons: [
          { 
            slug: 'react-core', 
            title: 'React Framework', 
            description: 'The industry standard.', 
            whatIsIt: 'A JavaScript library for building user interfaces based on components.', 
            whyItMatters: 'It simplifies state management and UI updates through the Virtual DOM.', 
            syntax: 'JSX (JavaScript XML) for templates, Hooks for state and lifecycle.', 
            declaration: 'function App() { return <h1>Hello</h1>; }', 
            example: 'const [count, setCount] = useState(0);', 
            commonMistakes: 'Updating state directly instead of using the setter function.', 
            practiceTask: 'Build a To-Do list application with add/delete functionality.', 
            resources: ['React Dev Docs'] 
          },
          { 
            slug: 'nextjs-app', 
            title: 'Next.js App Router', 
            description: 'Modern fullstack React.', 
            whatIsIt: 'A framework built on top of React that provides server-side rendering and routing.', 
            whyItMatters: 'It significantly improves SEO and initial page load performance.', 
            syntax: 'File-system based routing, Server Components by default.', 
            declaration: 'export default function Page() { return <div>Home</div>; }', 
            example: 'await prisma.user.findMany() inside a server component.', 
            commonMistakes: 'Trying to use hooks like useState in a Server Component.', 
            practiceTask: 'Create a blog with dynamic routes using the Next.js App Router.', 
            resources: ['Next.js Documentation'] 
          },
        ]
      }
    ],
    finalExam: {
      passingScore: 80,
      questions: [
        { question: 'What is the "Critical Rendering Path" in browser performance?', options: ['DOM -> CSSOM -> Render Tree -> Layout -> Paint', 'HTML -> JS -> CSS -> Paint', 'DOM -> JS -> Paint', 'CSSOM -> DOM -> Layout' ], correctOption: 0 },
        { question: 'How does the React Virtual DOM optimize updates?', options: ['By replacing the entire DOM on every change', 'By using a diffing algorithm to update only changed parts', 'By bypassing the DOM and rendering directly to the GPU', 'By disabling CSS transitions' ], correctOption: 1 },
        { question: 'Which Next.js feature is used to pre-render pages on the server?', options: ['Client Components', 'Dynamic Routing', 'Server Components', 'API Routes' ], correctOption: 2 },
        { question: 'What is the purpose of a "Closure" in JavaScript?', options: ['To close the browser tab', 'To encapsulate private variables and maintain state', 'To optimize loop performance', 'To prevent memory leaks' ], correctOption: 1 },
        { question: 'Which CSS unit is relative to the viewport width?', options: ['px', 'rem', 'vw', 'em' ], correctOption: 2 },
      ]
    }
  },
  {
    slug: 'backend',
    title: 'Backend Engineer',
    description: 'Build scalable, secure, and robust server-side architectures.',
    category: 'Systems',
    color: 'from-cyan-500/20 to-blue-600/10',
    icon: 'Terminal',
    overview: 'Master the server-side of development, from Node.js and Databases to Distributed Systems.',
    modules: [
      {
        slug: 'core-backend',
        title: 'Core Backend',
        description: 'The basics of server-side development.',
        lessons: [
          { 
            slug: 'node-runtime', 
            title: 'Node.js Runtime', 
            description: 'Event-driven architecture.', 
            whatIsIt: 'A JavaScript runtime built on Chrome\'s V8 engine.', 
            whyItMatters: 'Enables running JS on the server, allowing full-stack development with one language.', 
            syntax: 'CommonJS (require) or ESM (import).', 
            declaration: 'const fs = require("fs");', 
            example: 'http.createServer((req, res) => { res.end("Hello"); }).listen(3000);', 
            commonMistakes: 'Blocking the event loop with heavy synchronous operations.', 
            practiceTask: 'Create a simple file server that reads and serves HTML files.', 
            resources: ['Node.js Docs'] 
          },
          { 
            slug: 'database-sql', 
            title: 'Relational Databases', 
            description: 'Structured data storage.', 
            whatIsIt: 'Databases that store data in tables with fixed columns and rows.', 
            whyItMatters: 'Ensures data integrity and allows complex queries via SQL.', 
            syntax: 'SQL (Structured Query Language).', 
            declaration: 'SELECT * FROM users WHERE id = 1;', 
            example: 'CREATE TABLE posts (id INT PRIMARY KEY, title TEXT);', 
            commonMistakes: 'Ignoring indexes, leading to slow query performance.', 
            practiceTask: 'Design a database schema for an e-commerce store.', 
            resources: ['PostgreSQL Docs'] 
          },
        ]
      }
    ],
  },
  {
    slug: 'fullstack',
    title: 'Full-Stack Developer',
    description: 'The bridge between user experience and system architecture.',
    category: 'Web',
    color: 'from-emerald-500/20 to-teal-600/10',
    icon: 'Code2',
    overview: 'Combining frontend and backend expertise to build complete applications.',
    modules: [
      {
        slug: 'advanced-stack',
        title: 'Advanced Stack',
        description: 'Cutting edge tools for modern apps.',
        lessons: [
          { 
            slug: 'ts-advanced', 
            title: 'Advanced TypeScript', 
            description: 'Type-safe development.', 
            whatIsIt: 'Advanced typing features like Generics and Mapped Types.', 
            whyItMatters: 'Reduces bugs and improves developer experience in large codebases.', 
            syntax: 'T extends U, keyof T, etc.', 
            declaration: 'type PartialUser = Partial<User>;', 
            example: 'function wrap<T>(val: T): T[] { return [val]; }', 
            commonMistakes: 'Overusing the "any" type, defeating the purpose of TS.', 
            practiceTask: 'Implement a generic ApiResponse type that handles both success and error states.', 
            resources: ['TS Handbook'] 
          },
        ]
      }
    ],
  }
];
