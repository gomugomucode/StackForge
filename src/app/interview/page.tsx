import { interviewCategories } from '@/data/interviews'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Link from 'next/link'
import { ChevronRight, BrainCircuit } from 'lucide-react'

export default function InterviewPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="Interview Hub" 
        subtitle="Master the technical interview with curated questions and deep-dive explanations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {interviewCategories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/interview/${cat.slug}`} 
            className="group p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{cat.title}</h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{cat.description}</p>
            <div className="flex items-center text-sm font-bold text-primary gap-1 group-hover:gap-2 transition-all">
              Practice Now <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
