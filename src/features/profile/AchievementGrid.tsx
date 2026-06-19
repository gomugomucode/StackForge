"use client";

import { Award } from "lucide-react";

export function AchievementGrid() {
  const achievements = [
    { id: 1, name: "First Lesson", desc: "Completed your first lesson", unlocked: true, icon: "🚀" },
    { id: 2, name: "7 Day Streak", desc: "Studied for 7 days straight", unlocked: false, icon: "🔥" },
    { id: 3, name: "Quiz Master", desc: "Perfect score in any quiz", unlocked: true, icon: "🎓" },
    { id: 4, name: "Bookworm", desc: "Bookmarked 10 resources", unlocked: false, icon: "📚" },
  ];

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold">Achievements</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {achievements.map((ach) => (
          <div 
            key={ach.id} 
            className={`p-4 rounded-xl border text-center transition-all ${
              ach.unlocked 
                ? "bg-white dark:bg-gray-800 border-blue-500 ring-1 ring-blue-500" 
                : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-50 grayscale"
            }`}
          >
            <div className="text-3xl mb-2">{ach.icon}</div>
            <p className="text-sm font-bold">{ach.name}</p>
            <p className="text-[10px] text-muted-foreground">{ach.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
