"use client"

import { GitBranch, ExternalLink, FolderCode } from "lucide-react"

import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"

const projects = [
  { 
    title: 'AI Code Reviewer', 
    description: 'Automatic PR reviews using GPT-4 with deep context awareness.', 
    tech: ['Next.js', 'OpenAI', 'TypeScript'], 
    image: 'https://images.unsplash.com/photo-1555066628-2f74df97923e?w=800&q=80',
    link: '#', 
    github: '#' 
  },
  { 
    title: 'Real-time Collab Editor', 
    description: 'CRDT-based text editor with instant synchronization.', 
    tech: ['Yjs', 'WebSockets', 'React'], 
    image: 'https://images.unsplash.com/photo-1522071820065-Ceb17c76b604?w=800&q=80',
    link: '#', 
    github: '#' 
  },
  { 
    title: 'Dev Portfolio Engine', 
    description: 'A headless CMS specifically for developer portfolios.', 
    tech: ['Prisma', 'Postgres', 'Tailwind'], 
    image: 'https://images.unsplash.com/photo-1460925895917-b2bB42a6488c?w=800&q=80',
    link: '#', 
    github: '#' 
  },
]

export function ProjectSection() {
  return (
    <section id="projects" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Featured Projects" 
          subtitle="Build real-world applications that showcase your skills to employers."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FolderCode className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Open Source</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-[10px] font-bold uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <GitBranch className="w-4 h-4" /> Code
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1 gap-2">
                    <ExternalLink className="w-4 h-4" /> Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
