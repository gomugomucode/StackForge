'use client';
import { roadmaps, Roadmap } from '@/data/roadmaps';
import { useProgress } from '@/context/ProgressContext';
import { RoadmapNode as NodeComponent } from './RoadmapNode';
import { Button } from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function RoadmapCanvas({ roadmap }: { roadmap: Roadmap }) {
  const { getProgress, completedNodes } = useProgress();
  
  // Flatten lessons from all modules for progress calculation
  const allLessons = roadmap.modules.flatMap(m => m.lessons);
  const lessonIds = allLessons.map(l => l.slug);
  const progress = getProgress(roadmap.slug, lessonIds);

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
          {roadmap.modules.map((module, mIdx) => (
            <div key={module.slug} className="mb-12">
              <h3 className="text-lg font-bold text-white mb-6 ml-16 opacity-50 uppercase tracking-widest text-xs">
                Module {mIdx + 1}: {module.title}
              </h3>
              <div className="relative">
                {module.lessons.map((lesson, lIdx) => {
                  const globalIndex = roadmap.modules.slice(0, mIdx).reduce((acc, m) => acc + m.lessons.length, 0) + lIdx;
                  
                  // A lesson is locked if the previous lesson is not completed
                  const prevLessonId = globalIndex > 0 
                    ? (mIdx === 0 
                        ? roadmap.modules[0].lessons[lIdx - 1]?.slug 
                        : roadmap.modules[mIdx - 1].lessons[roadmap.modules[mIdx - 1].lessons.length - 1]?.slug)
                    : null;
                  
                  const isLocked = prevLessonId && !completedNodes.includes(prevLessonId);

                  return (
                    <NodeComponent 
                      key={lesson.slug} 
                      node={{
                        id: lesson.slug,
                        title: lesson.title,
                        description: lesson.description,
                        content: lesson.whatIsIt,
                        slug: lesson.slug,
                        difficulty: lesson.difficulty,
                        estimatedTime: lesson.estimatedTime,
                        xpReward: lesson.xpReward
                      } as any} 
                      index={globalIndex} 
                      isLocked={isLocked}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
