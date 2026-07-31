import React from 'react'
import { YStack } from 'tamagui'

export interface FloatingElementProps {
  children: React.ReactNode
  [key: string]: any
}

// Level 2 Floating Element Component (Floating elevation, backdrop blur style, high zIndex)
export function FloatingElement({ children, ...rest }: FloatingElementProps) {
  return (
    <YStack
      backgroundColor="$floatingBg"
      borderColor="$cardBorder"
      borderWidth={1}
      borderRadius="$6"
      padding="$4"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 8 }}
      shadowOpacity={0.3}
      shadowRadius={12}
      elevation={8}
      {...rest}
    >
      {children}
    </YStack>
  )
}
