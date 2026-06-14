import { useState, useCallback, useMemo } from 'react'
import type { SkillTreeData, SkillStatus, UserSkillState } from '../../core/types/phase5'

const STORAGE_PREFIX = 'stackforge-skilltree-'

function loadSkillStates(techId: string): Record<string, UserSkillState> {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + techId)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveSkillStates(techId: string, states: Record<string, UserSkillState>): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + techId, JSON.stringify(states))
  } catch {
    // quota
  }
}

function getTotalXP(states: Record<string, UserSkillState>): number {
  return Object.values(states).filter(s => s.status === 'mastered').length * 150
    + Object.values(states).filter(s => s.status === 'learning').length * 50
}

export function useSkillTree(tree: SkillTreeData) {
  const [skillStates, setSkillStates] = useState<Record<string, UserSkillState>>(
    () => loadSkillStates(tree.techId)
  )
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const totalXP = useMemo(() => getTotalXP(skillStates), [skillStates])

  const getNodeStatus = useCallback((nodeId: string): SkillStatus => {
    const node = tree.nodes.find(n => n.id === nodeId)
    if (!node) return 'locked'

    const state = skillStates[nodeId]
    if (state) return state.status

    // Check if available: all prerequisites must be mastered and XP met
    if (node.prerequisites.length === 0 && totalXP >= node.xpRequired) return 'available'
    const prereqsMet = node.prerequisites.every(
      pid => skillStates[pid]?.status === 'mastered'
    )
    return prereqsMet && totalXP >= node.xpRequired ? 'available' : 'locked'
  }, [skillStates, totalXP, tree.nodes])

  const cycleNodeStatus = useCallback((nodeId: string) => {
    const current = getNodeStatus(nodeId)
    if (current === 'locked') return // can't unlock locked nodes

    const nextStatus: Record<SkillStatus, SkillStatus> = {
      locked: 'locked',
      available: 'learning',
      learning: 'mastered',
      mastered: 'available', // allow reset
    }

    const next = nextStatus[current]
    const updated = {
      ...skillStates,
      [nodeId]: { nodeId, status: next, unlockedAt: next !== 'available' ? skillStates[nodeId]?.unlockedAt ?? new Date().toISOString() : undefined },
    }
    setSkillStates(updated)
    saveSkillStates(tree.techId, updated)
  }, [getNodeStatus, skillStates, tree.techId])

  const selectedNode = useMemo(
    () => tree.nodes.find(n => n.id === selectedNodeId) ?? null,
    [selectedNodeId, tree.nodes]
  )

  const stats = useMemo(() => {
    const statuses = tree.nodes.map(n => getNodeStatus(n.id))
    return {
      total: tree.nodes.length,
      mastered: statuses.filter(s => s === 'mastered').length,
      learning: statuses.filter(s => s === 'learning').length,
      available: statuses.filter(s => s === 'available').length,
      locked: statuses.filter(s => s === 'locked').length,
      xp: totalXP,
    }
  }, [tree.nodes, getNodeStatus, totalXP])

  const resetTree = useCallback(() => {
    setSkillStates({})
    saveSkillStates(tree.techId, {})
    setSelectedNodeId(null)
  }, [tree.techId])

  return {
    skillStates,
    getNodeStatus,
    cycleNodeStatus,
    selectedNodeId,
    setSelectedNodeId,
    selectedNode,
    stats,
    resetTree,
  }
}
