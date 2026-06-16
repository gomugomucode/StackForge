"use client";

import { SEOHead } from '@/components/ui/SEOHead'
import HubHeader from '@/features/learning-paths/HubHeader'
import LearningPathGrid from '@/features/learning-paths/LearningPathGrid'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-900">
      <SEOHead
        title="StackForge Academy | Master the Stack"
        description="The ultimate platform for learning full-stack development"
      />
      
      <HubHeader />
      
      <LearningPathGrid />
      
      {/* Other original sections can be added here if they exist in a47f115 as separate components */}
    </div>
  )
}
