import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface TopicHeroProps {
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: number;
  xpReward?: number;
}

export function TopicHero({ title, description, difficulty, estimatedTime, xpReward = 25 }: TopicHeroProps) {
  const badgeVariant = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'danger',
  }[difficulty.toLowerCase()] as any || 'secondary';

  return (
    <Card variant="default" padding="lg" className="mb-6 space-y-4 relative overflow-hidden">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5 pt-1">
        <Badge variant={badgeVariant}>
          {difficulty}
        </Badge>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-muted-foreground border border-border/40">
          <Clock className="w-3.5 h-3.5" />
          <span>{estimatedTime} mins</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-xs font-bold text-amber-500 border border-amber-500/20">
          <Trophy className="w-3.5 h-3.5" />
          <span>+{xpReward} XP</span>
        </div>
      </div>
    </Card>
  );
}
