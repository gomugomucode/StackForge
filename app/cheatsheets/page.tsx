
import { Search } from 'lucide-react'
import { SEOHead } from '@/components/ui/SEOHead'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContentCard } from '@/components/ui/ContentCard'
import { cheatsheets } from '@/lib/data/cheatsheets'
import { useContentSearch } from '@/lib/core/hooks/useContentSearch'

export function CheatsheetsPage() {
  const { query, setQuery, filteredItems } = useContentSearch(cheatsheets);

  return (
    <div className="min-h-screen bg-slate-950 py-16 md:py-24">
      <SEOHead
        title="Developer Cheatsheets | StackForge"
        description="Quick reference guides, command checklists, and syntax cards for modern developers."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Cheat Sheets"
          title="Quick Reference"
          highlight="& Syntax Cards"
          description="Speed up your coding workflow. Access instant syntax lookups and copy-pasteable snippets."
        />

        <div className="max-w-7xl mx-auto mt-12 space-y-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search cheatsheets..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((sheet) => (
              <ContentCard 
                key={sheet.id} 
                item={{
                  title: sheet.title,
                  slug: sheet.id,
                  category: sheet.category,
                  difficulty: (sheet.level as any),
                  tags: sheet.tags,
                  estimatedTime: 0, // Cheatsheets are quick ref
                  author: 'StackForge',
                  featured: false,
                  lastUpdated: sheet.lastUpdated,
                  type: 'cheatsheet',
                  thumbnail: sheet.thumbnail
                }} 
                link={`/cheatsheets/${sheet.id}`} 
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p>No cheatsheets found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
