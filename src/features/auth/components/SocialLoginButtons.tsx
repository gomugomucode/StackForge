import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Github, Chrome } from 'lucide-react';

export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button 
        variant="outline" 
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })} 
        className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white transition-colors"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button 
        variant="outline" 
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })} 
        className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white transition-colors"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
