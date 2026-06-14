export type ContentDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ContentFrontmatter {
  title: string;
  slug: string;
  category: string;
  difficulty: ContentDifficulty;
  tags: string[];
  estimatedTime: number; // in minutes
  author: string;
  featured?: boolean;
  lastUpdated: string;
  description: string;
}

export interface ContentItem<T = ContentFrontmatter> {
  id: string;
  slug: string;
  content: string;
  frontmatter: T;
  type: 'tutorial' | 'roadmap' | 'cheatsheet' | 'project' | 'interview' | 'blog' | 'doc';
}

export interface ContentMetadata {
  title: string;
  slug: string;
  category: string;
  difficulty: ContentDifficulty;
  tags: string[];
  estimatedTime: number;
  author: string;
  featured: boolean;
  lastUpdated: string;
  type: string;
}
