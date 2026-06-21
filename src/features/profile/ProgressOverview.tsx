"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/Progress"; 

interface RoadmapProgress {
  title: string;
  progress: number;
  color: string;
}

export function ProgressOverview() {
  const [roadmaps, setRoadmaps] = useState<RoadmapProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch('/api/user/dashboard');
        if (res.ok) {
          const data = await res.json();
          setRoadmaps(data.activeRoadmaps);
        }
      } catch (e) {
        console.error("Error fetching progress:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProgress();
  }, []);

  if (isLoading) return <div className="h-48 animate-pulse bg-card rounded-xl border border-border" />;
  if (roadmaps.length === 0) return (
    <div className="p-6 bg-card rounded-xl border border-border text-center text-muted-foreground">
      No active roadmaps. Start learning to see your progress!
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-card rounded-xl border border-border">
      <h2 className="text-xl font-semibold">Learning Progress</h2>
      <div className="space-y-4">
        {roadmaps.map((roadmap) => (
          <div key={roadmap.title} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{roadmap.title}</span>
              <span className="text-muted-foreground">{roadmap.progress}%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full bg-primary transition-all duration-500`} 
                style={{ width: `${roadmap.progress}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
