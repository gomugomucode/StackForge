import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const technology = searchParams.get('technology') || 'TypeScript'
    const slug = searchParams.get('slug')

    // Find core topic or node
    const topic = await prisma.topic.findFirst({
      where: slug ? { slug } : { technology: { equals: technology, mode: 'insensitive' } },
      include: {
        content: true,
        examples: true,
        challenges: true,
        quizzes: { include: { questions: true } },
        cheatSheets: true,
        interviews: true,
        projects: true,
      },
    })

    if (!topic) {
      return NextResponse.json({ error: 'Knowledge node not found' }, { status: 404 })
    }

    // Related articles and projects from DB
    const [relatedArticles, relatedProjects, relatedQuestions, learningEdges] = await Promise.all([
      prisma.externalArticle.findMany({
        where: {
          OR: [
            { tags: { has: topic.technology } },
            { title: { contains: topic.technology, mode: 'insensitive' } },
          ],
        },
        take: 6,
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { difficulty: topic.difficulty },
            { topicId: topic.id },
          ],
        },
        take: 4,
      }),
      prisma.interviewQuestion.findMany({
        where: {
          OR: [
            { topicId: topic.id },
            { tags: { has: topic.technology } },
          ],
        },
        take: 6,
      }),
      prisma.learningEdge.findMany({
        take: 10,
      }),
    ])

    return NextResponse.json({
      node: {
        id: topic.id,
        title: topic.title,
        slug: topic.slug,
        technology: topic.technology,
        difficulty: topic.difficulty,
        estimatedTime: topic.estimatedTime,
        prerequisites: topic.prerequisites,
        learningObjectives: topic.learningObjectives,
        tags: topic.tags,
        nextTopics: topic.nextTopics,
      },
      content: topic.content,
      examples: topic.examples,
      challenges: topic.challenges,
      cheatSheets: topic.cheatSheets,
      quizzes: topic.quizzes,
      interviews: relatedQuestions.length > 0 ? relatedQuestions : topic.interviews,
      projects: relatedProjects.length > 0 ? relatedProjects : topic.projects,
      relatedArticles,
      graphEdges: learningEdges,
    })
  } catch (error) {
    console.error('Knowledge Graph API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch knowledge graph node' }, { status: 500 })
  }
}
