import { useSession } from "next-auth/react";
import { AuthUser } from "../types/auth.types";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user as AuthUser | undefined,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
