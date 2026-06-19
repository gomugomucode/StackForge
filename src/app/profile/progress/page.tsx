"use client";

import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProgressOverview } from "@/features/profile/ProgressOverview";

export default function ProgressPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12 space-y-8">
        <SectionHeader 
          title="Detailed Progress" 
          description="Deep dive into your learning metrics and completion rates." 
        />
        <ProgressOverview />
      </div>
    </ProtectedRoute>
  );
}
