"use client";

import { useAuth } from "../auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Camera, Settings } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useUserAvatar } from "@/hooks/useUserAvatar";

export function ProfileHeader() {
  const { user } = useAuth();
  const { displayName, email } = useUserAvatar();

  return (
    <Card variant="default" padding="none" className="relative w-full overflow-hidden">
      <div className="h-32 bg-secondary/50 border-b border-border/40" />
      <div className="px-6 pb-6 pt-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10">
        <div className="flex items-end gap-4">
          <div className="relative group">
            <Avatar size="xl" className="border-4 border-card shadow-md" />
            <button
              aria-label="Update avatar"
              className="absolute bottom-0 right-0 p-1.5 bg-card rounded-full shadow-xs border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
              <Badge variant="primary">MEMBER</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{email || user?.email}</p>
          </div>
        </div>

        <div>
          <Button href="/settings" variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            <span>Edit Profile</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
