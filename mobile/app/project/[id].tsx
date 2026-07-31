import React from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Spinner } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { FloatingElement } from '../../src/components/ui/FloatingElement'
import { useProjectDetail } from '../../src/hooks/useProjects'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft, CheckCircle2, Cpu } from 'lucide-react-native'

export default function ProjectDetailScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data: project, isLoading } = useProjectDetail(id as string)

  if (isLoading || !project) {
    return (
      <Canvas justifyContent="center" alignItems="center">
        <Spinner size="large" color="$primary" />
      </Canvas>
    )
  }

  return (
    <Canvas noSafeArea>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 32 }}>
        {/* Navigation Bar */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
          <Button
            size="$3"
            backgroundColor="$cardBg"
            borderColor="$cardBorder"
            borderWidth={1}
            color="$color"
            onPress={() => router.back()}
            icon={<ArrowLeft color="#94A3B8" size={18} />}
          >
            Back
          </Button>

          <YStack backgroundColor="#1E293B" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
            <Text color="$primary" fontWeight="700" fontSize={11}>
              {project.difficulty}
            </Text>
          </YStack>
        </XStack>

        {/* Project Title & Description */}
        <Text color="$color" fontSize={22} fontWeight="800" marginBottom="$2">
          {project.title}
        </Text>
        <Text color="$colorSecondary" fontSize={14} marginBottom="$5">
          {project.description}
        </Text>

        {/* Project Coach Advice Box */}
        <FloatingElement backgroundColor="#161E2E" borderColor="#1D4ED8" marginBottom="$5">
          <XStack space="$2" alignItems="center" marginBottom="$2">
            <Cpu color="#3B82F6" size={18} />
            <Text color="#3B82F6" fontWeight="800" fontSize={12} textTransform="uppercase">
              Project Coach Guidance
            </Text>
          </XStack>
          <Text color="$color" fontSize={13}>
            {project.projectCoachTip}
          </Text>
        </FloatingElement>

        {/* Requirements Checklist */}
        <YStack marginBottom="$5">
          <Text color="$color" fontWeight="800" fontSize={16} marginBottom="$3">
            Technical Requirements
          </Text>
          {project.requirements?.map((req: string, i: number) => (
            <Card key={i} marginBottom="$2" backgroundColor="$cardBg">
              <XStack space="$3" alignItems="flex-start">
                <CheckCircle2 color="#10B981" size={18} style={{ marginTop: 2 }} />
                <Text color="$color" fontSize={13} flex={1}>
                  {req}
                </Text>
              </XStack>
            </Card>
          ))}
        </YStack>

        {/* Rubric Breakdown */}
        <YStack marginBottom="$5">
          <Text color="$color" fontWeight="800" fontSize={16} marginBottom="$3">
            Evaluation Rubric Breakdown
          </Text>
          {Object.entries(project.rubric || {}).map(([key, item]: [string, any]) => (
            <Card key={key} marginBottom="$2">
              <XStack justifyContent="space-between" alignItems="center" marginBottom="$1">
                <Text color="$primary" fontWeight="700" fontSize={13} textTransform="capitalize">
                  {key}
                </Text>
                <Text color="$emerald" fontWeight="700" fontSize={12}>
                  {item.weight}% Weight
                </Text>
              </XStack>
              <Text color="$colorSecondary" fontSize={12}>
                {item.criteria}
              </Text>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </Canvas>
  )
}
