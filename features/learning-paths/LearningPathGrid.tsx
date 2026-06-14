import React from 'react';

import { ContentCard } from '../../components/ui/ContentCard';
import type { Roadmap } from '../../core/types/content-extensions';

interface LearningPathGridProps {
  roadmaps: Roadmap[];
}

const LearningPathGrid: React.FC<LearningPathGridProps> = React.memo(({ roadmaps }) => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Your <span className="text-indigo-500">Learning Path</span> Starts Here
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Don't get overwhelmed by the vastness of the web. Follow curated roadmaps designed by industry experts to take you from zero to hero.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((roadmap) => (
          <ContentCard 
            key={roadmap.id} 
            item={{
              title: roadmap.title,
              slug: roadmap.id,
              category: 'Roadmaps',
              difficulty: roadmap.level as any,
              tags: roadmap.tags || [],
              estimatedTime: typeof roadmap.duration === 'string' ? parseInt(roadmap.duration) || 0 : roadmap.duration,
              author: 'StackForge',
              featured: roadmap.featured || false,
              lastUpdated: roadmap.lastUpdated,
              type: 'roadmap'
            }} 
            link={`/roadmaps/${roadmap.id}`} 
          />
        ))}
      </div>
    </section>
  );
});

export default LearningPathGrid;
