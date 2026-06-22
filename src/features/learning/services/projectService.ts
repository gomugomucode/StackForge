import { Project } from '@/data/projects';

export interface TopicProject {
  id: string;
  topicId: string;
  projectId: string;
  learningObjectives: string[];
  suggestedDifficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const topicProjectMap: Record<string, TopicProject[]> = {
  'javascript-basics': [
    {
      id: 'tp-js-1',
      topicId: 'javascript-basics',
      projectId: 'p2', // Collaborative Markdown Editor (simplified version)
      learningObjectives: ['DOM Manipulation', 'Event Listeners', 'State Management'],
      suggestedDifficulty: 'beginner'
    }
  ],
  'react-core': [
    {
      id: 'tp-react-1',
      topicId: 'react-core',
      projectId: 'p1', // AI Code Reviewer
      learningObjectives: ['Hook usage', 'API Integration', 'Component Lifecycle'],
      suggestedDifficulty: 'intermediate'
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
