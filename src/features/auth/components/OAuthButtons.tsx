"use client";

import { authService } from "../services/authService";
import { Button } from "@/components/ui/Button";
import {  Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      <Button 
        variant="outline" 
        onClick={() => authService.loginWithGoogle()}
        className="flex items-center justify-center gap-2"
      >
        <FcGoogle  className="w-5 h-5" />
          
        Continue with Google
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => authService.loginWithGithub()}
        className="flex items-center justify-center gap-2"
      >
        <FaGithub  className="w-5 h-5" />
        Continue with GitHub
      </Button>
    </div>
  );
}
