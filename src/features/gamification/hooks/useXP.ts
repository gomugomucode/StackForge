import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getUserXP } from '../services/xpService';

export function useXP() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ xp: 0, level: 1 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchXP() {
      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getUserXP(session.user.id);
        if (data) setStats({ xp: data.xp, level: data.level });
      } catch (error) {
        console.error('Failed to fetch XP:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchXP();
  }, [session]);

  return { ...stats, isLoading };
}
