export interface RoadmapTopic {
  name: string
  description?: string
  resources?: string[]
}

export interface RoadmapPhase {
  title: string
  description: string
  topics: RoadmapTopic[]
}

export interface TechOverview {
  title: string
  description: string
  whatIsIt: string
  whyLearnIt: string
  careerOpportunities: string
  salaryInfo: string
  industryDemand: string
}

export interface RoadmapData {
  overview: TechOverview
  phases: RoadmapPhase[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface NoteChapter {
  id: string
  title: string
  content: string
  codeSnippet?: {
    code: string
    language: string
  }
  summary?: string
  quizQuestions?: QuizQuestion[]
  subtopicChecklist?: string[]
}

export interface CheatsheetCommand {
  command: string
  description: string
  example?: string
  category: string
}

export interface InterviewQuestion {
  question: string
  answer: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface ProjectDetails {
  slug?: string
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
  skillsLearned: string[]
  technologies: string[]
  sourceCodeStructure: string
  developmentRoadmap: string[]
  estimatedHours?: number
  features?: string[]
  checklist?: string[]
  relatedResources?: string[]
}
