import React from 'react';
import { ExternalLink, BookOpen, Video, FileText } from 'lucide-react';
import { TopicResource } from '@/features/content/types';

interface ResourcesSectionProps {
  resources: TopicResource[];
}

const iconMap = {
  docs: <BookOpen className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
  article: <FileText className="w-4 h-4" />,
  other: <ExternalLink className="w-4 h-4" />,
};

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-foreground">Recommended Resources</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-primary group-hover:scale-110 transition-transform">
                  {iconMap[resource.type] || iconMap.other}
                </span>
                <span className="font-medium text-foreground">{resource.title}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
