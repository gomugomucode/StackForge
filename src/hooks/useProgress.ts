/**
 * useProgress — Central localStorage state manager for StackForge V2.
 * All learning data is stored locally, no backend required.
 */

const PREFIX = 'stackforge'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BookmarkItem {
  id: string
  type: 'note' | 'cheatsheet' | 'interview' | 'resource'
  techId: string
  title: string
  subtitle?: string
  savedAt: string // ISO date string
}

export interface RecentVisit {
  techId: string
  techTitle: string
  tab: string
  visitedAt: string
}

export interface WeeklyActivity {
  date: string // YYYY-MM-DD
  minutesSpent: number
}

// ─── Keys ────────────────────────────────────────────────────────────────────

const keys = {
  completed: (techId: string) => `${PREFIX}-completed-${techId}`,
  weekProgress: (techId: string) => `${PREFIX}-week-progress-${techId}`,
  skillMastery: (techId: string) => `${PREFIX}-skill-${techId}`,
  recentVisits: `${PREFIX}-recent-visits`,
  bookmarks: `${PREFIX}-bookmarks`,
  weeklyGoal: `${PREFIX}-weekly-goal`,
  activity: `${PREFIX}-activity`,
  userName: `${PREFIX}-user-name`,
  pdfDownloads: `${PREFIX}-pdf-downloads`,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage quota exceeded — silently fail
  }
}

// ─── Topic Progress ───────────────────────────────────────────────────────────

export function getCompletedTopics(techId: string): Record<string, boolean> {
  return readJson(keys.completed(techId), {})
}

export function setCompletedTopics(techId: string, data: Record<string, boolean>): void {
  writeJson(keys.completed(techId), data)
}

export function getProgressPercent(techId: string, topicNames: string[]): number {
  const completed = getCompletedTopics(techId)
  if (topicNames.length === 0) return 0
  const done = topicNames.filter((n) => completed[n]).length
  return Math.round((done / topicNames.length) * 100)
}

// ─── Learning Path Week Progress ──────────────────────────────────────────────

export function getWeeksCompleted(techId: string): number[] {
  return readJson<number[]>(keys.weekProgress(techId), [])
}

export function toggleWeekComplete(techId: string, weekNumber: number): number[] {
  const current = getWeeksCompleted(techId)
  const updated = current.includes(weekNumber)
    ? current.filter((w) => w !== weekNumber)
    : [...current, weekNumber]
  writeJson(keys.weekProgress(techId), updated)
  recordActivity()
  return updated
}

// ─── Skill Mastery ────────────────────────────────────────────────────────────

export type SkillStatus = 'none' | 'learning' | 'mastered'

export function getSkillStatuses(techId: string): Record<string, SkillStatus> {
  return readJson(keys.skillMastery(techId), {})
}

export function cycleSkillStatus(techId: string, nodeId: string): SkillStatus {
  const statuses = getSkillStatuses(techId)
  const current = statuses[nodeId] ?? 'none'
  const next: SkillStatus = current === 'none' ? 'learning' : current === 'learning' ? 'mastered' : 'none'
  statuses[nodeId] = next
  writeJson(keys.skillMastery(techId), statuses)
  if (next !== 'none') recordActivity()
  return next
}

// ─── Recently Viewed ──────────────────────────────────────────────────────────

export function getRecentVisits(): RecentVisit[] {
  return readJson<RecentVisit[]>(keys.recentVisits, [])
}

export function recordVisit(techId: string, techTitle: string, tab = 'overview'): void {
  const visits = getRecentVisits().filter((v) => v.techId !== techId)
  const updated: RecentVisit[] = [
    { techId, techTitle, tab, visitedAt: new Date().toISOString() },
    ...visits,
  ].slice(0, 6)
  writeJson(keys.recentVisits, updated)
  recordActivity()
}

// ─── Bookmarks ────────────────────────────────────────────────────────────────

export function getBookmarks(): BookmarkItem[] {
  return readJson<BookmarkItem[]>(keys.bookmarks, [])
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().some((b) => b.id === id)
}

export function toggleBookmark(item: BookmarkItem): boolean {
  const current = getBookmarks()
  const exists = current.some((b) => b.id === item.id)
  const updated = exists ? current.filter((b) => b.id !== item.id) : [item, ...current]
  writeJson(keys.bookmarks, updated)
  return !exists // returns true if now bookmarked
}

export function removeBookmark(id: string): void {
  const updated = getBookmarks().filter((b) => b.id !== id)
  writeJson(keys.bookmarks, updated)
}

// ─── Weekly Goal ──────────────────────────────────────────────────────────────

export function getWeeklyGoalHours(): number {
  return readJson<number>(keys.weeklyGoal, 10)
}

export function setWeeklyGoalHours(hours: number): void {
  writeJson(keys.weeklyGoal, hours)
}

// ─── Activity / Streak ────────────────────────────────────────────────────────

export function recordActivity(): void {
  const today = new Date().toISOString().split('T')[0]
  const activity = readJson<WeeklyActivity[]>(keys.activity, [])
  const existing = activity.find((a) => a.date === today)
  if (existing) {
    existing.minutesSpent += 1
    writeJson(keys.activity, activity)
  } else {
    writeJson(keys.activity, [{ date: today, minutesSpent: 1 }, ...activity].slice(0, 90))
  }
}

export function getStreak(): number {
  const activity = readJson<WeeklyActivity[]>(keys.activity, [])
  if (activity.length === 0) return 0

  const today = new Date()
  let streak = 0
  for (let i = 0; i < 90; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    if (activity.some((a) => a.date === dateStr)) {
      streak++
    } else if (i > 0) {
      break
    }
  }
  return streak
}

export function getThisWeekMinutes(): number {
  const activity = readJson<WeeklyActivity[]>(keys.activity, [])
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())
  weekStart.setHours(0, 0, 0, 0)
  return activity
    .filter((a) => new Date(a.date) >= weekStart)
    .reduce((sum, a) => sum + a.minutesSpent, 0)
}

// ─── User Name ────────────────────────────────────────────────────────────────

export function getUserName(): string {
  return readJson<string>(keys.userName, '')
}

export function setUserName(name: string): void {
  writeJson(keys.userName, name)
}

// ─── PDF Downloads ────────────────────────────────────────────────────────────

export interface PdfDownload {
  techId: string
  techTitle: string
  downloadedAt: string
}

export function recordPdfDownload(techId: string, techTitle: string): void {
  const downloads = readJson<PdfDownload[]>(keys.pdfDownloads, [])
  const updated = [
    { techId, techTitle, downloadedAt: new Date().toISOString() },
    ...downloads.filter((d) => d.techId !== techId),
  ].slice(0, 20)
  writeJson(keys.pdfDownloads, updated)
}

export function getPdfDownloads(): PdfDownload[] {
  return readJson<PdfDownload[]>(keys.pdfDownloads, [])
}

// ─── All-Tech Progress Summary ────────────────────────────────────────────────

export interface TechProgressSummary {
  techId: string
  completedCount: number
  totalTopics: number
  percent: number
}

export function getAllTechProgress(
  techMap: Record<string, string[]>
): TechProgressSummary[] {
  return Object.entries(techMap).map(([techId, topicNames]) => {
    const completed = getCompletedTopics(techId)
    const completedCount = topicNames.filter((n) => completed[n]).length
    const percent = topicNames.length > 0
      ? Math.round((completedCount / topicNames.length) * 100)
      : 0
    return { techId, completedCount, totalTopics: topicNames.length, percent }
  })
}
