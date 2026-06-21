'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string | null;
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
      <Card className="w-full max-w-2xl mx-auto border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-800" />
              <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray={377} 
                strokeDashoffset={377 - (377 * score) / 100}
                className="text-primary transition-all duration-1000" 
              />
            </svg>
            <span className="absolute text-3xl font-bold">{Math.round(score)}%</span>
          </div>
          <p className="text-lg text-zinc-400 mb-6">
            You got {correctCount} out of {questions.length} questions correct.
          </p>
          <Button 
            onClick={() => onComplete({ score: Math.round(score), passed: score >= 70 })}
            className="bg-white text-black hover:bg-zinc-200"
          >
            Claim Rewards
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-zinc-500">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/10 text-primary">
            {currentQ.difficulty || 'General'}
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-zinc-800" />
      </CardHeader>
      
      <CardContent className="space-y-6 py-8">
        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3 className="text-xl font-medium text-white mb-6 leading-relaxed">
            {currentQ.question}
          </h3>
          
          <div className="grid gap-3">
            {currentQ.options.map((option) => {
              const isCorrect = option === currentQ.answer;
              const isSelected = selectedOption === option;
              
              let variant = "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300";
              if (isAnswered) {
                if (isCorrect) variant = "border-green-500 bg-green-500/10 text-green-400";
                else if (isSelected) variant = "border-red-500 bg-red-500/10 text-red-400";
                else variant = "border-zinc-800 bg-zinc-900 text-zinc-500 opacity-50";
              }

              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${variant}`}
                >
                  <span className="font-medium">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-400"
            >
              <strong className="text-zinc-200 block mb-1">Explanation:</strong>
              {currentQ.explanation || "No detailed explanation available for this question."}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between py-6">
        <Button 
          variant="ghost" 
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
            disabled={!selectedOption} 
            onClick={handleSubmitAnswer} 
            className="bg-white text-black"
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            className="bg-white text-black flex items-center gap-2"
          >
            {currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
