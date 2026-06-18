import { roadmaps } from '@/data/roadmaps'
import { RoadmapView } from '@/components/roadmaps/RoadmapView'
import { notFound } from 'next/navigation'
import { SectionHeader } from '@/components/ui/SectionHeader'

export default async function RoadmapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const roadmap = roadmaps.find(r => r.id === id)

  if (!roadmap) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <SectionHeader 
          title={roadmap.title} 
          subtitle={roadmap.description}
        />
      </div>
      <RoadmapView roadmap={roadmap} />
    </div>
  )
}
