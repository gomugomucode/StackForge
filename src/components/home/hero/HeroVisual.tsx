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
      <div className="w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Window Header */}
        <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="text-xs font-mono text-muted-foreground">learning-path-v1.exe</div>
          <div className="w-12" />
        </div>

        {/* Window Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Progress */}
          <div className="md:col-span-1 space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Current Path</h4>
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      step.status === 'current' ? 'bg-primary/10 border-primary text-primary' : 
                      step.status === 'complete' ? 'bg-secondary/30 border-border text-foreground' : 
                      'bg-card border-border text-muted-foreground opacity-60'
                    }`}
                  >
                    {step.status === 'complete' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : 
                     step.status === 'current' ? <Circle className="w-4 h-4 animate-pulse" /> : 
                     <Lock className="w-4 h-4" />}
                    <span className="text-xs font-medium">{step.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Code Preview */}
          <div className="md:col-span-2 bg-zinc-950 rounded-xl p-4 font-mono text-xs text-zinc-400 shadow-inner relative overflow-hidden group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-zinc-800 text-zinc-500 px-2 py-1 rounded text-[10px]">TypeScript</div>
            </div>
            <div className="space-y-1">
              <p className="text-purple-400">const <span className="text-blue-400">engineer</span> = {'{'} </p>
              <p className="pl-4">skillset: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Node.js'</span>, <span className="text-green-400">'AWS'</span>],</p>
              <p className="pl-4">status: <span className="text-green-400">'Learning'</span>,</p>
              <p className="pl-4">goal: <span className="text-green-400">'Elite'</span></p>
              <p className="text-purple-400">{'}'}</p>
              <p className="pt-4 text-zinc-500">// Start building the future...</p>
              <p className="text-zinc-300"> <span className="text-blue-400">await</span> engineer.<span className="text-yellow-400">levelUp()</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
