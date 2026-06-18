import { HeroSection } from '@/components/home/hero/hero-section'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { FeaturedContentSection } from '@/components/home/FeaturedContentSection'
import { RoadmapSection } from '@/components/home/RoadmapSection'
import { CheatSheetSection } from '@/components/home/CheatSheetSection'
import { LearningPathsSection } from '@/components/home/LearningPathsSection'
import { ProjectSection } from '@/components/home/ProjectSection'
import { InterviewSection } from '@/components/home/InterviewSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSection />
      <FeaturesSection />
      <FeaturedContentSection />
      <RoadmapSection />
      <CheatSheetSection />
      <LearningPathsSection />
      <ProjectSection />
      <InterviewSection />
      <NewsletterSection />
    </div>
  )
}
