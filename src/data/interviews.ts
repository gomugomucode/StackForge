export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
}

export interface InterviewCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  questions: InterviewQuestion[];
}

export const interviewCategories: InterviewCategory[] = [
  {
    id: 'js-1',
    slug: 'javascript',
    title: 'JavaScript Deep Dive',
    description: 'From prototypes to event loops. Master the language of the web.',
    icon: 'Code',
    questions: [
      { id: 'q1', question: 'Explain the Event Loop in JavaScript.', answer: 'The event loop is a mechanism that allows JavaScript to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible. It constantly checks the call stack to see if there is any work to do. If the stack is empty, it takes the first event from the queue and pushes it onto the stack.', difficulty: 'Medium', category: 'Runtime', tags: ['Event Loop', 'Async'] },
      { id: 'q2', question: 'What is a closure and why is it useful?', answer: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). Closures are useful for data encapsulation, creating private variables, and maintaining state in asynchronous callbacks.', difficulty: 'Easy', category: 'Fundamentals', tags: ['Scope', 'Closures'] },
      { id: 'q3', question: 'Explain the difference between == and ===.', answer: 'The == operator performs type coercion before comparing, while === checks for both value and type equality without coercion.', difficulty: 'Easy', category: 'Fundamentals', tags: ['Types'] },
      { id: 'q4', question: 'What is the "Temporal Dead Zone" in JS?', answer: 'The TDZ is the period between the start of a block and when a variable is declared. Accessing a variable in the TDZ results in a ReferenceError. This happens with let and const declarations.', difficulty: 'Medium', category: 'Fundamentals', tags: ['TDZ', 'Scope'] },
      { id: 'q5', question: 'Explain Prototypal Inheritance.', answer: 'In JS, objects inherit properties from other objects via a prototype chain. Every object has a hidden internal property called [[Prototype]] that points to another object. If a property isnot found on the object, JS looks up the prototype chain until it finds it or hits null.', difficulty: 'Hard', category: 'OOP', tags: ['Prototypes', 'Inheritance'] },
      { id: 'q6', question: 'What is the use of the "this" keyword?', answer: 'The "this" keyword refers to the object that is executing the current function. Its value depends on how the function is called: in a method it refers to the owner object, in a simple function call in non-strict mode it refers to the global object, and in arrow functions it inherits "this" from the surrounding scope.', difficulty: 'Medium', category: 'Fundamentals', tags: ['Context', 'this'] },
    ]
  },
  {
    id: 'react-1',
    slug: 'react',
    title: 'React & Ecosystem',
    description: 'Everything from Virtual DOM to Server Components.',
    icon: 'Atom',
    questions: [
      { id: 'rq1', question: 'How does the Virtual DOM work?', answer: 'The Virtual DOM is a lightweight representation of the real DOM. When state changes, React creates a new virtual tree and compares it with the previous one (diffing). It then updates only the changed parts in the real DOM (reconciliation), which is much faster than re-rendering the entire page.', difficulty: 'Medium', category: 'Core', tags: ['VDOM', 'Performance'] },
      { id: 'rq2', question: 'What is the purpose of useEffect?', answer: 'useEffect allows you to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It replaces lifecycle methods like componentDidMount and componentDidUpdate.', difficulty: 'Easy', category: 'Hooks', tags: ['Lifecycle'] },
      { id: 'rq3', question: 'What are Higher-Order Components (HOCs)?', answer: 'An HOC is a function that takes a component and returns a new component with added functionality. While hooks have replaced many HOC use cases, they are still useful for cross-cutting concerns like authentication or logging.', difficulty: 'Medium', category: 'Patterns', tags: ['HOC', 'Composition'] },
      { id: 'rq4', question: 'What is the difference between useMemo and useCallback?', answer: 'useMemo returns a memoized value (the result of a function), while useCallback returns a memoized version of the function itself. useMemo is for expensive calculations, useCallback is for preventing unnecessary re-renders of child components that depend on function props.', difficulty: 'Medium', category: 'Hooks', tags: ['Optimization', 'Memoization'] },
      { id: 'rq5', question: 'Explain React Server Components (RSC).', answer: 'RSCs allow components to be rendered on the server and sent to the client as a lightweight data format, not HTML. This reduces the amount of JavaScript sent to the browser, improving load times and allowing direct database access within the component.', difficulty: 'Hard', category: 'Architecture', tags: ['RSC', 'Next.js'] },
    ]
  },
  {
    id: 'node-1',
    slug: 'node',
    title: 'Node.js Backend',
    description: 'Scalable server-side JavaScript for the modern web.',
    icon: 'Terminal',
    questions: [
      { id: 'nq1', question: 'What is the role of the libuv library in Node.js?', answer: 'libuv is a C library that provides the event loop and handles asynchronous I/O operations (like file system access and network requests) by leveraging a thread pool, allowing Node.js to be non-blocking.', difficulty: 'Hard', category: 'Runtime', tags: ['libuv', 'EventLoop'] },
      { id: 'nq2', question: 'What is the difference between setImmediate() and process.nextTick()?', answer: 'process.nextTick() schedules a callback to be executed immediately after the current operation completes, before the event loop continues. setImmediate() schedules a callback to be executed in the next "check" phase of the event loop.', difficulty: 'Medium', category: 'Async', tags: ['EventLoop'] },
      { id: 'nq3', question: 'Explain the concept of Streams in Node.js.', answer: 'Streams are objects that let you read data from a source or write data to a destination in a continuous fashion, rather than loading the entire file into memory. This is crucial for handling large files efficiently.', difficulty: 'Medium', category: 'IO', tags: ['Streams', 'Buffer'] },
    ]
  },
  {
    id: 'sys-1',
    slug: 'system-design',
    title: 'System Design',
    description: 'Architecture patterns for scaling to millions of users.',
    icon: 'Database',
    questions: [
      { id: 'sq1', question: 'How would you design a URL Shortener like Bitly?', answer: 'A URL shortener requires a unique ID generation strategy (like Base62 encoding of a sequence), a fast read-store (Redis) for mapping IDs to URLs, and a relational DB (Postgres) for persistence. Key considerations: hashing collisions, expiration, and read-heavy traffic.', difficulty: 'Hard', category: 'Architecture', tags: ['Scaling', 'Hashing'] },
      { id: 'sq2', question: 'Explain the CAP Theorem.', answer: 'The CAP theorem states that a distributed system can only provide two of three guarantees: Consistency, Availability, and Partition Tolerance. In the event of a network partition, you must choose between consistency (everyone sees the same data) or availability (the system remains responsive).', difficulty: 'Medium', category: 'Theory', tags: ['Distributed Systems'] },
      { id: 'sq3', question: 'What is Load Balancing and how does it work?', answer: 'Load balancing is the process of distributing network traffic across multiple servers to ensure no single server becomes overwhelmed. Common algorithms include Round Robin, Least Connections, and IP Hash.', difficulty: 'Easy', category: 'Infrastructure', tags: ['Scaling', 'Availability'] },
      { id: 'sq4', question: 'Explain the difference between Vertical and Horizontal Scaling.', answer: 'Vertical scaling (Scaling Up) means adding more power (CPU, RAM) to an existing server. Horizontal scaling (Scaling Out) means adding more servers to the pool. Horizontal scaling is generally preferred for large-scale systems as it provides better fault tolerance.', difficulty: 'Easy', category: 'Scaling', tags: ['Architecture'] },
      { id: 'sq5', question: 'What are Microservices and when should you use them?', answer: 'Microservices are an architectural style that divides an application into a collection of small, independent services. They should be used when a system becomes too large for a single team to manage or when different parts of the system have different scaling needs.', difficulty: 'Medium', category: 'Architecture', tags: ['Microservices', 'Scaling'] },
    ]
  }
]
