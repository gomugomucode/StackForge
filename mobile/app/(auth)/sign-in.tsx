import { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Input, Spinner } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { useAuth } from '../../src/hooks/useAuth'
import { useRouter } from 'expo-router'
import { Lock, Mail, Github, LogIn, Sparkles } from 'lucide-react-native'

export default function SignInScreen() {
  const router = useRouter()
  const { loginWithId } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignIn = async () => {
    setLoading(true)
    try {
      // Authenticate & store session token in SecureStore
      await loginWithId('demo-user')
      router.replace('/(tabs)')
    } catch (err) {
      console.error('Sign in error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Canvas justifyContent="center" paddingHorizontal="$4">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <YStack alignItems="center" marginBottom="$6">
          <XStack
            width={56}
            height={56}
            borderRadius={28}
            backgroundColor="$primary"
            alignItems="center"
            justifyContent="center"
            marginBottom="$3"
          >
            <Sparkles color="#FFFFFF" size={28} />
          </XStack>
          <Text color="$color" fontSize={26} fontWeight="800">
            StackForge Mobile
          </Text>
          <Text color="$colorSecondary" fontSize={13} marginTop="$1">
            Developer Operating System — Daily Mobile Companion
          </Text>
        </YStack>

        <Card backgroundColor="$cardBg" padding="$5" space="$4">
          <YStack space="$2">
            <Text color="$colorSecondary" fontSize={12} fontWeight="600">
              EMAIL ADDRESS
            </Text>
            <XStack
              backgroundColor="#1E293B"
              borderColor="$cardBorder"
              borderWidth={1}
              borderRadius="$3"
              paddingHorizontal="$3"
              alignItems="center"
            >
              <Mail color="#64748B" size={18} />
              <Input
                flex={1}
                borderWidth={0}
                backgroundColor="transparent"
                color="$color"
                placeholder="developer@stackforge.dev"
                placeholderTextColor="#64748B"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </XStack>
          </YStack>

          <YStack space="$2">
            <Text color="$colorSecondary" fontSize={12} fontWeight="600">
              PASSWORD
            </Text>
            <XStack
              backgroundColor="#1E293B"
              borderColor="$cardBorder"
              borderWidth={1}
              borderRadius="$3"
              paddingHorizontal="$3"
              alignItems="center"
            >
              <Lock color="#64748B" size={18} />
              <Input
                flex={1}
                borderWidth={0}
                backgroundColor="transparent"
                color="$color"
                placeholder="••••••••••••"
                placeholderTextColor="#64748B"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </XStack>
          </YStack>

          <Button
            backgroundColor="$primary"
            color="#FFFFFF"
            fontWeight="700"
            size="$4"
            onPress={handleSignIn}
            icon={loading ? <Spinner color="#FFF" /> : <LogIn color="#FFF" size={18} />}
          >
            Sign In with StackForge
          </Button>

          <YStack height={1} backgroundColor="$cardBorder" marginVertical="$2" />

          {/* OAuth Buttons */}
          <YStack space="$2">
            <Button
              backgroundColor="#1F2937"
              borderColor="#374151"
              borderWidth={1}
              color="$color"
              fontWeight="600"
              onPress={handleSignIn}
              icon={<Github color="#FFF" size={18} />}
            >
              Continue with GitHub OAuth
            </Button>

            <Button
              backgroundColor="#1F2937"
              borderColor="#374151"
              borderWidth={1}
              color="$color"
              fontWeight="600"
              onPress={handleSignIn}
            >
              Continue with Google OAuth
            </Button>
          </YStack>
        </Card>
      </ScrollView>
    </Canvas>
  )
}
