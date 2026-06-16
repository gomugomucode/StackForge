import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data/testimonials'

import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../ui/Motion'

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge="Testimonials"
          title="Loved by"
          highlight="Developers Worldwide"
          description="Hear from learners who used our platform to level up their skills and land real opportunities."
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item) => (
            <StaggerItem key={item.id}>
              <article className="glass-card gradient-border rounded-2xl p-6 md:p-8 h-full flex flex-col glow-purple">
                <Quote className="w-8 h-8 text-accent-purple/40 mb-4" aria-hidden="true" />
                <p className="text-text-secondary leading-relaxed flex-1 mb-6">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-accent-purple/20"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary truncate">{item.name}</p>
                    <p className="text-xs text-text-muted truncate">
                      {item.role} &bull; {item.company}
                    </p>
                  </div>
                  <div className="flex gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-surface-600'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
