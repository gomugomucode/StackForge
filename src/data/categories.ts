export interface Category {
  id: string
  title: string
  description: string
  icon: string
  color: string
  courseCount: number
}

export const featuredCategories: Category[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Build modern, responsive websites and full-stack applications from scratch.',
    icon: 'Globe',
    color: 'from-violet-500 to-purple-600',
    courseCount: 24,
  },
  {
    id: 'python',
    title: 'Python Mastery',
    description: 'From fundamentals to data science, automation, and backend development.',
    icon: 'Code2',
    color: 'from-cyan-500 to-blue-600',
    courseCount: 18,
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Crack technical interviews with structured DSA practice and visual explanations.',
    icon: 'GitBranch',
    color: 'from-emerald-500 to-teal-600',
    courseCount: 32,
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Explore neural networks, LLMs, and practical AI projects for real-world impact.',
    icon: 'Brain',
    color: 'from-amber-500 to-orange-600',
    courseCount: 14,
  },
]
