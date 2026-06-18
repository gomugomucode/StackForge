import { roadmaps } from '@/data/roadmaps'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Link from 'next/link'
import { ChevronRight, Code2 } from 'lucide-react'

export default function RoadmapsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="All Roadmaps" 
        subtitle="Choose your path and start your journey towards engineering mastery."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {roadmaps.map((roadmap) => (
          <Link 
            key={roadmap.id} 
            href={`/roadmaps/${roadmap.id}`} 
            className={`group relative p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1 overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${roadmap.color} blur-3xl opacity-30 group-hover:opacity-50 transition-opacity`} />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{roadmap.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {roadmap.description}
              </p>
              <div className="flex items-center text-sm font-bold text-primary gap-1 group-hover:gap-2 transition-all">
                Start Journey <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
