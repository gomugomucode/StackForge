import { supabase } from "@/lib/supabase";

/**
 * Auth service helpers. The single source of truth is Supabase Auth
 * (see /src/components/AuthProvider.tsx). NextAuth is no longer the
 * authentication backend; we keep its OAuth callback route as a
 * dead-letter in case some providers were wired there historically, but
 * new flows must use `supabase.auth.signInWithOAuth(...)` instead.
 */
export const authService = {
  /**
   * Trigger Google OAuth via Supabase. The Supabase client handles the
   * redirect; on return, /auth/callback exchanges the code.
   */
  async loginWithGoogle(redirectTo?: string) {
    const url = new URL("/auth/callback", window.location.origin);
    if (redirectTo) url.searchParams.set("from", redirectTo);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: url.toString() },
    });
  },

  async loginWithGithub(redirectTo?: string) {
    const url = new URL("/auth/callback", window.location.origin);
    if (redirectTo) url.searchParams.set("from", redirectTo);
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: url.toString() },
    });
  },

  /**
   * Sign out. Always Supabase. Redirects to the home page.
   */
  async logout() {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  },
};
