export interface Resource {
  id: string
  title: string
  description: string
  type: 'pdf' | 'cheatsheet' | 'tool' | 'download'
  category: string
  downloads?: string
  icon: string
  fileSize?: string
  readingTime?: string
}

export const resources: Resource[] = [
  {
    id: 'js-interview',
    title: 'JavaScript Interview Guide',
    description: 'Comprehensive JS interview preparation containing advanced questions, closure patterns, event loop, and coding exercises.',
    type: 'pdf',
    category: 'JavaScript',
    downloads: '12K',
    icon: 'FileText',
    fileSize: '3.4 MB',
    readingTime: '45 mins',
  },
  {
    id: 'react-perf',
    title: 'React Performance Handbook',
    description: 'Practical guide to optimize React applications, covering memoization, virtualization, code splitting, and Profiler usage.',
    type: 'pdf',
    category: 'React',
    downloads: '8.5K',
    icon: 'FileText',
    fileSize: '2.8 MB',
    readingTime: '30 mins',
  },
  {
    id: 'python-auto',
    title: 'Python Automation Playbook',
    description: 'Downloadable script collection for file manipulation, web scraping, API consumption, and browser automation.',
    type: 'download',
    category: 'Python',
    downloads: '15K',
    icon: 'Download',
    fileSize: '1.2 MB',
    readingTime: '25 mins',
  },
  {
    id: 'devops-roadmap',
    title: 'DevOps Starter Roadmap',
    description: 'Structured outline covering shell scripting, networking, security, cloud providers, and configuration management.',
    type: 'pdf',
    category: 'DevOps',
    downloads: '9.2K',
    icon: 'FileText',
    fileSize: '4.1 MB',
    readingTime: '35 mins',
  },
  {
    id: 'git-sheet',
    title: 'Git & GitHub Cheat Sheet',
    description: 'Interactive and visual reference for branching strategies, rebasing, merge conflict resolution, and daily commands.',
    type: 'cheatsheet',
    category: 'Dev Tools',
    downloads: '20K',
    icon: 'ScrollText',
    fileSize: '450 KB',
    readingTime: '10 mins',
  },
  {
    id: 'system-design',
    title: 'System Design Fundamentals',
    description: 'High-level introduction to microservices, load balancing, caching, databases, scaling strategies, and system constraints.',
    type: 'pdf',
    category: 'System Design',
    downloads: '14K',
    icon: 'FileText',
    fileSize: '5.2 MB',
    readingTime: '60 mins',
  },
  {
    id: 'docker-guide',
    title: 'Docker Learning Guide',
    description: 'Step-by-step tutorial on containerization, creating Dockerfiles, compose setups, and volume management.',
    type: 'pdf',
    category: 'DevOps',
    downloads: '11K',
    icon: 'FileText',
    fileSize: '3.0 MB',
    readingTime: '20 mins',
  },
  {
    id: 'node-backend',
    title: 'Node.js Backend Blueprint',
    description: 'Production-ready folder structures, express configurations, middleware setups, and DB connection modules.',
    type: 'download',
    category: 'Backend',
    downloads: '7.8K',
    icon: 'Download',
    fileSize: '1.6 MB',
    readingTime: '40 mins',
  },
]

export const resourceCategories = ['All', 'JavaScript', 'React', 'Python', 'DevOps', 'Dev Tools', 'System Design', 'Backend']

export const resourceTypes = ['All', 'pdf', 'cheatsheet', 'tool', 'download']
