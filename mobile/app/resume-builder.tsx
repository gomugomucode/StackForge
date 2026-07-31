import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Spinner, Input } from 'tamagui'
import { Canvas } from '../src/components/ui/Canvas'
import { Card } from '../src/components/ui/Card'
import { FloatingElement } from '../src/components/ui/FloatingElement'
import { useRouter } from 'expo-router'
import { ArrowLeft, Sparkles, FileText, Copy, Download } from 'lucide-react-native'

export default function ResumeBuilderScreen() {
  const router = useRouter()
  const [targetRole, setTargetRole] = useState<string>('Senior Full-Stack Engineer (React & TypeScript)')
  const [generating, setGenerating] = useState<boolean>(false)
  const [generatedResume, setGeneratedResume] = useState<string | null>(null)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGeneratedResume(
        `# Senior Full-Stack Engineer Resume\n\n## Professional Summary\nResults-driven Senior Full-Stack Engineer with 5+ years building high-throughput web and mobile applications using React Native, Next.js 15, TypeScript, and Prisma ORM.\n\n## Verified StackForge Milestones\n• 88% TypeScript & React Native Proficiency Index\n• Certified Full-Stack Architecture Specialist\n• Completed Commercial E-Commerce SaaS Project Rubric (Score: 94/100)\n\n## Key Technical Skills\n• Frontend & Mobile: React Native, Expo Router, Tamagui, Next.js App Router, TanStack Query\n• Backend & Databases: Node.js, Prisma ORM, PostgreSQL, Supabase Auth, RESTful API design`
      )
      setGenerating(false)
    }, 700)
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
            <Text color="$emerald" fontWeight="700" fontSize={11}>
              92% ATS MATCH
            </Text>
          </YStack>
        </XStack>

        <Text color="$color" fontSize={22} fontWeight="800" marginBottom="$1">
          AI Resume & ATS Optimizer
        </Text>
        <Text color="$colorSecondary" fontSize={13} marginBottom="$5">
          Generate ATS-friendly resumes and GitHub profile READMEs based on your verified learning history.
        </Text>

        <Card backgroundColor="$cardBg" padding="$4" marginBottom="$5" space="$3">
          <YStack space="$2">
            <Text color="$colorSecondary" fontSize={12} fontWeight="600">
              TARGET ENGINEERING ROLE
            </Text>
            <Input
              backgroundColor="#1E293B"
              borderColor="$cardBorder"
              color="$color"
              value={targetRole}
              onChangeText={setTargetRole}
            />
          </YStack>

          <Button
            backgroundColor="$primary"
            color="#FFFFFF"
            fontWeight="700"
            size="$4"
            onPress={handleGenerate}
            icon={generating ? <Spinner color="#FFF" /> : <Sparkles color="#FFF" size={18} />}
          >
            Generate ATS Resume & README
          </Button>
        </Card>

        {generatedResume && (
          <FloatingElement backgroundColor="#121826" borderColor="#1E293B">
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
              <XStack space="$2" alignItems="center">
                <FileText color="#10B981" size={18} />
                <Text color="$color" fontWeight="700" fontSize={14}>
                  Generated Resume Markdown
                </Text>
              </XStack>
              <XStack space="$2">
                <Button size="$2" backgroundColor="#1E293B" icon={<Copy color="#FFF" size={14} />} />
                <Button size="$2" backgroundColor="$emerald" color="#FFF" icon={<Download color="#FFF" size={14} />} />
              </XStack>
            </XStack>

            <Text color="$color" fontSize={13} lineHeight={20} whiteSpace="pre-wrap">
              {generatedResume}
            </Text>
          </FloatingElement>
        )}
      </ScrollView>
    </Canvas>
  )
}
