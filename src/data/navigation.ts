export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export const academyLinks: NavLink[] = [
  { label: 'Roadmaps', href: '/roadmaps' },
  { label: 'Study Notes', href: '/notes' },
  { label: 'Cheat Sheets', href: '/cheatsheets' },
  { label: 'Interview Prep', href: '/interview-prep' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Tools', href: '/tools' },
]

export const brandName = 'StackForge'
export const brandTagline = 'Master Code. Build Faster.'
