"use client";

import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import { Button } from "@/components/ui/Button";
import { User, LogOut, Settings, Award } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Assuming this exists in UI, let me check

export function UserMenu() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-1 pr-3 rounded-full">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {user?.name?.charAt(0) || <User className="w-4 h-4" />}
          </div>
          <span className="text-sm font-medium">{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => window.location.href = "/profile"}>
          <User className="w-4 h-4 mr-2" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.location.href = "/profile/achievements"}>
          <Award className="w-4 h-4 mr-2" /> Achievements
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.location.href = "/settings"}>
          <Settings className="w-4 h-4 mr-2" /> Settings
        </DropdownMenuItem>
        <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
        <DropdownMenuItem onClick={() => authService.logout()} className="text-red-500">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
