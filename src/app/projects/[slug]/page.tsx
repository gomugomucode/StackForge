import { projects } from '@/data/projects'
import { ProjectLearningView } from '@/components/projects/ProjectLearningView'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <SectionHeader 
          title={project.title} 
          description={project.description}
        />
      </div>
      <ProjectLearningView project={project} />
    </div>
  )
}
