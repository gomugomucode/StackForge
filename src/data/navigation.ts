export interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Learn', href: '/learn' },
  { label: 'Roadmaps', href: '/roadmaps' },
  { 
    label: 'Resources', 
    href: '/resources',
    children: [
      { label: 'Learning Paths', href: '/learn' },
      { label: 'Cheatsheets', href: '/cheatsheets' },
      { label: 'Quizzes', href: '/roadmaps/quiz' },
      { label: 'Interview Prep', href: '/interview' },
      { label: 'Projects', href: '/projects' },
      { label: 'AI Tutor', href: '/tutor' },
      { label: 'Roadmaps', href: '/roadmaps' },
      { label: 'Certificates', href: '/cert' },
    ]
  },
  { label: 'Community', href: '/community' },
  { label: 'Interview Prep', href: '/interview' },
  { label: 'Projects', href: '/projects' },
  { label: 'AI Tutor', href: '/tutor' },
]

export const brandName = 'CodeNova'
export const brandTagline = 'Learn Programming Interactively'
