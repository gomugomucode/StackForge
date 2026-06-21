"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Github, Chrome } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function SocialLoginButtons() {
  const handleOAuth = async (provider: 'github' | 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button 
        variant="outline" 
        onClick={() => handleOAuth('github')} 
        className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white transition-colors"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleOAuth('google')} 
        className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white transition-colors"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div}
  );
}
