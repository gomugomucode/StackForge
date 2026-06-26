export interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Roadmaps', href: '/roadmaps' },
  { label: 'Learn', href: '/learn' },
  { label: 'Cheatsheets', href: '/cheatsheets' },
  { label: 'Quizzes', href: '/roadmaps' }, // In StackForge, quizzes are tied to modules/roadmaps
  { label: 'Projects', href: '/projects' },
  { label: 'Interview Prep', href: '/interview' },
  { label: 'AI Tutor', href: '/tutor' },
  { label: 'Community', href: '/community' },
  { 
    label: 'Resources', 
    href: '/resources',
    children: [
      { label: 'Cheatsheets', href: '/cheatsheets' },
      { label: 'Articles', href: '/blog' },
      { label: 'Tutorials', href: '/learn' },
      { label: 'Projects', href: '/projects' },
      { label: 'Interview Questions', href: '/interview' },
      { label: 'Roadmaps', href: '/roadmaps' },
      { label: 'Official Docs', href: 'https://react.dev' },
      { label: 'External References', href: 'https://developer.mozilla.org' },
    ]
  },
  { label: 'Dashboard', href: '/dashboard' },
]

export const brandName = 'StackForge'
export const brandTagline = 'Learn Programming Interactively'

