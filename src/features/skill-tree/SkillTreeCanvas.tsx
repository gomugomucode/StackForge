import { useMemo, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { SkillTreeData } from '../../core/types/phase5'
import { useSkillTree } from './useSkillTree'
import { SkillNode } from './SkillNode'
import { SkillDetailPanel } from './SkillDetailPanel'
import { RotateCcw, Trophy, Zap, Star } from 'lucide-react'

const nodeTypes = { skillNode: SkillNode }

interface SkillTreeCanvasProps {
  tree: SkillTreeData
}

export function SkillTreeCanvas({ tree }: SkillTreeCanvasProps) {
  const {
    getNodeStatus,
    cycleNodeStatus,
    selectedNodeId,
    setSelectedNodeId,
    selectedNode,
    stats,
    resetTree,
  } = useSkillTree(tree)

  const nodes: Node[] = useMemo(
    () =>
      tree.nodes.map(n => {
        const status = getNodeStatus(n.id)
        return {
          id: n.id,
          type: 'skillNode',
          position: n.position,
          data: {
            ...n,
            status,
            onSelect: () => setSelectedNodeId(n.id === selectedNodeId ? null : n.id),
          },
          selected: n.id === selectedNodeId,
        }
      }),
    [tree.nodes, getNodeStatus, selectedNodeId, setSelectedNodeId]
  )

  const edges: Edge[] = useMemo(
    () =>
      tree.edges.map(e => {
        const sourceStatus = getNodeStatus(e.source)
        const targetStatus = getNodeStatus(e.target)
        const isActive = sourceStatus === 'mastered'
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          animated: isActive,
          style: {
            stroke: isActive ? '#7c3aed' : targetStatus === 'locked' ? '#21262d' : '#30363d',
            strokeWidth: isActive ? 2 : 1,
            opacity: targetStatus === 'locked' ? 0.3 : 1,
          },
        }
      }),
    [tree.edges, getNodeStatus]
  )

  const prereqNodes = useMemo(() => {
    if (!selectedNode) return []
    return selectedNode.prerequisites.map(pid => {
      const n = tree.nodes.find(n => n.id === pid)
      return { label: n?.label ?? pid, status: getNodeStatus(pid) }
    })
  }, [selectedNode, tree.nodes, getNodeStatus])

  const handleCycle = useCallback(() => {
    if (selectedNodeId) cycleNodeStatus(selectedNodeId)
  }, [selectedNodeId, cycleNodeStatus])

  const progressPct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0

  return (
    <div className="relative w-full h-full bg-[#0d1117]">
      {/* Stats bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22]/90 border border-white/[0.08] rounded-xl backdrop-blur-sm">
          <Zap className="w-3.5 h-3.5 text-accent-purple" />
          <span className="text-xs font-bold text-white">{stats.xp} XP</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22]/90 border border-white/[0.08] rounded-xl backdrop-blur-sm">
          <Trophy className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400">{stats.mastered}/{stats.total} Mastered</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22]/90 border border-white/[0.08] rounded-xl backdrop-blur-sm">
          <Star className="w-3.5 h-3.5 text-accent-purple" />
          <span className="text-xs font-bold text-white">{progressPct}% Complete</span>
        </div>

        {/* Progress bar */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#161b22]/90 border border-white/[0.08] rounded-xl backdrop-blur-sm">
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-purple to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <button
          onClick={resetTree}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#161b22]/90 border border-white/[0.08] rounded-xl text-xs text-[#6e7681] hover:text-white transition-colors backdrop-blur-sm"
          title="Reset all skill progress"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-20 left-4 z-10 flex flex-col gap-1.5 p-3 bg-[#161b22]/90 border border-white/[0.08] rounded-xl backdrop-blur-sm">
        {[
          { color: 'bg-[#30363d]', label: 'Locked' },
          { color: 'bg-accent-cyan', label: 'Available' },
          { color: 'bg-accent-purple', label: 'Learning' },
          { color: 'bg-emerald-400', label: 'Mastered' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[9px] text-[#6e7681]">{label}</span>
          </div>
        ))}
      </div>

      {/* ReactFlow canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        style={{ background: '#0d1117' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#21262d" />
        <Controls
          className="!bg-[#161b22] !border-white/[0.08] !rounded-xl overflow-hidden"
          showInteractive={false}
        />
        <MiniMap
          nodeColor={node => {
            const status = (node.data as { status: string }).status
            if (status === 'mastered') return '#22c55e'
            if (status === 'learning') return '#7c3aed'
            if (status === 'available') return '#0891b2'
            return '#21262d'
          }}
          maskColor="rgba(0,0,0,0.7)"
          className="!bg-[#161b22] !border-white/[0.08] !rounded-xl"
        />
      </ReactFlow>

      {/* Detail panel */}
      {selectedNode && (
        <SkillDetailPanel
          node={selectedNode}
          status={getNodeStatus(selectedNode.id)}
          onCycle={handleCycle}
          onClose={() => setSelectedNodeId(null)}
          prereqNodes={prereqNodes}
        />
      )}
    </div>
  )
}
