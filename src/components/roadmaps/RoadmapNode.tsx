'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/SectionHeader';
import Link from 'next/link';

interface RoadmapNodeProps {
  node: any;
  index: number;
  isLocked?: boolean;
}

export function RoadmapNode({ node, index, isLocked = false }: RoadmapNodeProps) {
  const { completedNodes, toggleNode } = useProgress();
  const isCompleted = completedNodes.includes(node.id);

  return (
    <div className="relative flex gap-6 mb-12 group">
      {/* Visual Line connecting nodes */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800 group-last:hidden">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="w-full bg-gradient-to-b from-violet-500 to-transparent"
        />
      </div>

      {/* The Node Circle */}
      <div className="relative z-10">
        <button 
          onClick={() => !isLocked && toggleNode(node.id)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 
            ${isCompleted ? 'bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' : 
              isLocked ? 'bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed opacity-50' : 
              'bg-zinc-900 text-zinc-500 border border-zinc-700 hover:border-zinc-500'}`}
        >
          {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : 
           isLocked ? <Lock className="w-5 h-5" /> : <Circle className="w-6 h-6" />}
        </button>
      </div>

      {/* Content Card */}
      <div className="flex-1">
        <Card className={`p-6 bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all 
          ${isCompleted ? 'bg-violet-500/5' : isLocked ? 'opacity-50 grayscale' : ''}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-2 transition-colors ${isCompleted ? 'text-violet-400' : 'text-white'}`}>
                {node.title}
              </h3>
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                {node.description}
              </p>
              <Link 
                href={`/roadmaps/frontend/lesson/${node.slug}`} // This should be dynamic
                className={`text-sm font-medium transition-colors ${isLocked ? 'text-zinc-600 pointer-events-none' : 'text-violet-400 hover:text-violet-300'}`}
              >
                {isLocked ? 'Locked - Complete previous lesson' : 'Start Learning →'}
              </Link>
            </div>
            <div className="hidden sm:block">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={isLocked}
                className={`rounded-full text-xs ${isCompleted ? 'bg-violet-500/20 text-violet-400 border-violet-500/30' : 'border-zinc-700 text-zinc-400'}`}
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
