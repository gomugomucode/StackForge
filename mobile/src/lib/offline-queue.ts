import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchApi } from './api-client'

export interface QueuedMutation {
  id: string
  endpoint: string
  method: 'POST' | 'PUT' | 'DELETE'
  payload: any
  timestamp: number
}

const OFFLINE_QUEUE_KEY = 'stackforge_offline_mutation_queue'

export async function getOfflineQueue(): Promise<QueuedMutation[]> {
  try {
    const raw = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('Failed to read offline queue:', err)
    return []
  }
}

export async function enqueueMutation(endpoint: string, method: 'POST' | 'PUT' | 'DELETE', payload: any): Promise<void> {
  const queue = await getOfflineQueue()
  const newMutation: QueuedMutation = {
    id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    endpoint,
    method,
    payload,
    timestamp: Date.now(),
  }
  queue.push(newMutation)
  await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue))
}

export async function flushOfflineQueue(): Promise<{ syncedCount: number; errors: number }> {
  const queue = await getOfflineQueue()
  if (queue.length === 0) return { syncedCount: 0, errors: 0 }

  let syncedCount = 0
  let errors = 0
  const remainingQueue: QueuedMutation[] = []

  for (const item of queue) {
    try {
      await fetchApi(item.endpoint, {
        method: item.method,
        body: JSON.stringify(item.payload),
      })
      syncedCount++
    } catch (err) {
      console.error(`Offline sync failed for item ${item.id}:`, err)
      errors++
      remainingQueue.push(item)
    }
  }

  await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(remainingQueue))
  return { syncedCount, errors }
}
