import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '../lib/api-client'
import { ExternalArticle } from '../types/mobile'

interface ArticlesResponse {
  articles: ExternalArticle[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  availableSources: string[]
}

export function useArticles(source?: string, query?: string) {
  return useQuery<ArticlesResponse>({
    queryKey: ['articles', { source, query }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (source && source !== 'ALL') params.append('source', source)
      if (query) params.append('query', query)

      return fetchApi<ArticlesResponse>(`/articles?${params.toString()}`)
    },
  })
}

export function useArticleDetail(slug: string) {
  return useQuery<ExternalArticle>({
    queryKey: ['article', slug],
    queryFn: async () => {
      return fetchApi<ExternalArticle>(`/articles?slug=${slug}`)
    },
    enabled: Boolean(slug),
  })
}
