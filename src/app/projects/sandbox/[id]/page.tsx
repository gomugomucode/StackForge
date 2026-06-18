'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Play, Save, Trash2, Layout, Terminal, Code2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { projects } from '@/data/projects';

export default function SandboxPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [code, setCode] = useState('// Start building your project here...\n\nfunction helloWorld() {\n  console.log("Welcome to the Forge Sandbox!");\n}\n\nhelloWorld();');
  const [output, setOutput] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState('main.js');
  const [isExecuting, setIsExecuting] = useState(false);

  const project = projects.find(p => p.slug === resolvedParams.id);

  const runCode = () => {
    setIsExecuting(true);
    setOutput([]);
    
    // Simulate execution
    setTimeout(() => {
      try {
        // Simple mock execution since we don't have a real VM here
        const logs = [
          `[System] Initializing Sandbox Environment...`,
          `[System] Loading dependencies for ${project?.title || 'Project'}...`,
          `[Runtime] Executing ${activeFile}...`,
          `> Welcome to the Forge Sandbox!`,
          `[Success] Process completed with exit code 0`
        ];
        setOutput(logs);
      } catch (e) {
        setOutput([`[Error] ${e}`]);
      }
      setIsExecuting(false);
    }, 1200);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Toolbar */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold">{project?.title || 'Project Sandbox'}</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Professional Development Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => setCode('')}>
            <Trash2 className="w-4 h-4" /> Clear
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="w-4 h-4" /> Save to Cloud
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="gap-2 px-6" 
            onClick={runCode} 
            disabled={isExecuting}
          >
            {isExecuting ? 'Executing...' : <><Play className="w-4 h-4" /> Run Project</>}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - File Explorer */}
        <div className="w-64 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Explorer</span>
            <FileCode className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="p-2 space-y-1">
            {['main.js', 'styles.css', 'index.html', 'utils.ts'].map(file => (
              <div 
                key={file}
                onClick={() => setActiveFile(file)}
                className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-all flex items-center gap-2 ${
                  activeFile === file ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" /> {file}
              </div>
            ))}
          </div>
          <div className="mt-auto p-4 border-t border-border bg-secondary/30">
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Sandbox Active
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] text-white font-mono">
          <div className="h-10 bg-black/30 border-b border-white/10 flex items-center px-4 justify-between">
            <span className="text-xs text-white/50">{activeFile}</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
          </div>
          <textarea 
            className="flex-1 p-6 bg-transparent outline-none resize-none text-sm leading-relaxed"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="w-96 border-l border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Console Output</span>
            <Terminal className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 bg-black/20">
            {output.length === 0 ? (
              <p className="text-muted-foreground italic">No logs yet. Run your project to see output.</p>
            ) : (
              output.map((log, i) => (
                <div key={i} className={`p-2 rounded ${log.includes('[Error]') ? 'text-red-400 bg-red-500/10' : 'text-green-400'}`}>
                  {log}
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-border bg-secondary/30">
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => window.open('https://github.com', '_blank')}>
              <ExternalLink className="w-4 h-4" /> Push to GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
