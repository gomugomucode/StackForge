'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Achievement, UserProgress } from '@/lib/core/types/academy';
import { useProgress } from './ProgressContext';

interface AchievementContextType {
  unlockedAchievements: Achievement[];
  checkAchievements: () => void;
  unlockAchievement: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_lesson',        title: 'First Lesson',       description: 'Complete your first tutorial',      icon: 'BookOpen', criteria: 'completedContent >= 1',   category: 'exploration' },
  { id: 'streak_7',            title: 'Consistency King',   description: 'Maintain a 7-day learning streak',   icon: 'Flame',    criteria: 'streak >= 7',             category: 'consistency' },
  { id: 'frontend_master',     title: 'Frontend Explorer',  description: 'Complete all Frontend basics',       icon: 'Layout',   criteria: 'frontendComplete',         category: 'mastery'     },
  { id: 'cheatsheet_collector',title: 'Cheatsheet Master',  description: 'Bookmark 10 cheatsheets',            icon: 'FileText', criteria: 'bookmarks >= 10',          category: 'exploration' },
  { id: 'deep_dive',           title: 'Deep Diver',         description: 'Spend 10 hours learning',            icon: 'Dna',      criteria: 'totalLearningHours >= 10', category: 'mastery'     },
];

/**
 * Type-safe achievement checkers — no eval, no new Function().
 * Each function receives the UserProgress object and returns a boolean.
 * `completedContent` and `bookmarks` are plain objects (Record<string, ...>),
 * so we check Object.keys().length instead of .length.
 */
type ProgressChecker = (progress: UserProgress) => boolean;

const achievementChecks: Record<string, ProgressChecker> = {
  first_lesson: (progress) =>
    Object.keys(progress.completedContent ?? {}).length >= 1,

  streak_7: (progress) =>
    (progress.streak?.current ?? 0) >= 7,

  frontend_master: (progress) =>
    // Extend UserProgress with frontendComplete when that data is available;
    // for now treat as unlockable only via manual unlockAchievement call.
    false,

  cheatsheet_collector: (progress) =>
    Object.keys(progress.bookmarks ?? {}).length >= 10,

  deep_dive: (progress) =>
    (progress.totalLearningHours ?? 0) >= 10,
};

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { progress } = useProgress();
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('stackforge_academy_achievements');
    if (saved) {
      try {
        setUnlockedIds(JSON.parse(saved));
      } catch {
        // Corrupt storage — start fresh
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('stackforge_academy_achievements', JSON.stringify(unlockedIds));
  }, [unlockedIds]);

  const unlockAchievement = useCallback((id: string) => {
    setUnlockedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const checkAchievements = useCallback(() => {
    ALL_ACHIEVEMENTS.forEach((achievement) => {
      if (unlockedIds.includes(achievement.id)) return;

      const checker = achievementChecks[achievement.id];
      if (!checker) return;

      if (checker(progress)) {
        unlockAchievement(achievement.id);
      }
    });
  }, [progress, unlockedIds, unlockAchievement]);

  // Auto-check whenever progress changes
  useEffect(() => {
    checkAchievements();
  }, [progress, checkAchievements]);

  const unlockedAchievements = ALL_ACHIEVEMENTS.filter(ach => unlockedIds.includes(ach.id));

  return (
    <AchievementContext.Provider value={{ unlockedAchievements, checkAchievements, unlockAchievement }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) throw new Error('useAchievements must be used within an AchievementProvider');
  return context;
};
