import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { YStack, XStack, Text, Button, Spinner, Progress as TamaguiProgress } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { FloatingElement } from '../../src/components/ui/FloatingElement'
import { AvatarBadge } from '../../src/components/ui/AvatarBadge'
import { useAuth } from '../../src/hooks/useAuth'
import { useDashboard } from '../../src/hooks/useDashboard'
import { Zap, Flame, Award, ArrowRight, Play, AlertTriangle, Github, Sparkles } from 'lucide-react-native'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const { data: dashboard, isLoading, refetch, isRefetching } = useDashboard()

  if (isLoading || !dashboard) {
    return (
      <Canvas justifyContent="center" alignItems="center">
        <Spinner size="large" color="$primary" />
        <Text color="$colorSecondary" marginTop="$4">
          Personalizing your developer experience...
        </Text>
      </Canvas>
    )
  }

  const actionNext = dashboard.actionNext

  return (
    <Canvas noSafeArea>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#6366F1" />}
      >
        {/* Header Bar */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$5">
          <XStack alignItems="center" space="$3">
            <AvatarBadge
              avatarUrl={user?.avatar}
              name={user?.name}
              initials={user?.initials}
              size={42}
            />
            <YStack>
              <Text color="$color" fontWeight="700" fontSize={16}>
                {user?.name || 'Developer'}
              </Text>
              <Text color="$colorMuted" fontSize={12}>
                {user?.plan || 'PRO'} • Level {user?.profile?.level || 1}
              </Text>
            </YStack>
          </XStack>

          {/* Streak Pill */}
          <XStack
            backgroundColor="#271E10"
            borderColor="#523A14"
            borderWidth={1}
            borderRadius="$full"
            paddingHorizontal="$3"
            paddingVertical="$2"
            alignItems="center"
            space="$2"
          >
            <Flame color="#F59E0B" size={16} />
            <Text color="#F59E0B" fontWeight="800" fontSize={13}>
              {dashboard.streak.current} Days
            </Text>
          </XStack>
        </XStack>

        {/* HERO CARD: "What should I do next?" */}
        <FloatingElement marginBottom="$5" backgroundColor="#1A1D36" borderColor="#3730A3">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
            <XStack alignItems="center" space="$2">
              <Sparkles color="#6366F1" size={18} />
              <Text color="#818CF8" fontWeight="700" fontSize={12} letterSpacing={0.8} textTransform="uppercase">
                WHAT SHOULD I DO NEXT?
              </Text>
            </XStack>
            <Text color="$colorMuted" fontSize={11}>
              Personalized AI Priority
            </Text>
          </XStack>

          <Text color="$color" fontSize={18} fontWeight="800" marginTop="$1">
            {actionNext.title}
          </Text>
          <Text color="$colorSecondary" fontSize={13} marginTop="$1" marginBottom="$4">
            {actionNext.subtitle}
          </Text>

          <Button
            backgroundColor="$primary"
            color="#FFFFFF"
            fontWeight="700"
            borderRadius="$3"
            onPress={() => {
              if (actionNext.type === 'SPACED_REPETITION') {
                router.push('/learn')
              } else {
                router.push('/learn')
              }
            }}
            iconAfter={<ArrowRight color="#FFFFFF" size={16} />}
          >
            Start Immediate Session
          </Button>
        </FloatingElement>

        {/* Daily Mission & Weekly Goal */}
        <XStack space="$3" marginBottom="$5">
          <Card flex={1} backgroundColor="$cardBg">
            <XStack alignItems="center" space="$2" marginBottom="$2">
              <Zap color="#10B981" size={16} />
              <Text color="$color" fontWeight="700" fontSize={13}>
                Daily Mission
              </Text>
            </XStack>
            <Text color="$colorSecondary" fontSize={12} numberOfLines={2}>
              {dashboard.dailyMission.title}
            </Text>
            <YStack marginTop="$3">
              <TamaguiProgress value={dashboard.dailyMission.progress} height={6} backgroundColor="#1E293B">
                <TamaguiProgress.Indicator animation="bouncy" backgroundColor="$emerald" />
              </TamaguiProgress>
              <XStack justifyContent="space-between" marginTop="$1">
                <Text color="$colorMuted" fontSize={10}>
                  {dashboard.dailyMission.progress}% Complete
                </Text>
                <Text color="$emerald" fontWeight="700" fontSize={10}>
                  +{dashboard.dailyMission.xpReward} XP
                </Text>
              </XStack>
            </YStack>
          </Card>

          <Card flex={1} backgroundColor="$cardBg">
            <XStack alignItems="center" space="$2" marginBottom="$2">
              <Award color="#6366F1" size={16} />
              <Text color="$color" fontWeight="700" fontSize={13}>
                Weekly Goal
              </Text>
            </XStack>
            <Text color="$colorSecondary" fontSize={12}>
              {dashboard.weeklyGoal.completedLessons}/{dashboard.weeklyGoal.targetLessons} Lessons Done
            </Text>
            <YStack marginTop="$3">
              <TamaguiProgress value={(dashboard.weeklyGoal.completedLessons / dashboard.weeklyGoal.targetLessons) * 100} height={6} backgroundColor="#1E293B">
                <TamaguiProgress.Indicator animation="bouncy" backgroundColor="$primary" />
              </TamaguiProgress>
              <XStack justifyContent="space-between" marginTop="$1">
                <Text color="$colorMuted" fontSize={10}>
                  {dashboard.weeklyGoal.currentHours} / {dashboard.weeklyGoal.targetHours} Hours
                </Text>
                <Text color="$primary" fontWeight="700" fontSize={10}>
                  Active
                </Text>
              </XStack>
            </YStack>
          </Card>
        </XStack>

        {/* Continue Learning Section */}
        {dashboard.continueLearning && (
          <YStack marginBottom="$5">
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
              <Text color="$color" fontWeight="800" fontSize={16}>
                Continue Learning
              </Text>
              <Text color="$primary" fontWeight="600" fontSize={13} onPress={() => router.push('/learn')}>
                View Roadmap
              </Text>
            </XStack>

            <Card interactive onPress={() => router.push('/learn')}>
              <XStack justifyContent="space-between" alignItems="flex-start">
                <YStack flex={1} paddingRight="$3">
                  <XStack space="$2" alignItems="center" marginBottom="$1">
                    <Text color="$primary" fontWeight="700" fontSize={11} textTransform="uppercase">
                      {dashboard.continueLearning.technology}
                    </Text>
                    <Text color="$colorMuted" fontSize={11}>•</Text>
                    <Text color="$colorMuted" fontSize={11}>
                      {dashboard.continueLearning.difficulty}
                    </Text>
                  </XStack>
                  <Text color="$color" fontWeight="700" fontSize={15}>
                    {dashboard.continueLearning.title}
                  </Text>
                </YStack>
                <YStack
                  backgroundColor="$primary"
                  width={36}
                  height={36}
                  borderRadius={18}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Play color="#FFFFFF" size={16} fill="#FFFFFF" />
                </YStack>
              </XStack>
            </Card>
          </YStack>
        )}

        {/* Weak Skills Alert */}
        {dashboard.weakSkills.length > 0 && (
          <YStack marginBottom="$5">
            <Text color="$color" fontWeight="800" fontSize={16} marginBottom="$3">
              Weak Skills Attention
            </Text>
            {dashboard.weakSkills.map((skill: { technology: string; score: number; confidence: string }, i: number) => (
              <Card key={i} marginBottom="$2" backgroundColor="#1F151B" borderColor="#4C1D24">
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack space="$3" alignItems="center">
                    <AlertTriangle color="#F43F5E" size={18} />
                    <YStack>
                      <Text color="$color" fontWeight="700" fontSize={14}>
                        {skill.technology}
                      </Text>
                      <Text color="#F87171" fontSize={12}>
                        Proficiency Score: {skill.score}% ({skill.confidence})
                      </Text>
                    </YStack>
                  </XStack>
                  <Button size="$2" backgroundColor="#F43F5E" color="#FFFFFF" fontWeight="700" onPress={() => router.push('/learn')}>
                    Practice
                  </Button>
                </XStack>
              </Card>
            ))}
          </YStack>
        )}

        {/* Hiring Readiness & GitHub Activity */}
        <YStack marginBottom="$5">
          <Text color="$color" fontWeight="800" fontSize={16} marginBottom="$3">
            Hiring Readiness & GitHub Activity
          </Text>
          <Card backgroundColor="$cardBg">
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
              <Text color="$colorSecondary" fontSize={13}>
                Hiring Index Score
              </Text>
              <Text color="$emerald" fontWeight="800" fontSize={18}>
                {dashboard.hiringReadinessScore} / 100
              </Text>
            </XStack>

            <TamaguiProgress value={dashboard.hiringReadinessScore} height={8} backgroundColor="#1E293B" marginBottom="$3">
              <TamaguiProgress.Indicator animation="bouncy" backgroundColor="$emerald" />
            </TamaguiProgress>

            {dashboard.githubActivity && (
              <XStack
                backgroundColor="#0F172A"
                padding="$3"
                borderRadius="$3"
                alignItems="center"
                justifyContent="space-between"
              >
                <XStack space="$2" alignItems="center">
                  <Github color="#94A3B8" size={18} />
                  <Text color="$color" fontSize={12} fontWeight="600">
                    @{dashboard.githubActivity.username}
                  </Text>
                </XStack>
                <Text color="$colorSecondary" fontSize={12}>
                  {dashboard.githubActivity.totalCommits} commits • {dashboard.githubActivity.publicRepos} repos
                </Text>
              </XStack>
            )}
          </Card>
        </YStack>
      </ScrollView>
    </Canvas>
  )
}
