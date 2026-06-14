import { Image, ArrowRight } from 'lucide-react'
import { visualCollections } from '../../data/collections'
import { SectionHeader } from '../ui/SectionHeader'
import { useScrollAnimation } from '../../core/hooks/useScrollAnimation'

export function VisualCollections() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Visual Collections"
          title="Latest Post"
          highlight="Collections"
          description="Curated image collections, cheat sheets, and visual references for developers."
        />

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {visualCollections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              className="group text-left rounded-2xl overflow-hidden bg-surface-950/80 border border-black/[0.06] dark:border-white/[0.06] hover:border-accent-purple/40 hover:bg-surface-850 hover:shadow-xl dark:hover:shadow-accent-purple/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={collection.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold px-2 py-1 rounded-md bg-surface-950/85 text-text-secondary border border-black/[0.06] dark:border-white/[0.06]">
                  {collection.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-text-primary mb-2 group-hover:text-accent-purple transition-colors line-clamp-2">
                  {collection.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                    <Image className="w-3.5 h-3.5" />
                    {collection.itemCount} items
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-purple transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
