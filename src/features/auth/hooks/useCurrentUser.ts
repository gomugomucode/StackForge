import { useAuth } from "./useAuth";

export function useCurrentUser() {
  const { user, isLoading } = useAuth();

  return {
    currentUser: user,
    isLoading,
  };
}
