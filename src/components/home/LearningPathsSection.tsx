"use client"

import { BookOpen, CheckCircle2, Lock } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"

const paths = [
  { 
    title: 'The Fullstack Journey', 
    steps: ['Frontend Basics', 'React Mastery', 'Node.js Backend', 'Database Design', 'Deployment'], 
    level: 'Beginner to Pro', 
    duration: '6 Months' 
  },
  { 
    title: 'AI Engineer Track', 
    steps: ['Python for DS', 'Linear Algebra', 'PyTorch Basics', 'Transformer Arch', 'LLM Tuning'], 
    level: 'Intermediate', 
    duration: '4 Months' 
  },
  { 
    title: 'DevOps Excellence', 
    steps: ['Linux Admin', 'Docker & K8s', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring'], 
    level: 'Intermediate', 
    duration: '5 Months' 
  },
]

export function LearningPathsSection() {
  return (
    <section id="learning-paths" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Learning Paths" 
          subtitle="Guided tracks that curate the best resources in a logical order."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {paths.map((path, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-border bg-card hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">{path.title}</h3>
              </div>
              <div className="space-y-4 mb-8">
                {path.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-3 group cursor-pointer">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      sIdx === 0 ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground group-hover:border-primary/50'
                    }`}>
                      {sIdx === 0 ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <span className={`text-sm transition-colors ${sIdx === 0 ? 'font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-border mb-6">
                <div className="text-xs text-muted-foreground">
                  <span className="block font-semibold text-foreground">{path.level}</span>
                  Estimated {path.duration}
                </div>
                <Button variant="outline" size="sm">Join Path</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
