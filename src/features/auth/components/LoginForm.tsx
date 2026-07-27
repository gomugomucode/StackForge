"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
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
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

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
      <Card variant="default" padding="lg" className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center p-2.5 rounded-xl bg-primary/10 text-primary mb-1">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="text-xs text-muted-foreground">
            Sign in to continue your engineering roadmap
          </p>
        </div>

        {/* Social Authentication */}
        <div className="space-y-4">
          <SocialLoginButtons />
          
          <div className="relative flex items-center justify-center py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>
            <span className="relative px-3 text-[10px] font-bold tracking-wider text-muted-foreground uppercase bg-card">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {errorMessage && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive animate-in fade-in"
              >
                {errorMessage}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-foreground">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="engineer@stackforge.dev"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-foreground">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-[11px] text-destructive" />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              isLoading={isLoading}
              type="submit"
              variant="primary"
              size="md"
              className="w-full gap-2 mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="pt-3 border-t border-border/40 text-center">
              <p className="text-xs text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href={
                    fromParam
                      ? `/auth/signup?from=${encodeURIComponent(fromParam)}`
                      : "/auth/signup"
                  }
                  className="font-semibold text-primary hover:underline"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
