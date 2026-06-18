import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasAccess } from "@/lib/access-control";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { categorySlug, userResponse, questionId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Limit check for Mock Interviews
    const mockInterviewsThisWeek = 0; // Mock count
    if (!hasAccess(user.plan as any, 'mockInterviewsPerWeek', mockInterviewsThisWeek)) {
      return NextResponse.json({ 
        error: "Weekly Mock Interview limit reached", 
        upgradeUrl: "/pricing",
        plan: user.plan 
      }, { status: 403 });
    }

    const category = (await import('@/data/interviews')).interviewCategories.find(c => c.slug === categorySlug);
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 })

    const question = category.questions.find(q => q.id === questionId)
    if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 })

    // Mock AI Analysis Logic
    // In production, this would use an LLM to compare userResponse with question.answer
    const responseLen = userResponse.length;
    const containsKeywords = question.answer.toLowerCase()
      .split(' ')
      .filter(word => word.length > 4)
      .some(word => userResponse.toLowerCase().includes(word));

    let score = 0;
    let feedback = "";

    if (responseLen < 20) {
      score = 20;
      feedback = "Your answer is too brief. Try to elaborate more on the technical implementation and the 'why' behind the concept.";
    } else if (containsKeywords && responseLen > 100) {
      score = 95;
      feedback = "Excellent! You captured the core technical nuances and provided sufficient detail. This is a senior-level response.";
    } else if (containsKeywords) {
      score = 70;
      feedback = "Good. You have the core concept right, but could improve by adding real-world examples or discussing edge cases.";
    } else {
      score = 40;
      feedback = "You're on the right track, but missed some key technical points. I recommend reviewing the 'Expert Answer' and focusing on the core mechanics.";
    }

    return NextResponse.json({
      score,
      feedback,
      expertAnswer: question.answer,
      grade: score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'F'
    })

  } catch (error) {
    console.error("Mock Interview Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
