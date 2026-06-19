"use client";

import React from "react";
import { ProfileHeader } from "@/features/profile/ProfileHeader";
import { ProfileStats } from "@/features/profile/ProfileStats";
import { ProgressOverview } from "@/features/profile/ProgressOverview";
import { AchievementGrid } from "@/features/profile/AchievementGrid";
import { BookmarkGrid } from "@/features/profile/BookmarkGrid";
import { ActivityFeed } from "@/features/profile/ActivityFeed";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <ProfileHeader />
      
      <div className="space-y-8">
        <ProfileStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SectionHeader 
              title="Learning Progress" 
              description="Track your mastery across different technology stacks." 
            />
            <ProgressOverview />
            
            <SectionHeader 
              title="Recent Activity" 
              description="Your latest achievements and completions." 
            />
            <ActivityFeed />
          </div>

          <div className="space-y-8">
            <SectionHeader title="Achievements" />
            <AchievementGrid />
            
            <SectionHeader title="Bookmarks" />
            <BookmarkGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
