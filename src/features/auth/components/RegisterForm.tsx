"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

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
import { Eye, EyeOff, Sparkles, Check, ArrowRight } from "lucide-react";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[0-9]/, "Include at least one number")
  .regex(/[^A-Za-z0-9]/, "Include at least one special character");

const registerSchema = z
  .object({
    name: z.string().min(2, "Please enter your name").max(60),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30)
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Please enter a valid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const FALLBACK_REDIRECT = "/dashboard";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const { signUp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get("from");
  const redirectTo =
    fromParam && fromParam.startsWith("/") && !fromParam.startsWith("//")
      ? fromParam
      : FALLBACK_REDIRECT;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = form.watch("password") || "";

  const passwordChecks = [
    { label: "8+ characters", valid: passwordValue.length >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(passwordValue) },
    { label: "Lowercase letter", valid: /[a-z]/.test(passwordValue) },
    { label: "Number", valid: /[0-9]/.test(passwordValue) },
    { label: "Special character", valid: /[^A-Za-z0-9]/.test(passwordValue) },
  ];

  function describeAuthError(message: string | undefined): string {
    if (!message) return "Could not create your account. Please try again.";
    const m = message.toLowerCase();
    if (m.includes("already registered") || m.includes("already been registered"))
      return "An account with that email already exists. Try signing in instead.";
    if (m.includes("password")) return message;
    if (m.includes("rate limit")) return "Too many attempts. Please wait a moment.";
    if (m.includes("network") || m.includes("fetch")) return "Network error. Check your connection.";
    return message;
  }

  async function onSubmit(values: RegisterFormValues) {
    setErrorMessage(null);
    setInfoMessage(null);
    setIsLoading(true);
    try {
      const { data, error } = await signUp(values.email, values.password, {
        name: values.name,
        username: values.username,
      });
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
              username: values.username,
              name: values.name,
            }),
          });
        } catch {
          // Idempotent provisioning fallback
        }
        if (data.session) {
          router.replace(redirectTo);
        } else {
          router.push(`/auth/verify-email?email=${encodeURIComponent(values.email)}`);
        }
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Join StackForge</h1>
          <p className="text-xs text-muted-foreground">
            Start your journey toward engineering mastery today
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
              Or sign up with email
            </span>
          </div>
        </div>

        {/* Signup Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
            {errorMessage && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive animate-in fade-in"
              >
                {errorMessage}
              </div>
            )}

            {infoMessage && (
              <div
                role="alert"
                className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in"
              >
                {infoMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }: { field: any }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-medium text-foreground">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="name"
                        placeholder="Ada Lovelace"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[11px] text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }: { field: any }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-medium text-foreground">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ada_dev"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[11px] text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1">
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
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-foreground">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
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

            {/* Password Validation Indicators */}
            {passwordValue.length > 0 && (
              <div className="p-2.5 rounded-lg bg-secondary/60 border border-border/40 space-y-1.5 animate-in fade-in">
                <p className="text-[11px] font-semibold text-muted-foreground">Password Requirements:</p>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  {passwordChecks.map((check, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                          check.valid
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {check.valid ? <Check className="w-2.5 h-2.5" /> : "•"}
                      </div>
                      <span className={check.valid ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-foreground">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="pt-3 border-t border-border/40 text-center">
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href={
                    fromParam
                      ? `/auth/login?from=${encodeURIComponent(fromParam)}`
                      : "/auth/login"
                  }
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
