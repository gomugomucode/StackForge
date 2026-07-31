import { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Spinner, Input } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { FloatingElement } from '../../src/components/ui/FloatingElement'
import { useUniversalSearch, useGroundedAi } from '../../src/hooks/useUniversalSearch'
import { Search, Sparkles, Send, BookOpen, Newspaper, FolderGit2, ArrowRight } from 'lucide-react-native'

export default function SearchScreen() {
  const [query, setQuery] = useState<string>('')
  const [aiPrompt, setAiPrompt] = useState<string>('')

  const { data: searchResults, isLoading: isSearchLoading } = useUniversalSearch(query)
  const groundedAiMutation = useGroundedAi()

  const handleAskAi = () => {
    if (!aiPrompt.trim()) return
    groundedAiMutation.mutate({ prompt: aiPrompt })
  }

  return (
    <Canvas noSafeArea>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 32 }}>
        {/* Header */}
        <YStack marginBottom="$4">
          <Text color="$color" fontSize={24} fontWeight="800">
            Universal Search & AI Tutor
          </Text>
          <Text color="$colorSecondary" fontSize={13} marginTop="$1">
            Search across StackForge ecosystem or ask grounded AI questions.
          </Text>
        </YStack>

        {/* Universal Search Input */}
        <XStack
          backgroundColor="$cardBg"
          borderColor="$cardBorder"
          borderWidth={1}
          borderRadius="$4"
          paddingHorizontal="$3"
          alignItems="center"
          marginBottom="$5"
        >
          <Search color="#64748B" size={18} />
          <Input
            flex={1}
            borderWidth={0}
            backgroundColor="transparent"
            color="$color"
            placeholder="Search lessons, projects, articles..."
            placeholderTextColor="#64748B"
            value={query}
            onChangeText={setQuery}
          />
        </XStack>

        {/* AI Assistant Grounded Prompt Box */}
        <FloatingElement backgroundColor="#111827" borderColor="#374151" marginBottom="$5">
          <XStack space="$2" alignItems="center" marginBottom="$2">
            <Sparkles color="#06B6D4" size={18} />
            <Text color="#06B6D4" fontWeight="800" fontSize={13} textTransform="uppercase">
              Grounded Developer AI Assistant
            </Text>
          </XStack>

          <Text color="$colorMuted" fontSize={12} marginBottom="$3">
            Ask any technical concept or architecture question. Guaranteed grounded rationale with zero hallucinations.
          </Text>

          <XStack space="$2" alignItems="center">
            <Input
              flex={1}
              backgroundColor="#1F2937"
              borderColor="#374151"
              color="$color"
              placeholder="e.g. How does React Server Components hydration work?"
              placeholderTextColor="#6B7280"
              value={aiPrompt}
              onChangeText={setAiPrompt}
            />
            <Button
              backgroundColor="$cyan"
              color="#FFFFFF"
              fontWeight="700"
              onPress={handleAskAi}
              icon={groundedAiMutation.isPending ? <Spinner color="#FFF" /> : <Send size={16} color="#FFF" />}
            />
          </XStack>

          {/* AI Structured Answer Result */}
          {groundedAiMutation.data && (
            <YStack marginTop="$4" paddingTop="$3" borderTopWidth={1} borderTopColor="#374151">
              <XStack space="$2" alignItems="center" marginBottom="$2">
                <Text color="$cyan" fontWeight="800" fontSize={13}>
                  Why it matters:
                </Text>
                <Text color="$colorSecondary" fontSize={12} flex={1}>
                  {groundedAiMutation.data.why}
                </Text>
              </XStack>

              <XStack space="$4" marginBottom="$2">
                <Text color="$colorMuted" fontSize={11}>
                  ⏱ Time: {groundedAiMutation.data.estimatedTime}
                </Text>
                <Text color="$colorMuted" fontSize={11}>
                  🎯 Difficulty: {groundedAiMutation.data.difficulty}
                </Text>
              </XStack>

              <Text color="$color" fontSize={13} marginTop="$2" whiteSpace="pre-wrap">
                {groundedAiMutation.data.detailedExplanation}
              </Text>

              <YStack backgroundColor="#1F2937" padding="$3" borderRadius="$3" marginTop="$3">
                <Text color="$emerald" fontWeight="700" fontSize={12} marginBottom="$1">
                  Recommended Next Action:
                </Text>
                <Text color="$color" fontSize={12}>
                  {groundedAiMutation.data.nextAction}
                </Text>
              </YStack>
            </YStack>
          )}
        </FloatingElement>

        {/* Universal Search Results */}
        {searchResults && (
          <YStack space="$4">
            {searchResults.lessons?.length > 0 && (
              <YStack space="$2">
                <Text color="$color" fontWeight="800" fontSize={15}>
                  Lessons
                </Text>
                {searchResults.lessons.map((item: any) => (
                  <Card key={item.id}>
                    <Text color="$color" fontWeight="700" fontSize={14}>
                      {item.title}
                    </Text>
                    <Text color="$colorSecondary" fontSize={12}>
                      {item.description}
                    </Text>
                  </Card>
                ))}
              </YStack>
            )}

            {searchResults.articles?.length > 0 && (
              <YStack space="$2">
                <Text color="$color" fontWeight="800" fontSize={15}>
                  Articles
                </Text>
                {searchResults.articles.map((item: any) => (
                  <Card key={item.id}>
                    <Text color="$color" fontWeight="700" fontSize={14}>
                      {item.title}
                    </Text>
                    <Text color="$colorSecondary" fontSize={12}>
                      {item.source} • {item.readingTime} min read
                    </Text>
                  </Card>
                ))}
              </YStack>
            )}
          </YStack>
        )}
      </ScrollView>
    </Canvas>
  )
}
