import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase clients.
 *
 * - `getSupabaseServerClient()`  — request-scoped, respects the user's
 *   access/refresh tokens stored in cookies. Use in API routes that need
 *   to honor RLS (preferred).
 * - `getSupabaseAdminClient()`  — service-role client. Use ONLY for
 *   trusted server-only flows (auto-creating a Profile row on first
 *   login, server-side admin actions). Never expose to the browser.
 *
 * Both helpers are the foundation of the auth contract: every protected
 * API route MUST resolve the user via `getSupabaseServerUser()` before
 * touching Prisma. Do not trust query-string userIds.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function getSupabaseServerClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase URL / anon key not configured");
  }
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component (read-only). Safe to ignore —
          // middleware will refresh the session.
        }
      },
    },
  });
}

export function getSupabaseAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Supabase service-role key not configured. Set SUPABASE_SERVICE_ROLE_KEY in your server env. The anon key must NOT be used for admin operations."
    );
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type AuthedUser = {
  id: string;
  email: string | null;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
};

/**
 * Resolve the currently-authenticated user from the request's Supabase
 * session cookie. Returns `null` when there is no valid session.
 *
 * Use this at the top of every protected API route:
 *
 *   const user = await getSupabaseServerUser();
 *   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 *
 *   // Always scope Prisma queries by user.id:
 *   const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
 */
export async function getSupabaseServerUser(): Promise<AuthedUser | null> {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user as AuthedUser | null;
}
