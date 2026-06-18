'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizViewProps {
  question: string;
  options: string[];
  correctOption: number;
  onSuccess: () => void;
  onClose: () => void;
}

export function QuizView({ question, options, correctOption, onSuccess, onClose }: QuizViewProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    setIsSubmitted(true);
    const correct = selectedOption === correctOption;
    setIsCorrect(correct);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Trophy className="w-5 h-5" />
              <span className="text-sm uppercase tracking-widest">Checkpoint Quiz</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground leading-tight">
              {question}
            </h3>
            <p className="text-sm text-muted-foreground">
              Select the correct answer to master this node and earn extra XP.
            </p>
          </div>

          <div className="grid gap-3">
            {options.map((option, idx) => (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={`p-4 text-left rounded-xl border transition-all flex items-center justify-between group ${
                  selectedOption === idx 
                    ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                    : 'border-border bg-secondary/30 hover:bg-secondary'
                } ${
                  isSubmitted && idx === correctOption 
                    ? 'border-green-500 bg-green-500/10 ring-1 ring-green-500' 
                    : ''
                } ${
                  isSubmitted && selectedOption === idx && idx !== correctOption 
                    ? 'border-red-500 bg-red-500/10 ring-1 ring-red-500' 
                    : ''
                }`}
              >
                <span className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">
                  {option}
                </span>
                {isSubmitted && idx === correctOption && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                {isSubmitted && selectedOption === idx && idx !== correctOption && <XCircle className="w-4 h-4 text-red-500" />}
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            {!isSubmitted ? (
              <Button 
                variant="primary" 
                className="gap-2" 
                disabled={selectedOption === null}
                onClick={handleSubmit}
              >
                Verify Answer <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <div className="flex gap-3 w-full">
                {!isCorrect && (
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => {
                      setSelectedOption(null);
                      setIsSubmitted(false);
                      setIsCorrect(false);
                    }}
                  >
                    Try Again
                  </Button>
                )}
                {isCorrect && (
                  <Button 
                    variant="primary" 
                    className="flex-1 gap-2" 
                    onClick={onSuccess}
                  >
                    Claim Mastery <CheckCircle2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
