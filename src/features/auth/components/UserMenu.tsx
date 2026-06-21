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

/**
 * Authenticated user menu shown in the navbar. Backed by Supabase Auth
 * via /src/components/AuthProvider.tsx. Hidden entirely for anonymous
 * visitors — never reveals the existence of the dashboard to logged-out
 * users.
 */
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
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {avatarLetter || <User className="w-4 h-4" />}
          </div>
          <span className="text-sm font-medium">{displayName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => (window.location.href = "/dashboard")}>
          <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>
          <User className="w-4 h-4 mr-2" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (window.location.href = "/profile/achievements")}>
          <Award className="w-4 h-4 mr-2" /> Achievements
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (window.location.href = "/settings")}>
          <Settings className="w-4 h-4 mr-2" /> Settings
        </DropdownMenuItem>
        <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
        <DropdownMenuItem
          onClick={() => authService.logout()}
          className="text-red-500"
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
