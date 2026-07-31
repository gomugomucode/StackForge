import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Spinner, Input } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { useArticles } from '../../src/hooks/useArticles'
import { ExternalArticle } from '../../src/types/mobile'
import { Clock, Bookmark, Search } from 'lucide-react-native'
import { useRouter } from 'expo-router'

export default function ArticlesScreen() {
  const router = useRouter()
  const [selectedSource, setSelectedSource] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { data, isLoading } = useArticles(selectedSource, searchQuery)

  const sources = [
    'ALL',
    'MDN',
    'React',
    'Next.js',
    'Vercel',
    'Supabase',
    'Cloudflare',
    'OpenAI',
    'Dev.to',
  ]

  return (
    <Canvas noSafeArea>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 32 }}>
        {/* Header */}
        <YStack marginBottom="$4">
          <Text color="$color" fontSize={24} fontWeight="800">
            Technical Article Reader
          </Text>
          <Text color="$colorSecondary" fontSize={13} marginTop="$1">
            Curated technical articles from official engineering blogs and documentation.
          </Text>
        </YStack>

        {/* Search Bar */}
        <XStack
          backgroundColor="$cardBg"
          borderColor="$cardBorder"
          borderWidth={1}
          borderRadius="$4"
          paddingHorizontal="$3"
          alignItems="center"
          marginBottom="$4"
        >
          <Search color="#64748B" size={18} />
          <Input
            flex={1}
            borderWidth={0}
            backgroundColor="transparent"
            color="$color"
            placeholder="Search tech articles & topics..."
            placeholderTextColor="#64748B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </XStack>

        {/* Source Pills Horizontal Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          <XStack space="$2">
            {sources.map((src) => (
              <Button
                key={src}
                size="$2"
                backgroundColor={selectedSource === src ? '$primary' : '$cardBg'}
                borderColor="$cardBorder"
                borderWidth={1}
                color={selectedSource === src ? '#FFFFFF' : '$colorSecondary'}
                fontWeight={selectedSource === src ? '700' : '400'}
                onPress={() => setSelectedSource(src)}
              >
                {src}
              </Button>
            ))}
          </XStack>
        </ScrollView>

        {/* Articles Feed */}
        {isLoading ? (
          <YStack height={200} justifyContent="center" alignItems="center">
            <Spinner size="large" color="$primary" />
          </YStack>
        ) : (
          <YStack space="$3">
            {data?.articles?.map((article: ExternalArticle) => (
              <Card
                key={article.id}
                interactive
                onPress={() => router.push(`/article/${article.slug}`)}
              >
                <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
                  <XStack space="$2" alignItems="center">
                    <YStack backgroundColor="#1E293B" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                      <Text color="$primary" fontWeight="700" fontSize={10} textTransform="uppercase">
                        {article.source}
                      </Text>
                    </YStack>
                    <Text color="$colorMuted" fontSize={11}>•</Text>
                    <Text color="$colorMuted" fontSize={11}>
                      {article.difficulty}
                    </Text>
                  </XStack>

                  <XStack space="$3" alignItems="center">
                    <XStack space="$1" alignItems="center">
                      <Clock color="#64748B" size={12} />
                      <Text color="$colorMuted" fontSize={11}>
                        {article.readingTime} min read
                      </Text>
                    </XStack>
                    <Bookmark color="#64748B" size={16} />
                  </XStack>
                </XStack>

                <Text color="$color" fontWeight="700" fontSize={16} marginBottom="$1">
                  {article.title}
                </Text>
                <Text color="$colorSecondary" fontSize={13} numberOfLines={2}>
                  {article.description}
                </Text>
              </Card>
            ))}
          </YStack>
        )}
      </ScrollView>
    </Canvas>
  )
}
