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
  name: 'Jordan Mitchell',
  role: 'Chief Executive Officer & Founder',
  bio: 'Passionate developer and educator — Jordan built CodeNova to make world-class programming education accessible to every aspiring developer. With hands-on expertise in full-stack development, AI, and EdTech, he leads a mission-driven team dedicated to transforming lives through code.',
  location: 'United States',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  stats: [
    { label: 'Students', value: '5000+' },
    { label: 'Years Exp.', value: '5+' },
    { label: 'Projects', value: '40+' },
  ],
  achievements: [
    'Built and launched 40+ open-source developer tools',
    'Mentored 500+ students through coding bootcamps',
    'Speaker at DevConf and local tech meetups',
    'Contributed to major open-source projects',
    'Featured in Developer Weekly newsletter',
  ],
  social: [
    { platform: 'GitHub', href: '#', icon: 'GitFork' },
    { platform: 'LinkedIn', href: '#', icon: 'Link2' },
    { platform: 'Twitter', href: '#', icon: 'Share2' },
    { platform: 'Email', href: 'mailto:hello@stackforge.dev', icon: 'Mail' },
  ],
}

export const missionStatement =
  'Our mission is to democratize programming education by providing free, high-quality learning resources, interactive tools, and a supportive community where every developer — regardless of background — can build real-world skills and launch their tech career.'
