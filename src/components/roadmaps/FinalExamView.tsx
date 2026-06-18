'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Trophy, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FinalExamProps {
  exam: {
    questions: {
      question: string;
      options: string[];
      correctOption: number;
    }[];
    passingScore: number;
  };
  onSuccess: (score: number) => void;
  onClose: () => void;
}

export function FinalExamView({ exam, onSuccess, onClose }: FinalExamProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(exam.questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIdx;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const correct = answers.filter((ans, idx) => ans === exam.questions[idx].correctOption).length;
    return (correct / exam.questions.length) * 100;
  };

  const submitExam = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= exam.passingScore) {
      setTimeout(() => onSuccess(score), 2000);
    }
  };

  const score = calculateScore();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
    >
      <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-primary font-bold">
              <Trophy className="w-6 h-6" />
              <span className="text-sm uppercase tracking-widest">Final Mastery Examination</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>

          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground">Question {currentQuestion + 1} of {exam.questions.length}</span>
                <span className="text-xs font-bold text-primary">Passing Score: {exam.passingScore}%</span>
              </div>
              
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: `${((currentQuestion + 1) / exam.questions.length) * 100}%` }} 
                />
              </div>

              <h3 className="text-2xl font-bold text-foreground leading-tight">
                {exam.questions[currentQuestion].question}
              </h3>

              <div className="grid gap-3">
                {exam.questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-4 text-left rounded-xl border transition-all flex items-center justify-between group ${
                      answers[currentQuestion] === idx 
                        ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                        : 'border-border bg-secondary/30 hover:bg-secondary'
                    }`}
                  >
                    <span className="text-sm font-medium text-foreground">{option}</span>
                    {answers[currentQuestion] === idx && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  disabled={currentQuestion === 0} 
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                >
                  Previous
                </Button>
                
                {currentQuestion < exam.questions.length - 1 ? (
                  <Button 
                    variant="primary" 
                    disabled={answers[currentQuestion] === null}
                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    disabled={answers.includes(null)}
                    onClick={submitExam}
                    className="gap-2"
                  >
                    Complete Exam <Trophy className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 py-10">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${score >= exam.passingScore ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {score >= exam.passingScore ? <Trophy className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-black">
                  {score >= exam.passingScore ? 'Mastery Achieved!' : 'Exam Failed'}
                </h2>
                <p className="text-muted-foreground">
                  Your final score: <span className={`font-bold ${score >= exam.passingScore ? 'text-green-500' : 'text-red-500'}`}>{score}%</span>
                </p>
              </div>

              {score < exam.passingScore && (
                <Button variant="outline" className="px-8" onClick={() => {
                  setAnswers(new Array(exam.questions.length).fill(null));
                  setCurrentQuestion(0);
                  setIsSubmitted(false);
                }}>
                  Retry Exam
                </Button>
              )}
              
              {score >= exam.passingScore && (
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-4">
                  <p className="text-sm text-primary font-medium">You have proven your expertise in this roadmap. Your professional certification is now ready for claim.</p>
                  <Button variant="primary" className="w-full gap-2" onClick={() => onSuccess(score)}>
                    Claim Certification <Award className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Award({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="0 11 12 22 24 11" />
      <path d="M12 18V22" />
      <path d="M9 18l3 4 3-4" />
    </svg>
  );
}
