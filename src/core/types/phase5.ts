// ─── Playground ───────────────────────────────────────────────────────────────

export type PlaygroundLanguage = 'javascript' | 'typescript' | 'html' | 'css' | 'python' | 'go' | 'rust'

export interface Snippet {
  id: string
  user_id?: string
  title: string
  language: PlaygroundLanguage
  code: string
  is_public: boolean
  share_token: string
  created_at: string
  updated_at: string
}

export interface TestCase {
  id: string
  input: string
  expected: string
  description: string
}

export interface ConsoleEntry {
  type: 'log' | 'warn' | 'error' | 'info'
  message: string
  timestamp: number
}

export interface RunResult {
  success: boolean
  entries: ConsoleEntry[]
  duration: number
  testResults?: TestCaseResult[]
}

export interface TestCaseResult {
  testCase: TestCase
  passed: boolean
  got: string
  error?: string
}

// ─── Skill Tree ───────────────────────────────────────────────────────────────

export interface SkillTreeNode {
  id: string
  label: string
  description: string
  category: string
  xpRequired: number
  prerequisites: string[]
  resources: { label: string; url: string }[]
  position: { x: number; y: number }
  level: number
}

export interface SkillTreeData {
  techId: string
  techName: string
  nodes: SkillTreeNode[]
  edges: SkillTreeEdge[]
}

export interface SkillTreeEdge {
  id: string
  source: string
  target: string
}

export type SkillStatus = 'locked' | 'available' | 'learning' | 'mastered'

export interface UserSkillState {
  nodeId: string
  status: SkillStatus
  unlockedAt?: string
}

// ─── AI Mentor ────────────────────────────────────────────────────────────────

export type MentorMode = 'explain' | 'quiz' | 'coach' | 'interview'

export interface MentorMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  mode: MentorMode
  timestamp: string
  quiz?: QuizQuestion[]
  roadmap?: RoadmapStep[]
  suggestions?: string[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  answer: string
  explanation: string
  xp: number
}

export interface RoadmapStep {
  step: string
  detail: string
  xp: number
  duration: string
  resources?: string[]
}

export interface MentorSession {
  id: string
  techId: string
  messages: MentorMessage[]
  mode: MentorMode
  totalXPEarned: number
  createdAt: string
}

// ─── Certificates ─────────────────────────────────────────────────────────────

export interface CertificateRecord {
  id: string
  user_id: string
  track_name: string
  tech_id: string
  certificate_id: string
  recipient_name: string
  issued_at: string
  is_public: boolean
  topics_completed: number
  total_topics: number
}

export interface VerificationResult {
  valid: boolean
  certificate?: CertificateRecord
  message: string
}

// ─── Community ────────────────────────────────────────────────────────────────

export type PostCategory = 'question' | 'discussion' | 'showcase' | 'tip' | 'challenge'

export interface CommunityPost {
  id: string
  user_id: string
  title: string
  content: string
  category: PostCategory
  tags: string[]
  upvotes: number
  comment_count: number
  created_at: string
  profiles?: { username: string; avatar_url?: string; level?: number }
  user_vote?: 1 | -1 | null
}

export interface PostComment {
  id: string
  post_id: string
  user_id: string
  content: string
  upvotes: number
  created_at: string
  profiles?: { username: string; avatar_url?: string }
}

export interface StudyGroup {
  id: string
  name: string
  description: string
  tech_focus: string
  created_by: string
  member_count: number
  is_public: boolean
  created_at: string
  is_member?: boolean
}

export interface Challenge {
  id: string
  title: string
  description: string
  tech_id: string
  tech_label: string
  xp_reward: number
  deadline: string
  difficulty: 'easy' | 'medium' | 'hard'
  submission_count: number
  has_submitted?: boolean
}

export interface LeaderboardEntry {
  rank: number
  user_id: string
  username: string
  avatar_url?: string
  xp: number
  level: number
  streak: number
  completed_techs: number
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string
  value: number
  color?: string
  date?: string
}

export interface CategoryMastery {
  category: string
  mastery: number // 0–100
  color: string
  angle: number  // for radar chart
}

export interface WeeklyReport {
  weekLabel: string
  totalMinutes: number
  topicsCompleted: number
  xpEarned: number
  streakDays: number
  topTech: string
  prevWeekMinutes: number
}

export interface HeatmapDay {
  date: string      // YYYY-MM-DD
  count: number     // activity units (minutes)
  level: 0 | 1 | 2 | 3 | 4  // intensity
}

// ─── Marketplace ──────────────────────────────────────────────────────────────

export interface PathAuthor {
  id: string
  display_name: string
  bio: string
  avatar_url?: string
  follower_count: number
  path_count: number
  specialties: string[]
}

export interface MarketplacePath {
  id: string
  author: PathAuthor
  title: string
  description: string
  tech_ids: string[]
  tech_labels: string[]
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price_type: 'free' | 'premium'
  rating_avg: number
  review_count: number
  enrollment_count: number
  featured: boolean
  thumbnail_gradient: string
  created_at: string
  curriculum: CurriculumSection[]
  tags: string[]
}

export interface CurriculumSection {
  title: string
  duration: string
  topics: string[]
}

export interface PathReview {
  id: string
  path_id: string
  username: string
  avatar_url?: string
  rating: number
  body: string
  created_at: string
  helpful_count: number
}
