import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Achievement } from '../core/types/academy';
import { useProgress } from './ProgressContext';

interface AchievementContextType {
  unlockedAchievements: Achievement[];
  checkAchievements: () => void;
  unlockAchievement: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_lesson', title: 'First Lesson', description: 'Complete your first tutorial', icon: 'BookOpen', criteria: 'completedContent.length >= 1', category: 'exploration' },
  { id: 'streak_7', title: 'Consistency King', description: 'Maintain a 7-day learning streak', icon: 'Flame', criteria: 'streak.current >= 7', category: 'consistency' },
  { id: 'frontend_master', title: 'Frontend Explorer', description: 'Complete all Frontend basics', icon: 'Layout', criteria: 'frontend_complete', category: 'mastery' },
  { id: 'cheatsheet_collector', title: 'Cheatsheet Master', description: 'Bookmark 10 cheatsheets', icon: 'FileText', criteria: 'bookmarks.length >= 10', category: 'exploration' },
  { id: 'deep_dive', title: 'Deep Diver', description: 'Spend 10 hours learning', icon: 'Dna', criteria: 'totalLearningHours >= 10', category: 'mastery' },
];

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { progress } = useProgress();
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('stackforge_academy_achievements');
    if (saved) setUnlockedIds(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('stackforge_academy_achievements', JSON.stringify(unlockedIds));
  }, [unlockedIds]);

  const unlockAchievement = (id: string) => {
    setUnlockedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const checkAchievements = () => {
    ALL_ACHIEVEMENTS.forEach(ach => {
      if (unlockedIds.includes(ach.id)) return;

      let isEligible = false;
      if (ach.id === 'first_lesson' && Object.keys(progress.completedContent).length >= 1) isEligible = true;
      if (ach.id === 'streak_7' && progress.streak.current >= 7) isEligible = true;
      if (ach.id === 'cheatsheet_collector' && Object.keys(progress.bookmarks).length >= 10) isEligible = true;
      if (ach.id === 'deep_dive' && progress.totalLearningHours >= 10) isEligible = true;

      if (isEligible) unlockAchievement(ach.id);
    });
  };

  // Auto-check achievements when progress changes
  useEffect(() => {
    checkAchievements();
  }, [progress]);

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
