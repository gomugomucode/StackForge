export interface Language {
  name: string
  slug: string
  learners: string
  level: string
  color: string
}

export const popularLanguages: Language[] = [
  { name: 'Python', slug: 'python', learners: '2.4K', level: 'Beginner → Advanced', color: '#3776ab' },
  { name: 'JavaScript', slug: 'javascript', learners: '3.1K', level: 'Beginner → Advanced', color: '#f7df1e' },
  { name: 'Java', slug: 'java', learners: '1.8K', level: 'Intermediate', color: '#ed8b00' },
  { name: 'C++', slug: 'cpp', learners: '1.2K', level: 'Intermediate → Advanced', color: '#00599c' },
  { name: 'TypeScript', slug: 'typescript', learners: '1.5K', level: 'Intermediate', color: '#3178c6' },
  { name: 'Go', slug: 'go', learners: '890', level: 'Intermediate', color: '#00add8' },
  { name: 'Rust', slug: 'rust', learners: '640', level: 'Advanced', color: '#ce422b' },
  { name: 'SQL', slug: 'sql', learners: '2.0K', level: 'Beginner → Advanced', color: '#336791' },
]
