"use client"

import { FileText, Download, ExternalLink } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"

const cheatSheets = [
  { title: 'React 19 Hooks', description: 'Everything new in the latest React version.', category: 'Frontend', size: '2MB' },
  { title: 'TypeScript Pro', description: 'Advanced types, generics and utility types.', category: 'Language', size: '1.5MB' },
  { title: 'Docker Commands', description: 'Commonly used containers and orchestration commands.', category: 'DevOps', size: '800KB' },
  { title: 'PostgreSQL Optimization', description: 'Indexing, query planning and performance tips.', category: 'Backend', size: '1.2MB' },
  { title: 'Zod Validation', description: 'Schema definition and type inference guide.', category: 'TypeScript', size: '1MB' },
  { title: 'Tailwind CSS Grid', description: 'Complex layouts made simple with CSS Grid.', category: 'CSS', size: '900KB' },
]

export function CheatSheetSection() {
  return (
    <section id="cheatsheets" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Popular CheatSheets" 
          subtitle="Quick reference guides for the most critical parts of your stack."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cheatSheets.map((sheet, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-border bg-background hover:shadow-xl transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                  {sheet.category}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{sheet.title}</h3>
              <p className="text-muted-foreground text-sm mb-6">{sheet.description}</p>
              <div className="flex items-center justify-between gap-2">
                <Button variant="ghost" size="sm" className="h-8 gap-2">
                  <Download className="w-3 h-3" /> {sheet.size}
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-2">
                  View <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
