import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, Send } from 'lucide-react';

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
    } catch (e) {
      setError("Submission failed. Please try again.");
    }
  };

  return (
    <div className="mb-8 p-6 rounded-2xl border border-primary/20 bg-primary/5">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-xl border border-border overflow-hidden bg-zinc-900">
            <div className="px-4 py-2 border-b border-border bg-zinc-800 text-xs font-mono text-zinc-400">
              Editor
            </div>
            <textarea
              className="w-full h-64 p-4 bg-zinc-900 text-zinc-300 font-mono text-sm focus:outline-none resize-none"
              placeholder="Write your solution here..."
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
            />
            <div className="px-4 py-3 border-t border-border bg-zinc-800 flex justify-between items-center">
              <button 
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Solution
              </button>
            </div>
          </div>
          {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-xs">{error}</div>}
          {isSubmitted && <div className="p-3 rounded-lg bg-green-500/10 text-green-500 text-xs font-bold">Challenge Completed! XP awarded.</div>}
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <span className="text-xs font-bold text-muted-foreground uppercase block mb-2">Expected Output</span>
            <div className="font-mono text-sm text-zinc-400 bg-black p-3 rounded-lg">
              {expectedOutput}
            </div>
          </div>
          {showHints && (
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
              <span className="text-xs font-bold text-primary uppercase block mb-2">Hints</span>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                {hints.map((hint, i) => <li key={i}>{hint}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
