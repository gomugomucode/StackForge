import React from 'react'
import { YStack } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'

export interface CanvasProps {
  children: React.ReactNode
  noSafeArea?: boolean
  [key: string]: any
}

// Level 0 Canvas Component (Deep Dark background, 100% Tamagui tokens)
export function Canvas({ children, noSafeArea = false, ...rest }: CanvasProps) {
  if (noSafeArea) {
    return (
      <YStack flex={1} backgroundColor="$bg" {...rest}>
        {children}
      </YStack>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#090D16' }}>
      <YStack flex={1} backgroundColor="$bg" paddingHorizontal="$4" {...rest}>
        {children}
      </YStack>
    </SafeAreaView>
  )
}
