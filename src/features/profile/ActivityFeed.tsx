"use client";

import { useEffect, useState } from "react";
import { Calendar, CheckCircle } from "lucide-react";

interface Activity {
  id: string;
  action: string;
  date: string;
  type: string;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch('/api/user/dashboard');
        if (res.ok) {
          const data = await res.json();
          setActivities(data.recentActivity);
        }
      } catch (e) {
        console.error("Error fetching activity:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchActivity();
  }, []);

  if (isLoading) return <div className="h-64 animate-pulse bg-card rounded-xl border border-border" />;
  if (activities.length === 0) return (
    <div className="p-6 bg-card rounded-xl border border-border text-center text-muted-foreground">
      No recent activity. Start learning!
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-card rounded-xl border border-border">
      <h2 className="text-xl font-semibold">Recent Activity</h2>
      <div className="space-y-6">
        {activities.map((act) => (
          <div key={act.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-primary mt-1.5" />
              <div className="w-px h-full bg-border" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{act.action.replace('_', ' ')}</p>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {new Date(act.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="w-3 h-3" /> Earned XP
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
