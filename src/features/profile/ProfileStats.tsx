"use client";

import { useUserStats } from "@/context/UserStatsContext";
import { Trophy, Flame, Clock, Target } from "lucide-react";

export function ProfileStats() {
  const { xp, level, streak, isLoading } = useUserStats();

  if (isLoading) {
    return <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">{Array(4).fill(0).map((_, i) => <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />)}</div>;
  }

  const stats = [
    { label: "Level", value: level, icon: Trophy, color: "text-yellow-500" },
    { label: "Streak", value: `${streak} Days`, icon: Flame, color: "text-orange-500" },
    { label: "Experience", value: `${xp} XP`, icon: Target, color: "text-blue-500" },
    { label: "Study Time", value: "12.5h", icon: Clock, color: "text-green-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center gap-4">
          <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
