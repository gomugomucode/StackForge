"use client";

import { authService } from "../services/authService";
import { Button } from "@/components/ui/Button";
import { GitBranch, Mail } from "lucide-react";

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      <Button 
        variant="outline" 
        onClick={() => authService.loginWithGoogle()}
        className="flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.52-2.28 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-1.01 7.49-2.8l-3.57-2.77c-.97.66-2.23 1.06-3.57 1.06-2.76 0-5.09-1.89-5.92-4.46H5.23v2.84C6.3 21.14 8.63 23 12 23z" />
          <path fill="#FBBC05" d="M6.08 14.23c-.24-.71-.38-1.47-.38-2.23s.14-1.52.38-2.23V6.5C5.41 7.75 4.75 9.13 4.75 10.5s.66 2.75 1.33 3.99z" />
          <path fill="#EA4335" d="M12 4.5C14.5 4.5 16.55 5.65 18.05 7.24l3.57-3.24C20.46 2.13 16.55 0 12 0C7.41 0 3.4 2.13 1.33 4.26l3.57 3.24C5.41 5.65 7.46 4.5 10 4.5z" />
        </svg>
        Continue with Google
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => authService.loginWithGithub()}
        className="flex items-center justify-center gap-2"
      >
        <GitBranch className="w-5 h-5" />
        Continue with GitHub
      </Button>
    </div>
  );
}
