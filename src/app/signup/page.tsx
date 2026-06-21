import { Suspense } from "react";
import { SignupForm } from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
