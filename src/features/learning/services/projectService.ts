import { Project } from '@/data/projects';

export interface TopicProject {
  id: string;
  topicId: string;
  projectId: string;
  learningObjectives: string[];
  suggestedDifficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const topicProjectMap: Record<string, TopicProject[]> = {
  'variables-and-data-types': [
    {
      id: 'tp-js-1',
      topicId: 'variables-and-data-types',
      projectId: 'p1', // We will use p1 as a reference or add a new project
      learningObjectives: ['Variable scoping', 'Primitive vs Reference types', 'Constant management'],
      suggestedDifficulty: 'beginner'
    }
  ],
  'functions': [
    {
      id: 'tp-js-2',
      topicId: 'functions',
      projectId: 'p2',
      learningObjectives: ['Closures', 'Higher-order functions', 'Arrow functions'],
      suggestedDifficulty: 'intermediate'
    }
  ],
  'arrays-and-methods': [
    {
      id: 'tp-js-3',
      topicId: 'arrays-and-methods',
      projectId: 'p2',
      learningObjectives: ['Array transformation', 'Filtering data', 'Reducing complex state'],
      suggestedDifficulty: 'intermediate'
    }
  ],
  'objects-and-prototypes': [
    {
      id: 'tp-js-4',
      topicId: 'objects-and-prototypes',
      projectId: 'p1',
      learningObjectives: ['Prototypal inheritance', 'Class patterns', 'Object composition'],
      suggestedDifficulty: 'advanced'
    }
  ]
};

export const projectService = {
  getProjectsForTopic: (topicId: string): Project[] => {
    const mapped = topicProjectMap[topicId] || [];
    return mapped.map(m => {
      const project = projects.find(p => p.id === m.projectId);
      return project ? { ...project, learningObjectives: m.learningObjectives } as any : null;
    }).filter(Boolean) as Project[];
  }
};
