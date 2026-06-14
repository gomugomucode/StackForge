export interface OfferItem {
  id: string
  title: string
  subtitle?: string
  description: string
  cta: string
  href: string
  icon: string
  badge?: string
  tags?: string[]
  highlight?: string
}

export const offerItems: OfferItem[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    subtitle: 'Most Popular',
    description:
      'Master in-demand languages with structured lessons and real-world projects. Python, JavaScript, C++, and more.',
    cta: 'Explore Languages',
    href: '/resources',
    icon: 'Terminal',
    badge: 'Most Popular',
    tags: ['Python', 'JavaScript', 'C++', '+more'],
  },
  {
    id: 'skills',
    title: 'Developer Skills',
    description:
      'Go beyond syntax — master Git, APIs, databases, testing, and the essential skills top companies seek.',
    cta: 'Build Skills',
    href: '/resources',
    icon: 'Wrench',
  },
  {
    id: 'quizzes',
    title: 'Test Your Knowledge',
    description:
      "Solidify what you've learned with 500+ carefully crafted quizzes across all topics.",
    cta: 'Take a Quiz',
    href: '/#weekly-challenge',
    icon: 'HelpCircle',
    badge: '500+ Quizzes',
    highlight: 'Free Always',
  },
  {
    id: 'games',
    title: 'Games & Tools',
    description:
      'Learn smarter with interactive coding games, code formatters, and developer utilities.',
    cta: 'Play Now',
    href: '/resources',
    icon: 'Gamepad2',
  },
  {
    id: 'pdfs',
    title: 'PDF Resources',
    description:
      'Download curated PDF guides, cheat sheets, and reference books — completely free.',
    cta: 'Browse PDFs',
    href: '/resources',
    icon: 'FileText',
  },
  {
    id: 'roadmaps',
    title: 'Learning Roadmaps',
    subtitle: 'Step by Step',
    description:
      'Follow step-by-step visual roadmaps crafted by industry experts. Know exactly what to learn next.',
    cta: 'Explore Roadmaps',
    href: '/#roadmaps',
    icon: 'Map',
  },
]
