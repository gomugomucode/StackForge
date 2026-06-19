"use client";

import { Calendar, CheckCircle } from "lucide-react";

export function ActivityFeed() {
  const activities = [
    { id: 1, action: "Completed React useState lesson", date: "2 hours ago", type: "lesson" },
    { id: 2, action: "Earned 'First Lesson' achievement", date: "Yesterday", type: "achievement" },
    { id: 3, action: "Passed Javascript Basics Quiz", date: "2 days ago", type: "quiz" },
  ];

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold">Recent Activity</h2>
      <div className="space-y-6">
        {activities.map((act) => (
          <div key={act.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5" />
              <div className="w-px h-full bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{act.action}</p>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {act.date}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="w-3 h-3" /> Completed
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
