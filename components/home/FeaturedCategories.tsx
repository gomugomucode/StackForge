import { ArrowRight, Users } from 'lucide-react'
import { featuredCategories } from '@/lib/data/categories'
import { getIcon } from '@/lib/core/utils/icons'
import { SectionHeader, Card } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../ui/Motion'

export function FeaturedCategories() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Learning Paths"
          title="Featured"
          highlight="Categories"
          description="Structured learning paths designed to take you from beginner to job-ready developer."
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCategories.map((category) => {
            const Icon = getIcon(category.icon)
            return (
              <StaggerItem key={category.id}>
                <Card glow="purple">
                  <div className="flex items-start gap-5">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shrink-0 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-text-primary mb-2">{category.title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                          <Users className="w-3.5 h-3.5" />
                          {category.courseCount} modules
                        </span>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-accent-purple hover:text-accent-violet transition-colors"
                        >
                          Explore
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
