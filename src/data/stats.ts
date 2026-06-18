export interface Stat {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 5000, suffix: '+', label: 'Active Learners' },
  { value: 120, suffix: '+', label: 'Courses & Tutorials' },
  { value: 95, suffix: '%', label: 'Success Rate' },
  { value: 200, suffix: '+', label: 'Free Resources' },
]
