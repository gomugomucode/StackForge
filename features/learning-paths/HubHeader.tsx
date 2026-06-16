"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

interface HubHeaderProps {
  title: string;
  description: string;
  onSearch: (query: string) => void;
}

export default function HubHeader({ title, description, onSearch }: HubHeaderProps) {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-accent-cyan/10 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-purple/10 text-accent-purple border border-accent-purple/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" /> 
            Learning Paths
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-6 leading-tight">
            Master the <span className="gradient-text">Modern Stack</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="relative max-w-xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-cyan/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-surface-900 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="pl-4">
                <Search className="w-5 h-5 text-text-muted" />
              </div>
              <input 
                type="text" 
                placeholder="Search roadmaps, languages, tools..." 
                className="flex-1 bg-transparent border-none outline-none px-2 py-3 text-sm text-white placeholder:text-text-muted"
                onChange={(e) => onSearch(e.target.value)}
              />
              <button className="px-5 py-2.5 bg-accent-purple hover:bg-accent-violet text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-accent-purple/20 flex items-center gap-2">
                Find Path <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
