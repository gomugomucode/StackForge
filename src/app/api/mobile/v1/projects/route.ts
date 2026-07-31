import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const difficulty = searchParams.get('difficulty')
    const technology = searchParams.get('technology')

    if (id) {
      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          topic: true,
          submissions: {
            take: 5,
            include: { autoReview: true, user: { select: { name: true, avatar: true } } },
          },
        },
      })

      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }

      // Enriched commercial SaaS project architecture payload
      const enrichedProject = {
        ...project,
        repository: `https://github.com/stackforge-projects/${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        liveDemo: `https://${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.stackforge.app`,
        requirements: [
          'Implement full state management with clean separation of concerns',
          'Ensure 100% TypeScript type safety with zero implicit any types',
          'Add optimistic UI updates and resilient error boundary fallback state',
          'Configure JWT authentication with secure session token refresh',
        ],
        acceptanceCriteria: [
          'All unit tests pass with >80% statement coverage',
          'Page load or initial load time is under 1.5 seconds on standard 4G',
          'Zero accessibility violations (WCAG AA standard compliance)',
        ],
        folderStructure: `src/\n├── components/\n├── hooks/\n├── lib/\n├── pages/\n└── services/`,
        rubric: {
          architecture: { weight: 25, criteria: 'Clean modular architecture and layered data access' },
          security: { weight: 20, criteria: 'Input sanitization, CORS header protection, and secure auth' },
          testing: { weight: 20, criteria: 'Unit, integration, and E2E coverage for critical paths' },
          performance: { weight: 20, criteria: 'Sub-200ms API response time and bundle size under 200KB' },
          codeQuality: { weight: 15, criteria: 'Strict ESLint pass, meaningful variable names, docstrings' },
        },
        projectCoachTip: 'Focus on building the data layer and Zod validation schemas first before building UI state.',
      }

      return NextResponse.json(enrichedProject)
    }

    const whereClause: any = {}
    if (difficulty) whereClause.difficulty = difficulty

    const [projects, externalProjects] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        include: { topic: true },
        take: 20,
      }),
      prisma.externalProject.findMany({
        take: 10,
        orderBy: { stars: 'desc' },
      }),
    ])

    return NextResponse.json({
      projects,
      externalProjects,
    })
  } catch (error) {
    console.error('Mobile Projects API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
