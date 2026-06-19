"use client";

import { useAuth } from "../auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Camera, Settings } from "lucide-react";

export function ProfileHeader() {
  const { user } = useAuth();

  return (
    <div className="relative w-full h-48 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
      <div className="absolute -bottom-12 left-8 flex items-end gap-4">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-gray-200">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-foreground">{user?.name || "User Name"}</h1>
          <p className="text-sm text-white/80">{user?.email}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <Button variant="ghost" className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30">
          <Settings className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
