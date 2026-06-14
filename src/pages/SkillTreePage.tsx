import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SEOHead } from '../components/ui/SEOHead'
import { SkillTreeCanvas } from '../features/skill-tree/SkillTreeCanvas'
import { getSkillTree, SUPPORTED_SKILL_TREES } from '../features/skill-tree/skillTreeData'
import { ArrowLeft, GitBranch, ChevronDown } from 'lucide-react'

export function SkillTreePage() {
  const { technology } = useParams<{ technology: string }>()
  const techId = technology?.toLowerCase() ?? 'javascript'
  const [selectedTech, setSelectedTech] = useState(techId)
  const [showSelector, setShowSelector] = useState(false)

  const tree = getSkillTree(selectedTech)

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] overflow-hidden">
      <SEOHead
        title={`${tree?.techName ?? 'Skill'} Skill Tree — StackForge Academy`}
        description="Interactive skill tree to track and visualize your learning journey."
      />

      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 bg-[#161b22] border-b border-white/[0.08] flex-none">
        <Link
          to={`/learn/${selectedTech}`}
          className="p-2 text-[#6e7681] hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-accent-purple" />
          <span className="text-sm font-bold text-white">Skill Tree</span>
        </div>

        {/* Tech selector */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowSelector(!showSelector)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.06] border border-white/[0.08] rounded-xl text-xs font-bold text-white hover:bg-white/[0.1] transition-colors"
          >
            <span className="capitalize">{selectedTech}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#6e7681] transition-transform ${showSelector ? 'rotate-180' : ''}`} />
          </button>

          {showSelector && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-[#161b22] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden z-50">
              {SUPPORTED_SKILL_TREES.map(tid => (
                <button
                  key={tid}
                  onClick={() => { setSelectedTech(tid); setShowSelector(false) }}
                  className={`w-full text-left px-4 py-2.5 text-xs capitalize transition-colors ${selectedTech === tid ? 'bg-accent-purple/20 text-accent-purple font-bold' : 'text-[#8b949e] hover:bg-white/[0.06] hover:text-white'}`}
                >
                  {tid}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto text-xs text-[#6e7681] hidden sm:block">
          Click a node to see details · Click again to cycle status
        </div>
      </div>

      {/* Canvas fills rest of screen */}
      <div className="flex-1 min-h-0">
        {tree ? (
          <SkillTreeCanvas tree={tree} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <GitBranch className="w-12 h-12 text-[#30363d] mb-4" />
            <h2 className="text-lg font-bold text-[#6e7681]">Skill tree not available</h2>
            <p className="text-sm text-[#484f58] mt-1">for {selectedTech}</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default SkillTreePage;
