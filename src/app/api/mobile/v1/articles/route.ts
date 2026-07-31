import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const source = searchParams.get('source')
    const difficulty = searchParams.get('difficulty')
    const query = searchParams.get('query')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '15', 10)

    // Single article reading mode detail
    if (slug) {
      const article = await prisma.externalArticle.findUnique({
        where: { slug },
      })

      if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 })
      }

      return NextResponse.json(article)
    }

    // Filtered paginated list
    const whereClause: any = {
      status: 'PUBLISHED',
    }

    if (source) {
      whereClause.source = { equals: source, mode: 'insensitive' }
    }

    if (difficulty) {
      whereClause.difficulty = { equals: difficulty, mode: 'insensitive' }
    }

    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
      ]
    }

    const [articles, total] = await Promise.all([
      prisma.externalArticle.findMany({
        where: whereClause,
        orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.externalArticle.count({ where: whereClause }),
    ])

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      availableSources: [
        'MDN',
        'React',
        'Next.js',
        'Vercel',
        'Supabase',
        'Cloudflare',
        'OpenAI',
        'Dev.to',
        'Medium',
        'Microsoft Learn',
        'Google Developers',
      ],
    })
  } catch (error) {
    console.error('Mobile Articles API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch technical articles' }, { status: 500 })
  }
}
