"use client"

import { Button } from "@/components/ui/Button"
import { ArrowRight, Sparkles, Terminal } from "lucide-react"
import { motion } from "framer-motion"
import { HeroVisual } from './HeroVisual'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-8"
        >
          <Sparkles className="w-3 h-3" />
          <span>The Ultimate Developer's Forge</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 gradient-text"
        >
          Master the Modern <br className="hidden md:block" /> 
          <span className="text-primary">Tech Stack</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From zero to production. Interactive roadmaps, curated cheat sheets, 
          and real-world projects to transform you into an elite engineer.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="h-12 px-8 gap-2 group" asChild>
            <Link href="/roadmaps">
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 gap-2" asChild>
            <Link href="/roadmaps">
              <Terminal className="w-4 h-4" /> View Roadmaps
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-border bg-card/50 p-2 backdrop-blur-sm shadow-2xl">
            <div className="aspect-video rounded-xl overflow-hidden bg-muted flex items-center justify-center">
              <HeroVisual />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 p-4 rounded-xl bg-background border border-border shadow-lg animate-bounce-slow hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Fullstack Roadmap Updated</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 p-4 rounded-xl bg-background border border-border shadow-lg animate-bounce-slow-delay hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">12k+ Developers Learning</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
