'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Lock, Clock, Trophy } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

interface RoadmapNodeProps {
  node: any;
  index: number;
  isLocked?: boolean;
}

export function RoadmapNode({ node, index, isLocked = false }: RoadmapNodeProps) {
  const { completedNodes, toggleNode } = useProgress();
  const isCompleted = completedNodes.has(node.id);

  return (
    <div className="relative flex gap-4 md:gap-6 mb-8 group">
      {/* Visual Line connecting nodes */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-border/60 group-last:hidden">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="w-full bg-primary/40"
        />
      </div>

      {/* The Node Circle */}
      <div className="relative z-10">
        <button 
          onClick={() => !isLocked && toggleNode(node.id)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 
            ${isCompleted ? 'bg-primary text-primary-foreground shadow-xs' : 
              isLocked ? 'bg-secondary text-muted-foreground border border-border opacity-50 cursor-not-allowed' : 
              'bg-card text-muted-foreground border border-border hover:border-primary/50'}`}
        >
          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
           isLocked ? <Lock className="w-4 h-4" /> : <Circle className="w-5 h-5 text-primary" />}
        </button>
      </div>

      {/* Content Card */}
      <div className="flex-1">
        <Card variant="default" padding="md" className={`transition-all ${isCompleted ? 'border-primary/30 bg-primary/5' : isLocked ? 'opacity-50' : ''}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className={`text-base font-semibold ${isCompleted ? 'text-primary' : 'text-foreground'}`}>
                  {node.title}
                </h3>
                {node.difficulty && (
                  <Badge variant="secondary">
                    {node.difficulty}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-normal">
                {node.description}
              </p>
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock className="w-3.5 h-3.5" /> {node.estimatedTime}
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                  <Trophy className="w-3.5 h-3.5" /> {node.xpReward} XP
                </div>
              </div>
              <div className="pt-2">
                <Link 
                  href={`/learn/${node.technology || 'javascript'}/${node.slug}`} 
                  className={`text-xs font-semibold transition-colors ${isLocked ? 'text-muted-foreground pointer-events-none' : 'text-primary hover:underline'}`}
                >
                  {isLocked ? 'Locked - Complete previous lesson' : 'Start Learning →'}
                </Link>
              </div>
            </div>
            <div className="hidden sm:block">
              <Button 
                variant={isCompleted ? "success" : "outline"} 
                size="sm" 
                disabled={isLocked}
                onClick={() => toggleNode(node.id)}
              >
                {isCompleted ? 'Completed' : 'Mark Complete'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
