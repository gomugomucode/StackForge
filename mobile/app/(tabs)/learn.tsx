import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Spinner, Input } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { FloatingElement } from '../../src/components/ui/FloatingElement'
import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '../../src/lib/api-client'
import { BookOpen, CheckCircle, Flame, Layers, Search, Bookmark, ChevronRight } from 'lucide-react-native'

export default function LearnScreen() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL')

  const { data, isLoading } = useQuery({
    queryKey: ['learning', 'content'],
    queryFn: () => fetchApi<any>('/learning'),
  })

  if (isLoading || !data) {
    return (
      <Canvas justifyContent="center" alignItems="center">
        <Spinner size="large" color="$primary" />
        <Text color="$colorSecondary" marginTop="$4">
          Loading learning roadmaps...
        </Text>
      </Canvas>
    )
  }

  const { roadmaps, topics } = data

  return (
    <Canvas noSafeArea>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 32 }}>
        {/* Header */}
        <YStack marginBottom="$4">
          <Text color="$color" fontSize={24} fontWeight="800">
            Learning Hub & Roadmaps
          </Text>
          <Text color="$colorSecondary" fontSize={13} marginTop="$1">
            Master production concepts with structured roadmaps and spaced repetition flashcards.
          </Text>
        </YStack>

        {/* Spaced Repetition Flashcards Trigger Banner */}
        <FloatingElement backgroundColor="#1E1B4B" borderColor="#4338CA" marginBottom="$5">
          <XStack justifyContent="space-between" alignItems="center">
            <YStack flex={1} paddingRight="$3">
              <XStack space="$2" alignItems="center" marginBottom="$1">
                <Flame color="#F59E0B" size={16} />
                <Text color="#F59E0B" fontWeight="800" fontSize={12} textTransform="uppercase">
                  Spaced Repetition
                </Text>
              </XStack>
              <Text color="$color" fontSize={15} fontWeight="700">
                5 Flashcard Reviews Ready
              </Text>
              <Text color="$colorMuted" fontSize={12} marginTop="$1">
                Active SM-2 interval algorithm retention optimization
              </Text>
            </YStack>
            <Button size="$3" backgroundColor="$primary" color="#FFFFFF" fontWeight="700">
              Start Deck
            </Button>
          </XStack>
        </FloatingElement>

        {/* Learning Topics List */}
        <YStack marginBottom="$5">
          <Text color="$color" fontSize={18} fontWeight="800" marginBottom="$3">
            Core Topics & Concepts
          </Text>

          {topics?.map((t: any) => (
            <Card key={t.id} marginBottom="$3" interactive>
              <XStack justifyContent="space-between" alignItems="center">
                <YStack flex={1}>
                  <XStack space="$2" alignItems="center" marginBottom="$1">
                    <Text color="$primary" fontWeight="700" fontSize={11} textTransform="uppercase">
                      {t.technology}
                    </Text>
                    <Text color="$colorMuted" fontSize={11}>•</Text>
                    <Text color="$colorMuted" fontSize={11}>
                      {t.difficulty}
                    </Text>
                  </XStack>
                  <Text color="$color" fontWeight="700" fontSize={15}>
                    {t.title}
                  </Text>
                  <Text color="$colorSecondary" fontSize={12} marginTop="$1">
                    Estimated {t.estimatedTime} mins
                  </Text>
                </YStack>

                <XStack space="$2" alignItems="center">
                  <Bookmark color="#64748B" size={18} />
                  <ChevronRight color="#94A3B8" size={20} />
                </XStack>
              </XStack>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </Canvas>
  )
}
