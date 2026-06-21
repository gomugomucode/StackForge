export interface Topic {
  id: string;
  slug: string;
  technology: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  prerequisites: string[];
  nextTopics: string[];
  createdAt: string;
  updatedAt: string;

  content?: TopicContent;
  examples?: TopicExample[];
  challenges?: Challenge[];
  quizzes?: Quiz[];
  interviews?: InterviewQuestion[];
}

export interface TopicContent {
  id: string;
  topicId: string;
  overview: string;
  syntax: string;
  explanation: string;
  bestPractices: string[];
  commonMistakes: string[];
}

export interface TopicExample {
  id: string;
  topicId: string;
  title: string;
  code: string;
  output: string;
  explanation: string;
}

export interface Challenge {
  id: string;
  topicId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  solution: string;
  hints: string[];
  expectedOutput: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string | null;
  difficulty: string;
  lessonId?: string | null;
  roadmapId?: string | null;
  topicId?: string | null;
  questions?: Question[];
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

export interface InterviewQuestion {
  id: string;
  lessonId?: string | null;
  topicId?: string | null;
  question: string;
  answer: string;
  difficulty: string;
  tags: string[];
  companyFrequency: number;
}
