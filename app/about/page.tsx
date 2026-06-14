import { AboutContent } from '@/components/about/FounderSection'
import { FAQ } from '@/components/home/FAQ'
import { CTASection } from '@/components/home/CTASection'
import { SEOHead } from '@/components/ui/SEOHead'

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us & Our Mission"
        description="Learn about the founder, mission, and roadmap of StackForge, built by developers, for developers, to make high-quality programming education accessible for free."
      />
      <AboutContent />
      <FAQ />
      <CTASection variant="support" />
    </>
  )
}
