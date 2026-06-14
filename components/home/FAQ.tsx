import { faqItems } from '../../data/faq'
import { SectionHeader } from '../ui/SectionHeader'
import { Accordion } from '../ui/Accordion'
import { FadeIn } from '../ui/Motion'

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 section-alt scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked"
          highlight="Questions"
          description="Quick answers to common questions about learning, resources, and getting started."
        />

        <FadeIn className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </FadeIn>
      </div>
    </section>
  )
}
