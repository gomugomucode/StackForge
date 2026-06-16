"use client";

import { SEOHead } from '@/components/ui/SEOHead'

import HubHeader from '@/features/learning-paths/HubHeader'
import LearningPathGrid from '@/features/learning-paths/LearningPathGrid'
import { roadmaps } from '@/lib/data/roadmaps'

import Link from 'next/link'
import { Book, Layout, Code2, Terminal, Layers, Cpu } from 'lucide-react'

const QuickAccess = () => {
  const links = [
    { title: 'Cheatsheets', icon: <Code2 size={20} />, color: 'text-blue-400', path: '/cheatsheets', desc: 'Quick reference for syntax' },
    { title: 'Tutorials', icon: <Book size={20} />, color: 'text-green-400', path: '/tutorials', desc: 'Step-by-step deep dives' },
    { title: 'Interview Prep', icon: <Terminal size={20} />, color: 'text-purple-400', path: '/interview-prep', desc: 'Crack the coding round' },
    { title: 'Dev Tools', icon: <Layers size={20} />, color: 'text-orange-400', path: '/tools', desc: 'Essential engineering tools' },
    { title: 'Projects', icon: <Layout size={20} />, color: 'text-pink-400', path: '/projects', desc: 'Build production-grade apps' },
    { title: 'Tech Hub', icon: <Cpu size={20} />, color: 'text-cyan-400', path: '/tech-hub', desc: 'Latest in software architecture' },
  ]

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {links.map((link) => (
          <Link 
            key={link.title} 
            href={link.path} 
            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all text-center flex flex-col items-center gap-3"
          >
            <div className={`p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform ${link.color}`}>
              {link.icon}
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{link.title}</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-tighter">{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SEOHead
        title="StackForge | Premium Developer Education Platform"
        description="Curated learning paths, expert-led tutorials, and professional cheatsheets for modern software engineers."
      />
      
      <HubHeader />
      
      <div className="max-w-7xl mx-auto">
        <LearningPathGrid roadmaps={roadmaps} />
        <QuickAccess />
      </div>
      
      {/* Footer/CTA can be added here */}
    </div>
  )
}
