export interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Understanding Closures in JavaScript: A Deep Dive',
    excerpt:
      'Closures are one of the most powerful concepts in JavaScript. Learn how they work under the hood with practical examples.',
    category: 'JavaScript',
    author: 'Alex Rivera',
    date: '2026-06-08',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=340&fit=crop',
    featured: true,
  },
  {
    id: '2',
    title: 'Python List Comprehensions: Write Cleaner Code',
    excerpt:
      'Master list comprehensions and transform the way you write Python. From basics to advanced patterns.',
    category: 'Python',
    author: 'Sarah Chen',
    date: '2026-06-05',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=340&fit=crop',
    featured: true,
  },
  {
    id: '3',
    title: 'Building REST APIs with Node.js and Express',
    excerpt:
      'A step-by-step guide to designing, building, and deploying production-ready REST APIs.',
    category: 'Web Development',
    author: 'Marcus Lee',
    date: '2026-06-01',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop',
  },
  {
    id: '4',
    title: 'Big O Notation Explained for Beginners',
    excerpt:
      'Demystify time and space complexity with visual examples and real interview questions.',
    category: 'DSA',
    author: 'Priya Sharma',
    date: '2026-05-28',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=340&fit=crop',
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt:
      'Stop guessing — learn the exact scenarios where Grid and Flexbox shine in modern layouts.',
    category: 'CSS',
    author: 'Jordan Kim',
    date: '2026-05-24',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1507726425701-9760a0295a82?w=600&h=340&fit=crop',
  },
  {
    id: '6',
    title: 'Getting Started with Git: Essential Commands',
    excerpt:
      'Version control fundamentals every developer needs — branches, merges, and best practices.',
    category: 'Dev Tools',
    author: 'Alex Rivera',
    date: '2026-05-20',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1556075794-3d410dfed317?w=600&h=340&fit=crop',
  },
  {
    id: '7',
    title: 'Introduction to Machine Learning with Python',
    excerpt:
      'Your first steps into ML — datasets, models, and scikit-learn in under 15 minutes.',
    category: 'AI & ML',
    author: 'Sarah Chen',
    date: '2026-05-15',
    readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=340&fit=crop',
  },
  {
    id: '8',
    title: 'React Hooks: useState and useEffect Patterns',
    excerpt:
      'Common hook patterns that will make your React components cleaner and more maintainable.',
    category: 'React',
    author: 'Marcus Lee',
    date: '2026-05-10',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop',
  },
]

export const articleCategories = [
  'All',
  'JavaScript',
  'Python',
  'Web Development',
  'DSA',
  'CSS',
  'React',
  'AI & ML',
  'Dev Tools',
]
