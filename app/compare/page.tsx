import { useState, useMemo } from 'react'
import { Link } from 'next/navigation'
import { 
  GitCompare, 
  Award, 
  Clock, 
  BookOpen, 
  ChevronRight
} from 'lucide-react'
import { getAllTechnologies, getTechMetadata } from '@/lib/data/db'
import { getCompletedTopics, getWeeksCompleted } from '@/lib/core/hooks/useProgress'
import { SEOHead } from '@/components/ui/SEOHead'

export function ComparePage() {
  const allTechs = getAllTechnologies()

  const [tech1, setTech1] = useState(allTechs[0] || 'javascript')
  const [tech2, setTech2] = useState(allTechs[1] || 'python')

  const meta1 = useMemo(() => getTechMetadata(tech1), [tech1])
  const meta2 = useMemo(() => getTechMetadata(tech2), [tech2])

  // Get statistics for Tech 1
  const stats1 = useMemo(() => {
    if (!meta1) return null
    const totalTopics = meta1.totalTopics
    const completed = getCompletedTopics(tech1)
    const completedCount = Object.keys(completed).filter(
      (key) => completed[key] && meta1.topicNames.includes(key)
    ).length
    const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0
    const weeksDone = getWeeksCompleted(tech1).length
    const isCertified = progressPercent === 100

    return {
      title: meta1.title,
      description: meta1.description,
      totalTopics,
      completedCount,
      progressPercent,
      weeksDone,
      totalWeeks: meta1.totalWeeks,
      totalHours: meta1.totalHours,
      difficulty: meta1.difficulty,
      skillCategories: meta1.skillCategories,
      isCertified,
      projectsCount: meta1.projectsCount,
      questionsCount: meta1.questionsCount
    }
  }, [meta1, tech1])

  // Get statistics for Tech 2
  const stats2 = useMemo(() => {
    if (!meta2) return null
    const totalTopics = meta2.totalTopics
    const completed = getCompletedTopics(tech2)
    const completedCount = Object.keys(completed).filter(
      (key) => completed[key] && meta2.topicNames.includes(key)
    ).length
    const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0
    const weeksDone = getWeeksCompleted(tech2).length
    const isCertified = progressPercent === 100

    return {
      title: meta2.title,
      description: meta2.description,
      totalTopics,
      completedCount,
      progressPercent,
      weeksDone,
      totalWeeks: meta2.totalWeeks,
      totalHours: meta2.totalHours,
      difficulty: meta2.difficulty,
      skillCategories: meta2.skillCategories,
      isCertified,
      projectsCount: meta2.projectsCount,
      questionsCount: meta2.questionsCount
    }
  }, [meta2, tech2])


  return (
    <div className="space-y-6 py-6 select-text">
      <SEOHead 
        title="Compare Tech Learning Paths — StackForge"
        description="Compare web technologies, programming languages, databases, or cloud providers side-by-side to choose your next study path."
      />

      {/* Header */}
      <div className="p-6 glass rounded-2xl">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-accent-purple" /> Roadmap Comparison
        </h2>
        <p className="text-sm text-text-secondary mt-1">Select any two technologies to compare their scope, study requirements, and your progress side-by-side.</p>
      </div>

      {/* Tech Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-background-card/25 p-5 border border-border/10 rounded-2xl">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-accent-purple uppercase tracking-wider block">First Technology</label>
          <select
            value={tech1}
            onChange={(e) => setTech1(e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border/40 rounded-xl text-sm focus:outline-none focus:border-accent-purple/50 text-text-primary"
          >
            {allTechs.map(id => (
              <option key={id} value={id}>{id.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-accent-cyan uppercase tracking-wider block">Second Technology</label>
          <select
            value={tech2}
            onChange={(e) => setTech2(e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border/40 rounded-xl text-sm focus:outline-none focus:border-accent-cyan/50 text-text-primary"
          >
            {allTechs.map(id => (
              <option key={id} value={id}>{id.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Tables & View */}
      {stats1 && stats2 && (
        <div className="space-y-6">
          {/* Overviews side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tech 1 Info */}
            <div className="glass p-6 rounded-2xl border border-border/15 hover:border-accent-purple/20 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-accent-purple uppercase tracking-wider">Technology A</span>
                <h3 className="text-xl font-bold text-text-primary">{stats1.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{stats1.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/10 flex justify-between items-center">
                <Link to={`/learn/${tech1}`} className="text-xs font-bold text-accent-purple hover:underline flex items-center gap-1">
                  View full Roadmap <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Tech 2 Info */}
            <div className="glass p-6 rounded-2xl border border-border/15 hover:border-accent-cyan/20 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-accent-cyan uppercase tracking-wider">Technology B</span>
                <h3 className="text-xl font-bold text-text-primary">{stats2.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{stats2.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/10 flex justify-between items-center">
                <Link to={`/learn/${tech2}`} className="text-xs font-bold text-accent-cyan hover:underline flex items-center gap-1">
                  View full Roadmap <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Comparative Metrics Grid */}
          <div className="glass rounded-2xl overflow-hidden border border-border/15">
            <div className="p-4 bg-background-card/50 border-b border-border/10">
              <h3 className="font-bold text-sm text-text-primary uppercase tracking-wider">Metric Breakdown</h3>
            </div>

            <div className="divide-y divide-border/10">
              {/* Target Experience Level */}
              <div className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-background-card/10 transition-colors">
                <span className="text-xs text-text-secondary font-medium">Difficulty Level</span>
                <div className="text-xs font-bold text-text-primary">{stats1.difficulty}</div>
                <div className="text-xs font-bold text-text-primary">{stats2.difficulty}</div>
              </div>

              {/* Learning Weeks */}
              <div className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-background-card/10 transition-colors">
                <span className="text-xs text-text-secondary font-medium">Total Weeks</span>
                <div className="text-xs font-bold text-text-primary flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent-purple" /> {stats1.totalWeeks} Weeks
                </div>
                <div className="text-xs font-bold text-text-primary flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent-cyan" /> {stats2.totalWeeks} Weeks
                </div>
              </div>

              {/* Total Hours */}
              <div className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-background-card/10 transition-colors">
                <span className="text-xs text-text-secondary font-medium">Estimated Hours</span>
                <div className="text-xs font-bold text-text-primary">~{stats1.totalHours} hrs</div>
                <div className="text-xs font-bold text-text-primary">~{stats2.totalHours} hrs</div>
              </div>

              {/* Topics Count */}
              <div className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-background-card/10 transition-colors">
                <span className="text-xs text-text-secondary font-medium">Roadmap Topics</span>
                <div className="text-xs font-bold text-text-primary flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-accent-purple" /> {stats1.totalTopics}
                </div>
                <div className="text-xs font-bold text-text-primary flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-accent-cyan" /> {stats2.totalTopics}
                </div>
              </div>

              {/* Skill Tree Categories */}
              <div className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-background-card/10 transition-colors">
                <span className="text-xs text-text-secondary font-medium">Skill tree Nodes</span>
                <div className="text-xs font-bold text-text-primary">{stats1.skillCategories} Main Areas</div>
                <div className="text-xs font-bold text-text-primary">{stats2.skillCategories} Main Areas</div>
              </div>

              {/* Projects */}
              <div className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-background-card/10 transition-colors">
                <span className="text-xs text-text-secondary font-medium">Build Projects</span>
                <div className="text-xs font-bold text-text-primary">{stats1.projectsCount} Projects</div>
                <div className="text-xs font-bold text-text-primary">{stats2.projectsCount} Projects</div>
              </div>

              {/* Interview Prep Questions */}
              <div className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-background-card/10 transition-colors">
                <span className="text-xs text-text-secondary font-medium">Interview Questions</span>
                <div className="text-xs font-bold text-text-primary">{stats1.questionsCount} Questions</div>
                <div className="text-xs font-bold text-text-primary">{stats2.questionsCount} Questions</div>
              </div>

              {/* Your Progress */}
              <div className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-background-card/10 transition-colors bg-accent-purple/5">
                <span className="text-xs text-text-primary font-bold">Your Progress</span>
                
                {/* Tech 1 Progress */}
                <div className="space-y-1 pr-4">
                  <div className="flex justify-between text-[10px] font-bold text-accent-purple">
                    <span>{stats1.completedCount} / {stats1.totalTopics}</span>
                    <span>{stats1.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-purple" style={{ width: `${stats1.progressPercent}%` }} />
                  </div>
                </div>

                {/* Tech 2 Progress */}
                <div className="space-y-1 pr-4">
                  <div className="flex justify-between text-[10px] font-bold text-accent-cyan">
                    <span>{stats2.completedCount} / {stats2.totalTopics}</span>
                    <span>{stats2.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-cyan" style={{ width: `${stats2.progressPercent}%` }} />
                  </div>
                </div>
              </div>

              {/* Certificate status */}
              <div className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-background-card/10 transition-colors">
                <span className="text-xs text-text-secondary font-medium">Study Certification</span>
                <div>
                  {stats1.isCertified ? (
                    <span className="text-xs bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Certified
                    </span>
                  ) : (
                    <span className="text-xs text-text-secondary italic">In Progress</span>
                  )}
                </div>
                <div>
                  {stats2.isCertified ? (
                    <span className="text-xs bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Certified
                    </span>
                  ) : (
                    <span className="text-xs text-text-secondary italic">In Progress</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}
