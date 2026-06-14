import type { RoadmapData, NoteChapter, CheatsheetCommand, InterviewQuestion, ProjectDetails } from './types'
import type { TechResourceData } from './resources/types'

export interface FullTechData {
  id: string
  roadmap: RoadmapData
  notes: NoteChapter[]
  cheatsheet: CheatsheetCommand[]
  interviews: InterviewQuestion[]
  projects: ProjectDetails[]
  resources: TechResourceData
}

export interface TechMetadata {
  id: string
  title: string
  description: string
  totalTopics: number
  totalWeeks: number
  totalHours: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  skillCategories: number
  projectsCount: number
  questionsCount: number
  topicNames: string[]
}

export const technologyMetadata: Record<string, TechMetadata> = {
  javascript: {
    id: 'javascript',
    title: 'JavaScript',
    description: 'The programming language of the Web. Master interactive frontend UI development and backend systems with Node.js.',
    totalTopics: 23,
    totalWeeks: 8,
    totalHours: 120,
    difficulty: 'Beginner',
    skillCategories: 4,
    projectsCount: 3,
    questionsCount: 5,
    topicNames: [
      'Variables', 'Data Types', 'Operators', 'Loops & Conditionals', 'Functions', 'Arrays & Methods', 'Objects & Key-value pairs',
      'DOM Manipulation', 'Browser Events', 'Fetch API & AJAX', 'ES6+ Features', 'Promises & Async/Await',
      'Closures & Lexical Scope', 'Prototypes & Classes', 'Event Loop & Concurrency', 'Design Patterns',
      'React', 'Next.js', 'Vue.js',
      'Portfolio Website', 'Todo App with LocalStorage', 'Weather App (OpenWeatherMap API)', 'E-commerce Platform'
    ]
  },
  python: {
    id: 'python',
    title: 'Python',
    description: 'Versatile and beginner-friendly programming language. Master scripting, backend web servers, data manipulation, and automation structures.',
    totalTopics: 23,
    totalWeeks: 8,
    totalHours: 100,
    difficulty: 'Beginner',
    skillCategories: 4,
    projectsCount: 3,
    questionsCount: 5,
    topicNames: [
      'Variables & Basic Types', 'Operators & Expressions', 'Control Flow (if-else, loops)', 'Functions & Scope', 'Lists, Tuples, Sets, Dicts', 'File I/O basics',
      'List Comprehensions', 'Lambda Functions & Map/Filter', 'Modules & Packages import', 'Error Handling (try-except)', 'Virtual Environments (venv)',
      'OOP Concepts (Classes & Objects)', 'Inheritance & Polymorphism', 'Decorators & Generators', 'Context Managers (with statement)', 'Dunder Methods (init, str, etc.)',
      'Django framework basics', 'Flask framework basics', 'FastAPI framework basics',
      'Web Scraper (BeautifulSoup/Requests)', 'CLI Automation Script', 'REST API with FastAPI', 'Data Analysis Dashboard'
    ]
  },
  react: {
    id: 'react',
    title: 'React',
    description: 'Declarative component-driven UI frontend framework. Master virtual DOM synchronization, reactive state loops, and single-page routing builds.',
    totalTopics: 19,
    totalWeeks: 6,
    totalHours: 90,
    difficulty: 'Intermediate',
    skillCategories: 4,
    projectsCount: 3,
    questionsCount: 5,
    topicNames: [
      'Create React App vs Vite', 'JSX Syntax Rules', 'Functional Components', 'Props Passing & Destructuring', 'Conditional Rendering basics',
      'useState hook loop', 'useEffect fetch hook', 'useContext global state', 'useRef DOM referencing', 'Custom Hooks templates',
      'React Router config', 'Tailwind CSS in React', 'CSS Modules styling', 'Dynamic active classes styling',
      'Build optimization tips', 'Vercel Deployment guide', 'Netlify Deployment guide',
      'Personal Profile Landing Page', 'Interactive Budget Expense Calculator', 'Real-time Github Search Dashboard'
    ]
  },
  nodejs: {
    id: 'nodejs',
    title: 'Node.js',
    description: 'Server-side runtime environment built on Chrome\'s V8 engine. Master asynchronous APIs, microservices configuration, and databases routing.',
    totalTopics: 18,
    totalWeeks: 6,
    totalHours: 85,
    difficulty: 'Intermediate',
    skillCategories: 4,
    projectsCount: 3,
    questionsCount: 5,
    topicNames: [
      'Node.js Architecture', 'Event Loop & Callbacks', 'CommonJS vs ES Modules', 'Built-in Modules (FS, Path, HTTP)', 'NPM & Package Scripts config',
      'Express.js app setup', 'Routing & Path Parameters', 'Middleware stack pipeline', 'JSON API Response formatting', 'Static Files serving',
      'MongoDB & Mongoose connection', 'PostgreSQL database setup', 'REST API Routes controllers', 'JWT Auth Middleware setup',
      'Build scripts configurations', 'PM2 production configuration', 'Render.com Deployment setup',
      'Note-Taking Backend API CLI tool', 'Full Chat Server with Socket.io', 'Comprehensive Blog Platform REST API'
    ]
  },
  typescript: {
    id: 'typescript',
    title: 'TypeScript',
    description: 'Strict type superset of JavaScript compiling to browser clean scripts. Master interfaces definitions, strict checks configs, and generic types.',
    totalTopics: 18,
    totalWeeks: 5,
    totalHours: 60,
    difficulty: 'Intermediate',
    skillCategories: 4,
    projectsCount: 3,
    questionsCount: 5,
    topicNames: [
      'Primitive Type Declarations', 'Any vs Unknown vs Never', 'Type Assertions annotations', 'Functions Parameters types', 'Optional & Rest Parameters',
      'Interfaces definitions', 'Type Aliases vs Interfaces', 'Intersection & Union types', 'Enums definitions', 'Readonly & Utility Types',
      'Class properties accessors', 'Implements Interface templates', 'Generic Functions syntax', 'Generic Classes syntax', 'Generic Constraints annotations',
      'Dynamic Weather Tracker CLI', 'Secure JWT authentication middleware', 'Robust Task Planner with localStorage'
    ]
  },
  git: {
    id: 'git',
    title: 'Git',
    description: 'Distributed version control engine for team projects synchronization. Master repositories tracking, conflicts resolution, and collaboration branches.',
    totalTopics: 17,
    totalWeeks: 3,
    totalHours: 30,
    difficulty: 'Beginner',
    skillCategories: 4,
    projectsCount: 3,
    questionsCount: 5,
    topicNames: [
      'Git Initialization (git init)', 'Staging Area (git add)', 'Commits (git commit)', 'Git Status & Logs monitoring', 'Diff Tools (git diff)',
      'Branch Creation & switching', 'Merging branches (git merge)', 'Merge Conflicts resolutions', 'Rebasing branches (git rebase)',
      'GitHub repository setup', 'Pushing changes (git push)', 'Cloning repositories (git clone)', 'Pull Requests collaboration', 'Fetching remote (git fetch/pull)',
      'Local personal repository setup', 'Mock branch conflict resolution', 'Simulated PR review cycle workflow'
    ]
  },
  docker: {
    id: 'docker',
    title: 'Docker',
    description: 'Containerization infrastructure engine for virtual instances execution. Master images assembly, volumes mounts, and multi-service compose setups.',
    totalTopics: 17,
    totalWeeks: 4,
    totalHours: 45,
    difficulty: 'Intermediate',
    skillCategories: 4,
    projectsCount: 3,
    questionsCount: 5,
    topicNames: [
      'Virtualization vs Containers', 'Docker Engine architecture', 'Docker CLI base commands', 'Containers lifecycle (run, stop, rm)',
      'Dockerfile Syntax commands', 'Caching layers building optimization', 'Docker Hub push registry',
      'Containers port forwarding configuration', 'Environment variables injections', 'Docker Named Volumes mapping', 'Docker Bind Mounts development',
      'Docker Compose configurations', 'Docker Network bridges configurations', 'Production compose configuration setups',
      'Static Nginx Web Server image', 'Multi-Container API Stack compose config', 'Local Development Compose environment'
    ]
  },
  aws: {
    id: 'aws',
    title: 'AWS',
    description: 'Industry-leading cloud deployment provider infrastructure. Master virtual server setups, static S3 storage buckets, and secure networks rules.',
    totalTopics: 17,
    totalWeeks: 6,
    totalHours: 80,
    difficulty: 'Intermediate',
    skillCategories: 4,
    projectsCount: 3,
    questionsCount: 5,
    topicNames: [
      'AWS Infrastructure global scopes', 'IAM Policies & Permissions definitions', 'Root Account securing configurations',
      'EC2 Instances launch setups', 'EBS Volumes configuration attach', 'Application Load Balancer scaling',
      'VPC Networks configurations IP ranges', 'Public vs Private Subnets routing', 'Security Groups access controls rules',
      'S3 Buckets creation static hosting', 'S3 Access policies configs', 'CloudFront Distribution cache CDN',
      'Serverless function basic configs', 'Serverless REST API setup', 'DynamoDB NoSQL connection',
      'Deploy Static Site with CDN caching', 'Secure Virtual Network VPC setup', 'Deploy Node.js REST API on EC2'
    ]
  }
}

