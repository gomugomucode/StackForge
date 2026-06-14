import { useState, useEffect, useCallback, useMemo } from 'react'
import type { MarketplacePath, PathReview } from './types'
import { CURATED_PATHS, MOCK_REVIEWS } from './marketplaceData'

const ENROLLED_PATHS_KEY = 'stackforge_enrolled_paths'

export function useMarketplace() {
  const [paths, setPaths] = useState<MarketplacePath[]>([])
  const [reviews, setReviews] = useState<Record<string, PathReview[]>>({})
  const [enrolledPathIds, setEnrolledPathIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Load initial datasets
  useEffect(() => {
    setIsLoading(true)
    try {
      setPaths(CURATED_PATHS)
      setReviews(MOCK_REVIEWS)
      
      const cachedEnrollments = localStorage.getItem(ENROLLED_PATHS_KEY)
      if (cachedEnrollments) {
        setEnrolledPathIds(JSON.parse(cachedEnrollments))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Filter paths dynamically
  const filteredPaths = useMemo(() => {
    return paths.filter(path => {
      const matchSearch =
        path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchLevel = levelFilter === 'all' || path.level === levelFilter
      const matchPrice = priceFilter === 'all' || path.price_type === priceFilter

      return matchSearch && matchLevel && matchPrice
    })
  }, [paths, searchQuery, levelFilter, priceFilter])

  // Enroll helper
  const enrollInPath = useCallback((pathId: string) => {
    setEnrolledPathIds(prev => {
      if (prev.includes(pathId)) return prev
      const updated = [...prev, pathId]
      localStorage.setItem(ENROLLED_PATHS_KEY, JSON.stringify(updated))
      return updated
    })

    // Increment enrollment count locally
    setPaths(prev =>
      prev.map(p => (p.id === pathId ? { ...p, enrollment_count: p.enrollment_count + 1 } : p))
    )
  }, [])

  // Add review helper
  const addPathReview = useCallback((pathId: string, username: string, rating: number, body: string) => {
    const newReview: PathReview = {
      id: `rev-${Date.now()}`,
      path_id: pathId,
      username,
      avatar_url: '',
      rating,
      body,
      created_at: new Date().toISOString(),
      helpful_count: 0
    }

    setReviews(prev => {
      const list = prev[pathId] ? [...prev[pathId]] : []
      list.unshift(newReview)
      return {
        ...prev,
        [pathId]: list
      }
    })

    // Recompute path rating avg
    setPaths(prev =>
      prev.map(p => {
        if (p.id === pathId) {
          const currentReviews = reviews[pathId] ? [...reviews[pathId], newReview] : [newReview]
          const sum = currentReviews.reduce((acc, r) => acc + r.rating, 0)
          return {
            ...p,
            review_count: currentReviews.length,
            rating_avg: Math.round((sum / currentReviews.length) * 10) / 10
          }
        }
        return p
      })
    )
  }, [reviews])

  return {
    paths: filteredPaths,
    allPathsCount: paths.length,
    enrolledPathIds,
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    priceFilter,
    setPriceFilter,
    isLoading,
    enrollInPath,
    addPathReview,
    reviews
  }
}
