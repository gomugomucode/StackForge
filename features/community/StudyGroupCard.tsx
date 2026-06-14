import type { StudyGroup } from './types'
import { Users, Check } from 'lucide-react'

interface StudyGroupCardProps {
  group: StudyGroup
  onToggleJoin: (groupId: string) => void
}

export function StudyGroupCard({ group, onToggleJoin }: StudyGroupCardProps) {
  const isJoined = !!group.is_member

  return (
    <div className="bg-[#161b22] border border-white/[0.05] rounded-2xl p-4.5 flex items-center justify-between gap-4 transition-all duration-300 hover:border-white/10 hover:bg-[#1c222b]">
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-xs font-bold text-white truncate">{group.name}</h4>
          <span className="text-[9px] font-bold px-2 py-0.2 rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
            {group.tech_focus}
          </span>
        </div>
        
        <p className="text-[10px] text-[#8b949e] line-clamp-2 leading-relaxed">
          {group.description}
        </p>

        <div className="flex items-center gap-1 text-[9px] text-[#6e7681]">
          <Users className="w-3.5 h-3.5" />
          <span>{group.member_count} members</span>
        </div>
      </div>

      <button
        onClick={() => onToggleJoin(group.id)}
        className={`flex-shrink-0 flex items-center justify-center gap-1 px-3.5 py-1.5 text-[10px] font-bold rounded-xl transition-all duration-200 ${
          isJoined
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            : 'bg-[#21262d] hover:bg-[#2c333f] border border-white/[0.06] text-white hover:text-white'
        }`}
      >
        {isJoined ? (
          <>
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Joined</span>
          </>
        ) : (
          <span>Join Group</span>
        )}
      </button>
    </div>
  )
}
