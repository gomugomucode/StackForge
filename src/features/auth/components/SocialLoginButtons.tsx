"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Github, Chrome } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

/**
 * OAuth sign-in. Backed exclusively by Supabase Auth. On return Supabase
 * redirects to /auth/callback with the OAuth code; that page exchanges
 * the code and provisions the profile.
 *
 * The current path's `?from=` is forwarded into the callback so the
 * user lands on the page they originally tried to reach.
 */
export function SocialLoginButtons() {
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get("from");

  async function handleOAuth(provider: "github" | "google") {
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    if (fromParam) callbackUrl.searchParams.set("from", fromParam);

    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: callbackUrl.toString() },
    });
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        onClick={() => handleOAuth("github")}
        className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white transition-colors"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button
        variant="outline"
        onClick={() => handleOAuth("google")}
        className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white transition-colors"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
