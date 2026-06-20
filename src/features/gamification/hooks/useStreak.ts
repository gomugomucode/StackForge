import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getStreak } from '../services/streakService';

export function useStreak() {
  const { data: session } = useSession();
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStreak() {
      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getStreak(session.user.id);
        setStreak(data);
      } catch (error) {
        console.error('Failed to fetch streak:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStreak();
  }, [session]);

  return { streak, isLoading };
}
