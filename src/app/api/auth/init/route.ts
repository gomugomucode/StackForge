import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  getSupabaseAdminClient,
  getSupabaseServerUser,
} from "@/lib/supabase-server";

/**
 * Idempotent server-side provisioning for first-time sign-in. Always
 * verifies the caller's Supabase JWT against the service-role client
 * before touching Prisma. This means a forged body claiming any userId
 * is rejected — we only ever provision a row for the *authenticated*
 * user.
 *
 * Provisions:
 *   - Profile (xp=0, streak=0, level=1, totalHours=0)
 *   - Mirror User row for NextAuth legacy compatibility (id keyed by
 *     Supabase user id)
 *
 * The mapping is:
 *   supabase.auth.users.id      → prisma.User.id
 *   supabase.auth.users.email   → prisma.User.email
 *   metadata.username           → prisma.User.name
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const requestedUserId: string | undefined = body?.userId;
    const email: string | undefined = body?.email;
    const username: string | undefined = body?.username;
    const name: string | undefined = body?.name;
    const avatar: string | undefined = body?.avatar;
    const provider: string | undefined = body?.provider;

    // 1. Verify the caller via the request's Supabase session cookie.
    const sessionUser = await getSupabaseServerUser();
    if (!sessionUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Refuse to provision a row for any user other than the caller.
    if (requestedUserId && requestedUserId !== sessionUser.id) {
      return NextResponse.json(
        { error: "Forbidden: cannot provision a different user" },
        { status: 403 }
      );
    }

    const userId = sessionUser.id;
    const finalEmail = email ?? sessionUser.email ?? null;
    const displayName =
      username ||
      name ||
      (sessionUser.user_metadata?.username as string | undefined) ||
      (sessionUser.user_metadata?.name as string | undefined) ||
      finalEmail?.split("@")[0] ||
      "Learner";

    // 3. Upsert the User row (legacy NextAuth compat).
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: finalEmail ?? undefined,
        name: displayName,
        avatar: avatar ?? undefined,
      },
      create: {
        id: userId,
        email: finalEmail ?? `unknown+${userId}@stackforge.local`,
        name: displayName,
        avatar: avatar ?? null,
      },
    });

    // 4. Upsert the Profile row (XP / streak / level). The schema uses
    //    `Profile` for these columns — that table is the spec's
    //    `user_stats`. Defaults match the spec (xp=0, level=1, streak=0).
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        xp: 0,
        streak: 0,
        level: 1,
        totalHours: 0,
      },
    });

    // 5. Best-effort: keep Supabase's user record aligned with our
    //    metadata so subsequent reads are consistent. We never block
    //    sign-in on this.
    try {
      if (SUPABASE_ADMIN_ENABLED) {
        const admin = getSupabaseAdminClient();
        await admin.auth.admin.updateUserById(userId, {
          user_metadata: {
            ...(sessionUser.user_metadata || {}),
            username,
            name,
            avatar_url: avatar,
            provider,
          },
        });
      }
    } catch (e) {
      // Logging only — provisioning is already done.
      console.warn("[auth/init] supabase user_metadata update skipped:", e);
    }

    return NextResponse.json(
      { user: { id: user.id }, profile },
      { status: 200 }
    );
  } catch (error) {
    console.error("[auth/init] init error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const SUPABASE_ADMIN_ENABLED = Boolean(
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
