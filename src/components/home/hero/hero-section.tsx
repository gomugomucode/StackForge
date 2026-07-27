"use client"

import { Button } from "@/components/ui/Button"
import { ArrowRight, Sparkles, Terminal } from "lucide-react"
import { motion } from "framer-motion"
import { HeroVisual } from './HeroVisual'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Ultimate Developer's Forge</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-foreground"
        >
          Master the Modern <br className="hidden md:block" /> 
          <span className="text-primary">Tech Stack</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-normal"
        >
          From zero to production. Interactive roadmaps, curated cheat sheets, 
          and real-world projects to transform you into an elite engineer.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" variant="primary" asChild>
            <Link href="/roadmaps" className="gap-2">
              <span>Get Started</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/roadmaps" className="gap-2">
              <Terminal className="w-4 h-4 text-primary" /> <span>View Roadmaps</span>
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-14 relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-xl border border-border bg-card p-1 shadow-lg">
            <div className="rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <HeroVisual />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
