import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { skillLevel, interests, goal } = body;

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        skillLevel: skillLevel || "Beginner",
        interests: Array.isArray(interests) ? interests : [],
        goal: goal || null,
        onboardingCompleted: true,
        lastActive: new Date(),
      },
      create: {
        userId: user.id,
        skillLevel: skillLevel || "Beginner",
        interests: Array.isArray(interests) ? interests : [],
        goal: goal || null,
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error: any) {
    console.error("[API /api/user/onboarding] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
