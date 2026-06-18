'use client';

import { useState, useMemo } from 'react'
import { articles, articleCategories } from '../../data/articles'
import { SectionHeader } from '../ui/SectionHeader'
import { SearchInput } from '../ui/SearchInput'
import { ArticleCard } from '@/components/home/LatestArticles'
import { Button } from '../ui/Button'

const ARTICLES_PER_PAGE = 6

export function BlogContent() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === cat
                    ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/30'
                    : 'bg-surface-800 text-text-secondary border border-surface-600 hover:border-accent-purple/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {paginated.length === 0 ? (
          <p className="text-center text-text-muted py-12">No articles found matching your search.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginated.map((article, i) => (
                <ArticleCard key={article.id} article={article} featured={page === 1 && i === 0} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  ariaLabel="Previous page"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    aria-current={p === page ? 'page' : undefined}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      p === page
                        ? 'bg-accent-purple text-white'
                        : 'bg-surface-800 text-text-secondary border border-surface-600 hover:border-accent-purple/30'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  ariaLabel="Next page"
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
