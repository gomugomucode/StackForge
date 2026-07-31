import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Button, Spinner } from 'tamagui'
import { Canvas } from '../../src/components/ui/Canvas'
import { Card } from '../../src/components/ui/Card'
import { AvatarBadge } from '../../src/components/ui/AvatarBadge'
import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '../../src/lib/api-client'
import { Users, Award, Heart, MessageSquare, Flame, Shield, UserPlus } from 'lucide-react-native'

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'FEED' | 'CIRCLES' | 'LEADERBOARD'>('FEED')

  const feedQuery = useQuery({
    queryKey: ['feed', 'social'],
    queryFn: () => fetchApi<any>('/feed'),
  })

  const circlesQuery = useQuery({
    queryKey: ['circles', 'list'],
    queryFn: () => fetchApi<any>('/circles'),
  })

  return (
    <Canvas noSafeArea>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 32 }}>
        {/* Header */}
        <YStack marginBottom="$4">
          <Text color="$color" fontSize={24} fontWeight="800">
            Developer Community & Circles
          </Text>
          <Text color="$colorSecondary" fontSize={13} marginTop="$1">
            Connect with engineers, join study groups, and celebrate learning milestones.
          </Text>
        </YStack>

        {/* Tab Pills */}
        <XStack space="$2" marginBottom="$4">
          <Button
            size="$2"
            backgroundColor={activeTab === 'FEED' ? '$primary' : '$cardBg'}
            borderColor="$cardBorder"
            borderWidth={1}
            color={activeTab === 'FEED' ? '#FFFFFF' : '$colorSecondary'}
            fontWeight={activeTab === 'FEED' ? '700' : '400'}
            onPress={() => setActiveTab('FEED')}
          >
            Social Feed
          </Button>
          <Button
            size="$2"
            backgroundColor={activeTab === 'CIRCLES' ? '$primary' : '$cardBg'}
            borderColor="$cardBorder"
            borderWidth={1}
            color={activeTab === 'CIRCLES' ? '#FFFFFF' : '$colorSecondary'}
            fontWeight={activeTab === 'CIRCLES' ? '700' : '400'}
            onPress={() => setActiveTab('CIRCLES')}
          >
            Developer Circles
          </Button>
          <Button
            size="$2"
            backgroundColor={activeTab === 'LEADERBOARD' ? '$primary' : '$cardBg'}
            borderColor="$cardBorder"
            borderWidth={1}
            color={activeTab === 'LEADERBOARD' ? '#FFFFFF' : '$colorSecondary'}
            fontWeight={activeTab === 'LEADERBOARD' ? '700' : '400'}
            onPress={() => setActiveTab('LEADERBOARD')}
          >
            XP Leaderboard
          </Button>
        </XStack>

        {/* Social Feed Tab */}
        {activeTab === 'FEED' && (
          <YStack space="$3">
            {feedQuery.isLoading ? (
              <Spinner size="large" color="$primary" />
            ) : (
              feedQuery.data?.feedItems?.map((item: any) => (
                <Card key={item.id} marginBottom="$2">
                  <XStack space="$3" alignItems="center" marginBottom="$2">
                    <AvatarBadge avatarUrl={item.user.avatar} name={item.user.name} size={36} />
                    <YStack flex={1}>
                      <Text color="$color" fontWeight="700" fontSize={14}>
                        {item.user.name}
                      </Text>
                      <Text color="$colorMuted" fontSize={11}>
                        {item.title}
                      </Text>
                    </YStack>
                  </XStack>

                  <Text color="$colorSecondary" fontSize={13} marginBottom="$3">
                    {item.subtitle}
                  </Text>

                  <XStack space="$4" alignItems="center" paddingTop="$2" borderTopWidth={1} borderTopColor="$cardBorder">
                    <XStack space="$1" alignItems="center">
                      <Heart color="#F43F5E" size={16} />
                      <Text color="$colorMuted" fontSize={12}>
                        {item.likes}
                      </Text>
                    </XStack>
                    <XStack space="$1" alignItems="center">
                      <MessageSquare color="#64748B" size={16} />
                      <Text color="$colorMuted" fontSize={12}>
                        Reply
                      </Text>
                    </XStack>
                  </XStack>
                </Card>
              ))
            )}
          </YStack>
        )}

        {/* Circles Tab */}
        {activeTab === 'CIRCLES' && (
          <YStack space="$3">
            {circlesQuery.isLoading ? (
              <Spinner size="large" color="$primary" />
            ) : (
              circlesQuery.data?.circles?.map((c: any) => (
                <Card key={c.id}>
                  <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
                    <XStack space="$2" alignItems="center">
                      <Users color="#6366F1" size={18} />
                      <Text color="$color" fontWeight="800" fontSize={16}>
                        {c.name}
                      </Text>
                    </XStack>
                    <Text color="$emerald" fontWeight="700" fontSize={12}>
                      {c.membersCount} Members
                    </Text>
                  </XStack>

                  <Text color="$colorSecondary" fontSize={13} marginBottom="$3">
                    {c.description}
                  </Text>

                  <Button
                    size="$3"
                    backgroundColor={c.isMember ? '#1F2937' : '$primary'}
                    color="#FFFFFF"
                    fontWeight="700"
                    icon={<UserPlus size={16} color="#FFF" />}
                  >
                    {c.isMember ? 'Joined Circle' : 'Join Circle'}
                  </Button>
                </Card>
              ))
            )}
          </YStack>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'LEADERBOARD' && (
          <YStack space="$2">
            {feedQuery.data?.leaderboard?.map((l: any, rank: number) => (
              <Card key={rank} backgroundColor="$cardBg">
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack space="$3" alignItems="center">
                    <Text color={rank === 0 ? '#F59E0B' : '$colorMuted'} fontWeight="800" fontSize={16} width={24}>
                      #{rank + 1}
                    </Text>
                    <AvatarBadge avatarUrl={l.avatar} name={l.name} size={36} />
                    <Text color="$color" fontWeight="700" fontSize={14}>
                      {l.name}
                    </Text>
                  </XStack>
                  <XStack space="$1" alignItems="center">
                    <Flame color="#F59E0B" size={16} />
                    <Text color="#F59E0B" fontWeight="800" fontSize={14}>
                      {l.xpEarned} XP
                    </Text>
                  </XStack>
                </XStack>
              </Card>
            ))}
          </YStack>
        )}
      </ScrollView>
    </Canvas>
  )
}
