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
  resources?: TopicResource[];
}

export interface TopicContent {
  id: string;
  topicId: string;
  whatIsIt: string;
  whyItMatters: string;
  overview: string;
  syntax: string;
  explanation: string;
  bestPractices: string[];
  commonMistakes: string[];
  cheatsheet?: TopicCheatsheet;
}

export interface TopicCheatsheet {
  title: string;
  summary: string;
  syntax: string[];
  methods?: {
    name: string;
    description: string;
    example: string;
  }[];
  commonErrors: string[];
  bestPractices: string[];
  interviewNotes: string[];
  quickRevision: string[];
}

export interface TopicResource {
  id: string;
  title: string;
  url: string;
  type: 'docs' | 'video' | 'article' | 'other';
}

export interface TopicExample {
// ... (keep existing)
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
  hint: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'faang';
  tags: string[];
  companyFrequency: number;
}
