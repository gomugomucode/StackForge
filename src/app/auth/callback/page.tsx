"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

/**
 * OAuth callback handler. Supabase appends `?code=...` to this URL after
 * a successful Google/GitHub authorization. We:
 *
 *   1. Exchange the code for a session (handled implicitly by the
 *      supabase-js client when it sees the URL on load — but we also
 *      explicitly call `getSession()` to be sure).
 *   2. Trigger server-side profile + stats provisioning via
 *      /api/auth/init (idempotent upsert).
 *   3. Redirect to the original target (the `from` query param) or
 *      /dashboard by default.
 *
 * If anything fails, we render a short error and a manual retry link —
 * we never silently redirect an unauthenticated user to a protected
 * page.
 */
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fromParam = searchParams?.get("from");
  const redirectTo =
    fromParam && fromParam.startsWith("/") && !fromParam.startsWith("//")
      ? fromParam
      : "/dashboard";

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        // The supabase-js browser client already detects `?code=` in the
        // URL and exchanges it for a session. Calling getSession() forces
        // it to commit the result.
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (cancelled) return;

        if (error || !session?.user) {
          setStatus("error");
          setErrorMessage(
            error?.message ||
              "We couldn't complete sign-in. Please try again."
          );
          return;
        }

        // Best-effort server-side profile/stats provisioning. The server
        // route is idempotent, so it's safe to call repeatedly.
        try {
          await fetch("/api/auth/init", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              email: session.user.email,
              name:
                (session.user.user_metadata?.name as string | undefined) ??
                undefined,
              username:
                (session.user.user_metadata?.user_name as string | undefined) ??
                (session.user.user_metadata?.username as string | undefined) ??
                undefined,
              avatar:
                (session.user.user_metadata?.avatar_url as string | undefined) ??
                (session.user.user_metadata?.picture as string | undefined) ??
                undefined,
              provider: session.user.app_metadata?.provider,
            }),
          });
        } catch {
          // Non-fatal; the server side upsert will be retried on next
          // dashboard load.
        }

        router.replace(redirectTo);
      } catch (err: any) {
        if (cancelled) return;
        setStatus("error");
        setErrorMessage(err?.message || "Unexpected error during sign-in.");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [redirectTo, router]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full space-y-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Sign-in failed
          </h1>
          <p className="text-muted-foreground text-sm">
            {errorMessage ?? "Something went wrong while signing you in."}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href={`/login${fromParam ? `?from=${encodeURIComponent(fromParam)}` : ""}`}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
            >
              Back to login
            </a>
            <a
              href={`/signup${fromParam ? `?from=${encodeURIComponent(fromParam)}` : ""}`}
              className="px-4 py-2 rounded-md border border-border text-foreground text-sm font-medium hover:bg-secondary"
            >
              Create account
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        <p className="text-sm text-muted-foreground">
          Finishing sign-in…
        </p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
