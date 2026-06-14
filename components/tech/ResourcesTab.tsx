import { useState } from 'react'
import * as Icons from 'lucide-react'
import type { TechResourceData, TechResource } from '@/lib/data/resources/types'
import { isBookmarked, toggleBookmark } from '@/lib/core/hooks/useProgress'

interface ResourcesTabProps {
  techId: string
  techTitle: string
  resourcesData: TechResourceData
}

export function ResourcesTab({ techId, techTitle, resourcesData }: ResourcesTabProps) {
  const [selectedSection, setSelectedSection] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Dynamically resolve icon
  const getIcon = (iconName: string) => {
    const IconComp = (Icons as any)[iconName]
    return IconComp ? <IconComp className="w-5 h-5" /> : <Icons.BookOpen className="w-5 h-5" />
  };

  const handleBookmarkToggle = (resource: TechResource) => {
    toggleBookmark({
      id: `${techId}-resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}`,
      type: 'resource',
      techId,
      title: resource.title,
      subtitle: `${techTitle} Resource • ${resource.difficulty}`,
      savedAt: new Date().toISOString()
    })
  }

  // Filter sections and their resources
  const filteredSections = resourcesData.sections
    .map(section => {
      // Filter resources inside the section
      const filteredResources = section.resources.filter(res => {
        const matchesDifficulty = difficultyFilter === 'all' || res.difficulty === difficultyFilter
        const matchesType = typeFilter === 'all' || res.type === typeFilter
        const matchesSearch = searchQuery === '' || 
          res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (res.author && res.author.toLowerCase().includes(searchQuery.toLowerCase()))
        
        return matchesDifficulty && matchesType && matchesSearch
      })

      return {
        ...section,
        resources: filteredResources
      }
    })
    .filter(section => {
      const matchesSection = selectedSection === 'all' || section.id === selectedSection
      return matchesSection && section.resources.length > 0
    })

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">Curated Resources</h2>
          <p className="text-sm text-text-secondary">Handpicked documentation, tutorials, books, and tools to accelerate your learning.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-accent-purple/10 border border-accent-purple/20 rounded-xl">
            <span className="text-xs text-text-secondary block">Total Sections</span>
            <span className="text-lg font-bold text-accent-purple">{resourcesData.sections.length}</span>
          </div>
          <div className="px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl">
            <span className="text-xs text-text-secondary block">Total Resources</span>
            <span className="text-lg font-bold text-accent-cyan">
              {resourcesData.sections.reduce((acc, s) => acc + s.resources.length, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background-card/50 border border-border/40 rounded-xl text-sm focus:outline-none focus:border-accent-purple/50 text-text-primary"
          />
        </div>

        {/* Section Filter */}
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="px-3 py-2.5 bg-background-card/50 border border-border/40 rounded-xl text-sm focus:outline-none focus:border-accent-purple/50 text-text-primary"
        >
          <option value="all">All Sections</option>
          {resourcesData.sections.map(s => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>

        {/* Difficulty Filter */}
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="px-3 py-2.5 bg-background-card/50 border border-border/40 rounded-xl text-sm focus:outline-none focus:border-accent-purple/50 text-text-primary"
        >
          <option value="all">All Experience Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2.5 bg-background-card/50 border border-border/40 rounded-xl text-sm focus:outline-none focus:border-accent-purple/50 text-text-primary"
        >
          <option value="all">All Pricing</option>
          <option value="free">Free</option>
          <option value="freemium">Freemium</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Main Content Area */}
      {filteredSections.length > 0 ? (
        <div className="space-y-8">
          {filteredSections.map(section => (
            <div key={section.id} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/20">
                <span className="text-accent-purple">{getIcon(section.icon)}</span>
                <h3 className="text-lg font-bold text-text-primary">{section.title}</h3>
                <span className="text-xs text-text-secondary ml-2">({section.resources.length} items)</span>
              </div>
              <p className="text-xs text-text-secondary -mt-2">{section.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.resources.map((res, index) => {
                  const resId = `${techId}-resource-${res.title.replace(/\s+/g, '-').toLowerCase()}`
                  const bookmarked = isBookmarked(resId)

                  return (
                    <div
                      key={index}
                      className="glass-card hover:border-accent-purple/30 transition-all duration-300 p-5 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
                    >
                      {/* Badge if exists */}
                      {res.badge && (
                        <div className="absolute top-0 right-12 bg-accent-purple/20 text-accent-purple text-[10px] font-bold px-2.5 py-1 rounded-bl-xl border-l border-b border-accent-purple/25">
                          {res.badge}
                        </div>
                      )}

                      <div className="space-y-2">
                        {/* Title and Action Buttons */}
                        <div className="flex justify-between items-start gap-4 pr-16">
                          <h4 className="font-semibold text-text-primary group-hover:text-accent-purple transition-colors duration-200">
                            {res.title}
                          </h4>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {res.description}
                        </p>

                        {/* Author */}
                        {res.author && (
                          <div className="text-[11px] text-text-secondary">
                            By <span className="text-text-primary font-medium">{res.author}</span>
                          </div>
                        )}
                      </div>

                      {/* Footer Details */}
                      <div className="mt-4 pt-3 border-t border-border/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            res.difficulty === 'Beginner' ? 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20' :
                            res.difficulty === 'Intermediate' ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' :
                            'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'
                          }`}>
                            {res.difficulty}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            res.type === 'free' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            res.type === 'freemium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {res.type.toUpperCase()}
                          </span>
                          {res.estimatedHours && (
                            <span className="text-[10px] text-text-secondary flex items-center gap-1">
                              <Icons.Clock className="w-3 h-3" /> ~{res.estimatedHours}h
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleBookmarkToggle(res)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              bookmarked 
                                ? 'bg-accent-purple/20 border-accent-purple/30 text-accent-purple' 
                                : 'bg-transparent border-border/30 text-text-secondary hover:text-text-primary'
                            }`}
                            title={bookmarked ? "Remove Bookmark" : "Bookmark Resource"}
                          >
                            <Icons.Bookmark className="w-3.5 h-3.5" fill={bookmarked ? "currentColor" : "none"} />
                          </button>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-border/30 text-text-secondary hover:text-text-primary hover:border-accent-purple/30 transition-all flex items-center gap-1"
                          >
                            <span className="text-[10px]">Visit</span>
                            <Icons.ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass rounded-2xl">
          <Icons.Inbox className="w-12 h-12 text-text-secondary mx-auto mb-3" />
          <h3 className="font-bold text-text-primary">No Resources Found</h3>
          <p className="text-sm text-text-secondary mt-1">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  )
}
