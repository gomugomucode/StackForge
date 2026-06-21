"use client";

import { useAuth } from "../hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * AuthGuard protects a route subtree. When unauthenticated, redirects to
 * /login with a `from` query param so the user lands back on the page they
 * were trying to visit after a successful login. The login page reads this
 * param via `useSearchParams()` and honors it.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const search = new URLSearchParams({ from: pathname });
      router.replace(`/login?${search.toString()}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
