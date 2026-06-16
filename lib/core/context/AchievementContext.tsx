import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Achievement } from '@/lib/core/types/academy';
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

  const unlockAchievement = useCallback((id: string) => {
    setUnlockedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const checkAchievements = useCallback(() => {
    // Evaluate each achievement's criteria against current progress
    ALL_ACHIEVEMENTS.forEach((achievement) => {
      if (unlockedIds.includes(achievement.id)) return;
      try {
        // Create a dynamic function to evaluate the criteria expression safely
        const evalFn = new Function('progress', `return ${achievement.criteria};`);
        const result = evalFn(progress);
        if (result) {
          unlockAchievement(achievement.id);
        }
      } catch (e) {
        console.error('Error evaluating achievement criteria', achievement.id, e);
      }
    });
  }, [progress, unlockedIds, unlockAchievement]);


  // Auto-check achievements when progress changes
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
