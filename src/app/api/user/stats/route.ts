import { NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { getUserGamificationStats } from "@/features/gamification/services/xpService";

/**
 * GET /api/user/stats
 *
 * Returns the authenticated user's unified gamification stats from xpService.
 */
export async function GET() {
  const user = await getSupabaseServerUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = await getUserGamificationStats(user.id);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[api/user/stats] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
