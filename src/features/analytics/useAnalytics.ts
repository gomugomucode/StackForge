import { useState, useEffect, useCallback } from 'react'
import type { ChartDataPoint, CategoryMastery, WeeklyReport, HeatmapDay } from './types'
import { analyticsService } from './analyticsService'

export function useAnalytics() {
  const [xpGrowth, setXpGrowth] = useState<ChartDataPoint[]>([])
  const [learningTime, setLearningTime] = useState<ChartDataPoint[]>([])
  const [categoryMastery, setCategoryMastery] = useState<CategoryMastery[]>([])
  const [heatmapData, setHeatmapData] = useState<HeatmapDay[]>([])
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReport | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadData = useCallback(() => {
    setIsLoading(true)
    try {
      const xp = analyticsService.getXPGrowthData()
      const time = analyticsService.getLearningTimeData()
      const mastery = analyticsService.getCategoryMasteryData()
      const heatmap = analyticsService.getHeatmapData()
      const report = analyticsService.getWeeklyReport()

      setXpGrowth(xp)
      setLearningTime(time)
      setCategoryMastery(mastery)
      setHeatmapData(heatmap)
      setWeeklyReport(report)
    } catch (err) {
      console.error('Failed to load analytics data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    xpGrowth,
    learningTime,
    categoryMastery,
    heatmapData,
    weeklyReport,
    isLoading,
    refreshAnalytics: loadData
  }
}
