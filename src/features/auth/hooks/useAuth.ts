import { useAuth as useSupabaseAuth } from "@/components/AuthProvider";
import { AuthUser } from "../types/auth.types";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

/**
 * Feature-layer auth hook. Backed exclusively by Supabase Auth
 * (see /src/components/AuthProvider.tsx). Returns a normalized shape
 * matching the original `useAuth()` contract so that consumers
 * (Navbar, UserMenu, AuthGuard, dashboard, etc.) keep working.
 */
export function useAuth() {
  const { session, user, profile, isLoading } = useSupabaseAuth();

  const isAuthenticated = !!session && !!user;
  const status: AuthStatus = isLoading
    ? "loading"
    : isAuthenticated
      ? "authenticated"
      : "unauthenticated";

  return {
    user: user as unknown as AuthUser | undefined,
    session,
    profile,
    isAuthenticated,
    isLoading,
    status,
  };
}
