"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, CheckCircle2, ArrowRight, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleResend = async () => {
    if (!email) {
      setResendStatus({
        type: "error",
        message: "No email address provided. Please return to signup and try again.",
      });
      return;
    }

    setIsResending(true);
    setResendStatus(null);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        setResendStatus({
          type: "error",
          message: error.message || "Failed to resend confirmation email.",
        });
      } else {
        setResendStatus({
          type: "success",
          message: "Verification email resent! Please check your inbox and spam folder.",
        });
      }
    } catch (err: any) {
      setResendStatus({
        type: "error",
        message: err?.message || "An unexpected error occurred while resending.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 sm:my-10">
      <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-8 md:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-36 bg-purple-500/20 blur-3xl pointer-events-none rounded-full" />

        {/* Mail Icon Header */}
        <div className="text-center mb-6 relative z-10 space-y-3">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-1 shadow-inner">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Check your email</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            We sent a verification link to{" "}
            {email ? (
              <span className="font-semibold text-indigo-300 underline underline-offset-2">{email}</span>
            ) : (
              "your email address"
            )}
          </p>
        </div>

        {/* Verification Guidance */}
        <div className="space-y-4 mb-6 relative z-10">
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 space-y-2.5">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Next Steps:
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Open the email from <strong>StackForge Auth</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Click the <strong>Confirm Email</strong> button to activate your account.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sign in to complete your onboarding and start learning.</span>
              </li>
            </ul>
          </div>

          {resendStatus && (
            <div
              role="alert"
              className={`rounded-xl border p-3.5 text-xs font-medium animate-in fade-in ${
                resendStatus.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              }`}
            >
              {resendStatus.message}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            disabled={isResending}
            onClick={handleResend}
            className="w-full py-3 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 font-medium text-xs gap-2 transition-all"
          >
            {isResending ? (
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span>{isResending ? "Resending..." : "Resend Verification Email"}</span>
          </Button>
        </div>

        {/* Action Link to Login */}
        <div className="pt-4 border-t border-zinc-800/80 text-center relative z-10">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors hover:underline"
          >
            <span>Verified already? Sign in to your account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black relative overflow-hidden p-4 sm:p-6 pt-12 sm:pt-20 pb-12 sm:pb-20">
      {/* Background Mesh Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12 text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
