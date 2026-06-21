"use client";

import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

/**
 * Profile subtree is auth-only. The previous implementation rendered
 * /profile without a guard, which left user-scoped data fields
 * uninitialized for anonymous visitors.
 */
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
