import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

/**
 * GET /api/user/profile
 *
 * Returns the authenticated user's Profile row. The previous version
 * accepted an arbitrary `?id=` query, which leaked data across users.
 * Authorization is enforced at the API layer (Supabase session → user
 * id) AND in Postgres via RLS (see reports/AUTH_REMEDIATION_REPORT.md).
 */
export async function GET() {
  const user = await getSupabaseServerUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
            plan: true,
            createdAt: true,
          },
        },
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("[api/user/profile] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
