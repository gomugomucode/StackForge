import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { tokens } from "@/lib/tokens";
import { User, Lock, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-24 space-y-8">
        <div className="space-y-2">
          <h1 className={tokens.typography.h1}>Account Settings</h1>
          <p className={tokens.typography.body}>Manage your profile parameters and security preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <nav className="flex flex-col gap-1">
              <Button variant="ghost" className="justify-start gap-2 bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold">
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

          <div className="md:col-span-2">
            <Card padding="lg" className="space-y-6">
              <div className="space-y-4">
                <h2 className={tokens.typography.h2}>Account Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className={tokens.typography.caption}>Full Name</label>
                    <Input 
                      type="text" 
                      defaultValue="Learner" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={tokens.typography.caption}>Email Address</label>
                    <Input 
                      type="email" 
                      defaultValue="learner@stackforge.com" 
                    />
                  </div>
                </div>
                <Button variant="primary" className="w-fit">Save Changes</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
