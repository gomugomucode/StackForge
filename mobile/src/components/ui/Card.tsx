import React from 'react'
import { YStack } from 'tamagui'

export interface CardProps {
  children: React.ReactNode
  interactive?: boolean
  onPress?: () => void
  [key: string]: any
}

// Level 1 Card Component (Card background, 1px border, 8pt grid padding, press feedback)
export function Card({ children, interactive = false, onPress, ...rest }: CardProps) {
  return (
    <YStack
      backgroundColor="$cardBg"
      borderColor="$cardBorder"
      borderWidth={1}
      borderRadius="$4"
      padding="$4"
      onPress={onPress}
      pressStyle={interactive ? { scale: 0.98, opacity: 0.9 } : undefined}
      {...rest}
    >
      {children}
    </YStack>
  )
}
