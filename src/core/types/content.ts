export interface ContentFrontmatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  author?: string;
  duration?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  related?: string[];
  image?: string;
}

export interface ContentMetadata {
  slug: string;
  path: string;
  readingTime: string;
  toc: TocItem[];
}

export interface TocItem {
  text: string;
  slug: string;
  level: number;
}

export interface ContentDoc {
  frontmatter: ContentFrontmatter;
  metadata: ContentMetadata;
  content: string;
}

export type ContentType = 'tutorial' | 'roadmap' | 'cheatsheet' | 'project' | 'interview' | 'blog' | 'doc';
