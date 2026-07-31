import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const AUTH_TOKEN_KEY = 'stackforge_auth_session_token'
const USER_ID_KEY = 'stackforge_user_id'

export async function saveAuthToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    return
  }
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token)
}

export async function getAuthToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }
  return await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
}

export async function removeAuthToken(): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
    return
  }
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY)
  await SecureStore.deleteItemAsync(USER_ID_KEY)
}

export async function saveUserId(userId: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(USER_ID_KEY, userId)
    return
  }
  await SecureStore.setItemAsync(USER_ID_KEY, userId)
}

export async function getUserId(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(USER_ID_KEY)
  }
  return await SecureStore.getItemAsync(USER_ID_KEY)
}
