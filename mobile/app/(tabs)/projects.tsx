import { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Spinner } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { useProjects } from '../../src/hooks/useProjects'
import { FolderGit2, ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react-native'
import { useRouter } from 'expo-router'

export default function ProjectsScreen() {
  const router = useRouter()
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(undefined)

  const { data, isLoading } = useProjects(selectedDifficulty)

  const difficulties = ['ALL', 'Beginner', 'Intermediate', 'Advanced']

  return (
    <Canvas noSafeArea>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 32 }}>
        {/* Header */}
        <YStack marginBottom="$4">
          <Text color="$color" fontSize={24} fontWeight="800">
            Real Developer Projects
          </Text>
          <Text color="$colorSecondary" fontSize={13} marginTop="$1">
            Build production-grade applications with full architectural rubrics and Project Coach analysis.
          </Text>
        </YStack>

        {/* Filter Pills */}
        <XStack space="$2" marginBottom="$4">
          {difficulties.map((diff) => {
            const active = (diff === 'ALL' && !selectedDifficulty) || selectedDifficulty === diff
            return (
              <Button
                key={diff}
                size="$2"
                backgroundColor={active ? '$primary' : '$cardBg'}
                borderColor="$cardBorder"
                borderWidth={1}
                color={active ? '#FFFFFF' : '$colorSecondary'}
                fontWeight={active ? '700' : '400'}
                onPress={() => setSelectedDifficulty(diff === 'ALL' ? undefined : diff)}
              >
                {diff}
              </Button>
            )
          })}
        </XStack>

        {isLoading ? (
          <YStack height={200} justifyContent="center" alignItems="center">
            <Spinner size="large" color="$primary" />
          </YStack>
        ) : (
          <YStack space="$3">
            {data?.projects?.map((proj: any) => (
              <Card
                key={proj.id}
                interactive
                onPress={() => router.push(`/project/${proj.id}`)}
              >
                <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
                  <XStack space="$2" alignItems="center">
                    <FolderGit2 color="#6366F1" size={18} />
                    <Text color="$color" fontWeight="800" fontSize={16}>
                      {proj.title}
                    </Text>
                  </XStack>

                  <YStack backgroundColor="#1E293B" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                    <Text color="$primary" fontWeight="700" fontSize={11}>
                      {proj.difficulty}
                    </Text>
                  </YStack>
                </XStack>

                <Text color="$colorSecondary" fontSize={13} marginBottom="$3" numberOfLines={2}>
                  {proj.description}
                </Text>

                <XStack justifyContent="space-between" alignItems="center" paddingTop="$2" borderTopWidth={1} borderTopColor="$cardBorder">
                  <XStack space="$3" alignItems="center">
                    <XStack space="$1" alignItems="center">
                      <ShieldCheck color="#10B981" size={14} />
                      <Text color="$colorMuted" fontSize={11}>
                        Full Rubric
                      </Text>
                    </XStack>
                    <XStack space="$1" alignItems="center">
                      <Cpu color="#6366F1" size={14} />
                      <Text color="$colorMuted" fontSize={11}>
                        Project Coach
                      </Text>
                    </XStack>
                  </XStack>

                  <ArrowUpRight color="#818CF8" size={18} />
                </XStack>
              </Card>
            ))}
          </YStack>
        )}
      </ScrollView>
    </Canvas>
  )
}
