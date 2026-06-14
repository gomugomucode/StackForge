import { ArrowRight } from 'lucide-react'
import { offerItems } from '../../data/offers'
import { getIcon } from '../../core/utils/icons'
import { SectionHeader } from '../ui/SectionHeader'
import { useScrollAnimation } from '../../core/hooks/useScrollAnimation'

export function WhatWeOffer() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="What We Offer"
          title="Everything You Need to"
          highlight="Level Up Your Skills"
          description="From beginner to pro — courses, quizzes, games, and resources all in one place."
        />

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {offerItems.map((item) => {
            const Icon = getIcon(item.icon)
            return (
              <Card key={item.id} className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {item.badge && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                        {item.badge}
                      </span>
                    )}
                    {item.highlight && (
                      <span className="text-xs font-semibold text-accent-emerald">{item.highlight}</span>
                    )}
                  </div>
                </div>

                {item.subtitle && (
                  <span className="text-xs font-medium text-accent-purple uppercase tracking-wider mb-1">
                    {item.subtitle}
                  </span>
                )}

                <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">{item.description}</p>

                {item.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-surface-800 text-xs font-mono text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-purple hover:text-accent-violet transition-colors mt-auto"
                >
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
