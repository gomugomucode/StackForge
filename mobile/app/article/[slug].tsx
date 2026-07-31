import React from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Spinner } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { useArticleDetail } from '../../src/hooks/useArticles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft, Clock, Bookmark, Share2, CheckCircle } from 'lucide-react-native'

export default function ArticleDetailScreen() {
  const router = useRouter()
  const { slug } = useLocalSearchParams<{ slug: string }>()

  const { data: article, isLoading } = useArticleDetail(slug as string)

  if (isLoading || !article) {
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

          <XStack space="$2">
            <Button size="$3" backgroundColor="$cardBg" borderColor="$cardBorder" borderWidth={1} icon={<Bookmark color="#64748B" size={18} />} />
            <Button size="$3" backgroundColor="$cardBg" borderColor="$cardBorder" borderWidth={1} icon={<Share2 color="#64748B" size={18} />} />
          </XStack>
        </XStack>

        {/* Source Badge & Meta */}
        <XStack space="$2" alignItems="center" marginBottom="$2">
          <YStack backgroundColor="#1E293B" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
            <Text color="$primary" fontWeight="700" fontSize={11} textTransform="uppercase">
              {article.source}
            </Text>
          </YStack>
          <Text color="$colorMuted" fontSize={12}>•</Text>
          <Text color="$colorMuted" fontSize={12}>
            {article.difficulty}
          </Text>
          <Text color="$colorMuted" fontSize={12}>•</Text>
          <XStack space="$1" alignItems="center">
            <Clock color="#64748B" size={12} />
            <Text color="$colorMuted" fontSize={12}>
              {article.readingTime} min read
            </Text>
          </XStack>
        </XStack>

        {/* Article Title */}
        <Text color="$color" fontSize={22} fontWeight="800" marginBottom="$3">
          {article.title}
        </Text>

        <Text color="$colorSecondary" fontSize={14} marginBottom="$5" lineHeight={20}>
          {article.description}
        </Text>

        {/* Article Content / Key Takeaways Card */}
        <Card backgroundColor="#121826" borderColor="#1E293B" padding="$4" marginBottom="$5">
          <Text color="$primary" fontWeight="700" fontSize={14} marginBottom="$2">
            Key Engineering Insights
          </Text>
          <Text color="$color" fontSize={14} lineHeight={22}>
            {article.content ||
              `In modern web architectures, reducing client-side bundle size while leveraging server-side execution allows applications to achieve sub-second interactive speeds. Always measure paint times and memory consumption before introducing third-party client dependencies.`}
          </Text>
        </Card>

        {/* Mark Completed Button */}
        <Button
          backgroundColor="$emerald"
          color="#FFFFFF"
          fontWeight="700"
          icon={<CheckCircle color="#FFFFFF" size={18} />}
          onPress={() => router.back()}
        >
          Complete & Earn +25 XP
        </Button>
      </ScrollView>
    </Canvas>
  )
}
