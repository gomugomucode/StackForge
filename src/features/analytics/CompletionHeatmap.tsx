import type { HeatmapDay } from './types'

interface CompletionHeatmapProps {
  data: HeatmapDay[]
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'bg-[#161b22] border-white/[0.01]',
  1: 'bg-accent-purple/25 border-accent-purple/10',
  2: 'bg-accent-purple/50 border-accent-purple/20',
  3: 'bg-accent-purple/75 border-accent-purple/30',
  4: 'bg-accent-purple border-accent-purple/40 shadow-[0_0_8px_rgba(124,58,237,0.4)]',
}

export function CompletionHeatmap({ data }: CompletionHeatmapProps) {
  // Chunk 90 days into 13 columns of 7 days
  const columns: HeatmapDay[][] = []
  let currentColumn: HeatmapDay[] = []

  // Fill columns starting from the oldest day (index 0)
  data.forEach((day, index) => {
    currentColumn.push(day)
    // Every 7 days or on the last element, push to columns
    if (currentColumn.length === 7 || index === data.length - 1) {
      columns.push(currentColumn)
      currentColumn = []
    }
  })

  return (
    <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 shadow-sm space-y-4">
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-white">Activity Pulse</h4>
        <p className="text-[10px] text-[#8b949e]">Learning history over the past 90 days</p>
      </div>

      <div className="flex flex-col gap-3.5 select-none overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/[0.05] scrollbar-track-transparent">
        {/* Heatmap Grid */}
        <div className="flex gap-1.5 min-w-max">
          {/* Weekday labels */}
          <div className="flex flex-col justify-between text-[8px] font-bold text-[#6e7681] pr-1.5 py-0.5 select-none">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid columns */}
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-1.5">
              {col.map(day => (
                <div
                  key={day.date}
                  className={`w-3 h-3 rounded-sm border transition-all duration-200 cursor-pointer relative group ${
                    LEVEL_COLORS[day.level] || 'bg-[#161b22]'
                  }`}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                    <div className="bg-[#21262d] border border-white/[0.08] px-2 py-1 rounded-lg text-[9px] font-bold text-white whitespace-nowrap shadow-md">
                      {day.count} mins spent on {new Date(day.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[8px] font-bold text-[#6e7681]">
          <span>90 days ago</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map(lvl => (
              <div
                key={lvl}
                className={`w-2.5 h-2.5 rounded-sm border ${
                  LEVEL_COLORS[lvl]
                }`}
              />
            ))}
            <span>More</span>
          </div>
          <span>Today</span>
        </div>
      </div>
    </div>
  )
}
export default CompletionHeatmap;
