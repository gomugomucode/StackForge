import { useState, useEffect } from 'react'
import { BookOpen, Check, Copy, HelpCircle, RefreshCw } from 'lucide-react'
import type { SkillNode } from '../../data/resources/types'
import { getSkillStatuses, cycleSkillStatus, type SkillStatus } from '../../core/hooks/useProgress'

interface SkillTreeTabProps {
  techId: string
  skillTree: SkillNode[]
}

export function SkillTreeTab({ techId, skillTree }: SkillTreeTabProps) {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null)
  const [skillStatuses, setSkillStatuses] = useState<Record<string, SkillStatus>>({})
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<boolean>(false)

  // Load skill statuses
  useEffect(() => {
    setSkillStatuses(getSkillStatuses(techId))
    
    // Auto-select the first topic node from the first category if available
    if (skillTree.length > 0 && skillTree[0].children && skillTree[0].children.length > 0) {
      setSelectedNode(skillTree[0].children[0])
    }

    // Auto-expand all categories by default
    const initialExpanded: Record<string, boolean> = {}
    skillTree.forEach(cat => {
      initialExpanded[cat.id] = true
    })
    setExpandedCategories(initialExpanded)
  }, [techId, skillTree])

  const handleCycleStatus = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const nextStatus = cycleSkillStatus(techId, nodeId)
    setSkillStatuses(prev => ({
      ...prev,
      [nodeId]: nextStatus
    }))
  }

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }))
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Calculate stats
  const totalTopics = skillTree.reduce((acc, cat) => acc + (cat.children?.length || 0), 0)
  const masteredCount = Object.keys(skillStatuses).filter(id => skillStatuses[id] === 'mastered').length
  const learningCount = Object.keys(skillStatuses).filter(id => skillStatuses[id] === 'learning').length
  const masteryPercent = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0

  const getStatusColor = (status: SkillStatus) => {
    if (status === 'mastered') return 'border-accent-emerald text-accent-emerald bg-accent-emerald/5'
    if (status === 'learning') return 'border-accent-cyan text-accent-cyan bg-accent-cyan/5'
    return 'border-border/30 text-text-secondary bg-background-card/20'
  }

  const getStatusLabel = (status: SkillStatus) => {
    if (status === 'mastered') return 'Mastered'
    if (status === 'learning') return 'Learning'
    return 'Not Started'
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="glass p-6 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">Visual Skill Tree</h2>
          <p className="text-sm text-text-secondary">Track your mastery level topic by topic. Select nodes to view documentation and code snippets.</p>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="flex-1 min-w-[100px] p-3 bg-background-card/40 border border-border/10 rounded-xl text-center">
            <span className="text-xs text-text-secondary block">Mastered</span>
            <span className="text-lg font-bold text-accent-emerald">{masteredCount}</span>
          </div>
          <div className="flex-1 min-w-[100px] p-3 bg-background-card/40 border border-border/10 rounded-xl text-center">
            <span className="text-xs text-text-secondary block">Learning</span>
            <span className="text-lg font-bold text-accent-cyan">{learningCount}</span>
          </div>
          <div className="flex-1 min-w-[100px] p-3 bg-accent-purple/10 border border-accent-purple/20 rounded-xl text-center">
            <span className="text-xs text-text-secondary block">Total Mastery</span>
            <span className="text-lg font-bold text-accent-purple">{masteryPercent}%</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Tree Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Tree Column (Left 2/5ths on desktop) */}
        <div className="lg:col-span-2 space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {skillTree.map(category => {
            const isCatExpanded = expandedCategories[category.id] ?? true

            return (
              <div key={category.id} className="glass rounded-xl overflow-hidden border border-border/20">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full text-left p-4 bg-background-card/30 flex items-center justify-between border-b border-border/10 hover:bg-background-card/50 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-sm text-text-primary uppercase tracking-wider">{category.name}</h3>
                    <p className="text-xs text-text-secondary mt-0.5">{category.description}</p>
                  </div>
                  <span className="text-xs text-text-secondary bg-border/20 px-2 py-0.5 rounded-full">
                    {category.children?.length || 0} topics
                  </span>
                </button>

                {/* Category Topics */}
                {isCatExpanded && (
                  <div className="p-3 space-y-2 bg-background/20">
                    {category.children?.map(topic => {
                      const status = skillStatuses[topic.id] ?? 'none'
                      const isSelected = selectedNode?.id === topic.id

                      return (
                        <div
                          key={topic.id}
                          onClick={() => setSelectedNode(topic)}
                          className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                            isSelected
                              ? 'border-accent-purple bg-accent-purple/5 shadow-md shadow-accent-purple/5'
                              : 'border-border/15 hover:border-border/35 bg-background-card/25'
                          }`}
                        >
                          <div className="space-y-0.5 max-w-[75%]">
                            <h4 className={`text-xs font-bold transition-colors ${
                              isSelected ? 'text-accent-purple' : 'text-text-primary'
                            }`}>
                              {topic.name}
                            </h4>
                            <p className="text-[10px] text-text-secondary truncate">{topic.description}</p>
                          </div>

                          {/* Mastery Status Toggle Indicator */}
                          <button
                            onClick={(e) => handleCycleStatus(topic.id, e)}
                            className={`px-2 py-1 rounded-lg border text-[9px] font-bold uppercase transition-all flex items-center gap-1 ${getStatusColor(status)}`}
                            title="Click to cycle status: Not Started -> Learning -> Mastered"
                          >
                            <RefreshCw className="w-2.5 h-2.5 animate-spin-hover" />
                            {getStatusLabel(status)}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Node Detail Column (Right 3/5ths on desktop) */}
        <div className="lg:col-span-3">
          {selectedNode ? (
            <div className="glass-card p-6 rounded-2xl border border-border/20 space-y-5 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/10">
                <div>
                  <span className="text-[10px] font-bold text-accent-purple uppercase tracking-wider">Active Node</span>
                  <h3 className="text-lg font-bold text-text-primary">{selectedNode.name}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-secondary">Your Status:</span>
                  <button
                    onClick={(e) => handleCycleStatus(selectedNode.id, e)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${getStatusColor(skillStatuses[selectedNode.id] ?? 'none')}`}
                  >
                    <RefreshCw className="w-3 h-3" />
                    {getStatusLabel(skillStatuses[selectedNode.id] ?? 'none')}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Description</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{selectedNode.description}</p>
              </div>

              {/* Tags */}
              {selectedNode.tags && selectedNode.tags.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Related Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-border/20 text-text-secondary px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Example (Faux Syntax Highlighting Console) */}
              {selectedNode.codeExample && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-accent-purple" /> Code Reference
                    </h4>
                    <button
                      onClick={() => handleCopyCode(selectedNode.codeExample!)}
                      className="text-xs text-accent-purple flex items-center gap-1 px-2 py-1 bg-accent-purple/5 hover:bg-accent-purple/15 border border-accent-purple/20 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>

                  <div className="relative bg-background/80 rounded-xl overflow-hidden border border-border/10 font-mono text-xs">
                    {/* Console window dots */}
                    <div className="flex items-center gap-1 px-4 py-2.5 bg-background-card/50 border-b border-border/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      <span className="text-[10px] text-text-secondary ml-2">reference.js</span>
                    </div>
                    {/* Pre-formatted area */}
                    <pre className="p-4 overflow-x-auto text-text-primary leading-relaxed scrollbar-thin">
                      <code>{selectedNode.codeExample}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glass rounded-2xl p-16 text-center border border-border/15">
              <HelpCircle className="w-12 h-12 text-text-secondary mx-auto mb-3" />
              <h3 className="font-bold text-text-primary">No Node Selected</h3>
              <p className="text-sm text-text-secondary mt-1">Select any topic node from the tree on the left to inspect its details and code examples.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
