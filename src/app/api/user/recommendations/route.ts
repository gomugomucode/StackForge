import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { LearningRecommendationService } from "@/features/learning/services/learningRecommendationService";

export async function GET(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const recommendations = await LearningRecommendationService.getRecommendations(user.id);
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("[API /user/recommendations] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
