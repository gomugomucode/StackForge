import type { ChartDataPoint } from './types'

interface XPGrowthChartProps {
  data: ChartDataPoint[]
}

export function XPGrowthChart({ data }: XPGrowthChartProps) {
  const width = 500
  const height = 220
  const paddingX = 45
  const paddingY = 30

  // Calculate scales
  const values = data.map(d => d.value)
  const maxValue = Math.max(...values, 1000)
  const minValue = Math.min(...values, 0)
  const valueRange = maxValue - minValue

  // Generate coordinates
  const points = data.map((d, index) => {
    const x = paddingX + (index * (width - 2 * paddingX)) / (data.length - 1)
    const y = height - paddingY - ((d.value - minValue) * (height - 2 * paddingY)) / (valueRange || 1)
    return { x, y, ...d }
  })

  // Build SVG path
  let linePath = ''
  let areaPath = ''

  if (points.length > 0) {
    linePath = `M ${points[0].x} ${points[0].y} `
    for (let i = 1; i < points.length; i++) {
      // Draw smooth curves (cubics)
      const prev = points[i - 1]
      const curr = points[i]
      const cpX1 = prev.x + (curr.x - prev.x) / 2
      const cpY1 = prev.y
      const cpX2 = prev.x + (curr.x - prev.x) / 2
      const cpY2 = curr.y
      linePath += `C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y} `
    }

    // Area path closes at the bottom axis
    areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
  }

  return (
    <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 shadow-sm space-y-4">
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-white">XP Growth Trend</h4>
        <p className="text-[10px] text-[#8b949e]">Accumulated XP over the past week</p>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            {/* Area gradient */}
            <linearGradient id="xp-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
            {/* Line gradient */}
            <linearGradient id="xp-line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingY + ratio * (height - 2 * paddingY)
            const gridVal = Math.round(maxValue - ratio * valueRange)
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth={1}
                />
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  textAnchor="end"
                  fill="#6e7681"
                  className="text-[9px] font-mono"
                >
                  {gridVal}
                </text>
              </g>
            )
          })}

          {/* Paths */}
          {points.length > 0 && (
            <>
              {/* Gradient Area */}
              <path d={areaPath} fill="url(#xp-area-grad)" />

              {/* Glowing Outline */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#xp-line-grad)"
                strokeWidth={2.5}
                strokeLinecap="round"
              />

              {/* Data points markers */}
              {points.map((p, idx) => (
                <g key={idx} className="group/node">
                  {/* Outer circle glow on hover */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={6}
                    fill="#7c3aed"
                    className="opacity-0 group-hover/node:opacity-30 transition-opacity duration-200 cursor-pointer"
                  />
                  {/* Core dot */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={3.5}
                    fill="#0d1117"
                    stroke="#a78bfa"
                    strokeWidth={2}
                    className="cursor-pointer"
                  />
                  {/* Tooltip value */}
                  <text
                    x={p.x}
                    y={p.y - 10}
                    textAnchor="middle"
                    fill="white"
                    className="text-[9px] font-bold opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 bg-[#161b22] px-1 py-0.5 rounded"
                  >
                    {p.value} XP
                  </text>
                </g>
              ))}
            </>
          )}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={height - 10}
              textAnchor="middle"
              fill="#6e7681"
              className="text-[9px] font-bold"
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}
