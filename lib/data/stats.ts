export interface Stat {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 50000, suffix: '+', label: 'Learners' },
  { value: 500, suffix: '+', label: 'Tutorials' },
  { value: 100, suffix: '+', label: 'Projects' },
  { value: 25, suffix: '+', label: 'Learning Paths' },
]
