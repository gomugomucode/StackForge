import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser, AuthedUser } from "@/lib/supabase-server";
import { prisma } from "@/lib/prisma";

export async function requireAuth(req: NextRequest): Promise<{ user: AuthedUser; dbUser: any } | NextResponse> {
  const user = await getSupabaseServerUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  // Fetch or ensure database user record
  let dbUser = await prisma.user.findFirst({
    where: { OR: [{ id: user.id }, { email: user.email || "" }] },
  });

  if (!dbUser && user.email) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email.split("@")[0],
        avatar: user.user_metadata?.avatar_url || null,
        role: user.app_metadata?.role === "ADMIN" ? "ADMIN" : "USER",
      },
    });
  }

  return { user, dbUser };
}

export async function requireAdmin(req: NextRequest): Promise<{ user: AuthedUser; dbUser: any } | NextResponse> {
  const result = await requireAuth(req);
  if (result instanceof NextResponse) return result;

  const { dbUser, user } = result;
  const isSuperAdmin = user.app_metadata?.role === "ADMIN" || dbUser.role === "ADMIN" || dbUser.email?.endsWith("@stackforge.dev");

  if (!isSuperAdmin) {
    return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
  }

  return { user, dbUser };
}
