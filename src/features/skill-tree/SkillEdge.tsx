import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react'

export function SkillEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const isActive = data?.isActive as boolean
  const isLocked = data?.isLocked as boolean

  return (
    <>
      {/* Background glow path for active edges */}
      {isActive && (
        <path
          d={edgePath}
          fill="none"
          stroke="#7c3aed"
          strokeWidth={5}
          className="opacity-20 blur-sm pointer-events-none"
        />
      )}

      {/* Main Base Edge */}
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: isActive
            ? '#7c3aed'
            : isLocked
            ? '#21262d'
            : '#30363d',
          strokeWidth: isActive ? 2.5 : 1.5,
          opacity: isLocked ? 0.3 : 1,
          transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s',
        }}
      />

      {/* Overlay dashed path to animate particles flowing through active path */}
      {isActive && (
        <path
          d={edgePath}
          fill="none"
          stroke="#a78bfa"
          strokeWidth={1.5}
          strokeDasharray="6 12"
          className="pointer-events-none animate-[dash_20s_linear_infinite]"
          style={{
            strokeLinecap: 'round',
          }}
        />
      )}
    </>
  )
}
