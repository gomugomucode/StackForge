'use client';

import { SectionHeader } from '../ui/SectionHeader';
import { ResourceGrid } from '@/features/resources/components/ResourceGrid';
import { Button } from '../ui/Button';
import NextLink from 'next/link';
import { BookOpen, Code, GraduationCap, Layout, Terminal, Zap, Trophy, FileText } from 'lucide-react';

export function ResourcesContent() {
  const internalCategories = [
    { 
      title: 'Learning Paths', 
      href: '/roadmaps', 
      icon: <GraduationCap className="w-5 h-5" />, 
      description: 'Structured paths to master new technologies from zero to hero.',
      color: 'bg-blue-500/10 text-blue-500'
    },
    { 
      title: 'Cheatsheets', 
      href: '/cheatsheets', 
      icon: <FileText className="w-5 h-5" />, 
      description: 'High-density reference guides for fast revision and lookup.',
      color: 'bg-purple-500/10 text-purple-500'
    },
    { 
      title: 'Quizzes', 
      href: '/#weekly-challenge', 
      icon: <Zap className="w-5 h-5" />, 
      description: 'Test your knowledge with quick and mastery-level assessments.',
      color: 'bg-yellow-500/10 text-yellow-500'
    },
    { 
      title: 'Interview Prep', 
      href: '/interview', 
      icon: <Code className="w-5 h-5" />, 
      description: 'Master FAANG-style interview questions with deep explanations.',
      color: 'bg-emerald-500/10 text-emerald-500'
    },
    { 
      title: 'Projects', 
      href: '/projects', 
      icon: <Layout className="w-5 h-5" />, 
      description: 'Hands-on mini projects to build a real-world portfolio.',
      color: 'bg-orange-500/10 text-orange-500'
    },
    { 
      title: 'AI Tutor', 
      href: '/tutor', 
      icon: <Terminal className="w-5 h-5" />, 
      description: 'Interactive visualizer and AI mentor for complex concepts.',
      color: 'bg-pink-500/10 text-pink-500'
    },
    { 
      title: 'Certificates', 
      href: '/cert', 
      icon: <Trophy className="w-5 h-5" />, 
      description: 'Earn and verify industry-standard certifications.',
      color: 'bg-cyan-500/10 text-cyan-500'
    },
    { 
      title: 'Knowledge Base', 
      href: '/learn', 
      icon: <BookOpen className="w-5 h-5" />, 
      description: 'Deep-dive articles and technical guides for every topic.',
      color: 'bg-indigo-500/10 text-indigo-500'
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Internal Ecosystem"
          title="Knowledge Hub"
          highlight="All-in-One Learning"
          description="Stop hopping between tabs. Everything you need to master development is now consolidated within StackForge."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {internalCategories.map((cat) => (
            <NextLink key={cat.title} href={cat.href}>
              <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group cursor-pointer hover:shadow-xl hover:shadow-primary/5">
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {cat.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Explore Now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </NextLink>
          ))}
        </div>

        <div className="mt-24">
          <SectionHeader
            title="Developer Tools"
            description="Utility tools to speed up your workflow."
          />
          <div className="max-w-6xl mx-auto mt-12">
            <ResourceGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
