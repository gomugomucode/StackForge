import type { ChartDataPoint } from './types'

interface LearningTimeChartProps {
  data: ChartDataPoint[]
}

export function LearningTimeChart({ data }: LearningTimeChartProps) {
  const values = data.map(d => d.value)
  const maxValue = Math.max(...values, 60) // Normalize at 60 mins baseline

  return (
    <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 shadow-sm space-y-5">
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-white">Daily Study Time</h4>
        <p className="text-[10px] text-[#8b949e]">Minutes spent learning each day of this week</p>
      </div>

      {/* Chart container */}
      <div className="flex items-end justify-between h-44 px-2 pt-4 relative select-none">
        {/* Horizontal grid guide lines behind */}
        <div className="absolute inset-x-0 top-4 bottom-8 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-full border-t border-white/[0.02] relative">
              <span className="absolute right-0 -top-2 text-[8px] font-mono text-[#6e7681]">
                {Math.round(maxValue - (i * maxValue) / 2)}m
              </span>
            </div>
          ))}
        </div>

        {/* Bars */}
        {data.map((d, idx) => {
          const pct = Math.max(4, Math.round((d.value / maxValue) * 100))
          const isToday = new Date().getDay() === idx
          
          return (
            <div key={idx} className="flex flex-col items-center gap-2.5 flex-1 group relative z-10">
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-[#21262d] border border-white/[0.08] px-2 py-1 rounded-lg text-[9px] font-bold text-white whitespace-nowrap shadow-md">
                  {d.value} mins
                </div>
              </div>

              {/* Bar track */}
              <div className="w-4 sm:w-6 h-32 bg-[#0d1117]/80 border border-white/[0.02] rounded-lg overflow-hidden flex items-end">
                <div
                  className={`w-full rounded-b-md transition-all duration-700 ease-out origin-bottom ${
                    isToday
                      ? 'bg-gradient-to-t from-accent-purple to-accent-cyan shadow-[0_0_12px_rgba(124,58,237,0.3)]'
                      : 'bg-[#21262d] hover:bg-[#30363d]'
                  }`}
                  style={{ height: `${pct}%` }}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[9px] font-bold transition-colors ${
                  isToday ? 'text-accent-cyan' : 'text-[#6e7681] group-hover:text-white'
                }`}
              >
                {d.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
