"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code2, BookOpen, Wrench } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import Link from "next/link"

export function FeaturedContentSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Featured Resources" 
          subtitle="Hand-picked high-impact materials to kickstart your journey."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Featured Roadmap - Large */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Featured Roadmap</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">Fullstack Mastery 2026</h3>
                <p className="text-muted-foreground max-w-md mb-8">
                  The most comprehensive path to becoming a production-ready developer. 
                  From the basics of React to scaling distributed systems with Kubernetes.
                </p>
              </div>
              <Button variant="primary" className="w-fit gap-2" asChild>
                <Link href="/roadmaps/fullstack">
                  Start Learning <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
          </motion.div>

          {/* Featured Project - Small */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Code2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Top Project</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Real-time Collab Engine</h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Build a CRDT-based collaborative editor like Notion.
                </p>
              </div>
              <Button variant="outline" className="w-fit gap-2" asChild>
                <Link href="/projects/collab-engine">
                  Build It <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
          </motion.div>

          {/* Featured Tool - Medium */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Wrench className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Utility Spotlight</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">Next-Gen Regex Tester</h3>
                <p className="text-muted-foreground mb-8">
                  Stop guessing your expressions. Our advanced tester provides real-time 
                  visualization and common pattern templates.
                </p>
                <Button variant="outline" className="w-fit gap-2" asChild>
                  <Link href="/tools/regex-tester">
                    Try Tool <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="hidden md:block w-64 h-40 bg-zinc-900 rounded-2xl border border-border p-4 font-mono text-[10px] text-zinc-500">
                <div className="flex gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                </div>
                <p className="text-zinc-400">^([a-z0-9_\-]+)(\.[a-z0-9_\-]+)*$</p>
                <p className="text-green-500 mt-2">✓ Valid Pattern</p>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
