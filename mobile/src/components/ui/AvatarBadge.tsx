import React from 'react'
import { XStack, Text, Image, YStack } from 'tamagui'

export interface AvatarBadgeProps {
  avatarUrl?: string | null
  name?: string | null
  initials?: string
  size?: number
  showVerifiedBadge?: boolean
}

export function AvatarBadge({
  avatarUrl,
  name,
  initials = 'SF',
  size = 44,
  showVerifiedBadge = true,
}: AvatarBadgeProps) {
  const calculatedInitials = initials || (name ? name.substring(0, 2).toUpperCase() : 'SF')

  return (
    <XStack position="relative" alignItems="center" justifyContent="center">
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          width={size}
          height={size}
          borderRadius={size / 2}
          backgroundColor="$cardBorder"
        />
      ) : (
        <YStack
          width={size}
          height={size}
          borderRadius={size / 2}
          backgroundColor="$primary"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            color="#FFFFFF"
            fontWeight="700"
            fontSize={size * 0.38}
            letterSpacing={0.5}
          >
            {calculatedInitials}
          </Text>
        </YStack>
      )}

      {showVerifiedBadge && (
        <YStack
          position="absolute"
          bottom={-2}
          right={-2}
          width={14}
          height={14}
          borderRadius={7}
          backgroundColor="$emerald"
          borderWidth={2}
          borderColor="$bg"
        />
      )}
    </XStack>
  )
}
