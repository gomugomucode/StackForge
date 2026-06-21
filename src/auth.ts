/**
 * Legacy auth shim. NextAuth has been removed as the authentication
 * backend — Supabase Auth is now the single source of truth.
 *
 * Existing imports of `auth` or `authOptions` still resolve for
 * backwards compatibility, but `auth()` now returns the Supabase
 * session shape (or null) instead of a NextAuth session. Callers should
 * migrate to `getSupabaseServerUser()` from `@/lib/supabase-server`
 * for the canonical API.
 */
import { getSupabaseServerUser } from "@/lib/supabase-server";

export const authOptions = {} as const;

export async function auth() {
  const user = await getSupabaseServerUser();
  if (!user) return null;
  return {
    user: {
      id: user.id,
      email: user.email ?? undefined,
      name:
        (user.user_metadata?.name as string | undefined) ??
        (user.user_metadata?.username as string | undefined) ??
        user.email?.split("@")[0],
      image: (user.user_metadata?.avatar_url as string | undefined) ?? null,
    },
  };
}
