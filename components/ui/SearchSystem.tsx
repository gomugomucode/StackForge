import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Layers, BookOpen, Terminal, Briefcase, HelpCircle, Loader2, Filter, Link2 } from 'lucide-react'

interface SearchResult {
  title: string
  subtitle?: string
  link: string
  type: 'Roadmap' | 'Study Chapter' | 'Cheatsheet' | 'Project' | 'Interview' | 'Resource'
  techId: string
}

export function SearchSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedTech, setSelectedTech] = useState<string>('All')
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([])
  const [isIndexing, setIsIndexing] = useState(false)
  
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useRouter()

  // Toggle modal on keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setQuery('')
      setSelectedCategory('All')
      setSelectedTech('All')
    }
  }, [isOpen])

  // Lazy load search index when modal is opened
  useEffect(() => {
    if (isOpen && searchIndex.length === 0 && !isIndexing) {
      setIsIndexing(true)
      
      const buildIndex = async () => {
        try {
          // Dynamic import of database index
          const { getTechData, getAllTechnologies } = await import('@/lib/data/db')
          const slugs = getAllTechnologies()
          const items: SearchResult[] = []

          // Fetch all technology details in parallel asynchronously
          const loadedData = await Promise.all(
            slugs.map(async (slug) => {
              const res = await getTechData(slug)
              return { slug, data: res }
            })
          )

          loadedData.forEach(({ slug, data }) => {
            if (!data) return
            const techTitle = data.roadmap.overview.title

            // 1. Index Roadmap / Tech overview
            items.push({
              title: `${techTitle} Roadmap`,
              subtitle: data.roadmap.overview.description,
              link: `/learn/${slug}?tab=roadmap`,
              type: 'Roadmap',
              techId: slug
            })

            // 2. Index Notes chapters
            data.notes.forEach((ch) => {
              items.push({
                title: ch.title,
                subtitle: ch.content,
                link: `/learn/${slug}?tab=notes`,
                type: 'Study Chapter',
                techId: slug
              })
            })

            // 3. Index Cheatsheets
            data.cheatsheet.forEach((item) => {
              items.push({
                title: item.command,
                subtitle: item.description,
                link: `/learn/${slug}?tab=cheatsheets`,
                type: 'Cheatsheet',
                techId: slug
              })
            })

            // 4. Index Projects
            data.projects.forEach((proj) => {
              items.push({
                title: proj.title,
                subtitle: proj.description,
                link: `/learn/${slug}?tab=projects`,
                type: 'Project',
                techId: slug
              })
            })

            // 5. Index Interviews
            data.interviews.forEach((item) => {
              items.push({
                title: item.question,
                subtitle: item.answer || 'Interview preparation question',
                link: `/learn/${slug}?tab=interviews`,
                type: 'Interview',
                techId: slug
              })
            })

            // 6. Index Resources sections
            data.resources.sections.forEach((section) => {
              section.resources.forEach((res) => {
                const tags = [res.type, res.difficulty, res.badge].filter(Boolean).join(' · ')
                items.push({
                  title: res.title,
                  subtitle: `${res.description}${tags ? ` · ${tags}` : ''}`,
                  link: `/learn/${slug}?tab=resources`,
                  type: 'Resource',
                  techId: slug
                })
              })
            })
          })

          setSearchIndex(items)
        } catch (error) {
          console.error('Failed to compile advanced search index:', error)
        } finally {
          setIsIndexing(false)
        }
      }

      buildIndex()
    }
  }, [isOpen, searchIndex.length, isIndexing])

  // Unique list of technologies in searchIndex for filtering
  const availableTechs = useMemo(() => {
    const techs = new Set<string>()
    searchIndex.forEach(item => {
      if (item.techId) techs.add(item.techId)
    })
    return Array.from(techs)
  }, [searchIndex])

  // Filter and highlight results
  const filteredResults = useMemo(() => {
    if (!query) return []

    return searchIndex.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
      
      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Roadmaps' && item.type === 'Roadmap') ||
        (selectedCategory === 'Chapters' && item.type === 'Study Chapter') ||
        (selectedCategory === 'Cheatsheets' && item.type === 'Cheatsheet') ||
        (selectedCategory === 'Projects' && item.type === 'Project') ||
        (selectedCategory === 'Interviews' && item.type === 'Interview') ||
        (selectedCategory === 'Resources' && item.type === 'Resource')

      const matchesTech = selectedTech === 'All' || item.techId === selectedTech

      return matchesQuery && matchesCategory && matchesTech
    })
  }, [searchIndex, query, selectedCategory, selectedTech])

  // Group filtered results
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    filteredResults.forEach((res) => {
      if (!groups[res.type]) {
        groups[res.type] = []
      }
      groups[res.type].push(res)
    })
    return groups
  }, [filteredResults])

  // Helper to highlight search query terms safely without dangerouslySetInnerHTML
  const HighlightText = ({ text, search }: { text: string; search: string }) => {
    if (!search.trim()) return <>{text}</>
    
    // Escape regex characters
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedSearch})`, 'gi')
    
    // Truncate text context around match if it's too long
    let displayText = text
    if (text.length > 180) {
      const matchIndex = text.toLowerCase().indexOf(search.toLowerCase())
      if (matchIndex > 60) {
        displayText = `...${text.substring(matchIndex - 50, matchIndex + 120)}...`
      } else {
        displayText = `${text.substring(0, 160)}...`
      }
    }

    const parts = displayText.split(regex)

    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} className="bg-accent-purple/20 text-accent-purple dark:text-accent-cyan dark:bg-accent-cyan/10 px-1 py-0.5 rounded font-semibold">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    )
  }

  const handleResultClick = (link: string) => {
    setIsOpen(false)
    navigate(link)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Roadmap':
        return <Layers className="w-4 h-4 text-accent-purple" />
      case 'Study Chapter':
        return <BookOpen className="w-4 h-4 text-accent-purple" />
      case 'Cheatsheet':
        return <Terminal className="w-4 h-4 text-accent-cyan" />
      case 'Project':
        return <Briefcase className="w-4 h-4 text-accent-emerald" />
      case 'Interview':
        return <HelpCircle className="w-4 h-4 text-accent-violet" />
      case 'Resource':
        return <Link2 className="w-4 h-4 text-accent-amber" />
      default:
        return <Search className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Clickable Search Input in Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-surface-950/60 hover:bg-surface-850 hover:border-accent-purple/30 text-text-muted hover:text-text-secondary text-sm transition-all focus:outline-none w-44 md:w-56 text-left cursor-pointer"
        aria-label="Search learning resources"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Search className="w-4 h-4 text-text-muted" />
        <span className="flex-1 text-xs">Search resources...</span>
        <kbd className="hidden sm:inline-block text-[10px] font-mono bg-surface-800 border border-black/[0.08] dark:border-white/[0.08] px-1.5 py-0.5 rounded text-text-muted">
          Ctrl+K
        </kbd>
      </button>

      {/* Floating Search Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 md:pt-20 px-4">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search learning resources"
            className="w-full max-w-2xl bg-surface-900 border border-black/[0.1] dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
          >
            {/* Input Header bar */}
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] px-4 py-3 bg-surface-950">
              <Search className="w-5 h-5 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roadmaps, chapters, cheatsheets, projects, interviews, resources..."
                className="flex-1 bg-transparent border-none focus:outline-none text-text-primary px-3 text-sm placeholder:text-text-muted h-9"
                role="combobox"
                aria-expanded={isOpen}
                aria-autocomplete="list"
                aria-controls="search-results-list"
                aria-label="Search query"
              />
              {isIndexing ? (
                <Loader2 className="w-4 h-4 text-accent-purple animate-spin shrink-0 mr-2" />
              ) : null}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-surface-800 text-text-muted hover:text-text-primary transition-all shrink-0"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Toolbar (Visible only when searching or indexing is complete) */}
            {searchIndex.length > 0 && query !== '' && (
              <div className="flex flex-wrap items-center gap-3 px-4 py-2 bg-surface-950/60 border-b border-black/[0.04] dark:border-white/[0.04] text-xs">
                <div className="flex items-center gap-1.5 text-text-secondary font-medium shrink-0">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filters:</span>
                </div>
                
                {/* Category Selector */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-surface-850 hover:bg-surface-800 border border-black/[0.06] dark:border-white/[0.06] px-2 py-1 rounded-lg text-text-primary focus:outline-none cursor-pointer"
                  aria-label="Filter by category"
                >
                  <option value="All">All Categories</option>
                  <option value="Roadmaps">Roadmaps</option>
                  <option value="Chapters">Study Chapters</option>
                  <option value="Cheatsheets">Cheatsheets</option>
                  <option value="Projects">Projects</option>
                  <option value="Interviews">Interviews</option>
                  <option value="Resources">Resources</option>
                </select>

                {/* Technology Selector */}
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="bg-surface-850 hover:bg-surface-800 border border-black/[0.06] dark:border-white/[0.06] px-2 py-1 rounded-lg text-text-primary focus:outline-none capitalize cursor-pointer"
                  aria-label="Filter by technology"
                >
                  <option value="All">All Technologies</option>
                  {availableTechs.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>

                {/* Match Counter */}
                <span className="ml-auto text-text-muted text-[11px]">
                  Found {filteredResults.length} matches
                </span>
              </div>
            )}

            {/* Results output list scroll */}
            <div 
              id="search-results-list"
              role="listbox"
              className="flex-1 overflow-y-auto p-4 space-y-6 max-h-[50vh]"
            >
              {isIndexing && searchIndex.length === 0 ? (
                <div className="text-center py-16 text-text-muted">
                  <Loader2 className="w-8 h-8 text-accent-purple animate-spin mx-auto mb-3" />
                  <p className="text-sm font-semibold">Compiling Advanced Search Index...</p>
                  <p className="text-xs text-text-muted/65 mt-1">This will only take a second...</p>
                </div>
              ) : query === '' ? (
                <div className="text-center py-12 text-text-muted">
                  <Search className="w-10 h-10 text-text-muted/40 mx-auto mb-3" />
                  <p className="text-sm">Type search query to search across StackForge Academy.</p>
                  <p className="text-xs text-text-muted/65 mt-1">Search indexes full-text content of notes, cheatsheets, projects, and interviews.</p>
                </div>
              ) : Object.keys(groupedResults).length === 0 ? (
                <div className="text-center py-12 text-text-muted">
                  <p className="text-sm font-semibold">No results match your criteria.</p>
                  <p className="text-xs text-text-muted/65 mt-1">Try adjusting keywords, categories, or filters.</p>
                </div>
              ) : (
                Object.entries(groupedResults).map(([groupName, items]) => (
                  <div key={groupName} className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-accent-purple px-1">
                      {groupName}s
                    </h4>
                    <div className="space-y-1">
                      {items.map((res, itemIdx) => (
                        <button
                          key={itemIdx}
                          role="option"
                          aria-selected="false"
                          onClick={() => handleResultClick(res.link)}
                          className="w-full text-left p-3 rounded-xl hover:bg-surface-950/60 border border-transparent hover:border-black/[0.04] dark:hover:border-white/[0.04] transition-all flex items-start gap-3.5 group cursor-pointer"
                        >
                          <span className="mt-0.5 shrink-0 bg-surface-850 p-1.5 rounded-lg border border-black/[0.03] dark:border-white/[0.03] group-hover:bg-accent-purple/10 transition-colors">
                            {getTypeIcon(res.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div 
                              className="font-semibold text-text-primary text-sm truncate group-hover:text-accent-purple transition-colors"
                            >
                              <HighlightText text={res.title} search={query} />
                            </div>
                            {res.subtitle && (
                              <div
                                className="text-xs text-text-muted truncate mt-0.5"
                              >
                                <HighlightText text={res.subtitle} search={query} />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Modal Footer helper */}
            <div className="bg-surface-950 border-t border-black/[0.06] dark:border-white/[0.06] px-4 py-2 flex justify-between items-center text-[10px] text-text-muted">
              <span>Press <kbd className="bg-surface-800 px-1 py-0.5 rounded border border-black/[0.06] dark:border-white/[0.06]">ESC</kbd> to close</span>
              <span>Search indexed dynamically offline</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
