import type { CategoryMastery } from './types'

interface CategoryMasteryRadarProps {
  data: CategoryMastery[]
}

export function CategoryMasteryRadar({ data }: CategoryMasteryRadarProps) {
  const size = 220
  const cx = size / 2
  const cy = size / 2 + 10
  const r = 70 // Max radius

  // Map category data to angles: 3 items spaced by 120 degrees starting from top (-90 deg)
  const getCoordinates = (index: number, radiusVal: number) => {
    const angleRad = ((index * 120 - 90) * Math.PI) / 180
    return {
      x: cx + radiusVal * Math.cos(angleRad),
      y: cy + radiusVal * Math.sin(angleRad),
    }
  }

  // Calculate coordinates for user polygon
  const userPoints = data.map((d, idx) => {
    const radiusVal = r * (d.mastery / 100)
    return getCoordinates(idx, radiusVal)
  })

  const userPolygonPath = userPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="bg-[#161b22] border border-white/[0.05] rounded-3xl p-5 shadow-sm space-y-4">
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-white">Syllabus Mastery Map</h4>
        <p className="text-[10px] text-[#8b949e]">Skill distribution across major technical domains</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 select-none">
        {/* Radar SVG */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
            <defs>
              <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Grid circular rings / triangles */}
            {[25, 50, 75, 100].map((level, idx) => {
              const radiusVal = r * (level / 100)
              const p0 = getCoordinates(0, radiusVal)
              const p1 = getCoordinates(1, radiusVal)
              const p2 = getCoordinates(2, radiusVal)
              return (
                <polygon
                  key={idx}
                  points={`${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth={1}
                />
              )
            })}

            {/* Axis grid lines */}
            {data.map((_, idx) => {
              const p = getCoordinates(idx, r)
              return (
                <line
                  key={idx}
                  x1={cx}
                  y1={cy}
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth={1}
                />
              )
            })}

            {/* User Mastery Polygon Area */}
            {userPoints.length > 0 && (
              <>
                <polygon
                  points={userPolygonPath}
                  fill="url(#radar-glow)"
                  stroke="#7c3aed"
                  strokeWidth={1.5}
                  className="animate-pulse"
                />
                {/* Vertex handles */}
                {userPoints.map((p, idx) => (
                  <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r={3}
                    fill="#a78bfa"
                    stroke="#0d1117"
                    strokeWidth={1}
                  />
                ))}
              </>
            )}

            {/* Labels at vertices */}
            {data.map((d, idx) => {
              const labelP = getCoordinates(idx, r + 18)
              let textAnchor = 'middle'
              if (idx === 1) textAnchor = 'start'
              if (idx === 2) textAnchor = 'end'

              return (
                <text
                  key={idx}
                  x={labelP.x}
                  y={labelP.y + 3}
                  textAnchor={textAnchor}
                  fill="white"
                  className="text-[9px] font-black uppercase tracking-wider"
                >
                  {d.category}
                </text>
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 w-full sm:w-auto">
          {data.map(d => (
            <div key={d.category} className="flex items-center justify-between sm:justify-start gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span className="text-[10px] font-semibold text-[#8b949e]">{d.category}</span>
              </div>
              <span className="text-xs font-mono font-black text-white">{d.mastery}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
