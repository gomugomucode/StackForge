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
import { SocialLoginButtons } from "./SocialLoginButtons";
import { Loader2, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const FALLBACK_REDIRECT = "/dashboard";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get("from");

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
    if (m.includes("invalid login credentials")) return "Invalid email or password.";
    if (m.includes("email not confirmed")) return "Please check your inbox and confirm your email before logging in.";
    if (m.includes("user not found")) return "No StackForge account found with that email.";
    if (m.includes("rate limit")) return "Too many sign-in attempts. Please wait a moment.";
    if (m.includes("network") || m.includes("fetch")) return "Network error. Please check your internet connection.";
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
        try {
          await fetch("/api/auth/init", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(data.session?.access_token ? { Authorization: `Bearer ${data.session.access_token}` } : {}),
            },
            body: JSON.stringify({
              userId: data.user.id,
              email: data.user.email,
            }),
          });
        } catch {
          // Idempotent server provision fallback
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
    <div className="w-full max-w-md mx-auto my-6 sm:my-10">
      <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-8 md:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-36 bg-indigo-500/20 blur-3xl pointer-events-none rounded-full" />
        
        {/* Header */}
        <div className="text-center mb-8 relative z-10 space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-zinc-900 border border-zinc-800/80 text-white mb-2 shadow-inner">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Welcome back</h1>
          <p className="text-xs text-zinc-400">
            Sign in to continue your developer learning roadmap
          </p>
        </div>

        {/* Social Authentication */}
        <div className="relative z-10 space-y-4 mb-6">
          <SocialLoginButtons />
          
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/80" />
            </div>
            <span className="relative px-3 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase bg-zinc-950">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 relative z-10">
            {errorMessage && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-300 animate-in fade-in"
              >
                {errorMessage}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-zinc-300">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="engineer@stackforge.dev"
                      {...field}
                      className="bg-zinc-900/90 border-zinc-800 text-white text-sm rounded-xl py-2.5 px-3.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-600"
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-xs font-medium text-zinc-300">Password</FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        {...field}
                        className="bg-zinc-900/90 border-zinc-800 text-white text-sm rounded-xl py-2.5 pl-3.5 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors p-1"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-[11px] text-red-400" />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-600/25 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <div className="pt-4 border-t border-zinc-800/80 text-center">
              <p className="text-xs text-zinc-400">
                Don't have an account?{" "}
                <Link
                  href={
                    fromParam
                      ? `/auth/signup?from=${encodeURIComponent(fromParam)}`
                      : "/auth/signup"
                  }
                  className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors hover:underline"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
