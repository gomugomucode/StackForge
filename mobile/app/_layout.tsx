import React from 'react'
import { Stack } from 'expo-router'
import { TamaguiProvider, Theme } from 'tamagui'
import { QueryClientProvider } from '@tanstack/react-query'
import tamaguiConfig from '../src/theme/tamagui.config'
import { queryClient } from '../src/lib/query-client'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
        <Theme name="dark">
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#090D16' },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="article/[slug]" options={{ headerShown: false, presentation: 'card' }} />
            <Stack.Screen name="project/[id]" options={{ headerShown: false, presentation: 'modal' }} />
          </Stack>
        </Theme>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}
