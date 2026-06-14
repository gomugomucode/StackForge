import { useState, useEffect, useCallback } from 'react'
import type { LeaderboardEntry, StudyGroup, Challenge } from './types'
import { communityService } from './communityService'
import { useProgress } from '@/lib/core/context/ProgressContext'

export function useLeaderboard() {
  const { addXP } = useProgress()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadLeaderboardData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [lead, groups, chals] = await Promise.all([
        communityService.getLeaderboard(),
        communityService.getStudyGroups(),
        communityService.getChallenges(),
      ])
      setLeaderboard(lead)
      setStudyGroups(groups)
      setChallenges(chals)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch community leaderboards and groups.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLeaderboardData()
  }, [loadLeaderboardData])

  const toggleJoinGroup = useCallback(async (groupId: string) => {
    try {
      const isJoined = await communityService.toggleJoinGroup(groupId)
      setStudyGroups(prev =>
        prev.map(g => {
          if (g.id === groupId) {
            return {
              ...g,
              is_member: isJoined,
              member_count: isJoined ? g.member_count + 1 : Math.max(0, g.member_count - 1)
            }
          }
          return g
        })
      )
    } catch (err) {
      console.error('Failed to toggle join group:', err)
    }
  }, [])

  const submitChallenge = useCallback(async (challengeId: string, xpReward: number) => {
    try {
      const success = await communityService.submitChallenge(challengeId)
      if (success) {
        // Increment XP locally
        addXP(xpReward)

        setChallenges(prev =>
          prev.map(c => (c.id === challengeId ? { ...c, has_submitted: true, submission_count: c.submission_count + 1 } : c))
        )
      }
    } catch (err) {
      console.error('Failed to submit challenge:', err)
    }
  }, [addXP])

  return {
    leaderboard,
    studyGroups,
    challenges,
    isLoading,
    error,
    toggleJoinGroup,
    submitChallenge,
    refreshLeaderboard: loadLeaderboardData
  }
}
