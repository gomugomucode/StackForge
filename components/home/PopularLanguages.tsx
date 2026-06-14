import { Link } from 'next/navigation'
import { Users, ChevronRight } from 'lucide-react'
import { popularLanguages } from '@/lib/data/languages'
import { SectionHeader } from '../ui/SectionHeader'
import { useScrollAnimation } from '@/lib/core/hooks/useScrollAnimation'

export function PopularLanguages() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Languages"
          title="Popular"
          highlight="Skills & Languages"
          description="Pick a language and start learning with structured lessons, quizzes, and projects."
        />

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {popularLanguages.map((lang) => (
            <Link
              key={lang.slug}
              to={`/learn/${lang.slug}`}
              className="group text-left p-5 rounded-2xl bg-surface-950/80 border border-black/[0.06] dark:border-white/[0.06] hover:border-accent-purple/40 hover:bg-surface-850 transition-all duration-300 hover:-translate-y-0.5 block"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono"
                  style={{ backgroundColor: `${lang.color}20`, color: lang.color }}
                >
                  {lang.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary group-hover:text-accent-purple transition-colors">
                    {lang.name}
                  </h3>
                  <p className="text-xs text-text-muted">{lang.level}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                  <Users className="w-3.5 h-3.5" />
                  {lang.learners} learners
                </span>
                <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent-purple transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
