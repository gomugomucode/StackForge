import React from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Progress as TamaguiProgress } from 'tamagui'
import { Canvas } from '../src/components/ui/Canvas'
import { Card } from '../src/components/ui/Card'
import { FloatingElement } from '../src/components/ui/FloatingElement'
import { useRouter } from 'expo-router'
import { ArrowLeft, HardDrive, Trash2, CheckCircle2 } from 'lucide-react-native'

export default function DownloadsScreen() {
  const router = useRouter()

  const downloadedPacks = [
    { title: 'Full-Stack React & Next.js 15 Roadmap', size: '42 MB', items: '24 Lessons & Code Specs', date: 'Downloaded 2 days ago' },
    { title: 'TypeScript Production Patterns & Cheatsheet', size: '18 MB', items: '12 CheatSheets & Flashcards', date: 'Downloaded yesterday' },
    { title: 'Senior System Design Interview Flashcard Pack', size: '28 MB', items: '45 Spaced Repetition Cards', date: 'Downloaded today' },
  ]

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

          <Button
            size="$3"
            backgroundColor="#271518"
            borderColor="#4C1D24"
            borderWidth={1}
            color="#F43F5E"
            fontWeight="700"
            icon={<Trash2 color="#F43F5E" size={16} />}
          >
            Clear Cache
          </Button>
        </XStack>

        <Text color="$color" fontSize={22} fontWeight="800" marginBottom="$1">
          Smart Download Center
        </Text>
        <Text color="$colorSecondary" fontSize={13} marginBottom="$5">
          Access roadmaps, courses, articles, and flashcards 100% offline.
        </Text>

        {/* Storage Bar */}
        <FloatingElement backgroundColor="#121826" borderColor="#1E293B" marginBottom="$5">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
            <XStack space="$2" alignItems="center">
              <HardDrive color="#6366F1" size={18} />
              <Text color="$color" fontWeight="700" fontSize={14}>
                Device Offline Storage
              </Text>
            </XStack>
            <Text color="$primary" fontWeight="800" fontSize={14}>
              88 MB Used
            </Text>
          </XStack>

          <TamaguiProgress value={18} height={8} backgroundColor="#1E293B" marginBottom="$2">
            <TamaguiProgress.Indicator animation="bouncy" backgroundColor="$primary" />
          </TamaguiProgress>

          <XStack justifyContent="space-between">
            <Text color="$colorMuted" fontSize={11}>
              StackForge Cache: 88 MB
            </Text>
            <Text color="$colorMuted" fontSize={11}>
              Free Space: 48.2 GB
            </Text>
          </XStack>
        </FloatingElement>

        {/* Offline Packs */}
        <YStack space="$3">
          <Text color="$color" fontWeight="800" fontSize={16} marginBottom="$1">
            Downloaded Content Packs
          </Text>

          {downloadedPacks.map((pack, i) => (
            <Card key={i} backgroundColor="$cardBg">
              <XStack justifyContent="space-between" alignItems="flex-start" marginBottom="$2">
                <YStack flex={1} paddingRight="$3">
                  <XStack space="$2" alignItems="center" marginBottom="$1">
                    <CheckCircle2 color="#10B981" size={16} />
                    <Text color="$emerald" fontWeight="700" fontSize={11}>
                      OFFLINE READY
                    </Text>
                  </XStack>
                  <Text color="$color" fontWeight="700" fontSize={15}>
                    {pack.title}
                  </Text>
                </YStack>

                <YStack backgroundColor="#1E293B" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                  <Text color="$primary" fontWeight="700" fontSize={11}>
                    {pack.size}
                  </Text>
                </YStack>
              </XStack>

              <XStack justifyContent="space-between" alignItems="center" paddingTop="$2" borderTopWidth={1} borderTopColor="$cardBorder">
                <Text color="$colorMuted" fontSize={11}>
                  {pack.items}
                </Text>
                <Text color="$colorMuted" fontSize={11}>
                  {pack.date}
                </Text>
              </XStack>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </Canvas>
  )
}
