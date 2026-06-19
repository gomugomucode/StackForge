"use client";

import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { User, Lock, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <nav className="flex flex-col gap-1">
              <Button variant="ghost" className="justify-start gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                <User className="w-4 h-4" /> Account
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Lock className="w-4 h-4" /> Security
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Bell className="w-4 h-4" /> Notifications
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Globe className="w-4 h-4" /> Appearance
              </Button>
            </nav>
          </div>

          <div className="md:col-span-2 space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Account Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded-md bg-transparent outline-none focus:ring-2 focus:ring-blue-500" 
                    defaultValue="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border rounded-md bg-transparent outline-none focus:ring-2 focus:ring-blue-500" 
                    defaultValue="john@example.com" 
                  />
                </div>
              </div>
              <Button className="w-fit">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
