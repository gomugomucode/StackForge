import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { hasAccess } from "@/lib/access-control";
import { AIService } from "@/features/ai/services/aiService";

export async function POST(req: Request) {
  const sessionUser = await getSupabaseServerUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { categorySlug, userResponse, questionId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Limit check for Mock Interviews
    const mockInterviewsThisWeek = 0;
    if (!hasAccess(user.plan as any, 'mockInterviewsPerWeek', mockInterviewsThisWeek)) {
      return NextResponse.json({ 
        error: "Weekly Mock Interview limit reached", 
        upgradeUrl: "/pricing",
        plan: user.plan 
      }, { status: 403 });
    }

    const category = (await import('@/data/interviews')).interviewCategories.find(c => c.slug === categorySlug);
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    const question = category.questions.find(q => q.id === questionId);
    if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });

    const analysis = await AIService.analyzeInterviewResponse(
      question.question,
      question.answer,
      userResponse
    );

    return NextResponse.json(analysis);

  } catch (error) {
    console.error("Mock Interview Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
