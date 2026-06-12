import { Hero } from '../components/home/Hero'
import { StatsSection } from '../components/home/StatsSection'
import { FeaturedCategories } from '../components/home/FeaturedCategories'
import { WhatWeOffer } from '../components/home/WhatWeOffer'
import { PopularLanguages } from '../components/home/PopularLanguages'
import { QuizGamesTools } from '../components/home/QuizGamesTools'
import { RoadmapsSection } from '../components/home/RoadmapsSection'
import { LatestArticles } from '../components/home/LatestArticles'
import { VisualCollections } from '../components/home/VisualCollections'
import { WeeklyChallenge } from '../components/home/WeeklyChallenge'
import { Testimonials } from '../components/home/Testimonials'
import { FAQ } from '../components/home/FAQ'
import { CTASection } from '../components/home/CTASection'
import { FounderPreview } from '../components/about/FounderSection'
import { SEOHead } from '../components/ui/SEOHead'

export function HomePage() {
  return (
    <>
      <SEOHead
        title="Master Modern Software Development"
        description="Structured programming courses, interactive quizzes, visual roadmaps, and cheat sheets to help you learn React, Python, DevOps, and more for free."
      />
      <Hero />
      <StatsSection />
      <FeaturedCategories />
      <WhatWeOffer />
      <PopularLanguages />
      <QuizGamesTools />
      <RoadmapsSection />
      <LatestArticles />
      <VisualCollections />
      <WeeklyChallenge />
      <Testimonials />
      <FAQ />
      <FounderPreview />
      <CTASection variant="support" />
      <CTASection />
    </>
  )
}
