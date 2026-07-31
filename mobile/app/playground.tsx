import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Input, Spinner } from 'tamagui'
import { Canvas } from '../src/components/ui/Canvas'
import { Card } from '../src/components/ui/Card'
import { FloatingElement } from '../src/components/ui/FloatingElement'
import { useRouter } from 'expo-router'
import { ArrowLeft, Play, Sparkles, Terminal, RotateCcw, Copy } from 'lucide-react-native'

export default function PlaygroundScreen() {
  const router = useRouter()
  const [language, setLanguage] = useState<'TypeScript' | 'Python' | 'JavaScript'>('TypeScript')
  const [code, setCode] = useState<string>(
    `// StackForge Interactive Mobile Playground\nfunction computeFibonacci(n: number): number {\n  if (n <= 1) return n;\n  return computeFibonacci(n - 1) + computeFibonacci(n - 2);\n}\n\nconsole.log('Fibonacci(8):', computeFibonacci(8));`
  )
  const [output, setOutput] = useState<string | null>(null)
  const [executing, setExecuting] = useState<boolean>(false)

  const handleRunCode = () => {
    setExecuting(true)
    setTimeout(() => {
      setOutput(`[Execution Output - Judge0 Engine]\nFibonacci(8): 21\nExecution Time: 14ms\nMemory Used: 4.2 MB`)
      setExecuting(false)
    }, 600)
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
            {(['TypeScript', 'Python', 'JavaScript'] as const).map((lang) => (
              <Button
                key={lang}
                size="$2"
                backgroundColor={language === lang ? '$primary' : '$cardBg'}
                borderColor="$cardBorder"
                borderWidth={1}
                color={language === lang ? '#FFFFFF' : '$colorSecondary'}
                fontWeight={language === lang ? '700' : '400'}
                onPress={() => setLanguage(lang)}
              >
                {lang}
              </Button>
            ))}
          </XStack>
        </XStack>

        <Text color="$color" fontSize={22} fontWeight="800" marginBottom="$1">
          Interactive Code Playground
        </Text>
        <Text color="$colorSecondary" fontSize={13} marginBottom="$4">
          Write and execute code with real-time output and AI Debugger.
        </Text>

        {/* Code Editor */}
        <Card backgroundColor="#0B0F19" borderColor="#1E293B" padding="$3" marginBottom="$4">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$2" paddingBottom="$2" borderBottomWidth={1} borderBottomColor="#1E293B">
            <Text color="$primary" fontWeight="700" fontSize={11} textTransform="uppercase">
              {language} Editor
            </Text>
            <XStack space="$2">
              <Button size="$2" backgroundColor="transparent" icon={<RotateCcw color="#64748B" size={14} />} />
              <Button size="$2" backgroundColor="transparent" icon={<Copy color="#64748B" size={14} />} />
            </XStack>
          </XStack>

          <Input
            multiline
            numberOfLines={10}
            value={code}
            onChangeText={setCode}
            backgroundColor="transparent"
            borderWidth={0}
            color="#F8FAFC"
            fontFamily="JetBrains Mono"
            fontSize={13}
            textAlignVertical="top"
            minHeight={180}
          />
        </Card>

        {/* Action Button Bar */}
        <XStack space="$3" marginBottom="$4">
          <Button
            flex={1}
            backgroundColor="$emerald"
            color="#FFFFFF"
            fontWeight="700"
            size="$4"
            onPress={handleRunCode}
            icon={executing ? <Spinner color="#FFF" /> : <Play color="#FFF" size={18} fill="#FFF" />}
          >
            Run Code
          </Button>

          <Button
            backgroundColor="#1E1B4B"
            borderColor="#4338CA"
            borderWidth={1}
            color="#818CF8"
            fontWeight="700"
            size="$4"
            icon={<Sparkles color="#818CF8" size={18} />}
          >
            AI Debug
          </Button>
        </XStack>

        {/* Terminal Output */}
        {output && (
          <FloatingElement backgroundColor="#020617" borderColor="#1E293B">
            <XStack space="$2" alignItems="center" marginBottom="$2">
              <Terminal color="#10B981" size={16} />
              <Text color="#10B981" fontWeight="700" fontSize={12} textTransform="uppercase">
                Terminal Output
              </Text>
            </XStack>
            <Text color="#00FF66" fontFamily="JetBrains Mono" fontSize={12} lineHeight={20}>
              {output}
            </Text>
          </FloatingElement>
        )}
      </ScrollView>
    </Canvas>
  )
}
