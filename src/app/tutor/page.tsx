"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  Layers, 
  Database, 
  PlayCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExecutionStep {
  line: number;
  variables: Record<string, any>;
  callStack: string[];
  output: string;
  explanation: string;
}

export default function TutorPage() {
  const [code, setCode] = useState(`function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(3));`);
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const simulateExecution = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setSteps(data.steps);
      setCurrentStep(0);
    } catch (e) {
      console.error("Tutor Error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12 max-w-7xl">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-3 h-3" /> AI Logic Visualizer
        </div>
        <h1 className="text-5xl font-black tracking-tight">Visualize <span className="gradient-text">How Code Works</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Stop guessing. See exactly how variables change, how the call stack grows, and how your loops execute in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
        {/* CODE EDITOR SECTION */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <CodeIcon /> Input Code
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCode(`const arr = [1, 2, 3];\nconst double = arr.map(x => x * 2);\nconsole.log(double);`)}>Arrays</Button>
              <Button variant="outline" size="sm" onClick={() => setCode(`function fib(n) {\n  if (n < 2) return n;\n  return fib(n-1) + fib(n-2);\n}\nconsole.log(fib(4));`)}>Recursion</Button>
            </div>
          </div>
          <div className="flex-1 relative rounded-3xl border border-border bg-zinc-950 overflow-hidden shadow-2xl">
            <textarea 
              className="absolute inset-0 w-full h-full p-6 bg-transparent text-zinc-300 font-mono text-sm resize-none focus:outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
            <div className="absolute bottom-6 right-6">
              <Button 
                variant="primary" 
                size="lg" 
                className="gap-2 shadow-xl" 
                onClick={simulateExecution}
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : <><Play className="w-4 h-4" /> Visualize Execution</>}
              </Button>
            </div>
          </div>
        </div>

        {/* VISUALIZER SECTION */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {steps.length === 0 ? (
            <div className="flex-1 rounded-3xl border border-dashed border-border flex flex-col items-center justify-center text-center p-12 space-y-4 bg-card/30">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
                <PlayCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Ready to visualize?</h3>
                <p className="text-muted-foreground text-sm">Write some code and click "Visualize Execution" to see the magic.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Variable Memory View */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Database className="w-4 h-4" /> Memory Heap
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border space-y-4 min-h-[200px]">
                  {Object.entries(steps[currentStep].variables).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border group transition-all hover:bg-primary/5">
                      <span className="text-sm font-mono text-primary font-bold">{key}</span>
                      <span className="text-sm font-mono text-foreground">{JSON.stringify(val)}</span>
                    </div>
                  ))}
                  {Object.keys(steps[currentStep].variables).length === 0 && (
                    <p className="text-sm text-muted-foreground italic text-center py-8">No variables in scope</p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Layers className="w-4 h-4" /> Call Stack
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border space-y-2 min-h-[200px]">
                  {steps[currentStep].callStack.map((frame, i) => (
                    <div key={i} className="p-2 rounded-lg bg-zinc-800 border border-border text-xs font-mono text-zinc-400 flex items-center gap-2">
                      <span className="text-primary font-bold">#{i+1}</span> {frame}
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline & Output View */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Play className="w-4 h-4" /> Execution Trace
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                  <div className="p-4 rounded-xl bg-black/50 border border-border font-mono text-sm text-green-400 min-h-[80px]">
                    {steps[currentStep].output || '> No output yet...'}
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-foreground leading-relaxed italic">
                    "{steps[currentStep].explanation}"
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(s => s - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </Button>
                  <div className="text-xs font-bold text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentStep === steps.length - 1}
                    onClick={() => setCurrentStep(s => s + 1)}
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5-1-6.5 12.5L2-1"/><path d="m22 1 6.5-12.5L20 1"/></svg>
  );
}
