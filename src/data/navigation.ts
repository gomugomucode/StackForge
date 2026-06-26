export interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'Learn', 
    href: '/learn',
    children: [
      { label: 'Frontend', href: '/learn/frontend' },
      { label: 'Backend', href: '/learn/backend' },
      { label: 'Full Stack', href: '/learn/fullstack' },
      { label: 'Python', href: '/learn/python' },
      { label: 'DevOps', href: '/learn/devops' },
      { label: 'Data Science', href: '/learn/datascience' },
      { label: 'AI Engineering', href: '/learn/ai' },
      { label: 'Cyber Security', href: '/learn/cybersecurity' },
    ]
  },
  { label: 'Roadmaps', href: '/roadmaps' },
  { 
    label: 'Practice', 
    href: '#',
    children: [
      { label: 'Quizzes', href: '/roadmaps' },
      { label: 'Coding Challenges', href: '/learn' },
      { label: 'Projects', href: '/projects' },
      { label: 'Interview Prep', href: '/interview' },
      { label: 'AI Tutor', href: '/tutor' },
    ]
  },
  { label: 'Community', href: '/community' },
  { 
    label: 'Resources', 
    href: '/resources',
    children: [
      { label: 'Articles', href: '/blog' },
      { label: 'Cheatsheets', href: '/cheatsheets' },
      { label: 'Tutorials', href: '/learn' },
      { label: 'Projects', href: '/projects' },
      { label: 'Interview Questions', href: '/interview' },
      { label: 'Downloads', href: '/resources' },
      { label: 'External References', href: '/resources' },
    ]
  },
  { label: 'Dashboard', href: '/dashboard' },
]

export const brandName = 'StackForge'
export const brandTagline = 'Learn Programming Interactively'
