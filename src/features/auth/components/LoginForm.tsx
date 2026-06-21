"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const FALLBACK_REDIRECT = "/dashboard";

/**
 * Real email/password login. Always talks to Supabase Auth — no mock
 * paths, no localStorage state. After a successful sign-in, the server-
 * side profile/stats auto-creation is kicked off and we redirect to the
 * page the user originally tried to reach (or /dashboard).
 */
export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get("from");
  // Only allow same-origin paths to prevent open-redirect.
  const redirectTo =
    fromParam && fromParam.startsWith("/") && !fromParam.startsWith("//")
      ? fromParam
      : FALLBACK_REDIRECT;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function describeAuthError(message: string | undefined): string {
    if (!message) return "Something went wrong. Please try again.";
    const m = message.toLowerCase();
    if (m.includes("invalid login credentials")) return "Wrong email or password.";
    if (m.includes("email not confirmed")) return "Please confirm your email before signing in.";
    if (m.includes("user not found")) return "No account found for that email.";
    if (m.includes("rate limit")) return "Too many attempts. Please wait a moment and try again.";
    if (m.includes("network") || m.includes("fetch")) return "Network error. Check your connection.";
    return message;
  }

  async function onSubmit(values: LoginFormValues) {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const { data, error } = await signIn(values.email, values.password);
      if (error) {
        setErrorMessage(describeAuthError(error.message));
        return;
      }
      if (data?.user) {
        // Best-effort server-side profile/stats provisioning. The server
        // route is idempotent (upsert), so retrying is safe.
        try {
          await fetch("/api/auth/init", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: data.user.id,
              email: data.user.email,
            }),
          });
        } catch {
          // Non-fatal; the server-side trigger handles missing rows.
        }
        router.replace(redirectTo);
      }
    } catch (err: any) {
      setErrorMessage(describeAuthError(err?.message));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {errorMessage && (
          <div
            role="alert"
            className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
          >
            {errorMessage}
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="engineer@stackforge.com"
                  {...field}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...field}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          type="submit"
          className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>

        <p className="text-center text-xs text-zinc-500">
          New here?{" "}
          <Link
            href={
              fromParam
                ? `/auth/signup?from=${encodeURIComponent(fromParam)}`
                : "/auth/signup"
            }
            className="text-blue-400 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </Form>
  );
}
