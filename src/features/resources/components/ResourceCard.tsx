import React from 'react';
import { BookOpen, Video, Code, Award } from 'lucide-react';
import { Resource } from '../types/resource';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import NextLink from 'next/link';

interface ResourceCardProps {
  resource: Resource;
}

const IconMap: Record<string, React.ReactNode> = {
  DOCS: <BookOpen className="w-4 h-4" />,
  VIDEO: <Video className="w-4 h-4" />,
  BOOK: <BookOpen className="w-4 h-4" />,
  PRACTICE: <Code className="w-4 h-4" />,
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card variant="default" padding="md" className="group space-y-3 flex flex-col justify-between hover:border-primary/50 transition-colors">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {IconMap[resource.type] || <Code className="w-4 h-4" />}
          </div>
          {resource.isPremium && (
            <Badge variant="warning">
              <Award className="w-3 h-3" /> Premium
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
            {resource.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {resource.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <div className="flex items-center gap-1.5">
          <Badge variant={
            resource.difficulty === 'beginner' ? 'success' : 
            resource.difficulty === 'intermediate' ? 'warning' : 
            'danger'
          }>
            {resource.difficulty}
          </Badge>
          <span className="text-[11px] text-muted-foreground font-semibold">
            {resource.technologySlug}
          </span>
        </div>
        
        <Button variant="ghost" size="sm" className="gap-1 text-xs" asChild>
          <NextLink href={resource.url}>
            <span>Access</span> <Code className="w-3 h-3 text-primary" />
          </NextLink>
        </Button>
      </div>
    </Card>
  );
}
