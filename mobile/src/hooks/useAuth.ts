import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchApi } from '../lib/api-client'
import { getUserId, saveUserId, removeAuthToken } from '../lib/secure-store'
import { UserSession } from '../types/mobile'

export function useAuth() {
  const queryClient = useQueryClient()

  const sessionQuery = useQuery<UserSession>({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      return fetchApi<UserSession>('/auth/session')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await removeAuthToken()
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'session'], null)
      queryClient.invalidateQueries()
    },
  })

  const loginWithId = async (id: string) => {
    await saveUserId(id)
    queryClient.invalidateQueries()
  }

  return {
    user: sessionQuery.data,
    isLoading: sessionQuery.isLoading,
    isError: sessionQuery.isError,
    logout: logoutMutation.mutateAsync,
    loginWithId,
  }
}
