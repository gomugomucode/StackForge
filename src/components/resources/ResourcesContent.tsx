'use client';

import { SectionHeader } from '../ui/SectionHeader';
import { ResourceGrid } from '@/features/resources/components/ResourceGrid';
import { Button } from '../ui/Button';
import NextLink from 'next/link';
import { BookOpen, Code, GraduationCap, Layout, Terminal, Zap, Trophy, FileText, ArrowRight, BarChart } from 'lucide-react';

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
      href: '/roadmaps/quiz', 
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

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <SectionHeader
                title="Featured Content"
                description="Hand-picked lessons and projects to jumpstart your learning."
              />
              <div className="grid gap-4">
                <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">JS</div>
                      <div>
                         <p className="font-semibold text-foreground">Async/Await Mastery</p>
                         <p className="text-xs text-muted-foreground">Learn the art of non-blocking code</p>
                      </div>
                   </div>
                   <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">TS</div>
                      <div>
                         <p className="font-semibold text-foreground">Generics Deep Dive</p>
                         <p className="text-xs text-muted-foreground">Type-safe reusable components</p>
                      </div>
                   </div>
                   <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeader
                title="Popular Cheatsheets"
                description="The most referenced guides by the community."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NextLink href="/cheatsheets/javascript" className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group">
                   <p className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">JavaScript Modern Essentials</p>
                   <p className="text-xs text-muted-foreground">ES6+, Async, DOM</p>
                </NextLink>
                <NextLink href="/cheatsheets/react" className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group">
                   <p className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">React 19 Mastery</p>
                   <p className="text-xs text-muted-foreground">Hooks, State, Perf</p>
                </NextLink>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" /> 
                Continue Learning
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                   <p className="text-sm font-medium text-foreground">Frontend Roadmap</p>
                   <div className="w-full bg-secondary h-1.5 rounded-full mt-2">
                      <div className="bg-primary h-full rounded-full w-[65%]" />
                   </div>
                   <p className="text-[10px] text-muted-foreground mt-2 text-right">65% Complete</p>
                </div>
              ---
              <Button variant="outline" className="w-full mt-6" asChild>
                <NextLink href="/dashboard">Go to Dashboard</NextLink>
              </Button>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-purple-500/10">
              <h3 className="text-lg font-bold text-foreground mb-2">Recommended For You</h3>
              <p className="text-sm text-muted-s-foreground mb-4">Based on your progress in JavaScript</p>
              <div className="space-y-3">
                 <NextLink href="/learn/backend/node-runtime" className="block p-2 text-sm font-medium text-primary hover:underline">
                    → Node.js Runtime
                 </NextLink>
                 <NextLink href="/learn/frontend/react-core" className="block p-2 text-sm font-medium text-primary hover:underline">
                    → React Fundamentals
                 </NextLink>
              </div>
            </div>
          </div>
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
