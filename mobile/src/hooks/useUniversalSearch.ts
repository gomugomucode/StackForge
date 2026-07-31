import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchApi } from '../lib/api-client'
import { GroundedAiResponse } from '../types/mobile'

export function useUniversalSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      return fetchApi<any>(`/search?q=${encodeURIComponent(query)}`)
    },
    enabled: query.length >= 2,
  })
}

export function useGroundedAi() {
  return useMutation<GroundedAiResponse, Error, { prompt: string; context?: any }>({
    mutationFn: async (payload: { prompt: string; context?: any }) => {
      return fetchApi<GroundedAiResponse>('/ai', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    },
  })
}
