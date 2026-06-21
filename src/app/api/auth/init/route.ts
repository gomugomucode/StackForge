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
 *   - User row (NextAuth legacy compat; keyed by Supabase user id)
 *   - Profile row (xp=0, streak=0, level=1, totalHours=0)
 *
 * Mapping from the spec:
 *   spec.profiles        → prisma.User (id, email, name, avatar, plan)
 *   spec.user_stats      → prisma.Profile (xp, level, streak, totalHours,
 *                          lastActive, joinedAt)
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    // 3. Upsert the User row (spec's profiles table). Carries identity
    //    fields (email, name, avatar) and the billing plan.
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

    // 4. Upsert the Profile row (spec's user_stats table). Defaults
    //    match the spec (xp=0, level=1, streak=0).
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

    // 5. Best-effort: keep Supabase's user_metadata in sync so future
    //    reads from the client are consistent. We never block sign-in on
    //    this — the Prisma rows are the source of truth.
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
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
      console.warn("[auth/init] supabase user_metadata update skipped:", e);
    }

    return NextResponse.json(
      {
        user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar },
        profile,
      },
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
