export interface Founder {
  name: string
  role: string
  bio: string
  location: string
  avatar: string
  stats: { label: string; value: string }[]
  achievements: string[]
  social: { platform: string; href: string; icon: string }[]
}

export const founder: Founder = {
  name: 'Alex Chen',
  role: 'Founder & Lead Educator',
  bio: 'Alex founded StackForge with a simple belief: high-quality programming education should be free and accessible to everyone. With a background in full-stack engineering and developer advocacy, Alex and the team build tools, courses, and resources that help learners go from curious beginner to confident builder.',
  location: 'San Francisco, CA',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face&fm=webp&q=80',
  stats: [
    { label: 'Students', value: '4.8K+' },
    { label: 'Years Exp.', value: '6+' },
    { label: 'Projects', value: '35+' },
  ],
  achievements: [
    'Created 35+ open-source learning tools and templates',
    'Mentored hundreds of aspiring developers worldwide',
    'Regular speaker at regional tech conferences',
    'Published 80+ technical tutorials and guides',
    'Built community programs for underrepresented groups in tech',
  ],
  social: [
    { platform: 'GitHub', href: '#', icon: 'GitFork' },
    { platform: 'LinkedIn', href: '#', icon: 'Link2' },
    { platform: 'Social', href: '#', icon: 'Share2' },
    { platform: 'Email', href: 'mailto:hello@stackforge.dev', icon: 'Mail' },
  ],
}

export const missionStatement =
  'We exist to empower the next generation of developers with free, practical, and engaging learning experiences — combining structured paths, hands-on practice, and a supportive community so anyone can build real-world skills.'
