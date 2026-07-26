"use client"

import { projects } from '@/data/projects'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Link from 'next/link'
import { ChevronRight, Gauge, GitBranch, ExternalLink, FolderKanban } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { tokens } from '@/lib/tokens'
import { AnimatePresence } from 'framer-motion'
import { ProjectSubmitModal } from '@/components/projects/ProjectSubmitModal'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [submitModalOpen, setSubmitModalOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-24 max-w-7xl space-y-12">
      <SectionHeader 
        title="Project Learning System" 
        subtitle="Stop following tutorials. Start building real-world systems from requirements to solution."
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Input 
            type="text" 
            placeholder="Search projects, tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
            <Button 
              key={level} 
              variant={searchQuery === level ? "primary" : "outline"} 
              size="sm"
              onClick={() => setSearchQuery(level === 'All' ? '' : level)}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState 
          icon={<FolderKanban className="w-6 h-6 text-primary" />}
          reason={`No projects found matching "${searchQuery}".`}
          benefit="Try clearing your search query or selecting a different difficulty filter."
          primaryCTA={{
            label: "Clear Search",
            onClick: () => setSearchQuery("")
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} variant="interactive" padding="lg" className="flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Badge variant={
                    project.difficulty === 'Beginner' ? 'success' : 
                    project.difficulty === 'Intermediate' ? 'secondary' : 
                    'danger'
                  }>
                    {project.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Gauge className="w-3.5 h-3.5" /> {project.estimatedTime}
                  </div>
                </div>
                <Link href={`/projects/${project.slug}`}>
                  <h3 className={`${tokens.typography.h3} mb-3 group-hover:text-primary transition-colors`}>{project.title}</h3>
                </Link>
                <p className={`${tokens.typography.body} mb-6 leading-relaxed`}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Link 
                  href={`/projects/${project.slug}`}
                  className="flex items-center text-sm font-bold text-primary gap-1 group-hover:gap-2 transition-all mb-6"
                >
                  Start Building <ChevronRight className="w-4 h-4" />
                </Link>
                <div className="pt-4 border-t border-border flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2" 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProjectId(project.id);
                      setSubmitModalOpen(true);
                    }}
                  >
                    <GitBranch className="w-4 h-4 text-primary" /> Submit Work
                  </Button>
                  <Link 
                    href={`/projects/${project.slug}`} 
                    className="p-2.5 rounded-xl border border-border bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      <AnimatePresence>
        {submitModalOpen && (
          <ProjectSubmitModal 
            projectId={selectedProjectId || ''} 
            onClose={() => setSubmitModalOpen(false)} 
            onSuccess={() => {
              setSubmitModalOpen(false);
              alert("Project submitted! You've earned 50 XP. Peer reviews will appear in your profile.");
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}
