export interface Link {
  label: string
  href: string
}

export const navLinks: Link[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export const academyLinks: Link[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Roadmaps', href: '/roadmaps' },
  { label: 'Study Notes', href: '/notes' },
  { label: 'Cheat Sheets', href: '/cheatsheets' },
  { label: 'Interview Prep', href: '/interview-prep' },
  { label: 'Projects', href: '/projects' },
  { label: 'Compare paths', href: '/compare' },
  { label: 'Bookmarks', href: '/bookmarks' },
  { label: 'Tools', href: '/tools' },
]

export const brandName = 'StackForge'
export const brandTagline = 'Master Code. Build Faster.'
