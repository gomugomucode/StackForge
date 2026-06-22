import React from 'react';
import { CheckCircle, ArrowRight, Code, FileText, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProjectGuideProps {
  title: string;
  requirements: string[];
  techStack: string[];
  features: string[];
  folderStructure: string;
  implementationGuide: string;
  expectedOutput: string;
}

export function ProjectGuide({ 
  title, 
  requirements, 
  techStack, 
  features, 
  folderStructure, 
  implementationGuide, 
  expectedOutput 
}: ProjectGuideProps) {
  return (
    <div className="space-y-8 p-8 rounded-3xl border border-border bg-card">
      <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-wider text-sm">
        <Code className="w-4 h-4" /> Hands-on Project
      </div>
      <h3 className="text-3xl font-black">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> Requirements
            </h4>
            <ul className="space-y-2">
              {requirements.map((req, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed">• {req}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded bg-secondary text-foreground border border-border">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" /> Core Features
            </h4>
            <ul className="space-y-2">
              {features.map((f, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed">• {f}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" /> Suggested Folder Structure
            </h4>
            <pre className="p-4 rounded-xl bg-black/40 text-xs font-mono text-muted-foreground overflow-x-auto">
              {folderStructure}
            </pre>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500" /> Implementation Guide
            </h4>
            <div className="prose prose-sm text-muted-foreground italic leading-relaxed">
              {implementationGuide}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
        <h4 className="font-bold text-primary uppercase tracking-wider text-xs">Expected Output</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {expectedOutput}
        </p>
      </div>
    </div>
  );
}

import { Zap } from 'lucide-react';
