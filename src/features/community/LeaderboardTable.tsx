import type { LeaderboardEntry } from './types'
import { Trophy, Flame, Award } from 'lucide-react'

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="px-5 py-4 border-b border-white/[0.05] bg-[#0d1117]/30 flex items-center justify-between">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Global Leaderboard</span>
        </h3>
        <span className="text-[9px] font-bold text-[#8b949e] uppercase tracking-wider">
          Top Students
        </span>
      </div>

      {/* Rankings List */}
      <div className="divide-y divide-white/[0.04]">
        {entries.map(user => {
          const isTop3 = user.rank <= 3
          let rankIcon = null
          let rankColor = 'text-[#8b949e]'

          if (user.rank === 1) {
            rankIcon = <Trophy className="w-3.5 h-3.5 text-amber-400 fill-amber-400/10" />
            rankColor = 'text-amber-400 font-extrabold'
          } else if (user.rank === 2) {
            rankIcon = <Trophy className="w-3.5 h-3.5 text-slate-300 fill-slate-300/10" />
            rankColor = 'text-slate-300 font-bold'
          } else if (user.rank === 3) {
            rankIcon = <Trophy className="w-3.5 h-3.5 text-amber-700 fill-amber-700/10" />
            rankColor = 'text-amber-700 font-bold'
          }

          return (
            <div
              key={user.user_id}
              className="px-5 py-3.5 flex items-center justify-between gap-4 text-xs hover:bg-white/[0.01] transition-colors"
            >
              {/* Rank & User Details */}
              <div className="flex items-center gap-3.5 min-w-0">
                <span className={`w-5 text-center text-[10px] font-mono flex items-center justify-center ${rankColor}`}>
                  {rankIcon || user.rank}
                </span>

                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black uppercase text-white">
                    {user.username[0]}
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-white truncate">{user.username}</p>
                    <span className="inline-flex items-center gap-0.5 text-[8px] font-black text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-1 rounded-full mt-0.5">
                      <Award className="w-2 h-2" />
                      Lvl {user.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-5">
                {user.streak > 0 && (
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-orange-400" title="Daily study streak">
                    <Flame className="w-3.5 h-3.5 fill-orange-400/10" />
                    <span>{user.streak}d</span>
                  </div>
                )}
                <span className="font-mono font-bold text-white text-[11px]">
                  {user.xp.toLocaleString()} <span className="text-[8px] text-[#8b949e] font-normal uppercase">XP</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
