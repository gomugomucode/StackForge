import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);

    const profiles = await prisma.profile.findMany({
      take: limit,
      orderBy: [
        { xp: "desc" },
        { level: "desc" },
        { streak: "desc" },
      ],
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    const leaderboard = (profiles as any[]).map((p, index) => ({
      rank: index + 1,
      userId: p.userId,
      name: p.user?.name || p.user?.email?.split("@")[0] || "Anonymous Developer",
      username: p.user?.email?.split("@")[0] || p.userId.substring(0, 8),
      avatar: p.user?.avatar || null,
      level: p.level,
      xp: p.xp,
      streak: p.streak,
      skillLevel: p.skillLevel || "Developer",
    }));

    return NextResponse.json({ leaderboard });
  } catch (error: any) {
    console.error("[API /api/user/leaderboard] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
