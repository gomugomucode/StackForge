export interface UserSession {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN' | 'RECRUITER'
  plan: string
  avatar: string | null
  avatarType: 'OAUTH' | 'UPLOADED' | 'INITIALS'
  initials: string
  githubUsername: string | null
  publicProfile: boolean
  profile: {
    xp: number
    level: number
    streak: number
    totalHours: number
    skillLevel: string
    interests: string[]
    goal: string
  }
  skillProficiencies: Array<{
    technology: string
    score: number
    confidence: string
  }>
}

export interface DashboardData {
  actionNext: {
    type: 'SPACED_REPETITION' | 'CONTINUE_LEARNING'
    title: string
    subtitle: string
    entityId: string | null
    slug: string | null
  }
  continueLearning: {
    id: string
    title: string
    slug: string
    technology: string
    difficulty: string
    estimatedTime: number
  } | null
  reviewDueCount: number
  weakSkills: Array<{
    technology: string
    score: number
    confidence: string
  }>
  streak: {
    current: number
    longest: number
    lastActive: string
  }
  recommendedProjects: Array<{
    id: string
    title: string
    description: string
    difficulty: string
    technology: string
  }>
  recommendedArticles: Array<{
    id: string
    slug: string
    title: string
    description: string
    source: string
    readingTime: number
    difficulty: string
  }>
  interviewPrep: {
    id?: string
    category: string
    technology: string
    status: string
  }
  hiringReadinessScore: number
  githubActivity: {
    username: string
    publicRepos: number
    totalCommits: number
    totalPRs: number
  } | null
  dailyMission: {
    title: string
    progress: number
    xpReward: number
    isCompleted: boolean
  }
  weeklyGoal: {
    targetHours: number
    currentHours: number
    targetLessons: number
    completedLessons: number
  }
  unreadNotificationsCount: number
}

export interface ExternalArticle {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  author: string
  coverImage?: string
  tags: string[]
  readingTime: number
  source: string
  sourceUrl: string
  difficulty: string
  publishedAt: string
}

export interface ProjectDetail {
  id: string
  title: string
  description: string
  difficulty: string
  repository: string
  liveDemo: string
  requirements: string[]
  acceptanceCriteria: string[]
  folderStructure: string
  rubric: Record<string, { weight: number; criteria: string }>
  projectCoachTip: string
}

export interface GroundedAiResponse {
  why: string
  estimatedTime: string
  difficulty: string
  prerequisites: string[]
  resources: Array<{ title: string; url: string }>
  nextAction: string
  expectedOutcome: string
  detailedExplanation: string
}
