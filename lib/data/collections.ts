export interface Collection {
  id: string
  title: string
  itemCount: number
  image: string
  category: string
}

export const visualCollections: Collection[] = [
  {
    id: '1',
    title: 'Python Cheat Sheet Collection',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=280&fit=crop&fm=webp&q=80',
    category: 'Python',
  },
  {
    id: '2',
    title: 'JavaScript ES6+ Quick Reference',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=280&fit=crop&fm=webp&q=80',
    category: 'JavaScript',
  },
  {
    id: '3',
    title: 'CSS Flexbox & Grid Visual Guide',
    itemCount: 6,
    image: 'https://images.unsplash.com/photo-1507726425701-9760a0295a82?w=400&h=280&fit=crop&fm=webp&q=80',
    category: 'CSS',
  },
  {
    id: '4',
    title: 'Git Workflow Diagrams',
    itemCount: 10,
    image: 'https://images.unsplash.com/photo-1556075794-3d410dfed317?w=400&h=280&fit=crop&fm=webp&q=80',
    category: 'Dev Tools',
  },
]
