'use client';
import { roadmaps } from '@/data/roadmaps';
import { useProgress } from '@/context/ProgressContext';
import { RoadmapNode as NodeComponent } from './RoadmapNode';
import { Button } from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function RoadmapCanvas({ roadmap }: { roadmap: typeof roadmaps[0] }) {
  const { getProgress } = useProgress();
  const progress = getProgress(roadmap.id, roadmap.nodes.map(n => n.id));

  return (
    <div className="py-12">
      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-50 px-4 py-4 mb-8">
        <div className="max-w-3xl mx-auto bg-zinc-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold">
              {progress}%
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{roadmap.title}</h4>
              <p className="text-xs text-zinc-500">Current Progress</p>
            </div>
          </div>
          <div className="flex-1 max-w-xs h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-500 transition-all duration-500" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <Link href="/roadmaps">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{roadmap.title}</h1>
          <p className="text-zinc-400">{roadmap.description}</p>
        </div>

        <div className="relative">
          {roadmap.nodes.map((node, index) => (
            <NodeComponent key={node.id} node={node} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
