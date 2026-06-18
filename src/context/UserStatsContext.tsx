'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateLevel, getXPToNextLevel } from '@/lib/gamification';

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

  const refreshStats = async () => {
    try {
      const res = await fetch('/api/user/stats');
      if (res.ok) {
        const data = await res.json();
        setStats({ 
          xp: data.xp, 
          level: calculateLevel(data.xp), // Use the formula for real-time accuracy
          streak: data.streak 
        });
      }
    } catch (e) {
      console.error("Failed to refresh stats", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshStats();
    // Daily streak update
    fetch('/api/user/stats', { method: 'POST' });
  }, []);

  const progressToNextLevel = ((stats.xp - (Math.pow(stats.level - 1, 2) * 100)) / (getXPToNextLevel(stats.xp) + (stats.xp - (Math.pow(stats.level - 1, 2) * 100))) * 100) || 0;

  return (
    <UserStatsContext.Provider value={{ 
      xp: stats.xp, 
      level: stats.level, 
      streak: stats.streak, 
      progressToNextLevel, 
      isLoading, 
      refreshStats 
    }}>
      {children}
    </UserStatsContext.Provider>
  );
}

export function useUserStats() {
  const context = useContext(UserStatsContext);
  if (!context) throw new Error('useUserStats must be used within UserStatsProvider');
  return context;
}
