import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { getRecommendedNextLessons } from "@/features/learning/services/learningGraphService";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const user = await getSupabaseServerUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    const recommendations = await getRecommendedNextLessons(user.id, limit);

    return NextResponse.json({
      userId: user.id,
      timestamp: new Date().toISOString(),
      count: recommendations.length,
      recommendations,
    });
  } catch (error: any) {
    logger.error("Failed to generate learning recommendations", error, { userId: user.id });
    return NextResponse.json({ error: "Failed to generate recommendations", details: error.message }, { status: 500 });
  }
}
