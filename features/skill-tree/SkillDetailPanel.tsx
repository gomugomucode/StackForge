import { X, ExternalLink, Star, CheckCircle, Zap, Lock, ArrowRight } from 'lucide-react'
import type { SkillTreeNode, SkillStatus } from '../../core/types/phase5'

interface SkillDetailPanelProps {
  node: SkillTreeNode
  status: SkillStatus
  onCycle: () => void
  onClose: () => void
  prereqNodes: { label: string; status: SkillStatus }[]
}

const STATUS_LABEL: Record<SkillStatus, string> = {
  locked: 'Locked',
  available: 'Available',
  learning: 'In Progress',
  mastered: 'Mastered',
}

const ACTION_LABEL: Record<SkillStatus, string> = {
  locked: 'Prerequisites required',
  available: 'Start Learning',
  learning: 'Mark as Mastered',
  mastered: 'Reset to In Progress',
}

const ACTION_COLOR: Record<SkillStatus, string> = {
  locked: 'bg-[#21262d] text-[#484f58] cursor-not-allowed',
  available: 'bg-accent-cyan hover:bg-accent-cyan/90 text-white shadow-lg shadow-cyan-500/20',
  learning: 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20',
  mastered: 'bg-[#21262d] hover:bg-[#30363d] text-[#8b949e]',
}

export function SkillDetailPanel({ node, status, onCycle, onClose, prereqNodes }: SkillDetailPanelProps) {
  return (
    <div className="absolute right-4 top-4 bottom-4 w-80 z-10 bg-[#0d1117] border border-white/[0.1] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {status === 'mastered' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
            {status === 'learning' && <Star className="w-4 h-4 text-accent-purple" />}
            {status === 'available' && <Zap className="w-4 h-4 text-accent-cyan" />}
            {status === 'locked' && <Lock className="w-4 h-4 text-[#484f58]" />}
            <span className={`text-xs font-bold ${
              status === 'mastered' ? 'text-emerald-400' :
              status === 'learning' ? 'text-accent-purple' :
              status === 'available' ? 'text-accent-cyan' :
              'text-[#484f58]'
            }`}>{STATUS_LABEL[status]}</span>
          </div>
          <h3 className="text-base font-bold text-white">{node.label}</h3>
          <p className="text-xs text-[#6e7681] mt-0.5">{node.category}</p>
        </div>
        <button onClick={onClose} className="p-1.5 text-[#6e7681] hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Description */}
        <div>
          <p className="text-sm text-[#8b949e] leading-relaxed">{node.description}</p>
        </div>

        {/* XP Requirement */}
        <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/[0.06]">
          <span className="text-xs text-[#6e7681]">XP Required</span>
          <span className="text-sm font-bold text-accent-purple">{node.xpRequired} XP</span>
        </div>

        {/* Prerequisites */}
        {prereqNodes.length > 0 && (
          <div>
            <p className="text-xs font-bold text-[#6e7681] uppercase tracking-wider mb-2">Prerequisites</p>
            <div className="space-y-1.5">
              {prereqNodes.map((prereq, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
                  {prereq.status === 'mastered'
                    ? <CheckCircle className="w-3 h-3 text-emerald-400 flex-none" />
                    : <div className="w-3 h-3 rounded-full border border-[#484f58] flex-none" />}
                  <span className={`text-xs font-medium ${prereq.status === 'mastered' ? 'text-emerald-300' : 'text-[#6e7681]'}`}>
                    {prereq.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {node.resources.length > 0 && (
          <div>
            <p className="text-xs font-bold text-[#6e7681] uppercase tracking-wider mb-2">Resources</p>
            <div className="space-y-1.5">
              {node.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg border border-white/[0.04] transition-colors text-xs text-accent-cyan hover:text-white group"
                >
                  <ExternalLink className="w-3 h-3 flex-none" />
                  <span className="flex-1 truncate">{res.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action button */}
      <div className="p-4 border-t border-white/[0.08]">
        <button
          onClick={() => status !== 'locked' && onCycle()}
          disabled={status === 'locked'}
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${ACTION_COLOR[status]}`}
        >
          {ACTION_LABEL[status]}
        </button>
      </div>
    </div>
  )
}