const techDataLoaders: Record<string, () => Promise<FullTechData>> = {
  javascript: async () => {
    const [roadmap, notes, cheatsheet, interviews, projects, resources] = await Promise.all([
      import('./roadmaps/javascript').then(m => m.javascriptRoadmap),
      import('./notes/javascript').then(m => m.javascriptNotes),
      import('./cheatsheets/javascript').then(m => m.javascriptCheatsheet),
      import('./interviews/javascript').then(m => m.javascriptInterviews),
      import('./projects/javascript').then(m => m.javascriptProjects),
      import('./resources/javascript').then(m => m.javascriptResourceData),
    ])
    return { id: 'javascript', roadmap, notes, cheatsheet, interviews, projects, resources }
  },
  python: async () => {
    const [roadmap, notes, cheatsheet, interviews, projects, resources] = await Promise.all([
      import('./roadmaps/python').then(m => m.pythonRoadmap),
      import('./notes/python').then(m => m.pythonNotes),
      import('./cheatsheets/python').then(m => m.pythonCheatsheet),
      import('./interviews/python').then(m => m.pythonInterviews),
      import('./projects/python').then(m => m.pythonProjects),
      import('./resources/python').then(m => m.pythonResourceData),
    ])
    return { id: 'python', roadmap, notes, cheatsheet, interviews, projects, resources }
  },
  react: async () => {
    const [roadmap, notes, cheatsheet, interviews, projects, resources] = await Promise.all([
      import('./roadmaps/react').then(m => m.reactRoadmap),
      import('./notes/react').then(m => m.reactNotes),
      import('./cheatsheets/react').then(m => m.reactCheatsheet),
      import('./interviews/react').then(m => m.reactInterviews),
      import('./projects/react').then(m => m.reactProjects),
      import('./resources/react').then(m => m.reactResourceData),
    ])
    return { id: 'react', roadmap, notes, cheatsheet, interviews, projects, resources }
  },
  nodejs: async () => {
    const [roadmap, notes, cheatsheet, interviews, projects, resources] = await Promise.all([
      import('./roadmaps/nodejs').then(m => m.nodejsRoadmap),
      import('./notes/nodejs').then(m => m.nodejsNotes),
      import('./cheatsheets/nodejs').then(m => m.nodejsCheatsheet),
      import('./interviews/nodejs').then(m => m.nodejsInterviews),
      import('./projects/nodejs').then(m => m.nodejsProjects),
      import('./resources/nodejs').then(m => m.nodejsResourceData),
    ])
    return { id: 'nodejs', roadmap, notes, cheatsheet, interviews, projects, resources }
  },
  typescript: async () => {
    const [roadmap, notes, cheatsheet, interviews, projects, resources] = await Promise.all([
      import('./roadmaps/typescript').then(m => m.typescriptRoadmap),
      import('./notes/typescript').then(m => m.typescriptNotes),
      import('./cheatsheets/typescript').then(m => m.typescriptCheatsheet),
      import('./interviews/typescript').then(m => m.typescriptInterviews),
      import('./projects/typescript').then(m => m.typescriptProjects),
      import('./resources/typescript').then(m => m.typescriptResourceData),
    ])
    return { id: 'typescript', roadmap, notes, cheatsheet, interviews, projects, resources }
  },
  git: async () => {
    const [roadmap, notes, cheatsheet, interviews, projects, resources] = await Promise.all([
      import('./roadmaps/git').then(m => m.gitRoadmap),
      import('./notes/git').then(m => m.gitNotes),
      import('./cheatsheets/git').then(m => m.gitCheatsheet),
      import('./interviews/git').then(m => m.gitInterviews),
      import('./projects/git').then(m => m.gitProjects),
      import('./resources/git').then(m => m.gitResourceData),
    ])
    return { id: 'git', roadmap, notes, cheatsheet, interviews, projects, resources }
  },
  docker: async () => {
    const [roadmap, notes, cheatsheet, interviews, projects, resources] = await Promise.all([
      import('./roadmaps/docker').then(m => m.dockerRoadmap),
      import('./notes/docker').then(m => m.dockerNotes),
      import('./cheatsheets/docker').then(m => m.dockerCheatsheet),
      import('./interviews/docker').then(m => m.dockerInterviews),
      import('./projects/docker').then(m => m.dockerProjects),
      import('./resources/docker').then(m => m.dockerResourceData),
    ])
    return { id: 'docker', roadmap, notes, cheatsheet, interviews, projects, resources }
  },
  aws: async () => {
    const [roadmap, notes, cheatsheet, interviews, projects, resources] = await Promise.all([
      import('./roadmaps/aws').then(m => m.awsRoadmap),
      import('./notes/aws').then(m => m.awsNotes),
      import('./cheatsheets/aws').then(m => m.awsCheatsheet),
      import('./interviews/aws').then(m => m.awsInterviews),
      import('./projects/aws').then(m => m.awsProjects),
      import('./resources/aws').then(m => m.awsResourceData),
    ])
    return { id: 'aws', roadmap, notes, cheatsheet, interviews, projects, resources }
  },
}

export function getAllTechnologies(): string[] {
  return Object.keys(technologyMetadata)
}

export function getTechMetadata(slug: string): TechMetadata | undefined {
  return technologyMetadata[slug.toLowerCase()]
}

export async function getTechData(slug: string): Promise<FullTechData | undefined> {
  const loader = techDataLoaders[slug.toLowerCase()]
  if (!loader) return undefined
  return loader()
}
