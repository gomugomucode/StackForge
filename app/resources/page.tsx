import { ResourcesContent } from '../components/resources/ResourcesContent'
import { CTASection } from '../components/home/CTASection'
import { SEOHead } from '../components/ui/SEOHead'

export function ResourcesPage() {
  return (
    <>
      <SEOHead
        title="Free Developer Resources & Tools"
        description="Download free programming cheat sheets, backend blueprints, developer guides, and access interactive tools to supercharge your workflow."
      />
      <ResourcesContent />
      <CTASection variant="support" />
    </>
  )
}
