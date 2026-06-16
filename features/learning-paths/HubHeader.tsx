"use client";

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Play, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function HubHeader() {
  return (
    <section className="relative overflow-hidden hero-grid min-h-[90vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-accent-purple/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] bg-accent-cyan/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 relative w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-secondary mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent-purple" />
            <span className="text-white">Interactive programming education platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-text-primary mb-6 leading-[1.08]"
          >
            Master Modern
            <br />
            <span className="gradient-text">Software Development</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Structured courses, interactive quizzes, coding games, visual roadmaps, and downloadable resources — everything you need to grow as a developer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/#weekly-challenge" size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white">
              <Zap className="w-5 h-5" />
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href="/resources" variant="secondary" size="lg" className="text-white hover:bg-white/10">
              <Play className="w-5 h-5" />
              Explore Resources
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {['Free forever', 'No account needed', '500+ tutorials'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="gradient-border rounded-2xl overflow-hidden glow-purple">
            <div className="glass p-1.5">
              <div className="bg-surface-950/80 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-800/60 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-xs text-text-muted font-mono ml-2">app.ts</span>
                </div>
                <pre className="p-6 md:p-8 text-left text-sm font-mono overflow-x-auto leading-relaxed">
                  <code className="text-text-primary">
                    <span className="text-accent-purple">async function</span>{' '}
                    <span className="text-accent-cyan">launchCareer</span>
                    <span className="text-text-primary">()</span>
                    <span className="text-text-muted"> </span>
                    {'\n'}
                    <span className="text-text-muted">  </span>
                    <span className="text-accent-purple">const</span>
                    <span className="text-text-primary"> stack </span>
                    <span className="text-text-muted">= [</span>
                    <span className="text-accent-emerald">&apos;React&apos;</span>
                    <span className="text-text-muted">, </span>
                    <span className="text-accent-emerald">&apos;Node&apos;</span>
                    <span className="text-text-muted">, </span>
                    <span className="text-accent-emerald">&apos;TypeScript&apos;</span>
                    <span className="text-text-muted">];</span>
                    {'\n\n'}
                    <span className="text-text-muted">  </span>
                    <span className="text-accent-purple">for</span>
                    <span className="text-text-primary"> (</span>
                    <span className="text-accent-purple">const</span>
                    <span className="text-text-primary"> skill </span>
                    <span className="text-accent-purple">of</span>
                    <span className="text-text-primary"> stack</span>
                    <span className="text-text-muted">) </span>
                    {'\n'}
                    <span className="text-text-muted">    </span>
                    <span className="text-accent-purple">await</span>
                    <span className="text-accent-cyan"> practice</span>
                    <span className="text-text-muted">(skill);</span>
                    {'\n'}
                    <span className="text-text-muted">  {'}'}</span>
                    {'\n\n'}
                    <span className="text-text-muted">  </span>
                    <span className="text-accent-purple">return</span>
                    <span className="text-accent-amber"> &apos;Ship it! 🚀&apos;</span>
                    <span className="text-text-muted">;</span>
                    {'\n'}
                    <span className="text-text-muted">{'}'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
