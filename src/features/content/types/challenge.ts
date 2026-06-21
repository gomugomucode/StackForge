export interface Challenge {
  id: string;
  topicId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  solution: string;
  hints: string[];
  expectedOutput: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChallengeSubmission {
  challengeId: string;
  solution: string;
}

export interface ChallengeResult {
  success: boolean;
  isCorrect: boolean;
  expectedOutput: string;
  xpAwarded: number;
}

export interface ChallengeProgress {
  challengeId: string;
  completed: boolean;
  attempts: number;
  lastAttemptAt?: string;
}
