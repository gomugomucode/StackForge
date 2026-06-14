'use client'

import React from 'react'

interface XPGrowthChartProps {
  data: { date: string; xp: number }[]
}

export function XPGrowthChart({ data }: XPGrowthChartProps) {
  if (data.length === 0) return <div>No data available</div>

  const maxXP = Math.max(...data.map(d => d.xp))
  const width = 600
  const height = 300
  const padding = 40

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding)
    const y = height - padding - (d.xp / maxXP) * (height - 2 * padding)
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="w-full flex justify-center p-4 bg-gray-900 rounded-xl border border-gray-800">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#4b5563" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#4b5563" strokeWidth="2" />
        
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(tick => (
          <line 
            key={tick}
            x1={padding} 
            y1={height - padding - tick * (height - 2 * padding)} 
            x2={width - padding} 
            y2={height - padding - tick * (height - 2 * padding)} 
            stroke="#1f2937" 
            strokeWidth="1" 
            strokeDasharray="4"
          />
        ))}

        {/* Line */}
        <polyline
          fill="none"
          stroke="#a855f7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        {/* Data Points */}
        {data.map((d, i) => {
          const x = padding + (i / (data.length - 1)) * (width - 2 * padding)
          const y = height - padding - (d.xp / maxXP) * (height - 2 * padding)
          return (
            <circle key={i} cx={x} cy={y} r="4" fill="#a855f7" stroke="#000" strokeWidth="1" />
          )
        })}
        
        {/* Labels */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fill="#9ca3af" fontSize="12">Date</text>
        <text x={15} y={height / 2} textAnchor="middle" fill="#9ca3af" fontSize="12" transform="rotate(-90, 15, 150)">XP</text>
      </svg>
    </div>
  )
}
