"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

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

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^A-Za-z0-9]/, "Password must contain a special character");

const registerSchema = z
  .object({
    name: z.string().min(2, "Please enter your name").max(60),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30)
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),
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

/**
 * Real signup. Goes through Supabase Auth (`signUp`). Surfaces errors to
 * the UI instead of swallowing them, and validates a strong password
 * (≥8 chars, upper, lower, number, special). On success we trigger
 * server-side profile/stats provisioning and redirect to the page the
 * user was originally trying to reach (or /dashboard).
 */
export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: data.user.id,
              email: data.user.email,
              username: values.username,
              name: values.name,
            }),
          });
        } catch {
          // Server-side provisioning is idempotent.
        }
        // Supabase may require email confirmation. If the session is
        // present we go to dashboard; otherwise prompt the user to check
        // their inbox.
        if (data.session) {
          router.replace(redirectTo);
        } else {
          setErrorMessage(
            "Almost there! Check your email to confirm your account before signing in."
          );
        }
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
            className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200"
          >
            {errorMessage}
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Full Name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="name"
                  placeholder="Ada Lovelace"
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
          name="username"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="ada_dev"
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
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...field}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </FormControl>
              <FormMessage />
              <p className="text-[11px] text-zinc-500">
                8+ chars, with upper, lower, number and special character.
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
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
          Create Account
        </Button>

        <p className="text-center text-xs text-zinc-500">
          Already have an account?{" "}
          <Link
            href={
              fromParam
                ? `/login?from=${encodeURIComponent(fromParam)}`
                : "/login"
            }
            className="text-blue-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
