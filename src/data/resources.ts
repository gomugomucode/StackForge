export interface Resource {
  id: string
  title: string
  description: string
  type: 'pdf' | 'cheatsheet' | 'tool' | 'download'
  category: string
  downloads?: string
  icon: string
  fileSize?: string
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Python Complete Reference PDF',
    description: 'Comprehensive Python guide covering syntax, OOP, and standard library.',
    type: 'pdf',
    category: 'Python',
    downloads: '3.2K',
    icon: 'FileText',
    fileSize: '2.4 MB',
  },
  {
    id: '2',
    title: 'JavaScript ES6+ Cheat Sheet',
    description: 'One-page reference for modern JavaScript features and syntax.',
    type: 'cheatsheet',
    category: 'JavaScript',
    downloads: '5.1K',
    icon: 'ScrollText',
    fileSize: '450 KB',
  },
  {
    id: '3',
    title: 'HTML & CSS Quick Reference',
    description: 'Essential tags, properties, and layout patterns at a glance.',
    type: 'cheatsheet',
    category: 'Web Development',
    downloads: '4.8K',
    icon: 'ScrollText',
    fileSize: '380 KB',
  },
  {
    id: '4',
    title: 'Data Structures Visual Guide',
    description: 'Illustrated guide to arrays, trees, graphs, and hash maps.',
    type: 'pdf',
    category: 'DSA',
    downloads: '2.9K',
    icon: 'FileText',
    fileSize: '3.1 MB',
  },
  {
    id: '5',
    title: 'SQL Query Cheat Sheet',
    description: 'JOINs, subqueries, window functions, and optimization tips.',
    type: 'cheatsheet',
    category: 'Database',
    downloads: '3.7K',
    icon: 'ScrollText',
    fileSize: '520 KB',
  },
  {
    id: '6',
    title: 'Git Commands Reference',
    description: 'Every Git command you need for daily development workflow.',
    type: 'pdf',
    category: 'Dev Tools',
    downloads: '6.2K',
    icon: 'FileText',
    fileSize: '1.8 MB',
  },
  {
    id: '7',
    title: 'JSON Formatter & Validator',
    description: 'Paste, format, and validate JSON with syntax highlighting.',
    type: 'tool',
    category: 'Dev Tools',
    icon: 'Braces',
  },
  {
    id: '8',
    title: 'Color Palette Generator',
    description: 'Generate accessible color schemes for your next project.',
    type: 'tool',
    category: 'Design',
    icon: 'Palette',
  },
  {
    id: '9',
    title: 'React Hooks Cheat Sheet',
    description: 'All React hooks with usage examples and best practices.',
    type: 'cheatsheet',
    category: 'React',
    downloads: '2.4K',
    icon: 'ScrollText',
    fileSize: '410 KB',
  },
  {
    id: '10',
    title: 'System Design Primer',
    description: 'Introduction to scalable architecture patterns and trade-offs.',
    type: 'pdf',
    category: 'System Design',
    downloads: '1.9K',
    icon: 'FileText',
    fileSize: '4.2 MB',
  },
  {
    id: '11',
    title: 'Regex Pattern Library',
    description: 'Common regex patterns for emails, URLs, dates, and more.',
    type: 'download',
    category: 'Dev Tools',
    downloads: '1.5K',
    icon: 'Download',
    fileSize: '120 KB',
  },
  {
    id: '12',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings instantly.',
    type: 'tool',
    category: 'Dev Tools',
    icon: 'Binary',
  },
]

export const resourceCategories = ['All', 'Python', 'JavaScript', 'Web Development', 'DSA', 'Database', 'React', 'Dev Tools', 'Design', 'System Design']

export const resourceTypes = ['All', 'pdf', 'cheatsheet', 'tool', 'download']
