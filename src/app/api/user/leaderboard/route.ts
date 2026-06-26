import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const topProfiles = await prisma.profile.findMany({
      take: 10,
      orderBy: {
        xp: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    const leaderboard = topProfiles.map((p, idx) => ({
      rank: idx + 1,
      name: p.user?.name || "Student",
      avatar: p.user?.avatar || null,
      xp: p.xp,
      level: p.level,
      streak: p.streak,
    }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("[API /user/leaderboard] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
