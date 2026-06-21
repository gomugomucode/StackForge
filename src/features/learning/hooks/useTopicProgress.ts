import { useState, useEffect } from 'react';
import { TopicService } from '../services/topicService';

export function useTopicProgress(topicId: string) {
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
    } catch (e) {
      setError("Failed to update topic completion status");
    }
  };

  const updateQuizScore = (score: number) => {
    setProgress(prev => ({ ...prev, quizScore: score }));
  };

  const completeChallenge = (count: number) => {
    setProgress(prev => ({ ...prev, challengesCompleted: count }));
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
