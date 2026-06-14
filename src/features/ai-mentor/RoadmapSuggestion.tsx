import type { RoadmapStep } from './types'
import { Calendar, Award, ExternalLink } from 'lucide-react'

interface RoadmapSuggestionProps {
  roadmap: RoadmapStep[]
}

export function RoadmapSuggestion({ roadmap }: RoadmapSuggestionProps) {
  return (
    <div className="w-full space-y-4 my-4">
      <div className="relative border-l border-white/[0.08] ml-3.5 pl-6 space-y-6">
        {roadmap.map((step, idx) => {
          return (
            <div key={idx} className="relative group">
              {/* Dot marker */}
              <span className="absolute -left-[31px] top-1 flex items-center justify-center w-5 h-5 bg-[#0d1117] border-2 border-accent-purple rounded-full z-10 transition-transform duration-300 group-hover:scale-110">
                <span className="w-1.5 h-1.5 bg-accent-purple rounded-full" />
              </span>

              <div className="bg-[#161b22] border border-white/[0.06] rounded-2xl p-4 space-y-3 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-colors duration-300 hover:border-white/10 hover:bg-[#1c222b]">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {step.step}
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] text-[#8b949e]">
                      <Calendar className="w-3 h-3 text-[#8b949e]" />
                      <span>{step.duration}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-400">
                      <Award className="w-3 h-3" />
                      <span>+{step.xp} XP</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#c9d1d9] leading-relaxed">
                  {step.detail}
                </p>

                {step.resources && step.resources.length > 0 && (
                  <div className="pt-2 border-t border-white/[0.04] space-y-1.5">
                    <span className="text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider block">
                      Recommended Resources:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {step.resources.map((res, rIdx) => (
                        <a
                          key={rIdx}
                          href={res.startsWith('http') ? res : '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0d1117] border border-white/[0.05] rounded-lg text-[10px] font-medium text-accent-cyan hover:text-white hover:border-accent-cyan/35 transition-colors"
                        >
                          <span>{res}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
