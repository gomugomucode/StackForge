import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '../lib/api-client'
import { DashboardData } from '../types/mobile'

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ['dashboard', 'intelligence'],
    queryFn: async () => {
      return fetchApi<DashboardData>('/dashboard')
    },
    refetchInterval: 1000 * 60 * 2, // Auto-refresh intelligence every 2 minutes
  })
}
