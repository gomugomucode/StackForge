'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string | null;
  difficulty?: string;
}

interface QuizViewProps {
  quizId: string;
  questions: Question[];
  onComplete: (results: { score: number; passed: boolean }) => void;
}

export function QuizView({ quizId, questions, onComplete }: QuizViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;
    
    setUserAnswers([...userAnswers, selectedOption]);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (quizCompleted) {
    const correctCount = questions.reduce((acc, q, idx) => acc + (userAnswers[idx] === q.answer ? 1 : 0), 0);
    const score = (correctCount / questions.length) * 100;

    return (
      <Card variant="default" padding="lg" className="w-full max-w-2xl mx-auto space-y-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <div className="relative w-28 h-28 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-muted/40" />
              <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" 
                strokeDasharray={314} 
                strokeDashoffset={314 - (314 * score) / 100}
                className="text-primary transition-all duration-700" 
              />
            </svg>
            <span className="absolute text-2xl font-bold text-foreground">{Math.round(score)}%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            You got {correctCount} out of {questions.length} questions correct.
          </p>
          <Button 
            variant="primary"
            size="md"
            onClick={() => onComplete({ score: Math.round(score), passed: score >= 70 })}
          >
            Claim Rewards
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="lg" className="w-full max-w-2xl mx-auto space-y-4">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
          <Badge variant="primary">
            {currentQ.difficulty || 'General'}
          </Badge>
        </div>
        <Progress value={progress} />
      </CardHeader>
      
      <CardContent className="space-y-4 py-4">
        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-foreground leading-normal">
            {currentQ.question}
          </h3>
          
          <div className="grid gap-2.5">
            {currentQ.options.map((option) => {
              const isCorrect = option === currentQ.answer;
              const isSelected = selectedOption === option;
              
              let styleClass = "border-border bg-card hover:bg-secondary hover:border-primary/40 text-foreground";
              if (isSelected && !isAnswered) {
                styleClass = "border-primary bg-primary/10 text-primary font-semibold";
              }
              if (isAnswered) {
                if (isCorrect) styleClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                else if (isSelected) styleClass = "border-destructive bg-destructive/10 text-destructive font-semibold";
                else styleClass = "border-border/40 bg-card text-muted-foreground opacity-50";
              }

              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-lg border text-xs transition-all flex justify-between items-center ${styleClass}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive" />}
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-lg bg-secondary/60 border border-border/40 text-xs text-muted-foreground"
            >
              <strong className="text-foreground block mb-1">Explanation:</strong>
              {currentQ.explanation || "No detailed explanation available for this question."}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between pt-4 border-t border-border/40">
        <Button 
          variant="ghost"
          size="sm" 
          disabled={currentQuestion === 0}
          onClick={() => {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedOption(null);
            setIsAnswered(false);
          }}
        >
          Previous
        </Button>
        
        {!isAnswered ? (
          <Button 
            variant="primary"
            size="sm"
            disabled={!selectedOption} 
            onClick={handleSubmitAnswer} 
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            variant="primary"
            size="sm"
            onClick={handleNext} 
            className="gap-1.5"
          >
            <span>{currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
