export interface Quiz {
  id: string;
  title: string;
  description?: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessonId?: string | null;
  roadmapId?: string | null;
  topicId?: string | null;
  questions?: Question[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Question {
  id: string;
  quizId?: string | null;
  examId?: string | null;
  question: string;
  options: string[];
  answer: string;
  explanation?: string | null;
  difficulty: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  correctAnswers: number;
  completedAt: string;
}

export interface QuizSubmission {
  quizId: string;
  answers: string[];
}

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  xpAwarded: number;
  passed: boolean;
  details: {
    questionId: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation?: string | null;
  }[];
}
