import React from 'react';
import { BookOpen, Video, Code, Award } from 'lucide-react';
import { Resource } from '../types/resource';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

interface ResourceCardProps {
  resource: Resource;
}

const IconMap = {
  DOCS: <BookOpen className="w-5 h-5" />,
  VIDEO: <Video className="w-5 h-5" />,
  BOOK: <BookOpen className="w-5 h-5" />,
  PRACTICE: <Code className="w-5 h-5" />,
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group space-y-4">
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {IconMap[resource.type] || <Code className="w-5 h-5" />}
        </div>
        {resource.isPremium && (
          <div className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3 h-3" /> Premium
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {resource.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            resource.difficulty === 'beginner' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
            resource.difficulty === 'intermediate' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
            'bg-red-500/10 text-red-500 border-red-500/20'
          }`}>
            {resource.difficulty}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground">
            {resource.technologySlug}
          </span>
        </div>
        
        <Button variant="ghost" size="sm" className="gap-1 text-xs p-1" asChild>
          <NextLink href={resource.url}>
            Access <Code className="w-3 h-3" />
          </NextLink>
        </Button>
      </div>
    </div>
  );
}
