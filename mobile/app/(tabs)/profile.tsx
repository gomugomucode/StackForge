import React from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Progress as TamaguiProgress } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { AvatarBadge } from '../../src/components/ui/AvatarBadge'
import { useAuth } from '../../src/hooks/useAuth'
import { useDashboard } from '../../src/hooks/useDashboard'
import { LogOut, FileText } from 'lucide-react-native'

export default function ProfileScreen() {
  const { user, logout } = useAuth()
  const { data: dashboard } = useDashboard()

  return (
    <Canvas noSafeArea>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 32 }}>
        {/* User Card */}
        <Card marginBottom="$5" backgroundColor="#121826" borderColor="#1E293B">
          <XStack space="$4" alignItems="center">
            <AvatarBadge
              avatarUrl={user?.avatar}
              name={user?.name}
              initials={user?.initials}
              size={56}
            />
            <YStack flex={1}>
              <Text color="$color" fontSize={18} fontWeight="800">
                {user?.name || 'Developer'}
              </Text>
              <Text color="$colorMuted" fontSize={12}>
                {user?.email}
              </Text>
              <XStack space="$2" marginTop="$2" alignItems="center">
                <YStack backgroundColor="#1E293B" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                  <Text color="$primary" fontWeight="700" fontSize={10}>
                    {user?.plan || 'FREE'} PLAN
                  </Text>
                </YStack>
                {user?.githubUsername && (
                  <Text color="$colorSecondary" fontSize={11}>
                    @{user.githubUsername}
                  </Text>
                )}
              </XStack>
            </YStack>
          </XStack>
        </Card>

        {/* Hiring Readiness & ATS Score */}
        <YStack marginBottom="$5">
          <Text color="$color" fontWeight="800" fontSize={16} marginBottom="$3">
            Hiring Readiness & Resume ATS
          </Text>

          <Card backgroundColor="$cardBg" marginBottom="$3">
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
              <Text color="$color" fontWeight="700" fontSize={14}>
                Hiring Readiness Score
              </Text>
              <Text color="$emerald" fontWeight="800" fontSize={18}>
                {dashboard?.hiringReadinessScore || 78}%
              </Text>
            </XStack>
            <TamaguiProgress value={dashboard?.hiringReadinessScore || 78} height={8} backgroundColor="#1E293B">
              <TamaguiProgress.Indicator animation="bouncy" backgroundColor="$emerald" />
            </TamaguiProgress>
          </Card>

          <Card backgroundColor="$cardBg">
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
              <XStack space="$2" alignItems="center">
                <FileText color="#818CF8" size={18} />
                <Text color="$color" fontWeight="700" fontSize={14}>
                  ATS Resume Match Score
                </Text>
              </XStack>
              <Text color="$primary" fontWeight="800" fontSize={18}>
                85%
              </Text>
            </XStack>
            <Text color="$colorSecondary" fontSize={12}>
              Optimized for Senior React Native & Full-Stack Engineer roles.
            </Text>
          </Card>
        </YStack>

        {/* Skill Radar / Proficiencies */}
        <YStack marginBottom="$5">
          <Text color="$color" fontWeight="800" fontSize={16} marginBottom="$3">
            Skill Radar & Proficiencies
          </Text>
          <Card>
            {user?.skillProficiencies?.length ? (
              user.skillProficiencies.map((sp: { technology: string; score: number; confidence: string }, i: number) => (
                <YStack key={i} marginBottom="$3">
                  <XStack justifyContent="space-between" marginBottom="$1">
                    <Text color="$color" fontSize={13} fontWeight="600">
                      {sp.technology}
                    </Text>
                    <Text color="$colorMuted" fontSize={12}>
                      {sp.score}% ({sp.confidence})
                    </Text>
                  </XStack>
                  <TamaguiProgress value={sp.score} height={6} backgroundColor="#1E293B">
                    <TamaguiProgress.Indicator animation="bouncy" backgroundColor="$primary" />
                  </TamaguiProgress>
                </YStack>
              ))
            ) : (
              <YStack space="$2">
                <YStack>
                  <XStack justifyContent="space-between" marginBottom="$1">
                    <Text color="$color" fontSize={13} fontWeight="600">
                      TypeScript & React
                    </Text>
                    <Text color="$colorMuted" fontSize={12}>
                      88% (Advanced)
                    </Text>
                  </XStack>
                  <TamaguiProgress value={88} height={6} backgroundColor="#1E293B">
                    <TamaguiProgress.Indicator animation="bouncy" backgroundColor="$primary" />
                  </TamaguiProgress>
                </YStack>
                <YStack>
                  <XStack justifyContent="space-between" marginBottom="$1">
                    <Text color="$color" fontSize={13} fontWeight="600">
                      Next.js & Prisma APIs
                    </Text>
                    <Text color="$colorMuted" fontSize={12}>
                      82% (Intermediate)
                    </Text>
                  </XStack>
                  <TamaguiProgress value={82} height={6} backgroundColor="#1E293B">
                    <TamaguiProgress.Indicator animation="bouncy" backgroundColor="$primary" />
                  </TamaguiProgress>
                </YStack>
              </YStack>
            )}
          </Card>
        </YStack>

        {/* Session Logout Button */}
        <Button
          backgroundColor="#271518"
          borderColor="#4C1D24"
          borderWidth={1}
          color="#F43F5E"
          fontWeight="700"
          onPress={() => logout()}
          icon={<LogOut color="#F43F5E" size={16} />}
        >
          Sign Out of StackForge Session
        </Button>
      </ScrollView>
    </Canvas>
  )
}
