import { Suspense } from "react";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background text-foreground relative overflow-hidden p-4 sm:p-6 pt-16 pb-16">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <span className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </div>
  );
}
