"use client";

import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookmarkGrid } from "@/features/profile/BookmarkGrid";

export default function BookmarksPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12 space-y-8">
        <SectionHeader 
          title="Bookmarks" 
          description="All the resources you've saved for later." 
        />
        <BookmarkGrid />
      </div>
    </ProtectedRoute>
  );
}
