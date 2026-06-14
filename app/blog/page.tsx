import { BlogContent } from '../components/blog/BlogContent'
import { CTASection } from '../components/home/CTASection'
import { SEOHead } from '../components/ui/SEOHead'

export function BlogPage() {
  return (
    <>
      <SEOHead
        title="Blog & Tutorials"
        description="Explore in-depth programming tutorials, guides, and career advice across React, Python, DevOps, JavaScript, and database systems."
      />
      <BlogContent />
      <CTASection />
    </>
  )
}
