"use client"

import { HelpCircle, Wrench, ExternalLink, ChevronRight, ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"

const interviewQuestions = [
  { q: "How does the Event Loop work in JavaScript?", category: 'JS' },
  { q: "What is the difference between SQL and NoSQL?", category: 'Database' },
  { q: "Explain the concept of Dependency Injection.", category: 'Architecture' },
  { q: "What is the Time Complexity of Merge Sort?", category: 'DSA' },
]

const tools = [
  { name: 'Postman', desc: 'API Development Platform', link: '#' },
  { name: 'Docker', desc: 'Containerization Platform', link: '#' },
  { name: 'Zod', desc: 'TypeScript First Schema Validation', link: '#' },
  { name: 'Linear', desc: 'Modern Issue Tracking', link: '#' },
]

export function InterviewSection() {
  return (
    <section id="interviews" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Interview Prep" 
          subtitle="Tackle the most common technical interview questions."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {interviewQuestions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block">{item.category}</span>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{item.q}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2">
              View All Questions <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
             <div className="flex items-center gap-3 mb-6">
               <Wrench className="w-6 h-6 text-primary" />
               <h3 className="text-xl font-bold">Essential Dev Tools</h3>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {tools.map((tool, idx) => (
                 <a key={idx} href={tool.link} className="p-4 rounded-2xl border border-border bg-card hover:bg-secondary transition-all group flex items-center justify-between">
                   <div>
                     <span className="text-sm font-bold block">{tool.name}</span>
                     <span className="text-xs text-muted-foreground">{tool.desc}</span>
                   </div>
                   <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                 </a>
               ))}
             </div>
             <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/20">
                <p className="text-sm text-foreground/80 mb-4 italic">
                  "The right tools don't just make you faster, they make you a better engineer."
                </p>
                <Button variant="primary" size="sm" className="w-full">Browse Full Toolbox</Button>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
