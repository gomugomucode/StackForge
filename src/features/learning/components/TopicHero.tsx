import React from 'react';
import { Trophy, Clock, BarChart } from 'lucide-react';

interface TopicHeroProps {
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: number;
  xpReward: number;
}

export function TopicHero({ title, description, difficulty, estimatedTime, xpReward }: TopicHeroProps) {
  const difficultyColor = {
    beginner: 'text-green-500 bg-green-500/10',
    intermediate: 'text-blue-500 bg-blue-500/10',
    advanced: 'text-red-500 bg-red-500/10',
  }[difficulty.toLowerCase()] || 'text-gray-500 bg-gray-500/10';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 p-8 border border-border mb-8">
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-4">
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${difficultyColor}`}>
            {difficulty}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 text-xs font-medium text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {estimatedTime} mins
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-xs font-bold text-yellow-600">
            <Trophy className="w-3.5 h-3.5" />
            +{xpReward} XP
          </div>
        </div>
      </div>
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -left-10 -top-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
    </div>
  );
}
