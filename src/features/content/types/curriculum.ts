export interface CurriculumTopic {
  id: string;
  slug: string;
  title: string;
  technology: string;
  roadmapId?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  prerequisites: string[];
  learningObjectives: string[];
  tags: string[];
}

export interface CurriculumContent {
  topicId: string;
  overview: string;
  whyItMatters: string;
  visualExplanation: string;
  syntaxGuide: string;
  beginnerExample: string;
  intermediateExample: string;
  advancedExample: string;
  commonMistakes: string[];
  bestPractices: string[];
  summary: string;
}

export interface CurriculumQuiz {
  topicId: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'quick' | 'mastery';
  questions: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
}

export interface CurriculumInterview {
  topicId: string;
  questions: {
    question: string;
    answer: string;
    explanation: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    companyTags: string[];
    followUpQuestion?: string;
  }[];
}

export interface CurriculumProject {
  topicId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requirements: string[];
  steps: string[];
  architecture: {
    overview: string;
    techStack: string[];
    folderStructure: string;
  };
  extensions: string[];
  rubric: {
    criteria: string;
    weight: number;
  }[];
}

export interface CurriculumCheatsheet {
  topicId: string;
  title: string;
  sections: {
    title: string;
    items: {
      name: string;
      code: string;
      description: string;
    }[];
  }[];
}

export interface CurriculumTutorExample {
  topicId: string;
  examples: {
    title: string;
    input: string;
    output: string;
    explanation: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }[];
}
