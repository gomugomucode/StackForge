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

    if (!profile) return NextResponse.json(profile);

    // Flatten user fields onto the top level for convenient consumption
    // by the AuthProvider / dashboard / profile header. We do NOT touch
    // the (non-existent) `email`/`username`/`avatar` columns on the
    // Profile table — identity fields live on `User`.
    return NextResponse.json({
      ...profile,
      name: profile.user?.name ?? null,
      avatar: profile.user?.avatar ?? null,
      username: profile.user?.name ?? null,
    });
  } catch (error) {
    console.error("[api/user/profile] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
