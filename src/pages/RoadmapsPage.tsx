import { Link } from 'react-router-dom'
import { Layers, ArrowRight, Star } from 'lucide-react'
import { SEOHead } from '../components/ui/SEOHead'
import { SectionHeader } from '../components/ui/SectionHeader'

interface RoadmapCard {
  slug: string
  title: string
  description: string
  level: string
  duration: string
  steps: number
  color: string
}

const categories = [
  {
    name: 'Frontend',
    items: [
      { slug: 'javascript', title: 'JavaScript Developer', description: 'Master logic, asynchronous requests, and event loops.', level: 'Beginner', duration: '3 months', steps: 12, color: 'from-violet-500/20 to-purple-600/10' },
      { slug: 'react', title: 'React Developer', description: 'Build user interfaces, hooks, state, and components.', level: 'Intermediate', duration: '2 months', steps: 8, color: 'from-cyan-500/20 to-blue-600/10' },
      { slug: 'typescript', title: 'TypeScript Engineer', description: 'Add structural typings and generics for large apps.', level: 'Intermediate', duration: '2 months', steps: 9, color: 'from-blue-500/20 to-indigo-600/10' }
    ]
  },
  {
    name: 'Backend',
    items: [
      { slug: 'nodejs', title: 'Node.js Backend Developer', description: 'Handle database integrations, microservices, and Express routing.', level: 'Intermediate', duration: '3 months', steps: 10, color: 'from-emerald-500/20 to-teal-600/10' },
      { slug: 'python', title: 'Python Programmer', description: 'Write servers, CLI scripts, and clean logic.', level: 'Beginner', duration: '3 months', steps: 11, color: 'from-amber-500/20 to-orange-600/10' }
    ]
  },
  {
    name: 'Cloud & DevOps',
    items: [
      { slug: 'aws', title: 'AWS Architect', description: 'Deploy serverless logic, virtual instances, and networks.', level: 'Advanced', duration: '4 months', steps: 9, color: 'from-indigo-500/20 to-violet-600/10' },
      { slug: 'docker', title: 'Docker Containers', description: 'Package apps in containers, build images, and compose files.', level: 'Intermediate', duration: '2 months', steps: 8, color: 'from-sky-500/20 to-blue-600/10' },
      { slug: 'git', title: 'Git & Collaboration', description: 'Master branch operations, rebase timelines, and team commits.', level: 'Beginner', duration: '1 month', steps: 9, color: 'from-red-500/20 to-rose-600/10' }
    ]
  }
]

export function RoadmapsPage() {
  return (
    <>
      <SEOHead
        title="Interactive Programming Roadmaps & Syllabus Guides"
        description="Choose a structured syllabus track to specialize in Frontend, Backend, DevOps, or Cloud Engineering."
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Roadmaps"
            title="Syllabus &"
            highlight="Developer Tracks"
            description="Follow step-by-step visual roadmaps. Know exactly what to learn next."
          />

          <div className="max-w-6xl mx-auto space-y-12">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary border-b border-black/[0.05] dark:border-white/[0.05] pb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent-purple" /> {cat.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/learn/${item.slug}?tab=roadmap`}
                      className={`group relative block overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-gradient-to-br ${item.color} p-6 hover:border-accent-purple/40 transition-all duration-300 hover:-translate-y-1`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-850/80 text-text-secondary border border-black/[0.06] dark:border-white/[0.06]">
                          {item.level}
                        </span>
                        <span className="text-xs text-text-muted">{item.duration}</span>
                      </div>

                      <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <Layers className="w-3.5 h-3.5" />
                          <span>{item.steps} stages</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-purple">
                          View path <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
