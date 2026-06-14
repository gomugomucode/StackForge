import { Link } from 'react-router-dom'
import { Clock, Layers, ArrowRight } from 'lucide-react'
import { roadmaps } from '@/lib/data/roadmaps'
import { SectionHeader } from '../ui/SectionHeader'
import { useScrollAnimation } from '@/lib/core/hooks/useScrollAnimation'

export function RoadmapsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="roadmaps" ref={ref} className="py-20 md:py-28 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Roadmaps"
          title="Visual Learning"
          highlight="Roadmaps"
          description="Follow step-by-step visual roadmaps crafted by industry experts. Know exactly what to learn next."
        />

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {roadmaps.map((roadmap) => (
            <Link
              key={roadmap.id}
              to="/roadmaps"
              className={`group relative block overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-gradient-to-br from-surface-900 to-surface-800 p-6 md:p-8 hover:border-accent-purple/40 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-850/80 text-text-secondary border border-black/[0.06] dark:border-white/[0.06]">
                    {roadmap.level}
                  </span>
                  <span className="text-xs text-text-muted">{roadmap.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                  {roadmap.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">{roadmap.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {roadmap.tags?.length || 0} topics
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {roadmap.duration}
                    </span>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-purple group-hover:text-accent-violet transition-colors animate-pulse"
                  >
                    View Roadmaps
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
