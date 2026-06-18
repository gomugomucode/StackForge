import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasAccess } from "@/lib/access-control";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Limit check for FREE users
    const mockMessagesToday = 3; // In real world, count from a Messages table
    if (!hasAccess(user.plan as any, 'aiMessagesPerDay', mockMessagesToday)) {
      return NextResponse.json({ 
        error: "Daily AI limit reached", 
        upgradeUrl: "/pricing",
        plan: user.plan 
      }, { status: 403 });
    }

    const { message, nodeId, context } = await req.json();

    // In a real implementation, we would call OpenAI/Anthropic here
    // const response = await openai.chat.completions.create({ ... })
    
    // Mock AI Logic based on Context
    const promptContext = context || "General learning";
    const userMessage = message.toLowerCase();
    
    let aiResponse = "";

    if (userMessage.includes("explain") || userMessage.includes("what is")) {
      aiResponse = `Based on the current module [${promptContext}], this concept is critical. In professional environments, we typically implement this by focusing on scalability and maintainability. Would you like a code example or a high-level architectural overview?`;
    } else if (userMessage.includes("example") || userMessage.includes("code")) {
      aiResponse = `For [${promptContext}], a production-ready implementation usually involves separating concerns. I recommend looking at the "Projects" section of StackForge to see how this is applied in a real-world scenario.`;
    } else if (userMessage.includes("hard") || userMessage.includes("confused")) {
      aiResponse = `Don't worry! [${promptContext}] is one of the steeper learning curves. Try breaking it down into smaller parts. I suggest reviewing the prerequisite node before attempting the checkpoint quiz again.`;
    } else {
      aiResponse = `I'm your Forge Mentor. I see you're studying [${promptContext}]. What specifically can I help you clarify about this module?`;
    }

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      role: "assistant", 
      content: aiResponse,
      timestamp: new Date().toISOString() 
    });

  } catch (error) {
    console.error("AI Mentor Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
