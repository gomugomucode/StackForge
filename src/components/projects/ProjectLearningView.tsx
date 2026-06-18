"use client"

import React, { useState } from 'react'
import { CheckCircle2, Circle, Layout, Layers, ListChecks, Target, Zap, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface ProjectViewProps {
  project: any
}

export function ProjectLearningView({ project }: ProjectViewProps) {
  const [activeTab, setActiveTab] = useState('requirements')
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const tabs = [
    { id: 'requirements', label: 'Requirements', icon: Target },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'tasks', label: 'Implementation', icon: ListChecks },
    { id: 'solution', label: 'Solution', icon: Zap },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Panel: Navigation and Progress */}
      <div className="lg:w-80 space-y-6">
        <div className="p-6 rounded-3xl border border-border bg-card">
          <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-muted-foreground">Progress</h4>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Completion</span>
            <span className="text-xs font-bold">{Math.round((completedTasks.length / project.tasks.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary" 
              initial={{ width: 0 }}
              animate={{ width: `${(completedTasks.length / project.tasks.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-medium ${
                activeTab === tab.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel: Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-3xl border border-border bg-card min-h-[600px]"
          >
            {activeTab === 'requirements' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-4">Project Requirements</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  To successfully complete this project, you must implement the following technical specifications and functional requirements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.requirements.map((req: string, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl border border-border bg-background flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.architecture.overview}</p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary border border-border">
                  <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.architecture.techStack.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-background border border-border text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-background border border-border font-mono text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-4 text-foreground font-bold">
                    <Layout className="w-4 h-4" /> Data Flow
                  </div>
                  {project.architecture.diagram}
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-4">Implementation Roadmap</h2>
                <div className="space-y-3">
                  {project.tasks.map((task: any) => (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(task.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                        completedTasks.includes(task.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      {completedTasks.includes(task.id) ? 
                        <CheckCircle2 className="w-6 h-6 text-primary" /> : 
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      }
                      <div className="flex-1">
                        <h4 className={`font-bold text-sm ${completedTasks.includes(task.id) ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'solution' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-4">The Solution</h2>
                <div className="p-8 rounded-3xl bg-secondary border border-border text-center space-y-6">
                  <p className="text-muted-foreground">
                    Stuck? Check out our reference implementation to see how a pro would build this.
                  </p>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="gap-2" 
                    onClick={() => window.open(project.solution, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" /> View Reference Implementation
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold">Key Challenges to solve:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.challenges.map((challenge: string, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl border border-border bg-card flex items-start gap-3">
                        <Zap className="w-5 h-5 text-yellow-500 mt-1" />
                        <span className="text-sm text-muted-foreground">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
