'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateLevel, getXPToNextLevel } from '@/lib/gamification';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface UserStatsContextType {
  xp: number;
  level: number;
  streak: number;
  progressToNextLevel: number;
  isLoading: boolean;
  refreshStats: () => Promise<void>;
}

const UserStatsContext = createContext<UserStatsContextType | undefined>(undefined);

export function UserStatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState({ xp: 0, level: 1, streak: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const refreshStats = async () => {
    if (!isAuthenticated) {
      setStats({ xp: 0, level: 1, streak: 0 });
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/user/stats', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setStats({
          xp: data.xp ?? 0,
          level: data.level ?? calculateLevel(data.xp ?? 0),
          streak: data.streak ?? 0,
        });
      }
    } catch (e) {
      console.error('Failed to refresh stats', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    refreshStats();
    // The previous version issued a POST on every mount to "tick" the
    // streak. That fires every navigation. Streak progression now lives
    // in /api/quiz/submit and the explicit /api/user/streak route (see
    // auth remediation report). We only READ on mount here.
  }, [isAuthenticated, authLoading]);

  const progressToNextLevel =
    stats.xp > 0
      ? ((stats.xp - Math.pow(stats.level - 1, 2) * 100) /
          (getXPToNextLevel(stats.xp) + (stats.xp - Math.pow(stats.level - 1, 2) * 100))) *
        100
      : 0;

  return (
    <UserStatsContext.Provider
      value={{
        xp: stats.xp,
        level: stats.level,
        streak: stats.streak,
        progressToNextLevel,
        isLoading,
        refreshStats,
      }}
    >
      {children}
    </UserStatsContext.Provider>
  );
}

export function useUserStats() {
  const context = useContext(UserStatsContext);
  if (!context) throw new Error('useUserStats must be used within UserStatsProvider');
  return context;
}
