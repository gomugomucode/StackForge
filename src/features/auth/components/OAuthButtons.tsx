"use client";

import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

/**
 * OAuth sign-in. Routes through Supabase Auth exclusively (single source
 * of truth). On return Supabase redirects to /auth/callback, which
 * exchanges the code for a session and provisions the user profile.
 *
 * The `from` query param is preserved so we can land the user back on the
 * page they originally tried to visit.
 */
export function OAuthButtons() {
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get("from");

  async function startOAuth(provider: "google" | "github") {
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    if (fromParam) callbackUrl.searchParams.set("from", fromParam);

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });
  }

  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      <Button
        variant="outline"
        onClick={() => startOAuth("google")}
        className="flex items-center justify-center gap-2"
      >
        <FcGoogle className="w-5 h-5" />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        onClick={() => startOAuth("github")}
        className="flex items-center justify-center gap-2"
      >
        <FaGithub className="w-5 h-5" />
        Continue with GitHub
      </Button>
    </div>
  );
}
