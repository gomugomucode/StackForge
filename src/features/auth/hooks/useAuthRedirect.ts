import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function useAuthRedirect(redirectTo?: string) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth?callbackUrl=${encodeURIComponent(redirectTo || '/dashboard')}`);
    }
  }, [status, router, redirectTo]);

  return { session, status, isAuthenticated: status === 'authenticated' };
}
