"use client";

import { UserDropdown } from "@/components/layout/UserDropdown";
import { useAuth } from "../hooks/useAuth";

export function UserMenu() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return <UserDropdown />;
}
