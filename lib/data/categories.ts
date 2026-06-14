export interface Category {
  id: string
  title: string
  description: string
  icon: string
  color: string
  courseCount: number
  articleCount: number
  difficulty: string
}

export const featuredCategories: Category[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Build modern, responsive websites and full-stack applications from scratch.',
    icon: 'Globe',
    color: 'from-violet-500 to-purple-600',
    courseCount: 24,
    articleCount: 45,
    difficulty: 'Beginner to Intermediate',
  },
  {
    id: 'python',
    title: 'Python Programming',
    description: 'From fundamentals to data science, automation, and backend development.',
    icon: 'Code2',
    color: 'from-cyan-500 to-blue-600',
    courseCount: 18,
    articleCount: 38,
    difficulty: 'Beginner to Advanced',
  },
  {
    id: 'js-ts',
    title: 'JavaScript & TypeScript',
    description: 'Master core languages of the modern web, async control flows, and typing systems.',
    icon: 'Layers',
    color: 'from-amber-500 to-yellow-600',
    courseCount: 15,
    articleCount: 42,
    difficulty: 'Intermediate',
  },
  {
    id: 'react',
    title: 'React Development',
    description: 'Build interactive user interfaces with components, hooks, and global state.',
    icon: 'Sparkles',
    color: 'from-sky-500 to-blue-600',
    courseCount: 12,
    articleCount: 30,
    difficulty: 'Intermediate',
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    description: 'Design robust APIs, databases, microservices, and server architecture.',
    icon: 'Terminal',
    color: 'from-red-500 to-rose-600',
    courseCount: 20,
    articleCount: 35,
    difficulty: 'Intermediate to Advanced',
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    description: 'Automate build pipelines, coordinate containers, and deploy scalable cloud apps.',
    icon: 'Cloud',
    color: 'from-indigo-500 to-violet-600',
    courseCount: 10,
    articleCount: 22,
    difficulty: 'Advanced',
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Crack technical interviews with structured DSA practice and visual explanations.',
    icon: 'GitBranch',
    color: 'from-emerald-500 to-teal-600',
    courseCount: 32,
    articleCount: 50,
    difficulty: 'All Levels',
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Explore neural networks, LLMs, and build practical AI integrations.',
    icon: 'Brain',
    color: 'from-amber-500 to-orange-600',
    courseCount: 8,
    articleCount: 15,
    difficulty: 'Intermediate to Advanced',
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Train models, construct neural networks, and execute predictive statistics.',
    icon: 'Cpu',
    color: 'from-pink-500 to-rose-600',
    courseCount: 10,
    articleCount: 18,
    difficulty: 'Advanced',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Learn defensive and offensive security, network scanning, and penetration testing.',
    icon: 'Shield',
    color: 'from-teal-500 to-emerald-600',
    courseCount: 14,
    articleCount: 28,
    difficulty: 'Intermediate to Advanced',
  },
]
