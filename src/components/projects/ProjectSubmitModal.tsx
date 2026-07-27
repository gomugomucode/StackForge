'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X, GitBranch, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface SubmissionProps {
  projectId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectSubmitModal({ projectId, onClose, onSuccess }: SubmissionProps) {
  const [form, setForm] = useState({ repoUrl: '', demoUrl: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, projectId })
      });
      if (res.ok) onSuccess();
    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
    >
      <div className="w-full max-w-lg bg-popover text-popover-foreground border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h3 className="text-lg font-bold text-foreground">Submit Project for Review</h3>
            <Button variant="ghost" size="icon" onClick={onClose} ariaLabel="Close dialog">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">GitHub Repository URL *</label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  required 
                  className="pl-9" 
                  placeholder="https://github.com/username/repo"
                  value={form.repoUrl}
                  onChange={e => setForm({...form, repoUrl: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Live Demo URL</label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  className="pl-9" 
                  placeholder="https://project-demo.vercel.app"
                  value={form.demoUrl}
                  onChange={e => setForm({...form, demoUrl: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Project Notes</label>
              <Textarea 
                placeholder="What were the biggest challenges? What did you implement differently?"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
              />
            </div>

            <div className="pt-2">
              <Button variant="primary" size="md" className="w-full gap-2" disabled={isLoading} isLoading={isLoading}>
                <span>Submit for Peer Review</span>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
