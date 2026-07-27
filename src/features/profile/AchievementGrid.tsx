"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function AchievementGrid() {
  const achievements = [
    { id: 1, name: "First Lesson", desc: "Completed your first lesson", unlocked: true, icon: "🚀" },
    { id: 2, name: "7 Day Streak", desc: "Studied for 7 days straight", unlocked: false, icon: "🔥" },
    { id: 3, name: "Quiz Master", desc: "Perfect score in any quiz", unlocked: true, icon: "🎓" },
    { id: 4, name: "Bookworm", desc: "Bookmarked 10 resources", unlocked: false, icon: "📚" },
  ];

  return (
    <Card variant="default" padding="md" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Achievements</h2>
        <Badge variant="primary">2 / 4 Unlocked</Badge>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {achievements.map((ach) => (
          <div 
            key={ach.id} 
            className={`p-3.5 rounded-lg border text-center transition-all ${
              ach.unlocked 
                ? "bg-card border-primary/40 ring-1 ring-primary/20 shadow-xs" 
                : "bg-secondary/40 border-border/40 opacity-50 grayscale"
            }`}
          >
            <div className="text-2xl mb-1.5">{ach.icon}</div>
            <p className="text-xs font-bold text-foreground">{ach.name}</p>
            <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">{ach.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
