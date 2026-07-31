import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || ''

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        lessons: [],
        projects: [],
        articles: [],
        cheatsheets: [],
        interviewQuestions: [],
        trendingTopics: ['React 19', 'Next.js 15 App Router', 'TypeScript 5.5', 'Prisma ORM', 'Supabase Auth', 'System Design'],
      })
    }

    const trimmed = query.trim()

    const [lessons, projects, articles, cheatSheets, interviewQuestions] = await Promise.all([
      prisma.lesson.findMany({
        where: {
          OR: [
            { title: { contains: trimmed, mode: 'insensitive' } },
            { description: { contains: trimmed, mode: 'insensitive' } },
          ],
        },
        take: 5,
        select: { id: true, title: true, description: true, difficulty: true, slug: true },
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: trimmed, mode: 'insensitive' } },
            { description: { contains: trimmed, mode: 'insensitive' } },
          ],
        },
        take: 5,
        select: { id: true, title: true, description: true, difficulty: true },
      }),
      prisma.externalArticle.findMany({
        where: {
          OR: [
            { title: { contains: trimmed, mode: 'insensitive' } },
            { description: { contains: trimmed, mode: 'insensitive' } },
            { tags: { has: trimmed } },
          ],
        },
        take: 5,
        select: { id: true, slug: true, title: true, description: true, source: true, readingTime: true },
      }),
      prisma.cheatSheet.findMany({
        where: {
          OR: [
            { title: { contains: trimmed, mode: 'insensitive' } },
            { content: { contains: trimmed, mode: 'insensitive' } },
          ],
        },
        take: 5,
        select: { id: true, slug: true, title: true },
      }),
      prisma.interviewQuestion.findMany({
        where: {
          OR: [
            { question: { contains: trimmed, mode: 'insensitive' } },
            { tags: { has: trimmed } },
          ],
        },
        take: 5,
        select: { id: true, question: true, difficulty: true, companyFrequency: true },
      }),
    ])

    return NextResponse.json({
      lessons,
      projects,
      articles,
      cheatSheets,
      interviewQuestions,
      trendingTopics: ['React 19', 'Next.js 15 App Router', 'TypeScript 5.5', 'Prisma ORM', 'Supabase Auth', 'System Design'],
    })
  } catch (error) {
    console.error('Mobile Universal Search API Error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
