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
      { label: 'Cheatsheets', href: '/cheatsheets' },
      { label: 'Articles', href: '/blog' },
      { label: 'Notes', href: '/learn' },
      { label: 'Downloads', href: '/roadmaps/export' },
      { label: 'Certificates', href: '/cert' },
    ]
  },
  { label: 'Community', href: '/community' },
  { label: 'Interview', href: '/interview' },
  { label: 'Projects', href: '/projects' },
  { label: 'Tutor', href: '/tutor' },
]

export const brandName = 'StackForge'
export const brandTagline = 'Learn Programming Interactively'
