import { Suspense } from "react";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black relative overflow-hidden p-4 sm:p-6 pt-12 sm:pt-20 pb-12 sm:pb-20">
      {/* Dynamic Background Mesh Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" />
      
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12 text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          </div>
        }
      >
        <SignupForm />
      </Suspense>
    </div>
  );
}
