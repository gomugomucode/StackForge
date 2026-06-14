export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface ContentFrontmatter {
  title: string;
  slug: string;
  category: string;
  difficulty: Difficulty;
  tags: string[];
  estimatedTime: string; // e.g., "25min"
  featured?: boolean;
  lastUpdated: string;
  relatedContent?: string[];
}

export interface TutorialFrontmatter extends ContentFrontmatter {
  type: 'tutorial';
  series?: string;
  order?: number;
}

export interface ProjectFrontmatter extends ContentFrontmatter {
  type: 'project';
  githubUrl: string;
  demoUrl: string;
  techStack: string[];
}

export interface RoadmapFrontmatter extends ContentFrontmatter {
  type: 'roadmap';
  milestones: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or SVG path
  criteria: string;
  unlockedAt?: string;
  category: 'exploration' | 'mastery' | 'consistency' | 'social';
}

export interface UserProgress {
  completedContent: Record<string, {
    completedAt: string;
    timeSpent: number; // in minutes
    score?: number;    // for quizzes
  }>;
  bookmarks: Record<string, {
    addedAt: string;
    type: 'tutorial' | 'cheatsheet' | 'project' | 'roadmap';
  }>;
  streak: {
    current: number;
    longest: number;
    lastActive: string;
  };
  totalLearningHours: number;
  xp: number;
  level: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  modules: {
    id: string;
    title: string;
    contentIds: string[]; // IDs of tutorials/projects
    isLocked: boolean;
  }[];
  totalXP: number;
}

export type AcademyContent = TutorialFrontmatter | ProjectFrontmatter | RoadmapFrontmatter;
