import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { hasAccess } from "@/lib/access-control";
import { AIService } from "@/features/ai/services/aiService";
import { buildGroundedUserContext } from "@/features/ai/services/aiContextBuilder";

export async function POST(req: Request) {
  const sessionUser = await getSupabaseServerUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Limit check for FREE users
    const mockMessagesToday = 3;
    if (!hasAccess(user.plan as any, 'aiMessagesPerDay', mockMessagesToday)) {
      return NextResponse.json({ 
        error: "Daily AI limit reached", 
        upgradeUrl: "/pricing",
        plan: user.plan 
      }, { status: 403 });
    }

    const { message } = await req.json();

    // Fetch Grounded Context from User Data & Learning Graph
    const groundedContext = await buildGroundedUserContext(sessionUser.id);
    const serializedContext = JSON.stringify(groundedContext);

    const aiResponse = await AIService.generateMentorResponse(message, serializedContext);

    return NextResponse.json({ 
      role: "assistant", 
      content: aiResponse,
      groundedContext: {
        activeRoadmap: groundedContext.activeRoadmap?.title || "General",
        recommendations: groundedContext.graphRecommendations,
      },
      timestamp: new Date().toISOString() 
    });

  } catch (error) {
    console.error("AI Mentor Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
