"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Textarea } from "@/components/ui/Textarea";
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  Layers, 
  Database, 
  PlayCircle,
  Code2
} from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);

  const simulateExecution = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setSteps(data.steps || []);
      setCurrentStep(0);
    } catch (e) {
      console.error("Tutor Error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <Badge variant="primary">
          <Cpu className="w-3.5 h-3.5" /> AI Logic Visualizer
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Visualize <span className="text-primary">How Code Works</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-normal">
          See exactly how variables change, how the call stack grows, and how your loops execute in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* CODE EDITOR SECTION */}
        <Card variant="default" padding="md" className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-primary" /> Input Code
              </h3>
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm" onClick={() => setCode(`const arr = [1, 2, 3];\nconst double = arr.map(x => x * 2);\nconsole.log(double);`)}>Arrays</Button>
                <Button variant="outline" size="sm" onClick={() => setCode(`function fib(n) {\n  if (n < 2) return n;\n  return fib(n-1) + fib(n-2);\n}\nconsole.log(fib(4));`)}>Recursion</Button>
              </div>
            </div>
            <Textarea 
              className="w-full h-80 font-mono text-xs p-3 bg-muted/60"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div>
            <Button 
              variant="primary" 
              size="md" 
              className="w-full gap-2" 
              onClick={simulateExecution}
              disabled={isLoading}
              isLoading={isLoading}
            >
              <Play className="w-4 h-4" />
              <span>Visualize Execution</span>
            </Button>
          </div>
        </Card>

        {/* VISUALIZER SECTION */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {steps.length === 0 ? (
            <EmptyState
              icon={<PlayCircle className="w-6 h-6" />}
              title="Ready to Visualize Execution?"
              reason="Write or paste your code snippet on the left and click 'Visualize Execution'."
              benefit="Watch variables update in real-time frame by frame."
              primaryCtaLabel="Run Sample Code"
              onPrimaryClick={simulateExecution}
            />
          ) : (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Variable Memory View */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Database className="w-4 h-4 text-primary" /> Memory Heap
                </div>
                <Card variant="default" padding="sm" className="space-y-2 min-h-[160px]">
                  {Object.entries(steps[currentStep].variables).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-2 rounded-md bg-secondary/60 border border-border/40 text-xs font-mono">
                      <span className="text-primary font-bold">{key}</span>
                      <span className="text-foreground">{JSON.stringify(val)}</span>
                    </div>
                  ))}
                  {Object.keys(steps[currentStep].variables).length === 0 && (
                    <p className="text-xs text-muted-foreground italic text-center py-6">No variables in scope</p>
                  )}
                </Card>

                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Layers className="w-4 h-4 text-primary" /> Call Stack
                </div>
                <Card variant="default" padding="sm" className="space-y-1.5 min-h-[160px]">
                  {steps[currentStep].callStack.map((frame, i) => (
                    <div key={i} className="p-2 rounded-md bg-muted text-xs font-mono text-foreground flex items-center gap-2">
                      <span className="text-primary font-bold">#{i+1}</span> {frame}
                    </div>
                  ))}
                </Card>
              </div>

              {/* Timeline & Output View */}
              <div className="space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Play className="w-4 h-4 text-primary" /> Execution Trace
                  </div>
                  <Card variant="default" padding="sm" className="space-y-3">
                    <div className="p-3 rounded-md bg-muted font-mono text-xs text-emerald-600 dark:text-emerald-400 min-h-[60px]">
                      {steps[currentStep].output || '> No output yet...'}
                    </div>
                    <div className="p-3 rounded-md bg-primary/10 text-xs text-foreground leading-normal italic">
                      "{steps[currentStep].explanation}"
                    </div>
                  </Card>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(s => s - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </Button>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </span>
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
