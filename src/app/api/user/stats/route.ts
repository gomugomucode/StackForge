import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

/**
 * GET /api/user/stats
 *
 * Returns the authenticated user's XP, level, streak, totalHours, and
 * lastActive from the Profile table. Always scoped to the caller — no
 * cross-user reads possible.
 */
export async function GET() {
  const user = await getSupabaseServerUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      // Lazy-provision a default row so the dashboard renders instead
      // of returning a partial state.
      const created = await prisma.profile.create({
        data: { userId: user.id },
      });
      return NextResponse.json({
        xp: created.xp,
        level: created.level,
        streak: created.streak,
        totalHours: created.totalHours,
        lastActive: created.lastActive,
      });
    }

    return NextResponse.json({
      xp: profile.xp,
      level: profile.level,
      streak: profile.streak,
      totalHours: profile.totalHours,
      lastActive: profile.lastActive,
    });
  } catch (error) {
    console.error("[api/user/stats] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
