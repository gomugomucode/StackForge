import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { articles, sourceName } = body

    if (!Array.isArray(articles) || articles.length === 0) {
      return NextResponse.json({ error: 'No articles provided for ingestion' }, { status: 400 })
    }

    let ingestedCount = 0
    let updatedCount = 0

    for (const item of articles) {
      if (!item.title || !item.sourceUrl) continue

      const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
      const readingTime = item.readingTime || Math.max(3, Math.ceil((item.content?.length || 1000) / 1000) * 2)

      const existing = await prisma.externalArticle.findUnique({
        where: { slug },
      })

      if (existing) {
        await prisma.externalArticle.update({
          where: { slug },
          data: {
            title: item.title,
            description: item.description || existing.description,
            content: item.content || existing.content,
            tags: item.tags || existing.tags,
            source: item.source || sourceName || existing.source,
            sourceUrl: item.sourceUrl,
            canonicalUrl: item.canonicalUrl || item.sourceUrl,
            mediumUrl: item.mediumUrl || existing.mediumUrl,
            difficulty: item.difficulty || existing.difficulty,
            updatedAt: new Date(),
          },
        })
        updatedCount++
      } else {
        await prisma.externalArticle.create({
          data: {
            title: item.title,
            slug,
            description: item.description || `Technical article on ${item.title}`,
            content: item.content || null,
            author: item.author || 'StackForge Engineering Content',
            tags: item.tags || ['TypeScript', 'Next.js', 'React'],
            readingTime,
            source: item.source || sourceName || 'MDN / Dev.to',
            sourceUrl: item.sourceUrl,
            canonicalUrl: item.canonicalUrl || item.sourceUrl,
            mediumUrl: item.mediumUrl || null,
            difficulty: item.difficulty || 'Intermediate',
            status: 'PUBLISHED',
          },
        })
        ingestedCount++
      }
    }

    // Record sync history
    await prisma.syncHistory.create({
      data: {
        sourceName: sourceName || 'API Ingestion Engine',
        itemsSynced: ingestedCount + updatedCount,
        status: 'SUCCESS',
        timestamp: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      ingestedCount,
      updatedCount,
      totalProcessed: articles.length,
    })
  } catch (error) {
    console.error('Content Ingestion Engine Error:', error)
    return NextResponse.json({ error: 'Failed to ingest articles' }, { status: 500 })
  }
}
