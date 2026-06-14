import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Lock, Star, Zap, CheckCircle } from 'lucide-react'
import type { SkillStatus } from '@/lib/core/types/phase5'

export interface SkillNodeData {
  label: string
  description: string
  category: string
  xpRequired: number
  status: SkillStatus
  onSelect: () => void
  level: number
  [key: string]: unknown
}

const STATUS_CONFIG: Record<SkillStatus, {
  bg: string
  border: string
  text: string
  glow: string
  icon: typeof Lock
  iconColor: string
}> = {
  locked: {
    bg: 'bg-[#0d1117]',
    border: 'border-white/[0.08]',
    text: 'text-[#484f58]',
    glow: '',
    icon: Lock,
    iconColor: 'text-[#484f58]',
  },
  available: {
    bg: 'bg-[#161b22]',
    border: 'border-accent-cyan/40',
    text: 'text-[#e6edf3]',
    glow: 'shadow-[0_0_16px_rgba(8,145,178,0.25)]',
    icon: Zap,
    iconColor: 'text-accent-cyan',
  },
  learning: {
    bg: 'bg-[#1a1f2e]',
    border: 'border-accent-purple/50',
    text: 'text-[#e6edf3]',
    glow: 'shadow-[0_0_20px_rgba(124,58,237,0.3)]',
    icon: Star,
    iconColor: 'text-accent-purple',
  },
  mastered: {
    bg: 'bg-[#0f1e17]',
    border: 'border-emerald-500/50',
    text: 'text-emerald-100',
    glow: 'shadow-[0_0_20px_rgba(5,150,105,0.3)]',
    icon: CheckCircle,
    iconColor: 'text-emerald-400',
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  Foundation: '#a78bfa',
  Hooks: '#34d399',
  State: '#60a5fa',
  Performance: '#f59e0b',
  Ecosystem: '#818cf8',
  Patterns: '#f472b6',
  Advanced: '#22d3ee',
  Browser: '#fb923c',
  Expert: '#e879f9',
  Quality: '#4ade80',
}

export const SkillNode = memo(({ data }: NodeProps) => {
  const nodeData = data as SkillNodeData
  const { label, description, category, xpRequired, status, onSelect } = nodeData
  const config = STATUS_CONFIG[status]
  const Icon = config.icon
  const catColor = CATEGORY_COLORS[category] ?? '#a78bfa'
  const isLocked = status === 'locked'

  return (
    <div
      onClick={() => !isLocked && onSelect()}
      className={[
        'relative w-44 rounded-2xl border p-4 transition-all duration-300',
        config.bg, config.border, config.glow,
        isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105 hover:brightness-110',
      ].join(' ')}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />

      {/* Category badge */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider whitespace-nowrap"
        style={{ backgroundColor: catColor + '22', color: catColor, border: `1px solid ${catColor}44` }}
      >
        {category}
      </div>

      {/* Status icon */}
      <div className="flex items-start justify-between mb-2">
        <Icon className={`w-4 h-4 flex-none ${config.iconColor}`} />
        {xpRequired > 0 && (
          <span className={`text-[9px] font-bold ${isLocked ? 'text-[#484f58]' : 'text-[#6e7681]'}`}>
            {xpRequired} XP
          </span>
        )}
      </div>

      {/* Label */}
      <p className={`text-xs font-bold leading-tight mb-1 ${config.text}`}>{label}</p>

      {/* Description */}
      <p className={`text-[9px] leading-snug ${isLocked ? 'text-[#30363d]' : 'text-[#6e7681]'} line-clamp-2`}>
        {description}
      </p>

      {/* Status indicator */}
      <div className="mt-2 flex items-center gap-1">
        <div className={`w-1.5 h-1.5 rounded-full ${
          status === 'mastered' ? 'bg-emerald-400' :
          status === 'learning' ? 'bg-accent-purple' :
          status === 'available' ? 'bg-accent-cyan animate-pulse' :
          'bg-[#30363d]'
        }`} />
        <span className={`text-[9px] font-semibold capitalize ${config.text}`}>{status}</span>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  )
})

SkillNode.displayName = 'SkillNode'
