"use client";
import { useState, useMemo, useEffect } from 'react'
import { articles, articleCategories } from '@/lib/data/articles'
import { SectionHeader } from '../ui/SectionHeader'
import { SearchInput } from '../ui/SearchInput'
import { ArticleCard } from '../home/LatestArticles'
import { Button } from '../ui/Button'
import { SkeletonArticle } from '../ui/SkeletonLoader'
import { Inbox } from 'lucide-react'

const ARTICLES_PER_PAGE = 6

export function BlogContent() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Simulate loading state on search/category change
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 350)
    return () => clearTimeout(timer)
  }, [search, category])

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        search === '' ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        a.author.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || a.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE)

  const handleCategoryChange = (cat: string) => {
    setCategory(cat)
    setPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const renderPaginationRange = () => {
    const range: (number | string)[] = []
    const siblingCount = 1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - siblingCount && i <= page + siblingCount)
      ) {
        range.push(i)
      } else if (
        i === page - siblingCount - 1 ||
        i === page + siblingCount + 1
      ) {
        range.push('...')
      }
    }
    return range.filter((v, i, a) => v !== '...' || a[i - 1] !== '...')
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Blog"
          title="Articles"
          highlight="& Tutorials"
          description="Deep dives, tutorials, and insights to help you level up your development skills."
        />

        <div className="max-w-5xl mx-auto mb-10">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Search articles..."
            className="mb-6"
          />

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {articleCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonArticle key={i} />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-16 px-4 glass-card rounded-2xl max-w-md mx-auto">
            <Inbox className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-1">No articles found</h3>
            <p className="text-text-secondary text-sm">
              We couldn&apos;t find any articles matching your search query. Try checking for typos or searching a different term.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginated.map((article, i) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  featured={page === 1 && i === 0} 
                  searchQuery={search}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  ariaLabel="Previous page"
                  className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                >
                  Previous
                </Button>
                {renderPaginationRange().map((p, index) => {
                  if (p === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-text-muted select-none">
                        &bull;&bull;&bull;
                      </span>
                    )
                  }
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p as number)}
                      aria-current={p === page ? 'page' : undefined}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        p === page
                          ? 'bg-accent-purple text-white'
                          : 'bg-surface-800 text-text-secondary border border-black/[0.06] dark:border-white/[0.06] hover:border-accent-purple/30'
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  ariaLabel="Next page"
                  className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                >
                  Next
                </Button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  )
}
