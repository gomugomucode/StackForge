export type ResourceType = 'free' | 'paid' | 'freemium'
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type ResourceBadge = 'Official' | 'Best Rated' | 'Community Pick' | 'Free' | 'Must Read'

export interface TechResource {
  title: string
  url: string
  description: string
  type: ResourceType
  difficulty: DifficultyLevel
  estimatedHours?: number
  badge?: ResourceBadge
  author?: string
}

export interface ResourceSection {
  id: string
  title: string
  description: string
  icon: string // lucide icon name
  resources: TechResource[]
}

export interface LearningWeek {
  week: number
  title: string
  description: string
  topics: string[]
  estimatedHours: number
  milestoneProject?: string
}

export interface LearningPath {
  totalWeeks: number
  totalHours: number
  level: DifficultyLevel
  description: string
  weeks: LearningWeek[]
}

export interface SkillNode {
  id: string
  name: string
  description: string
  level: 'category' | 'topic' | 'subtopic'
  children?: SkillNode[]
  codeExample?: string
  resources?: string[]
  tags?: string[]
}

export interface AIQAPair {
  keywords: string[]
  question: string
  answer: string
}

export interface TechResourceData {
  sections: ResourceSection[]
  learningPath: LearningPath
  skillTree: SkillNode[]
  aiQA: AIQAPair[]
}
