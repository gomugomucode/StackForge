import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background text-foreground relative overflow-hidden p-4 sm:p-6 pt-16 pb-16">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <span className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
