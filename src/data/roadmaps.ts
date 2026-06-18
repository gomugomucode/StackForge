export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  isOptional?: boolean;
  quiz?: {
    question: string;
    options: string[];
    correctOption: number;
  };
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
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  nodes: RoadmapNode[];
  finalExam?: FinalExam;
}

export const roadmaps: Roadmap[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Master the art of building beautiful, performant user interfaces.',
    category: 'Web',
    color: 'from-violet-500/20 to-purple-600/10',
    icon: 'Palette',
    nodes: [
      { id: 'html-css', title: 'HTML & CSS', description: 'The foundation of the web.', content: 'Master semantic HTML, CSS Grid, Flexbox, and Responsive Design.', order: 1, quiz: { question: 'Which CSS property is used to create a flexible box layout?', options: ['display: block', 'display: flex', 'position: absolute', 'float: left'], correctOption: 1 } },
      { id: 'js-basics', title: 'JavaScript Essentials', description: 'Core language mechanics.', content: 'DOM Manipulation, ES6+, Async/Await, and Event Loop.', order: 2, quiz: { question: 'What is the result of "2" + 2 in JavaScript?', options: ['4', '22', 'NaN', 'TypeError'], correctOption: 1 } },
      { id: 'react-core', title: 'React Framework', description: 'The industry standard.', content: 'Hooks, Context API, State Management, and Component Life-cycles.', order: 3, quiz: { question: 'Which hook is used to handle side effects in React?', options: ['useState', 'useMemo', 'useEffect', 'useContext'], correctOption: 2 } },
      { id: 'nextjs-app', title: 'Next.js App Router', description: 'Modern fullstack React.', content: 'Server Components, Streaming, Routing, and SEO optimization.', order: 4, quiz: { question: 'What is the primary benefit of Server Components?', options: ['Faster client-side interaction', 'Reduced JavaScript bundle size', 'Direct access to the DOM', 'Better CSS scoping'], correctOption: 1 } },
      { id: 'perf-optimization', title: 'Web Performance', description: 'Building for speed.', content: 'Lighthouse, Core Web Vitals, Lazy Loading, and Memoization.', order: 5, quiz: { question: 'Which metric measures the time to the first paint of any pixel?', options: ['LCP', 'CLS', 'FCP', 'FID'], correctOption: 2 } },
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
    id: 'backend',
    title: 'Backend Engineer',
    description: 'Build scalable, secure, and robust server-side architectures.',
    category: 'Systems',
    color: 'from-cyan-500/20 to-blue-600/10',
    icon: 'Terminal',
    nodes: [
      { id: 'node-runtime', title: 'Node.js Runtime', description: 'Event-driven architecture.', content: 'Event Loop, Buffer, Stream, and File System modules.', order: 1 },
      { id: 'database-sql', title: 'Relational Databases', description: 'Structured data storage.', content: 'PostgreSQL, MySQL, Indexing, and Query Optimization.', order: 2 },
      { id: 'api-design', title: 'REST & GraphQL', description: 'Communication protocols.', content: 'API Design patterns, Authentication (JWT/OAuth), and Rate Limiting.', order: 3 },
      { id: 'redis-caching', title: 'Caching Strategies', description: 'Ultra-fast data access.', content: 'Redis, Memcached, and Cache Invalidation strategies.', order: 4 },
      { id: 'distributed-systems', title: 'Distributed Systems', description: 'Scale beyond one server.', content: 'Message Queues (RabbitMQ/Kafka), Load Balancing, and CAP Theorem.', order: 5 },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    description: 'The bridge between user experience and system architecture.',
    category: 'Web',
    color: 'from-emerald-500/20 to-teal-600/10',
    icon: 'Code2',
    nodes: [
      { id: 'ts-advanced', title: 'Advanced TypeScript', description: 'Type-safe development.', content: 'Generics, Discriminated Unions, and Utility Types.', order: 1 },
      { id: 'orm-prisma', title: 'Modern ORMs', description: 'Database abstraction.', content: 'Prisma, Drizzle, and Type-safe migrations.', order: 2 },
      { id: 'auth-clerk', title: 'Auth & Identity', description: 'Securing your app.', content: 'Clerk, NextAuth, and Role-Based Access Control (RBAC).', order: 3 },
      { id: 'deployment-pipeline', title: 'CI/CD Pipelines', description: 'Automated delivery.', content: 'GitHub Actions, Vercel, and Dockerization.', order: 4 },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    description: 'Automate infrastructure and scale global applications.',
    category: 'Infrastructure',
    color: 'from-amber-500/20 to-orange-600/10',
    icon: 'GitBranch',
    nodes: [
      { id: 'linux-shell', title: 'Linux Mastery', description: 'The OS of the cloud.', content: 'Bash scripting, Permissions, and Process Management.', order: 1 },
      { id: 'docker-container', title: 'Containerization', description: 'Standardizing environments.', content: 'Dockerfiles, Compose, and Image Optimization.', order: 2 },
      { id: 'k8s-orchestration', title: 'Kubernetes', description: 'Orchestrating containers.', content: 'Pods, Services, Deployments, and Helm Charts.', order: 3 },
      { id: 'aws-cloud', title: 'AWS Ecosystem', description: 'Cloud-native scaling.', content: 'EC2, S3, Lambda, and VPC Networking.', order: 4 },
    ],
  },
  {
    id: 'python',
    title: 'Python Specialist',
    description: 'Master the most versatile language for AI and Data.',
    category: 'Language',
    color: 'from-blue-500/20 to-indigo-600/10',
    icon: 'FileCode',
    nodes: [
      { id: 'py-basics', title: 'Python Fundamentals', description: 'Syntax and Data Structures.', content: 'Lists, Dicts, Generators and Decorators.', order: 1 },
      { id: 'py-oop', title: 'OOP in Python', description: 'Designing complex systems.', content: 'Classes, Inheritance and Mixins.', order: 2 },
      { id: 'py-async', title: 'Asyncio & Concurrency', description: 'High performance Python.', content: 'Async/Await, Threading and Multiprocessing.', order: 3 },
    ],
  },
  {
    id: 'java',
    title: 'Java Enterprise',
    description: 'Build robust, industrial-grade applications.',
    category: 'Language',
    color: 'from-red-500/20 to-orange-600/10',
    icon: 'Coffee',
    nodes: [
      { id: 'java-core', title: 'Java Core', description: 'JVM and Language Basics.', content: 'Collections, Streams API and Generics.', order: 1 },
      { id: 'spring-boot', title: 'Spring Boot', description: 'The enterprise standard.', content: 'Dependency Injection, AOP and Spring Data.', order: 2 },
      { id: 'jvm-tuning', title: 'JVM Performance', description: 'Garbage Collection and Memory.', content: 'G1GC, ZGC and Heap Analysis.', order: 3 },
    ],
  },
  {
    id: 'ai',
    title: 'AI Engineer',
    description: 'From Neural Networks to Generative AI.',
    category: 'AI',
    color: 'from-pink-500/20 to-rose-600/10',
    icon: 'Cpu',
    nodes: [
      { id: 'math-ml', title: 'Mathematics for ML', description: 'The theory behind the magic.', content: 'Linear Algebra, Calculus and Probability.', order: 1 },
      { id: 'py-torch', title: 'Deep Learning with PyTorch', description: 'Building Neural Networks.', content: 'Tensors, Autograd and Backpropagation.', order: 2 },
      { id: 'llm-fine-tuning', title: 'LLM Fine-tuning', description: 'Customizing Large Models.', content: 'LoRA, QLoRA and Prompt Engineering.', order: 3 },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Expert',
    description: 'Protect systems and think like a hacker.',
    category: 'Security',
    color: 'from-slate-500/20 to-gray-600/10',
    icon: 'Shield',
    nodes: [
      { id: 'networking', title: 'TCP/IP Networking', description: 'How data moves.', content: 'OSI Model, DNS, DHCP and Packet Analysis.', order: 1 },
      { id: 'owasp-top10', title: 'OWASP Top 10', description: 'Common Web Vulnerabilities.', content: 'XSS, SQL Injection and CSRF.', order: 2 },
      { id: 'cryptography', title: 'Cryptography Basics', description: 'Securing the data.', content: 'Symmetric vs Asymmetric Encryption and Hashing.', order: 3 },
    ],
  },
  {
    id: 'data-engineering',
    title: 'Data Engineer',
    description: 'Architecting pipelines for massive datasets.',
    category: 'Data',
    color: 'from-indigo-500/20 to-blue-600/10',
    icon: 'Database',
    nodes: [
      { id: 'sql-advanced', title: 'Advanced SQL', description: 'Beyond basic queries.', content: 'Window Functions, CTEs and Query Optimization.', order: 1 },
      { id: 'spark-processing', title: 'Apache Spark', description: 'Distributed processing.', content: 'DataFrames, RDDs and Spark SQL.', order: 2 },
      { id: 'kafka-streams', title: 'Real-time Streaming', description: 'Handling live data.', content: 'Kafka Topics, Producers, Consumers and KSQL.', order: 3 },
    ],
  },
];
