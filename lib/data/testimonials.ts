export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Morgan Ellis',
    role: 'Junior Frontend Developer',
    company: 'WebFlow Studio',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face&fm=webp&q=80',
    quote:
      'The interactive quizzes and roadmaps gave me a clear path from zero to my first dev job. Everything is structured and actually fun to use.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Ravi Patel',
    role: 'Computer Science Student',
    company: 'Stanford University',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&fm=webp&q=80',
    quote:
      'I tried several learning platforms before this one. The cheat sheets and weekly challenges kept me consistent when motivation dipped.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena Vasquez',
    role: 'Backend Engineer',
    company: 'CloudScale Inc.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face&fm=webp&q=80',
    quote:
      'Coming from a non-tech background, the step-by-step roadmaps and beginner-friendly articles made the transition feel achievable.',
    rating: 5,
  },
  {
    id: '4',
    name: 'James Okonkwo',
    role: 'Freelance Web Developer',
    company: 'Self-Employed',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&fm=webp&q=80',
    quote:
      'The resource library alone is worth bookmarking. PDF guides and tools I use daily — all free and well organized.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Sarah Jenkins',
    role: 'Software Engineer',
    company: 'TechCorp Labs',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face&fm=webp&q=80',
    quote:
      'The Git cheat sheet and Docker references are exceptionally clear. I share them with junior developers during onboarding.',
    rating: 5,
  },
  {
    id: '6',
    name: 'David Kim',
    role: 'DevOps Engineer',
    company: 'SaaSify Platforms',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face&fm=webp&q=80',
    quote:
      'The DevOps roadmap is the most accurate and practical guide online. The Kubernetes references saved me hours of head-scratching.',
    rating: 5,
  },
  {
    id: '7',
    name: 'Amara Nwosu',
    role: 'Full-Stack Developer',
    company: 'Fintech Solutions',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face&fm=webp&q=80',
    quote:
      'The quizzes are fantastic for reinforcing key JavaScript and React concepts. They force you to think about edge cases.',
    rating: 5,
  },
  {
    id: '8',
    name: 'Marcus Aurelius',
    role: 'Engineering Lead',
    company: 'DevFlow Systems',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=face&fm=webp&q=80',
    quote:
      'A masterfully designed educational hub. The light/dark transition is butter-smooth and the content is highly accurate.',
    rating: 5,
  },
]
