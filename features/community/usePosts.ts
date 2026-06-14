import { useState, useEffect, useCallback } from 'react'
import type { CommunityPost } from './types'
import { communityService } from './communityService'
import { getUserName } from '@/lib/core/hooks/useProgress'

export function usePosts(initialCategory = 'all') {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [category, setCategory] = useState(initialCategory)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const catFilter = category === 'all' ? undefined : category
      const data = await communityService.getPosts(catFilter)
      setPosts(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load community discussions.')
    } finally {
      setIsLoading(false)
    }
  }, [category])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const createPost = useCallback(async (title: string, content: string, cat: string, tags: string[]) => {
    try {
      const username = getUserName() || 'Anonymous'
      const newPost = await communityService.createPost(title, content, cat, tags, username)
      setPosts(prev => [newPost, ...prev])
      return newPost
    } catch (err) {
      console.error('Failed to create post:', err)
      throw err
    }
  }, [])

  const upvotePost = useCallback(async (postId: string) => {
    try {
      const updatedVotes = await communityService.upvotePost(postId)
      setPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, upvotes: updatedVotes } : p))
      )
    } catch (err) {
      console.error('Failed to upvote post:', err)
    }
  }, [])

  return {
    posts,
    isLoading,
    error,
    category,
    setCategory,
    createPost,
    upvotePost,
    refreshPosts: loadPosts
  }
}
