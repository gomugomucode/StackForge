"use client";

import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import { Button } from "@/components/ui/Button";
import { User, LogOut, Settings, Award, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const { user, isAuthenticated, profile } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const displayName =
    (profile?.name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    (user?.user_metadata?.username as string | undefined) ||
    user?.email?.split("@")[0] ||
    "Learner";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-1 pr-3 rounded-full">
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
            {avatarLetter || <User className="w-3.5 h-3.5" />}
          </div>
          <span className="text-xs font-semibold text-foreground">{displayName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={() => (window.location.href = "/dashboard")}>
          <LayoutDashboard className="w-4 h-4 mr-2 text-primary" /> Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>
          <User className="w-4 h-4 mr-2 text-primary" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (window.location.href = "/profile/achievements")}>
          <Award className="w-4 h-4 mr-2 text-primary" /> Achievements
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (window.location.href = "/settings")}>
          <Settings className="w-4 h-4 mr-2 text-primary" /> Settings
        </DropdownMenuItem>
        <div className="h-px bg-border/60 my-1" />
        <DropdownMenuItem
          onClick={() => authService.logout()}
          className="text-destructive font-medium"
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
