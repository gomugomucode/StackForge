"use client";

import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AchievementGrid } from "@/features/profile/AchievementGrid";

export default function AchievementsPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12 space-y-8">
        <SectionHeader 
          title="Your Achievements" 
          description="A complete gallery of your milestones and trophies." 
        />
        <AchievementGrid />
      </div>
    </ProtectedRoute>
  );
}
