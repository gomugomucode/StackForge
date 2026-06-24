import { Resource, ResourceFilter } from '../types/resource';

// In a real app, this would call an API. 
// For now, we'll provide high-quality, curated real-world links.
const CURATED_RESOURCES: Resource[] = [
  // JAVASCRIPT
  {
    id: 'res-js-1',
    title: 'JavaScript Core Fundamentals',
    description: 'Deep dive into the essential building blocks of JavaScript.',
    url: '/learn/javascript/basics',
    type: 'DOCS',
    technologySlug: 'javascript',
    difficulty: 'beginner',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-js-2',
    title: 'Modern JS Patterns',
    description: 'Advanced JavaScript patterns for professional developers.',
    url: '/learn/javascript/advanced-patterns',
    type: 'DOCS',
    technologySlug: 'javascript',
    difficulty: 'intermediate',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-js-3',
    title: 'JS Engine Internals',
    description: 'Understand how the V8 engine and event loop work under the hood.',
    url: '/learn/javascript/engine-internals',
    type: 'BOOK',
    author: 'StackForge Academy',
    technologySlug: 'javascript',
    difficulty: 'advanced',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-js-4',
    title: 'JavaScript Performance Guide',
    description: 'Optimize your JS code for maximum speed and efficiency.',
    url: '/learn/javascript/performance',
    type: 'BOOK',
    author: 'StackForge Academy',
    technologySlug: 'javascript',
    difficulty: 'intermediate',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // REACT
  {
    id: 'res-react-1',
    title: 'React Architecture 101',
    description: 'Master the core principles of component-based architecture.',
    url: '/learn/react/architecture',
    type: 'DOCS',
    technologySlug: 'react',
    difficulty: 'beginner',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-react-2',
    title: 'Advanced React Hooks',
    description: 'Build complex state management systems with custom hooks.',
    url: '/learn/react/advanced-hooks',
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
    title: 'Node.js Event-Driven Design',
    description: 'Master asynchronous programming and the Node.js event loop.',
    url: '/learn/node/event-loop',
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
    title: 'Algorithmic Thinking',
    description: 'Internal set of challenges to master data structures and algorithms.',
    url: '/interview/dsa-patterns',
    type: 'PRACTICE',
    technologySlug: 'dsa',
    difficulty: 'intermediate',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-prac-2',
    title: 'JS Mastery Challenges',
    description: 'Practical exercises to solidify your JavaScript knowledge.',
    url: '/learn/javascript/challenges',
    type: 'PRACTICE',
    technologySlug: 'javascript',
    difficulty: 'beginner',
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'res-prac-3',
    title: 'Fullstack Project Suite',
    description: 'Step-by-step guides to building real-world fullstack applications.',
    url: '/projects',
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
