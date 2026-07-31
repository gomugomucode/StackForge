import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '../lib/api-client'
import { ProjectDetail } from '../types/mobile'

export function useProjects(difficulty?: string) {
  return useQuery<{ projects: any[]; externalProjects: any[] }>({
    queryKey: ['projects', difficulty],
    queryFn: async () => {
      const param = difficulty ? `?difficulty=${difficulty}` : ''
      return fetchApi<{ projects: any[]; externalProjects: any[] }>(`/projects${param}`)
    },
  })
}

export function useProjectDetail(id: string) {
  return useQuery<ProjectDetail>({
    queryKey: ['project', id],
    queryFn: async () => {
      return fetchApi<ProjectDetail>(`/projects?id=${id}`)
    },
    enabled: Boolean(id),
  })
}
