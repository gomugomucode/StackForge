import { Resource, ResourceFilter } from '../types/resource';

// In a real app, this would call an API. 
// For now, we'll provide high-quality, curated real-world links.
const CURATED_RESOURCES: Resource[] = [
  // JAVASCRIPT
  {
    id: 'res-js-1',
    title: 'MDN Web Docs: JavaScript',
    description: 'The gold standard for JavaScript documentation and learning.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    type: 'DOCS',
    technologySlug: 'javascript',
    difficulty: 'beginner',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-js-2',
    title: 'JavaScript.info',
    description: 'A comprehensive guide to JavaScript from the basics to advanced concepts.',
    url: 'https://javascript.info/',
    type: 'DOCS',
    technologySlug: 'javascript',
    difficulty: 'intermediate',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-js-3',
    title: 'You Don\'t Know JS (Book Series)',
    description: 'Deep dive into the core mechanics of JavaScript.',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    type: 'BOOK',
    author: 'Kyle Simpson',
    technologySlug: 'javascript',
    difficulty: 'advanced',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-js-4',
    title: 'Eloquent JavaScript',
    description: 'A modern introduction to programming with JavaScript.',
    url: 'https://eloquentjavascript.net/',
    type: 'BOOK',
    author: 'Marijn Haverbeke',
    technologySlug: 'javascript',
    difficulty: 'intermediate',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // REACT
  {
    id: 'res-react-1',
    title: 'React Official Documentation',
    description: 'Interactive tutorials and comprehensive API references for React.',
    url: 'https://react.dev/',
    type: 'DOCS',
    technologySlug: 'react',
    difficulty: 'beginner',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-react-2',
    title: 'Epic React by Kent C. Dodds',
    description: 'Advanced React patterns and performance optimization.',
    url: 'https://epicreact.dev/',
    type: 'VIDEO',
    technologySlug: 'react',
    difficulty: 'advanced',
    isPremium: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // NODE.JS
  {
    id: 'res-node-1',
    title: 'Node.js Documentation',
    description: 'Official API reference for the Node.js runtime.',
    url: 'https://nodejs.org/docs',
    type: 'DOCS',
    technologySlug: 'node',
    difficulty: 'beginner',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // PRACTICE
  {
    id: 'res-prac-1',
    title: 'LeetCode',
    description: 'Solve algorithmic challenges to prepare for technical interviews.',
    url: 'https://leetcode.com/',
    type: 'PRACTICE',
    technologySlug: 'dsa',
    difficulty: 'intermediate',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-prac-2',
    title: 'Codewars',
    description: 'Master your skills through challenges created by the community.',
    url: 'https://www.codewars.com/',
    type: 'PRACTICE',
    technologySlug: 'javascript',
    difficulty: 'beginner',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-prac-3',
    title: 'Exercism',
    description: 'Learn by doing with mentored coding exercises in multiple languages.',
    url: 'https://exercism.org/',
    type: 'PRACTICE',
    technologySlug: 'general',
    difficulty: 'beginner',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const resourceService = {
  async getResources(filter: ResourceFilter = {}): Promise<Resource[]> {
    let filtered = [...CURATED_RESOURCES];

    if (filter.type) {
      filtered = filtered.filter(r => r.type === filter.type);
    }
    if (filter.technology) {
      filtered = filtered.filter(r => r.technologySlug === filter.technology);
    }
    if (filter.difficulty) {
      filtered = filtered.filter(r => r.difficulty === filter.difficulty);
    }
    if (filter.search) {
      const s = filter.search.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(s) || 
        r.description.toLowerCase().includes(s)
      );
    }

    return filtered;
  },

  async getResourceById(id: string): Promise<Resource | null> {
    return CURATED_RESOURCES.find(r => r.id === id) || null;
  },

  async getResourcesByTechnology(slug: string): Promise<Resource[]> {
    return CURATED_RESOURCES.filter(r => r.technologySlug === slug);
  }
};
