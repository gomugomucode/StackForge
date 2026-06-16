"use client";
import { useState, useMemo, useEffect } from 'react'
import { Download, ExternalLink, Inbox } from 'lucide-react'
import type { Resource } from '@/lib/data/resources'
import { resources, resourceCategories, resourceTypes } from '@/lib/data/resources'
import { getIcon } from '@/lib/core/utils/icons'
import { SectionHeader, Card } from '../ui/SectionHeader'
import { SearchInput } from '../ui/SearchInput'
import { Button } from '../ui/Button'
import { SkeletonCard } from '../ui/SkeletonLoader'

const typeLabels: Record<string, string> = {
  pdf: 'PDF',
  cheatsheet: 'Cheat Sheet',
  tool: 'Tool',
  download: 'Download',
}

const typeColors: Record<string, string> = {
  pdf: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  cheatsheet: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  tool: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  download: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
}

interface HighlightTextProps {
  text: string
  search: string
}

function HighlightText({ text, search }: HighlightTextProps) {
  if (!search) return <>{text}</>
  const parts = text.split(new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <mark key={i} className="bg-accent-purple/20 text-accent-purple font-medium rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

function ResourceCard({ resource, searchQuery = '' }: { resource: Resource; searchQuery?: string }) {
  const Icon = getIcon(resource.icon)
  const isTool = resource.type === 'tool'

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-surface-800 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent-purple" />
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${typeColors[resource.type]}`}>
          {typeLabels[resource.type]}
        </span>
      </div>
      <h3 className="font-bold text-text-primary mb-2">
        <HighlightText text={resource.title} search={searchQuery} />
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">
        <HighlightText text={resource.description} search={searchQuery} />
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div className="text-xs text-text-muted">
          {resource.downloads && <span>{resource.downloads} downloads</span>}
          {resource.fileSize && <span className="ml-2 font-mono">{resource.fileSize}</span>}
        </div>
        <Button variant="ghost" size="sm" ariaLabel={isTool ? 'Open tool' : 'Download resource'}>
          {isTool ? (
            <>
              Open <ExternalLink className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Download <Download className="w-3.5 h-3.5" />
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}

export function ResourcesContent() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All')
  const [isLoading, setIsLoading] = useState(false)

  // Simulate loading state on filters/search change
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 350)
    return () => clearTimeout(timer)
  }, [search, category, type])

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch =
        search === '' ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || r.category === category
      const matchesType = type === 'All' || r.type === type
      return matchesSearch && matchesCategory && matchesType
    })
  }, [search, category, type])

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Resources"
          title="Free Learning"
          highlight="Resources & Tools"
          description="Download PDFs, cheat sheets, and use developer tools — all completely free."
        />

        <div className="max-w-5xl mx-auto mb-10">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search resources..."
            className="mb-6"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {resourceCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/30'
                      : 'bg-surface-800 text-text-secondary border border-black/[0.06] dark:border-white/[0.06] hover:border-accent-purple/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Filter by type">
            {resourceTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                  type === t
                    ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
                    : 'bg-surface-800 text-text-secondary border border-black/[0.06] dark:border-white/[0.06] hover:border-accent-cyan/30'
                }`}
              >
                {t === 'All' ? 'All Types' : typeLabels[t] ?? t}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 px-4 glass-card rounded-2xl max-w-md mx-auto">
            <Inbox className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-1">No resources found</h3>
            <p className="text-text-secondary text-sm">
              We couldn&apos;t find any resources matching your filters. Try checking a different search term or filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} searchQuery={search} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
