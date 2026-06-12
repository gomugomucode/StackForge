import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Layers, BookOpen, Terminal, Briefcase, HelpCircle } from 'lucide-react'
import { getTechData, getAllTechnologies } from '../../data/db'

interface SearchResult {
  title: string
  subtitle?: string
  link: string
  type: 'Roadmap' | 'Study Chapter' | 'Cheatsheet' | 'Project' | 'Interview'
}

export function SearchSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

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
    };
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
    }
  }, [isOpen])

  // Aggregate indices for searching
  const searchIndex = useMemo(() => {
    const items: SearchResult[] = []
    const slugs = getAllTechnologies()

    slugs.forEach((slug) => {
      const data = getTechData(slug)
      if (!data) return

      const techTitle = data.roadmap.overview.title

      // 1. Index Roadmap / Tech overview
      items.push({
        title: `${techTitle} Roadmap`,
        subtitle: data.roadmap.overview.description,
        link: `/learn/${slug}?tab=roadmap`,
        type: 'Roadmap'
      })

      // 2. Index Notes chapters
      data.notes.forEach((ch) => {
        items.push({
          title: ch.title,
          subtitle: `${techTitle} &bull; ${ch.content.substring(0, 100)}...`,
          link: `/learn/${slug}?tab=notes`,
          type: 'Study Chapter'
        })
      })

      // 3. Index Cheatsheets
      data.cheatsheet.forEach((item) => {
        items.push({
          title: item.command,
          subtitle: `${techTitle} &bull; ${item.description}`,
          link: `/learn/${slug}?tab=cheatsheets`,
          type: 'Cheatsheet'
        })
      })

      // 4. Index Projects
      data.projects.forEach((proj) => {
        items.push({
          title: proj.title,
          subtitle: `${techTitle} &bull; ${proj.description}`,
          link: `/learn/${slug}?tab=projects`,
          type: 'Project'
        })
      })

      // 5. Index Interviews
      data.interviews.forEach((item) => {
        items.push({
          title: item.question,
          subtitle: `${techTitle} &bull; Interview preparation`,
          link: `/learn/${slug}?tab=interviews`,
          type: 'Interview'
        })
      })
    })

    return items
  }, [])

  // Filter and group results
  const groupedResults = useMemo(() => {
    if (!query) return {}

    const filtered = searchIndex.filter((item) => {
      return (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
      )
    })

    const groups: Record<string, SearchResult[]> = {}
    filtered.forEach((res) => {
      if (!groups[res.type]) {
        groups[res.type] = []
      }
      groups[res.type].push(res)
    })

    return groups
  }, [searchIndex, query])

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
      default:
        return <Search className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Clickable Search Input in Navbar / Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-surface-950/60 hover:bg-surface-850 hover:border-accent-purple/30 text-text-muted hover:text-text-secondary text-sm transition-all focus:outline-none w-44 md:w-56 text-left cursor-pointer"
        aria-label="Search learning resources"
      >
        <Search className="w-4 h-4 text-text-muted" />
        <span className="flex-1 text-xs">Search resources...</span>
        <kbd className="hidden sm:inline-block text-[10px] font-mono bg-surface-800 border border-black/[0.08] dark:border-white/[0.08] px-1.5 py-0.5 rounded text-text-muted">
          Ctrl+K
        </kbd>
      </button>

      {/* Floating Search Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div
            ref={modalRef}
            className="w-full max-w-2xl bg-surface-900 border border-black/[0.1] dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Input Header bar */}
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] px-4 py-3 bg-surface-950">
              <Search className="w-5 h-5 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roadmaps, notes, cheatsheets, projects..."
                className="flex-1 bg-transparent border-none focus:outline-none text-text-primary px-3 text-sm placeholder:text-text-muted h-9"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-surface-800 text-text-muted hover:text-text-primary transition-all shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results output list scroll */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 max-h-[50vh]">
              {query === '' ? (
                <div className="text-center py-12 text-text-muted">
                  <Search className="w-10 h-10 text-text-muted/40 mx-auto mb-3" />
                  <p className="text-sm">Type search query to search across StackForge Academy.</p>
                  <p className="text-xs text-text-muted/65 mt-1">E.g., Try typing "JavaScript", "React Hooks", "Docker" or "VPC"</p>
                </div>
              ) : Object.keys(groupedResults).length === 0 ? (
                <div className="text-center py-12 text-text-muted">
                  <p className="text-sm font-semibold">No results match your criteria.</p>
                  <p className="text-xs text-text-muted/65 mt-1">Try adjusting keywords or spellings.</p>
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
                          onClick={() => handleResultClick(res.link)}
                          className="w-full text-left p-3 rounded-xl hover:bg-surface-950/60 border border-transparent hover:border-black/[0.04] dark:hover:border-white/[0.04] transition-all flex items-start gap-3.5 group cursor-pointer"
                        >
                          <span className="mt-0.5 shrink-0 bg-surface-850 p-1.5 rounded-lg border border-black/[0.03] dark:border-white/[0.03] group-hover:bg-accent-purple/10 transition-colors">
                            {getTypeIcon(res.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-text-primary text-sm truncate group-hover:text-accent-purple transition-colors">
                              {res.title}
                            </div>
                            {res.subtitle && (
                              <div
                                className="text-xs text-text-muted truncate mt-0.5"
                                dangerouslySetInnerHTML={{ __html: res.subtitle }}
                              />
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
              <span>Search indexed dynamically</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
