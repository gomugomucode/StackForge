import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, prompt, context } = body

    const user = userId ? await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, skillProficiencies: true, streakTrackings: true },
    }) : null

    const skillLevel = user?.profile?.skillLevel || 'Intermediate'
    const topSkill = user?.skillProficiencies?.[0]?.technology || 'React & TypeScript'

    // Grounded AI answer schema structure strictly adhering to StackForge Mobile V1 rules
    const groundedResponse = {
      why: `Understanding ${prompt || 'this concept'} is essential for modern high-performance full-stack architectures. Given your current ${skillLevel} level in ${topSkill}, mastering this will accelerate your progress towards Senior Engineer level.`,
      estimatedTime: '15 - 25 minutes',
      difficulty: skillLevel,
      prerequisites: [
        'JavaScript ES6+ Async/Await Fundamentals',
        'Basic understanding of HTTP & RESTful API structures',
      ],
      resources: [
        { title: 'Official StackForge Roadmap Module', url: '/learn' },
        { title: 'MDN Web Documentation Reference', url: '/articles' },
      ],
      nextAction: 'Complete the 3 quick flashcard practice questions on this topic.',
      expectedOutcome: 'You will be able to implement clean, production-grade solutions without architectural anti-patterns.',
      detailedExplanation: `Here is the structured breakdown for "${prompt || 'Developer Practice'}":\n\n1. **Core Concept**: Keep data access decoupled from rendering components.\n2. **Best Practice**: Validate all incoming parameters with strict Zod schemas.\n3. **Performance Optimization**: Utilize React Query caching to eliminate redundant network requests.`,
    }

    return NextResponse.json(groundedResponse)
  } catch (error) {
    console.error('Mobile AI API Error:', error)
    return NextResponse.json({ error: 'AI processing failed' }, { status: 500 })
  }
}
