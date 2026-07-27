"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Lock, Code2, Terminal, BrainCircuit, BookOpen } from "lucide-react"

export function HeroVisual() {
  const steps = [
    { icon: <BookOpen className="w-4 h-4" />, text: "Learn Fundamentals", status: "complete" },
    { icon: <Code2 className="w-4 h-4" />, text: "Build Real Projects", status: "current" },
    { icon: <BrainCircuit className="w-4 h-4" />, text: "Master System Design", status: "locked" },
    { icon: <Terminal className="w-4 h-4" />, text: "Ace Technical Interviews", status: "locked" },
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl bg-card border border-border rounded-xl shadow-lg overflow-hidden flex flex-col">
        {/* Window Header */}
        <div className="px-4 py-2.5 border-b border-border bg-muted/60 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="text-[11px] font-mono text-muted-foreground">learning-path.ts</div>
          <div className="w-12" />
        </div>

        {/* Window Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Progress */}
          <div className="md:col-span-1 space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Current Path</h4>
            <div className="space-y-2">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all ${
                    step.status === 'current' ? 'bg-primary/10 border-primary/40 text-primary' : 
                    step.status === 'complete' ? 'bg-secondary border-border/60 text-foreground' : 
                    'bg-card border-border/40 text-muted-foreground opacity-60'
                  }`}
                >
                  {step.status === 'complete' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                   step.status === 'current' ? <Circle className="w-4 h-4 text-primary animate-pulse" /> : 
                   <Lock className="w-4 h-4 text-muted-foreground" />}
                  <span className="text-xs font-medium">{step.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Code Preview */}
          <div className="md:col-span-2 bg-muted/80 border border-border/60 rounded-lg p-4 font-mono text-xs text-foreground shadow-inner relative overflow-hidden group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-secondary text-muted-foreground px-2 py-0.5 rounded text-[10px] border border-border">TypeScript</div>
            </div>
            <div className="space-y-1">
              <p className="text-primary font-semibold">const engineer = {'{'}</p>
              <p className="pl-4">skillset: [<span className="text-emerald-500 dark:text-emerald-400">'React'</span>, <span className="text-emerald-500 dark:text-emerald-400">'Node.js'</span>, <span className="text-emerald-500 dark:text-emerald-400">'PostgreSQL'</span>],</p>
              <p className="pl-4">status: <span className="text-emerald-500 dark:text-emerald-400">'Learning'</span>,</p>
              <p className="pl-4">goal: <span className="text-emerald-500 dark:text-emerald-400">'Production-Ready'</span></p>
              <p className="text-primary font-semibold">{'}'}</p>
              <p className="pt-3 text-muted-foreground">// Execute roadmap step...</p>
              <p className="text-foreground font-semibold"><span className="text-primary">await</span> engineer.<span className="text-amber-500">levelUp()</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
