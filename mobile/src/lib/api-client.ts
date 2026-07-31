import { getAuthToken, getUserId } from './secure-store'

// Host configuration resolving local Next.js server on desktop / LAN / production
const API_BASE_URL = 'http://localhost:3000/api/mobile/v1'

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await getAuthToken()
  const userId = await getUserId()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  if (userId) {
    headers['x-user-id'] = userId
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    })

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}))
      throw new Error(errorBody.error || `API request failed with status ${res.status}`)
    }

    return (await res.json()) as T
  } catch (err: any) {
    console.error(`[API Client Error] ${endpoint}:`, err.message || err)
    throw err
  }
}
