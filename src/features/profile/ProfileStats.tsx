"use client";

import { useUserStats } from "@/context/UserStatsContext";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Trophy, Flame, Clock, Target } from "lucide-react";

export function ProfileStats() {
  const { xp, level, streak, isLoading } = useUserStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20" />)}
      </div>
    );
  }

  const stats = [
    { label: "Level", value: level, icon: Trophy, color: "text-amber-500 bg-amber-500/10" },
    { label: "Streak", value: `${streak} Days`, icon: Flame, color: "text-amber-500 bg-amber-500/10" },
    { label: "Experience", value: `${xp} XP`, icon: Target, color: "text-primary bg-primary/10" },
    { label: "Study Time", value: "12.5h", icon: Clock, color: "text-emerald-500 bg-emerald-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} variant="default" padding="sm" className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${stat.color}`}>
            <stat.icon className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-base font-bold text-foreground">{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
