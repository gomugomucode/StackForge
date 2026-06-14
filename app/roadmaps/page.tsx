
import { Search } from 'lucide-react'
import { SEOHead } from '@/components/ui/SEOHead'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContentCard } from '@/components/ui/ContentCard'
import { roadmaps } from '@/lib/data/roadmaps'
import { useContentSearch } from '@/lib/core/hooks/useContentSearch'

export function RoadmapsPage() {
  const { query, setQuery, filteredItems } = useContentSearch(roadmaps);

  return (
    <div className="min-h-screen bg-slate-950 py-16 md:py-24">
      <SEOHead
        title="Interactive Programming Roadmaps | StackForge"
        description="Choose a structured syllabus track to specialize in Frontend, Backend, DevOps, or Cloud Engineering."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Roadmaps"
          title="Structured"
          highlight="Learning Paths"
          description="Stop wandering through random tutorials. Follow expert-curated roadmaps to reach your goals faster."
        />

        <div className="max-w-7xl mx-auto mt-12 space-y-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search roadmaps..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((roadmap) => (
              <ContentCard 
                key={roadmap.id} 
                item={{
                  title: roadmap.title,
                  slug: roadmap.id,
                  category: 'Roadmaps',
                  difficulty: (roadmap.level as any),
                  tags: roadmap.tags || [],
                  estimatedTime: typeof roadmap.duration === 'number' ? roadmap.duration : 0,
                  author: 'StackForge',
                  featured: roadmap.featured || false,
                  lastUpdated: roadmap.lastUpdated,
                  type: 'roadmap',
                  thumbnail: roadmap.thumbnail
                }} 
                link={`/roadmaps/${roadmap.id}`} 
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p>No roadmaps found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
