export type Roadmap = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  tags: string[];
  lastUpdated: string;
  duration: string | number;
  featured: boolean;
  type: 'roadmap';
};

export type Cheatsheet = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  tags: string[];
  lastUpdated: string;
  duration: string;
  type: 'cheatsheet';
  items: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    code: string;
  }>;
};

export type CheatsheetItem = Cheatsheet['items'][number];

export type RoadmapNode = {
  id: string;
  title: string;
  contentIds: string[];
  isLocked: boolean;
};
