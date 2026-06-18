'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Star, Send, X, GitBranch, ExternalLink, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
        body: JSON.stringify({ ...form, projectId })
      });
      if (res.ok) onSuccess();
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Submit Project for Review</h3>
            <Button variant="ghost" size="sm" onClick={onClose}><X className="w-5 h-5" /></Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">GitHub Repository URL *</label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  required 
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all" 
                  placeholder="https://github.com/username/repo"
                  value={form.repoUrl}
                  onChange={e => setForm({...form, repoUrl: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Live Demo URL</label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all" 
                  placeholder="https://project-demo.vercel.app"
                  value={form.demoUrl}
                  onChange={e => setForm({...form, demoUrl: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Project Notes</label>
              <textarea 
                className="w-full p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all h-32" 
                placeholder="What were the biggest challenges? What did you implement differently?"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
              />
            </div>
            <Button variant="primary" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit for Peer Review'} <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
