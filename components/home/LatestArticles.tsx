import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '@/lib/data/articles'
import { articles } from '@/lib/data/articles'
import { SectionHeader } from '../ui/SectionHeader'
import { useScrollAnimation } from '@/lib/core/hooks/useScrollAnimation'

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

interface ArticleCardProps {
  article: Article
  featured?: boolean
  searchQuery?: string
}

export function ArticleCard({ article, featured = false, searchQuery = '' }: ArticleCardProps) {
  return (
    <article
      className={`group rounded-2xl overflow-hidden bg-surface-950/80 border border-black/[0.06] dark:border-white/[0.06] hover:border-accent-purple/40 hover:bg-surface-850 hover:shadow-xl dark:hover:shadow-accent-purple/5 transition-all duration-300 hover:-translate-y-1 ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
      }`}
    >
      <div className={`overflow-hidden ${featured ? 'h-full min-h-[200px]' : 'aspect-video'}`}>
        <img
          src={article.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col">
        <span className="inline-block w-fit text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20 mb-3">
          {article.category}
        </span>
        <h3 className="font-bold text-text-primary mb-2 group-hover:text-accent-purple transition-colors line-clamp-2">
          <HighlightText text={article.title} search={searchQuery} />
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          <HighlightText text={article.excerpt} search={searchQuery} />
        </p>
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-3">
            <span>{article.author}</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-accent-purple font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Read
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  )
}

export function LatestArticles() {
  const { ref, isVisible } = useScrollAnimation()
  const latest = articles.slice(0, 4)

  return (
    <section ref={ref} className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="From the Blog"
          title="Latest Articles"
          highlight="& Tutorials"
          description="Deep dives, tutorials, and insights from our editorial team — level up your knowledge."
        />

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {latest.map((article, i) => (
            <ArticleCard key={article.id} article={article} featured={i === 0} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-accent-purple font-semibold hover:text-accent-violet transition-colors"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
