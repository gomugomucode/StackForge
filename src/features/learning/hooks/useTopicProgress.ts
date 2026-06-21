import { useState, useEffect } from 'react';
import { TopicService } from '../services/topicService';
import { useUserStats } from '@/context/UserStatsContext';

export function useTopicProgress(topicId: string) {
  const { refreshStats } = useUserStats();
  const [progress, setProgress] = useState({
    completed: false,
    quizScore: 0,
    challengesCompleted: 0,
    totalChallenges: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch(`/api/progress?topicId=${topicId}`);
        if (res.ok) {
          const data = await res.json();
          setProgress(data);
        }
      } catch (e) {
        console.error("Error fetching topic progress:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProgress();
  }, [topicId]);

  const markTopicComplete = async (completed: boolean) => {
    try {
      await TopicService.toggleTopicCompletion(topicId, completed);
      setProgress(prev => ({ ...prev, completed }));
      await refreshStats();
    } catch (e) {
      setError("Failed to update topic completion status");
      throw e;
    }
  };

  const updateQuizScore = async (quizId: string, answers: string[]) => {
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, answers }),
      });
      if (!res.ok) throw new Error('Quiz submission failed');
      
      const data = await res.json();
      setProgress(prev => ({ ...prev, quizScore: data.percentage }));
      await refreshStats();
      return data;
    } catch (e) {
      console.error("Error updating quiz score:", e);
      throw e;
    }
  };

  const completeChallenge = async (challengeId: string) => {
    try {
      const res = await fetch('/api/learning/challenge/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId, solution: 'Completed via UI' }),
      });
      if (!res.ok) throw new Error('Challenge submission failed');
      
      const data = await res.json();
      setProgress(prev => ({ ...prev, challengesCompleted: prev.challengesCompleted + 1 }));
      await refreshStats();
      return data;
    } catch (e) {
      console.error("Error completing challenge:", e);
      throw e;
    }
  };

  return {
    progress,
    isLoading,
    error,
    markTopicComplete,
    updateQuizScore,
    completeChallenge,
  };
}
