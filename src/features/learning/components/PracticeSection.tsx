import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface PracticeSectionProps {
  title: string;
  description: string;
  hints: string[];
  expectedOutput: string;
  solution: string;
  onComplete: (challengeId: string) => Promise<void>;
  challengeId: string;
}

export function PracticeSection({ title, description, hints, expectedOutput, solution, onComplete, challengeId }: PracticeSectionProps) {
  const [userCode, setUserCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      await onComplete(challengeId);
      setIsSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    }
  };

  return (
    <Card variant="default" padding="md" className="mb-6 space-y-4">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-normal">{description}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="rounded-lg border border-border overflow-hidden bg-muted/80">
            <div className="px-3 py-1.5 border-b border-border bg-muted text-xs font-mono text-muted-foreground flex justify-between items-center">
              <span>Editor</span>
              <span className="text-[10px]">.js</span>
            </div>
            <textarea
              className="w-full h-48 p-3 bg-muted/50 text-foreground font-mono text-xs focus:outline-none resize-none placeholder:text-muted-foreground"
              placeholder="Write your solution here..."
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
            />
            <div className="px-3 py-2 border-t border-border bg-muted flex justify-between items-center">
              <button 
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitted}
                variant="primary"
                size="sm"
                className="gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Solution</span>
              </Button>
            </div>
          </div>
          {error && <div className="p-2.5 rounded-lg bg-destructive/10 text-destructive text-xs">{error}</div>}
          {isSubmitted && <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">Challenge Completed! XP awarded.</div>}
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-lg border border-border bg-card space-y-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Expected Output</span>
            <div className="font-mono text-xs text-foreground bg-muted p-2.5 rounded-md">
              {expectedOutput}
            </div>
          </div>
          {showHints && (
            <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 space-y-1.5">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Hints</span>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                {hints.map((hint, i) => <li key={i}>{hint}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
