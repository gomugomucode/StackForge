import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UserProgress } from '../core/types/academy';

interface ProgressContextType {
  progress: UserProgress;
  markCompleted: (contentId: string, timeSpent?: number, score?: number) => void;
  toggleBookmark: (contentId: string, type: any) => void;
  updateStreak: () => void;
  addXP: (amount: number) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const INITIAL_PROGRESS: UserProgress = {
  completedContent: {},
  bookmarks: {},
  streak: { current: 0, longest: 0, lastActive: '' },
  totalLearningHours: 0,
  xp: 0,
  level: 1,
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);

  useEffect(() => {
    const saved = localStorage.getItem('stackforge_academy_progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress data', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stackforge_academy_progress', JSON.stringify(progress));
  }, [progress]);

  const markCompleted = useCallback((contentId: string, timeSpent = 15, score = 100) => {
    setProgress(prev => {
      const isAlreadyCompleted = !!prev.completedContent[contentId];
      if (isAlreadyCompleted) return prev;

      return {
        ...prev,
        completedContent: {
          ...prev.completedContent,
          [contentId]: { completedAt: new Date().toISOString(), timeSpent, score }
        },
        totalLearningHours: prev.totalLearningHours + (timeSpent / 60),
        xp: prev.xp + 100, // Basic reward for completing
        level: Math.floor((prev.xp + 100) / 1000) + 1,
      };
    });
  }, []);

  const toggleBookmark = useCallback((contentId: string, type: any) => {
    setProgress(prev => {
      const exists = prev.bookmarks[contentId];
      const newBookmarks = { ...prev.bookmarks };
      
      if (exists) {
        delete newBookmarks[contentId];
      } else {
        newBookmarks[contentId] = { addedAt: new Date().toISOString(), type };
      }

      return { ...prev, bookmarks: newBookmarks };
    });
  }, []);

  const updateStreak = useCallback(() => {
    setProgress(prev => {
      const today = new Date().toDateString();
      if (prev.streak.lastActive === today) return prev;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const isConsecutive = prev.streak.lastActive === yesterday.toDateString();
      const newStreak = isConsecutive ? prev.streak.current + 1 : 1;

      return {
        ...prev,
        streak: {
          current: newStreak,
          longest: Math.max(prev.streak.longest, newStreak),
          lastActive: today,
        }
      };
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + amount,
      level: Math.floor((prev.xp + amount) / 1000) + 1,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS);
  }, []);

  return (
    <ProgressContext.Provider value={{ progress, markCompleted, toggleBookmark, updateStreak, addXP, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
